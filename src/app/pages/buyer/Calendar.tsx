import { Link } from "react-router";
import { useState } from "react";
import { ArrowLeft, Calendar as CalendarIcon, Clock, ChevronLeft, ChevronRight } from "lucide-react";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { mockAppointments } from "../../data/mockData";
import { BuyerHeader } from "../../components/BuyerHeader";
import { Container } from "../../components/Container";

export default function Calendar() {
  const [viewMode, setViewMode] = useState<"month" | "list">("month");
  const [currentMonth] = useState(new Date(2026, 2, 1)); // March 2026

  return (
    <div className="h-screen overflow-auto bg-white">
      <BuyerHeader showSearch={false} />

      <Container className="py-4">
        <Link to="/search" className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900">
          <ArrowLeft className="size-4" />
          Back to search
        </Link>
      </Container>

      <Container className="py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-semibold mb-2">My Calendar</h1>
            <p className="text-gray-600">{mockAppointments.length} upcoming appointments</p>
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

        {/* Filter Chips */}
        <div className="flex gap-2 mb-6">
          <Badge variant="outline" className="cursor-pointer hover:bg-gray-50">All</Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-gray-50">Viewings</Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-gray-50">Meetings</Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-gray-50">Possession Dates</Badge>
        </div>

        {viewMode === "month" ? (
          <div className="border rounded-2xl overflow-hidden">
            {/* Calendar Header */}
            <div className="bg-gray-50 p-4 flex items-center justify-between border-b">
              <div className="flex items-center gap-3">
                <Button variant="ghost" size="icon">
                  <ChevronLeft className="size-5" />
                </Button>
                <div className="font-semibold">
                  {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </div>
                <Button variant="ghost" size="icon">
                  <ChevronRight className="size-5" />
                </Button>
              </div>
              <Link to="/appointments/new">
                <Button size="sm">Schedule Viewing</Button>
              </Link>
            </div>

            {/* Calendar Grid */}
            <div className="p-4">
              <div className="grid grid-cols-7 gap-px mb-px">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} className="text-center text-sm font-medium text-gray-600 p-3">
                    {day}
                  </div>
                ))}
              </div>
              
              <div className="grid grid-cols-7 gap-px bg-gray-200">
                {Array.from({ length: 35 }, (_, i) => {
                  const dayNum = i - 1; // Starting from Sunday, March 2 is day 1
                  const isCurrentMonth = dayNum >= 0 && dayNum < 31;
                  const date = dayNum + 1;
                  
                  // Check if there are appointments on this day
                  const hasAppointment = isCurrentMonth && mockAppointments.some(apt => {
                    const aptDate = new Date(apt.date).getDate();
                    return aptDate === date;
                  });

                  return (
                    <div 
                      key={i} 
                      className={`bg-white p-3 min-h-24 ${
                        !isCurrentMonth ? 'text-gray-300' : ''
                      } ${hasAppointment ? 'bg-blue-50' : ''}`}
                    >
                      <div className="text-sm mb-1">{isCurrentMonth ? date : ''}</div>
                      {hasAppointment && (
                        <div className="text-xs bg-blue-600 text-white rounded px-2 py-1">
                          {mockAppointments.find(apt => new Date(apt.date).getDate() === date)?.time}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="border rounded-2xl overflow-hidden">
              <div className="bg-gray-50 p-4 border-b">
                <h3 className="font-semibold">Upcoming Appointments</h3>
              </div>
              
              <div className="divide-y">
                {mockAppointments.map((appointment) => (
                  <div key={appointment.id} className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex gap-4">
                        <div className="bg-blue-100 rounded-lg p-3 text-center">
                          <div className="text-sm font-medium text-blue-900">
                            {new Date(appointment.date).toLocaleDateString('en-US', { month: 'short' })}
                          </div>
                          <div className="text-2xl font-semibold text-blue-900">
                            {new Date(appointment.date).getDate()}
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <Badge variant="outline" className="capitalize">
                              {appointment.type}
                            </Badge>
                            <span className="text-sm text-gray-600">{appointment.time}</span>
                          </div>
                          <h4 className="font-semibold mb-1">{appointment.listingAddress}</h4>
                          <div className="text-sm text-gray-600">
                            with {appointment.agentName}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">Reschedule</Button>
                        <Button variant="ghost" size="sm">Cancel</Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Past Appointments */}
            <div className="border rounded-2xl overflow-hidden">
              <div className="bg-gray-50 p-4 border-b">
                <h3 className="font-semibold">Past Appointments</h3>
              </div>
              
              <div className="divide-y">
                {mockAppointments.filter(a => a.status === "completed").map((appointment) => (
                  <div key={appointment.id} className="p-6 opacity-60">
                    <div className="flex items-start justify-between">
                      <div className="flex gap-4">
                        <div className="bg-gray-100 rounded-lg p-3 text-center">
                          <div className="text-sm font-medium text-gray-600">
                            {new Date(appointment.date).toLocaleDateString('en-US', { month: 'short' })}
                          </div>
                          <div className="text-2xl font-semibold text-gray-600">
                            {new Date(appointment.date).getDate()}
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <Badge variant="outline" className="capitalize">
                              {appointment.type}
                            </Badge>
                            <Badge variant="secondary">Completed</Badge>
                          </div>
                          <h4 className="font-semibold mb-1">{appointment.listingAddress}</h4>
                          <div className="text-sm text-gray-600">
                            with {appointment.agentName}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
}