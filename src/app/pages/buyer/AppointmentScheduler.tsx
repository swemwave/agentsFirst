import { useState } from "react";
import { Link } from "react-router";
import { ArrowLeft, Calendar as CalendarIcon, Clock, Check, Home, DollarSign } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { Calendar } from "../../components/ui/calendar";
import { Container } from "../../components/Container";

export default function AppointmentScheduler() {
  const [step, setStep] = useState(1);
  const [purpose, setPurpose] = useState<"buying" | "selling" | "">("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    propertyAddress: "",
  });
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState("");

  const availableTimes = ["9:00 AM", "10:00 AM", "11:00 AM", "2:00 PM", "3:00 PM", "4:00 PM"];

  const canProceed = () => {
    if (step === 1) return !!purpose;
    if (step === 2) return formData.phone;
    if (step === 3) return !!selectedDate && !!selectedTime;
    return true;
  };

  return (
    <div className="h-screen overflow-auto bg-gray-50">
      {/* Top Bar */}
      <div className="border-b px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/search" className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900">
            <ArrowLeft className="size-4" />
            Back
          </Link>
          <Link to="/" className="text-xl font-semibold">FinditWithFahad</Link>
          <div className="w-24" />
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-semibold mb-2">Schedule a Meeting with Fahad</h1>
        <p className="text-gray-600 mb-8">Book an appointment to discuss your real estate needs</p>

        {/* Stepper */}
        <div className="flex items-center justify-between mb-12 max-w-2xl">
          {[
            { num: 1, label: "Purpose" },
            { num: 2, label: "Your Info" },
            { num: 3, label: "Pick Time" },
            { num: 4, label: "Confirm" }
          ].map((s, i) => (
            <div key={s.num} className="flex items-center flex-1">
              <div className="flex items-center">
                <div className={`size-10 rounded-full flex items-center justify-center font-semibold ${
                  step >= s.num ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-400'
                }`}>
                  {step > s.num ? <Check className="size-5" /> : s.num}
                </div>
                <div className="ml-3">
                  <div className={`text-sm font-medium ${step >= s.num ? 'text-gray-900' : 'text-gray-400'}`}>
                    {s.label}
                  </div>
                </div>
              </div>
              {i < 3 && (
                <div className={`flex-1 h-px mx-4 ${step > s.num ? 'bg-blue-600' : 'bg-gray-200'}`} />
              )}
            </div>
          ))}
        </div>

        {/* Step Content */}
        <div className="bg-white border rounded-2xl p-8 mb-6">
          {step === 1 && (
            <div>
              <h2 className="text-xl font-semibold mb-6">What brings you here?</h2>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setPurpose("buying")}
                  className={`p-8 border-2 rounded-xl hover:border-blue-600 transition-colors text-left ${
                    purpose === "buying" ? 'border-blue-600 bg-blue-50' : ''
                  }`}
                >
                  <div className="size-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <Home className="size-6 text-blue-600" />
                  </div>
                  <div className="font-semibold text-lg mb-2">Looking to Buy</div>
                  <div className="text-sm text-gray-600">
                    Find your dream home with Fahad's expertise
                  </div>
                </button>
                <button
                  onClick={() => setPurpose("selling")}
                  className={`p-8 border-2 rounded-xl hover:border-blue-600 transition-colors text-left ${
                    purpose === "selling" ? 'border-blue-600 bg-blue-50' : ''
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
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="(403) 555-0123"
                    className="mt-1.5"
                  />
                </div>
                {purpose === "selling" && (
                  <div>
                    <Label htmlFor="propertyAddress">Property Address</Label>
                    <Input
                      id="propertyAddress"
                      value={formData.propertyAddress}
                      onChange={(e) => setFormData({ ...formData, propertyAddress: e.target.value })}
                      placeholder="123 Main Street SW"
                      className="mt-1.5"
                    />
                  </div>
                )}
                <div>
                  <Label htmlFor="message">Message (Optional)</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell Fahad about your real estate needs..."
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
                    onSelect={setSelectedDate}
                    disabled={(date) => date < new Date()}
                    className="border rounded-lg"
                  />
                </div>
                <div>
                  <h3 className="text-sm font-medium mb-3">Select Time</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {availableTimes.map((time) => (
                      <button
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        className={`p-3 border rounded-lg text-sm hover:border-blue-600 transition-colors ${
                          selectedTime === time ? 'border-blue-600 bg-blue-50' : ''
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div>
              <div className="text-center py-8">
                <div className="size-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="size-8 text-green-600" />
                </div>
                <h2 className="text-2xl font-semibold mb-2">Appointment Confirmed!</h2>
                <p className="text-gray-600 mb-8">
                  Fahad will contact you shortly to confirm your appointment
                </p>
                
                <div className="bg-gray-50 rounded-xl p-6 max-w-md mx-auto text-left mb-6">
                  <h3 className="font-semibold mb-4">Appointment Details</h3>
                  <div className="space-y-3 text-sm">
                    <div>
                      <div className="text-gray-600">Purpose</div>
                      <div className="font-medium">
                        {purpose === "buying" ? "Looking to Buy" : "Looking to Sell"}
                      </div>
                    </div>
                    <div>
                      <div className="text-gray-600">Contact</div>
                      <div className="font-medium">{formData.name}</div>
                      <div className="text-gray-600 text-xs">{formData.email} • {formData.phone}</div>
                    </div>
                    {formData.propertyAddress && (
                      <div>
                        <div className="text-gray-600">Property</div>
                        <div className="font-medium">{formData.propertyAddress}</div>
                      </div>
                    )}
                    <div>
                      <div className="text-gray-600">Preferred Date & Time</div>
                      <div className="font-medium">
                        {selectedDate?.toLocaleDateString()} at {selectedTime}
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

        {/* Navigation */}
        {step < 4 && (
          <div className="flex justify-between">
            <Button 
              variant="outline"
              onClick={() => setStep(Math.max(1, step - 1))}
              disabled={step === 1}
            >
              Back
            </Button>
            <Button 
              onClick={() => setStep(step + 1)}
              disabled={!canProceed()}
            >
              {step === 3 ? "Confirm Appointment" : "Continue"}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}