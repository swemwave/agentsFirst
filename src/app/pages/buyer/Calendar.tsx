import { useEffect, useState } from "react";
import { Link } from "react-router";
import {
  ArrowLeft,
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Clock,
} from "lucide-react";
import { useAuth } from "../../auth/AuthContext";
import {
  compareAppointments,
  formatDateKey,
  type AppointmentRecord,
} from "../../appointments/types";
import { subscribeToUserAppointments } from "../../lib/appointments";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { BuyerHeader } from "../../components/BuyerHeader";
import { Container } from "../../components/Container";

function startOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function addMonths(date: Date, months: number) {
  return new Date(date.getFullYear(), date.getMonth() + months, 1);
}

function isSameDay(left: Date, right: Date) {
  return (
    left.getFullYear() === right.getFullYear() &&
    left.getMonth() === right.getMonth() &&
    left.getDate() === right.getDate()
  );
}

function getAppointmentLabel(appointment: AppointmentRecord) {
  if (appointment.propertyAddress) {
    return appointment.propertyAddress;
  }

  return appointment.purpose === "selling"
    ? "Selling consultation"
    : "Buying consultation";
}

export default function Calendar() {
  const { configError, profile } = useAuth();
  const [viewMode, setViewMode] = useState<"month" | "list">("month");
  const [appointments, setAppointments] = useState<AppointmentRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentMonth, setCurrentMonth] = useState(() => startOfMonth(new Date()));

  useEffect(() => {
    if (configError || !profile) {
      setAppointments([]);
      setLoading(false);
      return undefined;
    }

    const unsubscribe = subscribeToUserAppointments(profile.uid, (nextAppointments) => {
      setAppointments(nextAppointments.sort(compareAppointments));
      setLoading(false);
    });

    return unsubscribe;
  }, [configError, profile]);

  const upcomingAppointments = appointments.filter(
    (appointment) => appointment.status === "scheduled",
  );
  const pastAppointments = appointments.filter(
    (appointment) => appointment.status === "completed",
  );
  const today = new Date();
  const firstVisibleDate = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
    1 - currentMonth.getDay(),
  );
  const calendarDays = Array.from({ length: 42 }, (_, index) => {
    const date = new Date(
      firstVisibleDate.getFullYear(),
      firstVisibleDate.getMonth(),
      firstVisibleDate.getDate() + index,
    );

    return {
      date,
      dateKey: formatDateKey(date),
      isCurrentMonth:
        date.getMonth() === currentMonth.getMonth() &&
        date.getFullYear() === currentMonth.getFullYear(),
      isToday: isSameDay(date, today),
    };
  });

  return (
    <div className="h-screen overflow-auto bg-white">
      <BuyerHeader showSearch={false} />

      <Container className="py-4">
        <Link
          to="/search"
          className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="size-4" />
          Back to search
        </Link>
      </Container>

      <Container className="py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-semibold mb-2">My Calendar</h1>
            <p className="text-gray-600">
              {loading
                ? "Loading appointments..."
                : upcomingAppointments.length > 0
                  ? `${upcomingAppointments.length} upcoming appointment${
                      upcomingAppointments.length === 1 ? "" : "s"
                    }`
                  : "No upcoming appointments yet"}
            </p>
          </div>

          <div className="flex gap-2">
            <Button
              variant={viewMode === "month" ? "default" : "outline"}
              onClick={() => setViewMode("month")}
            >
              Month View
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              onClick={() => setViewMode("list")}
            >
              List View
            </Button>
          </div>
        </div>

        <div className="flex gap-2 mb-6">
          <Badge variant="outline" className="cursor-pointer hover:bg-gray-50">
            All
          </Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-gray-50">
            Viewings
          </Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-gray-50">
            Meetings
          </Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-gray-50">
            Possession Dates
          </Badge>
        </div>

        {viewMode === "month" ? (
          <div className="border rounded-2xl overflow-hidden">
            <div className="bg-gray-50 p-4 flex items-center justify-between border-b">
              <div className="flex items-center gap-3">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setCurrentMonth((month) => addMonths(month, -1))}
                >
                  <ChevronLeft className="size-5" />
                </Button>
                <div className="font-semibold">
                  {currentMonth.toLocaleDateString("en-US", {
                    month: "long",
                    year: "numeric",
                  })}
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setCurrentMonth((month) => addMonths(month, 1))}
                >
                  <ChevronRight className="size-5" />
                </Button>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentMonth(startOfMonth(new Date()))}
                >
                  Today
                </Button>
                <Link to="/appointments/new">
                  <Button size="sm">Book Appointment</Button>
                </Link>
              </div>
            </div>

            <div className="p-4">
              <div className="grid grid-cols-7 gap-px mb-px">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                  <div
                    key={day}
                    className="text-center text-sm font-medium text-gray-600 p-3"
                  >
                    {day}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-px bg-gray-200">
                {calendarDays.map(({ date, dateKey, isCurrentMonth, isToday }) => {
                  const dayAppointments = upcomingAppointments.filter(
                    (appointment) => appointment.dateKey === dateKey,
                  );

                  return (
                    <div
                      key={dateKey}
                      className={`bg-white p-3 min-h-24 ${
                        !isCurrentMonth ? "text-gray-300" : ""
                      } ${dayAppointments.length > 0 ? "bg-blue-50" : ""}`}
                    >
                      <div
                        className={`text-sm mb-1 inline-flex size-7 items-center justify-center rounded-full ${
                          isToday && isCurrentMonth
                            ? "bg-blue-600 text-white"
                            : ""
                        }`}
                      >
                        {date.getDate()}
                      </div>
                      {dayAppointments.slice(0, 2).map((appointment) => (
                        <div
                          key={appointment.id}
                          className="text-xs bg-blue-600 text-white rounded px-2 py-1 mb-1 truncate"
                        >
                          {appointment.timeLabel}
                        </div>
                      ))}
                    </div>
                  );
                })}
              </div>

              {upcomingAppointments.length === 0 && !loading && (
                <div className="border rounded-xl bg-gray-50 px-4 py-8 text-center mt-4">
                  <CalendarIcon className="size-10 mx-auto text-gray-400 mb-3" />
                  <h3 className="font-semibold mb-2">No appointments on your calendar</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Scheduled appointments will appear here once they are booked.
                  </p>
                  <Link to="/appointments/new">
                    <Button>Book Appointment</Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="border rounded-2xl overflow-hidden">
              <div className="bg-gray-50 p-4 border-b">
                <h3 className="font-semibold">Upcoming Appointments</h3>
              </div>

              {upcomingAppointments.length === 0 ? (
                <div className="p-10 text-center">
                  <Clock className="size-10 mx-auto text-gray-400 mb-3" />
                  <h4 className="font-semibold mb-2">No upcoming appointments</h4>
                  <p className="text-sm text-gray-600 mb-4">
                    You do not have any scheduled appointments yet.
                  </p>
                  <Link to="/appointments/new">
                    <Button size="sm">Book Appointment</Button>
                  </Link>
                </div>
              ) : (
                <div className="divide-y">
                  {upcomingAppointments.map((appointment) => (
                    <div key={appointment.id} className="p-6 hover:bg-gray-50 transition-colors">
                      <div className="flex items-start justify-between">
                        <div className="flex gap-4">
                          <div className="bg-blue-100 rounded-lg p-3 text-center">
                            <div className="text-sm font-medium text-blue-900">
                              {new Date(`${appointment.dateKey}T12:00:00`).toLocaleDateString(
                                "en-US",
                                { month: "short" },
                              )}
                            </div>
                            <div className="text-2xl font-semibold text-blue-900">
                              {new Date(`${appointment.dateKey}T12:00:00`).getDate()}
                            </div>
                          </div>
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <Badge variant="outline" className="capitalize">
                                {appointment.purpose}
                              </Badge>
                              <span className="text-sm text-gray-600">
                                {appointment.timeLabel}
                              </span>
                            </div>
                            <h4 className="font-semibold mb-1">
                              {getAppointmentLabel(appointment)}
                            </h4>
                            <div className="text-sm text-gray-600">
                              with {appointment.agentName}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="border rounded-2xl overflow-hidden">
              <div className="bg-gray-50 p-4 border-b">
                <h3 className="font-semibold">Past Appointments</h3>
              </div>

              {pastAppointments.length === 0 ? (
                <div className="p-8 text-center text-sm text-gray-600">
                  No past appointments yet.
                </div>
              ) : (
                <div className="divide-y">
                  {pastAppointments.map((appointment) => (
                    <div key={appointment.id} className="p-6 opacity-60">
                      <div className="flex items-start justify-between">
                        <div className="flex gap-4">
                          <div className="bg-gray-100 rounded-lg p-3 text-center">
                            <div className="text-sm font-medium text-gray-600">
                              {new Date(`${appointment.dateKey}T12:00:00`).toLocaleDateString(
                                "en-US",
                                { month: "short" },
                              )}
                            </div>
                            <div className="text-2xl font-semibold text-gray-600">
                              {new Date(`${appointment.dateKey}T12:00:00`).getDate()}
                            </div>
                          </div>
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <Badge variant="outline" className="capitalize">
                                {appointment.purpose}
                              </Badge>
                              <Badge variant="secondary">Completed</Badge>
                            </div>
                            <h4 className="font-semibold mb-1">
                              {getAppointmentLabel(appointment)}
                            </h4>
                            <div className="text-sm text-gray-600">
                              with {appointment.agentName}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </Container>
    </div>
  );
}
