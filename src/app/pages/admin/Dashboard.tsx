import { AdminLayout } from "../../components/AdminLayout";
import { Home, Calendar, Clock, AlertCircle, Star, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { kpiData, mockBookmarks, mockAppointments } from "../../data/mockData";
import { useState } from "react";
import { Link } from "react-router";

const topLinks = mockBookmarks.slice(0, 6);
const bookmarkedIds = ["1", "3", "5"];

const toggleBookmark = (id: string) => {
  // Mock toggle
};

export default function AdminDashboard() {
  const [dateRange, setDateRange] = useState("7d");

  return (
    <AdminLayout>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold mb-2">Dashboard</h1>
          <p className="text-gray-600">Overview of platform activity and performance</p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          <div className="border rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-blue-100 size-12 rounded-lg flex items-center justify-center">
                <Home className="size-6 text-blue-600" />
              </div>
              <Badge variant="outline">+12%</Badge>
            </div>
            <div className="text-3xl font-semibold mb-1">{kpiData.activeListings}</div>
            <div className="text-sm text-gray-600">Active Listings</div>
          </div>

          <div className="border rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-green-100 size-12 rounded-lg flex items-center justify-center">
                <AlertCircle className="size-6 text-green-600" />
              </div>
              <Badge variant="outline">New</Badge>
            </div>
            <div className="text-3xl font-semibold mb-1">{kpiData.newRequests}</div>
            <div className="text-sm text-gray-600">New Listing Requests</div>
          </div>

          <div className="border rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-purple-100 size-12 rounded-lg flex items-center justify-center">
                <Calendar className="size-6 text-purple-600" />
              </div>
              <Badge variant="outline">+8%</Badge>
            </div>
            <div className="text-3xl font-semibold mb-1">{kpiData.appointmentsBooked}</div>
            <div className="text-sm text-gray-600">Appointments Booked</div>
          </div>

          <div className="border rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-orange-100 size-12 rounded-lg flex items-center justify-center">
                <Clock className="size-6 text-orange-600" />
              </div>
              <Badge variant="default">Good</Badge>
            </div>
            <div className="text-3xl font-semibold mb-1">{kpiData.avgReviewTime}</div>
            <div className="text-sm text-gray-600">Avg Review Time</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 mb-8">
          {/* Calendar */}
          <div className="border rounded-xl overflow-hidden">
            <div className="bg-gray-50 p-4 border-b flex items-center justify-between">
              <h3 className="font-semibold">Appointments Calendar</h3>
              <Link to="/admin/appointments" className="text-sm text-blue-600 hover:text-blue-700">
                Manage all →
              </Link>
            </div>
            <div className="p-6">
              <div className="mb-4 flex items-center justify-between">
                <h4 className="font-medium">March 2026</h4>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon">
                    <ChevronLeft className="size-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <ChevronRight className="size-4" />
                  </Button>
                </div>
              </div>
              
              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-2">
                {/* Day Headers */}
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => (
                  <div key={day} className="text-center text-xs font-medium text-gray-600 pb-2">
                    {day}
                  </div>
                ))}
                
                {/* Calendar Days */}
                {Array.from({ length: 35 }, (_, i) => {
                  const dayNum = i - 5; // March 2026 starts on Sunday (index 0)
                  const isCurrentMonth = dayNum >= 1 && dayNum <= 31;
                  const date = isCurrentMonth ? `2026-03-${String(dayNum).padStart(2, '0')}` : null;
                  const dayAppointments = date ? mockAppointments.filter(apt => apt.date === date && apt.status === "scheduled") : [];
                  const isToday = dayNum === 2;
                  
                  return (
                    <div
                      key={i}
                      className={`aspect-square border rounded-lg p-1 text-center ${
                        !isCurrentMonth ? 'bg-gray-50 text-gray-300' : 'hover:bg-gray-50'
                      } ${isToday ? 'border-blue-600 bg-blue-50' : ''}`}
                    >
                      {isCurrentMonth && (
                        <>
                          <div className={`text-sm font-medium ${isToday ? 'text-blue-600' : ''}`}>
                            {dayNum}
                          </div>
                          {dayAppointments.length > 0 && (
                            <div className="mt-1">
                              <div className="w-1 h-1 bg-blue-600 rounded-full mx-auto"></div>
                              {dayAppointments.length > 1 && (
                                <div className="text-[10px] text-blue-600 font-medium">
                                  {dayAppointments.length}
                                </div>
                              )}
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
              
              {/* Upcoming Appointments */}
              <div className="mt-4 pt-4 border-t">
                <div className="text-sm font-medium mb-2">Upcoming This Week</div>
                <div className="space-y-2">
                  {mockAppointments
                    .filter(apt => apt.status === "scheduled")
                    .slice(0, 3)
                    .map(apt => (
                      <div key={apt.id} className="text-xs flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Calendar className="size-3 text-blue-600" />
                          <span className="text-gray-600">
                            {new Date(apt.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                          </span>
                          <span className="text-gray-400">•</span>
                          <span className="text-gray-900 font-medium truncate max-w-[120px]">
                            {apt.clientName}
                          </span>
                        </div>
                        <span className="text-gray-600">{apt.time}</span>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="border rounded-xl overflow-hidden">
            <div className="bg-gray-50 p-4 border-b flex items-center justify-between">
              <h3 className="font-semibold">Quick Links</h3>
              <a href="/admin/bookmarks" className="text-sm text-blue-600 hover:text-blue-700">
                View all →
              </a>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 gap-3">
                {topLinks.map((bookmark) => {
                  const isStarred = bookmarkedIds.includes(bookmark.id);
                  return (
                    <a
                      key={bookmark.id}
                      href={bookmark.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group border rounded-lg p-3 hover:bg-gray-50 transition-colors flex items-start justify-between gap-2"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <div className="font-medium text-sm truncate">{bookmark.name}</div>
                          <ExternalLink className="size-3 text-gray-400 group-hover:text-gray-600 flex-shrink-0" />
                        </div>
                        <div className="text-xs text-gray-500 truncate">{bookmark.group}</div>
                      </div>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          toggleBookmark(bookmark.id);
                        }}
                        className="flex-shrink-0 mt-0.5"
                      >
                        <Star
                          className={`size-4 transition-colors ${
                            isStarred
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-gray-300 hover:text-gray-400'
                          }`}
                        />
                      </button>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Today's Work Queue */}
        <div className="border rounded-xl overflow-hidden">
          <div className="bg-gray-50 p-4 border-b">
            <h3 className="font-semibold">Today's Work Queue</h3>
          </div>
          <div className="divide-y">
            <div className="p-4 flex items-center justify-between hover:bg-gray-50">
              <div className="flex items-center gap-4">
                <div className="bg-orange-100 size-10 rounded-lg flex items-center justify-center">
                  <AlertCircle className="size-5 text-orange-600" />
                </div>
                <div>
                  <div className="font-medium mb-1">Pending Listing Approvals</div>
                  <div className="text-sm text-gray-600">8 listings need review</div>
                </div>
              </div>
              <Button size="sm">Review</Button>
            </div>

            <div className="p-4 flex items-center justify-between hover:bg-gray-50">
              <div className="flex items-center gap-4">
                <div className="bg-blue-100 size-10 rounded-lg flex items-center justify-center">
                  <AlertCircle className="size-5 text-blue-600" />
                </div>
                <div>
                  <div className="font-medium mb-1">Pending Viewing Requests</div>
                  <div className="text-sm text-gray-600">4 appointments need confirmation</div>
                </div>
              </div>
              <Button size="sm">Review</Button>
            </div>

            <div className="p-4 flex items-center justify-between hover:bg-gray-50">
              <div className="flex items-center gap-4">
                <div className="bg-red-100 size-10 rounded-lg flex items-center justify-center">
                  <AlertCircle className="size-5 text-red-600" />
                </div>
                <div>
                  <div className="font-medium mb-1">Flagged Listings</div>
                  <div className="text-sm text-gray-600">2 listings reported for review</div>
                </div>
              </div>
              <Button size="sm">Investigate</Button>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
