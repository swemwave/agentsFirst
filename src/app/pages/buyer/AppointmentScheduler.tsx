import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";
import { ArrowLeft, Check, DollarSign, Home } from "lucide-react";
import { useAuth } from "../../auth/AuthContext";
import { getFirebaseErrorMessage } from "../../auth/errors";
import {
  type AppointmentPurpose,
  type AppointmentRecord,
  formatDateKey,
} from "../../appointments/types";
import {
  AppointmentSlotConflictError,
  createAppointment,
  subscribeToDateSlots,
} from "../../lib/appointments";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { Calendar } from "../../components/ui/calendar";

interface AppointmentLocationState {
  propertyAddress?: string;
  purpose?: AppointmentPurpose;
}

const availableTimes = [
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
];

function getStartOfToday() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
}

function getPurposeLabel(purpose: AppointmentPurpose) {
  return purpose === "buying" ? "Looking to Buy" : "Looking to Sell";
}

export default function AppointmentScheduler() {
  const location = useLocation();
  const locationState = (location.state as AppointmentLocationState | null) ?? null;
  const { configError, profile } = useAuth();

  const [step, setStep] = useState(1);
  const [purpose, setPurpose] = useState<AppointmentPurpose | "">(
    locationState?.purpose ?? (locationState?.propertyAddress ? "buying" : ""),
  );
  const [formData, setFormData] = useState({
    phone: "",
    message: "",
    propertyAddress: locationState?.propertyAddress ?? "",
  });
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState("");
  const [bookedTimes, setBookedTimes] = useState<string[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [confirmedAppointment, setConfirmedAppointment] =
    useState<AppointmentRecord | null>(null);

  useEffect(() => {
    if (selectedDate) {
      setLoadingSlots(true);
      const unsubscribe = subscribeToDateSlots(
        formatDateKey(selectedDate),
        (slots) => {
          setBookedTimes(slots.map((slot) => slot.timeLabel));
          setLoadingSlots(false);
        },
      );

      return unsubscribe;
    }

    setBookedTimes([]);
    setLoadingSlots(false);
    return undefined;
  }, [selectedDate]);

  useEffect(() => {
    if (selectedTime && bookedTimes.includes(selectedTime)) {
      setSelectedTime("");
    }
  }, [bookedTimes, selectedTime]);

  const canProceed = () => {
    if (configError) {
      return false;
    }

    if (step === 1) {
      return Boolean(purpose);
    }

    if (step === 2) {
      return Boolean(formData.phone.trim()) &&
        (purpose === "selling" || Boolean(formData.message.trim())) &&
        (purpose !== "selling" || Boolean(formData.propertyAddress.trim()));
    }

    if (step === 3) {
      return Boolean(selectedDate && selectedTime) && !bookedTimes.includes(selectedTime);
    }

    return true;
  };

  async function handleNext() {
    if (step < 3) {
      setError("");
      setStep((currentStep) => currentStep + 1);
      return;
    }

    if (!profile || !purpose || !selectedDate || !selectedTime) {
      return;
    }

    setError("");
    setIsSubmitting(true);

    try {
      const appointment = await createAppointment({
        profile,
        phone: formData.phone,
        message: formData.message,
        propertyAddress: formData.propertyAddress,
        purpose,
        selectedDate,
        selectedTime,
      });

      setConfirmedAppointment(appointment);
      setStep(4);
    } catch (bookingError) {
      if (bookingError instanceof AppointmentSlotConflictError) {
        setError(bookingError.message);
      } else {
        setError(getFirebaseErrorMessage(bookingError));
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="h-screen overflow-auto bg-gray-50">
      <div className="border-b px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link
            to="/search"
            className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="size-4" />
            Back
          </Link>
          <Link to="/" className="text-xl font-semibold">
            FinditWithFahad
          </Link>
          <div className="w-24" />
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-semibold mb-2">Book an Appointment with Fahad</h1>
        <p className="text-gray-600 mb-8">
          Book an appointment to discuss your real estate needs
        </p>

        <div className="flex items-center justify-between mb-12 max-w-2xl">
          {[
            { num: 1, label: "Purpose" },
            { num: 2, label: "Your Info" },
            { num: 3, label: "Pick Time" },
            { num: 4, label: "Confirm" },
          ].map((item, index) => (
            <div key={item.num} className="flex items-center flex-1">
              <div className="flex items-center">
                <div
                  className={`size-10 rounded-full flex items-center justify-center font-semibold ${
                    step >= item.num
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-400"
                  }`}
                >
                  {step > item.num ? <Check className="size-5" /> : item.num}
                </div>
                <div className="ml-3">
                  <div
                    className={`text-sm font-medium ${
                      step >= item.num ? "text-gray-900" : "text-gray-400"
                    }`}
                  >
                    {item.label}
                  </div>
                </div>
              </div>
              {index < 3 && (
                <div
                  className={`flex-1 h-px mx-4 ${
                    step > item.num ? "bg-blue-600" : "bg-gray-200"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        <div className="bg-white border rounded-2xl p-8 mb-6">
          {(configError || error) && (
            <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {configError || error}
            </div>
          )}

          {step === 1 && (
            <div>
              <h2 className="text-xl font-semibold mb-6">What brings you here?</h2>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setPurpose("buying")}
                  className={`p-8 border-2 rounded-xl hover:border-blue-600 transition-colors text-left ${
                    purpose === "buying" ? "border-blue-600 bg-blue-50" : ""
                  }`}
                >
                  <div className="size-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <Home className="size-6 text-blue-600" />
                  </div>
                  <div className="font-semibold text-lg mb-2">Looking to Buy</div>
                  <div className="text-sm text-gray-600">
                    Find your dream home with Fahad&apos;s expertise
                  </div>
                </button>
                <button
                  onClick={() => setPurpose("selling")}
                  className={`p-8 border-2 rounded-xl hover:border-blue-600 transition-colors text-left ${
                    purpose === "selling" ? "border-blue-600 bg-blue-50" : ""
                  }`}
                >
                  <div className="size-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                    <DollarSign className="size-6 text-green-600" />
                  </div>
                  <div className="font-semibold text-lg mb-2">Looking to Sell</div>
                  <div className="text-sm text-gray-600">
                    Get top value for your property with Fahad
                  </div>
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="text-xl font-semibold mb-6">Tell us about yourself</h2>
              <div className="space-y-4 max-w-lg">
                <div>
                  <Label>Full Name</Label>
                  <Input value={profile?.fullName ?? ""} className="mt-1.5" disabled />
                </div>
                <div>
                  <Label>Email</Label>
                  <Input value={profile?.email ?? ""} className="mt-1.5" disabled />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(event) =>
                      setFormData((current) => ({
                        ...current,
                        phone: event.target.value,
                      }))
                    }
                    placeholder="(403) 555-0123"
                    className="mt-1.5"
                  />
                </div>
                <div>
                  <Label htmlFor="propertyAddress">
                    {purpose === "selling" ? "Property Address *" : "Property Address (Optional)"}
                  </Label>
                  <Input
                    id="propertyAddress"
                    value={formData.propertyAddress}
                    onChange={(event) =>
                      setFormData((current) => ({
                        ...current,
                        propertyAddress: event.target.value,
                      }))
                    }
                    placeholder="123 Main Street SW"
                    className="mt-1.5"
                  />
                </div>
                <div>
                  <Label htmlFor="message">
                    {purpose === "selling" ? "Message (Optional)" : "Message *"}
                  </Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(event) =>
                      setFormData((current) => ({
                        ...current,
                        message: event.target.value,
                      }))
                    }
                    placeholder="Tell Fahad what you want help with..."
                    rows={4}
                    className="mt-1.5"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 className="text-xl font-semibold mb-6">Pick a date and time</h2>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <h3 className="text-sm font-medium mb-3">Select Date</h3>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={(date) => {
                      setSelectedDate(date);
                      setSelectedTime("");
                      setError("");
                    }}
                    disabled={(date) => date < getStartOfToday()}
                    className="border rounded-lg"
                  />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-medium">Select Time</h3>
                    {loadingSlots && (
                      <span className="text-xs text-gray-500">Checking availability...</span>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {availableTimes.map((time) => {
                      const isBooked = bookedTimes.includes(time);

                      return (
                        <button
                          key={time}
                          onClick={() => {
                            if (!isBooked) {
                              setSelectedTime(time);
                              setError("");
                            }
                          }}
                          disabled={isBooked || loadingSlots || !selectedDate}
                          className={`p-3 border rounded-lg text-sm transition-colors ${
                            selectedTime === time
                              ? "border-blue-600 bg-blue-50"
                              : isBooked
                                ? "border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed"
                                : "hover:border-blue-600"
                          }`}
                        >
                          <span className="block">{time}</span>
                          {isBooked && (
                            <span className="block text-[11px] mt-1 uppercase tracking-wide">
                              Booked
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                  {!selectedDate && (
                    <p className="text-sm text-gray-500 mt-3">
                      Select a date first to see available times.
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {step === 4 && confirmedAppointment && (
            <div>
              <div className="text-center py-8">
                <div className="size-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="size-8 text-green-600" />
                </div>
                <h2 className="text-2xl font-semibold mb-2">Appointment Confirmed!</h2>
                <p className="text-gray-600 mb-8">
                  Your appointment has been saved and the time slot is now reserved.
                </p>

                <div className="bg-gray-50 rounded-xl p-6 max-w-md mx-auto text-left mb-6">
                  <h3 className="font-semibold mb-4">Appointment Details</h3>
                  <div className="space-y-3 text-sm">
                    <div>
                      <div className="text-gray-600">Purpose</div>
                      <div className="font-medium">{getPurposeLabel(confirmedAppointment.purpose)}</div>
                    </div>
                    <div>
                      <div className="text-gray-600">Contact</div>
                      <div className="font-medium">{confirmedAppointment.clientName}</div>
                      <div className="text-gray-600 text-xs">
                        {confirmedAppointment.clientEmail} | {confirmedAppointment.clientPhone}
                      </div>
                    </div>
                    {confirmedAppointment.propertyAddress && (
                      <div>
                        <div className="text-gray-600">Property</div>
                        <div className="font-medium">{confirmedAppointment.propertyAddress}</div>
                      </div>
                    )}
                    <div>
                      <div className="text-gray-600">Preferred Date &amp; Time</div>
                      <div className="font-medium">
                        {selectedDate?.toLocaleDateString()} at {confirmedAppointment.timeLabel}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 justify-center">
                  <Link to="/calendar">
                    <Button>View Calendar</Button>
                  </Link>
                  <Link to="/search">
                    <Button variant="outline">Back to Search</Button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>

        {step < 4 && (
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={() => {
                setError("");
                setStep((currentStep) => Math.max(1, currentStep - 1));
              }}
              disabled={step === 1 || isSubmitting}
            >
              Back
            </Button>
            <Button onClick={() => void handleNext()} disabled={!canProceed() || isSubmitting}>
              {step === 3
                ? isSubmitting
                  ? "Booking Appointment..."
                  : "Confirm Appointment"
                : "Continue"}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
