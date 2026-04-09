import { useState } from "react";
import { AdminLayout } from "../../components/AdminLayout";
import { Search, Calendar, Clock, MapPin, User, Check, X, RefreshCw, Home, Phone } from "lucide-react";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";
import { mockAppointments, mockListings } from "../../data/mockData";

export default function AdminAppointments() {
  const [selectedAppointment, setSelectedAppointment] = useState<string | null>(null);
  const selected = mockAppointments.find(a => a.id === selectedAppointment);
  const selectedListing = selected ? mockListings.find(l => l.id === selected.listingId) : null;

  return (
    <AdminLayout>
      <div className="flex h-full">
        {/* Main Table */}
        <div className="flex-1 flex flex-col">
          <div className="p-6 border-b">
            <h1 className="text-2xl font-semibold mb-4">Manage Appointments</h1>
            
            {/* Filters */}
            <div className="flex gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                <Input placeholder="Search appointments..." className="pl-10" />
              </div>
              
              <Select defaultValue="all">
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>

              <Select defaultValue="all-type">
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-type">All Types</SelectItem>
                  <SelectItem value="viewing">Viewing</SelectItem>
                  <SelectItem value="meeting">Meeting</SelectItem>
                  <SelectItem value="possession">Possession</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex-1 overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Status</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Property</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockAppointments.map((appointment) => (
                  <TableRow 
                    key={appointment.id}
                    className={`cursor-pointer ${selectedAppointment === appointment.id ? 'bg-blue-50' : ''}`}
                    onClick={() => setSelectedAppointment(appointment.id)}
                  >
                    <TableCell>
                      <Badge 
                        variant={
                          appointment.status === "scheduled" ? "default" : 
                          appointment.status === "completed" ? "secondary" : 
                          "destructive"
                        }
                      >
                        {appointment.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">{appointment.clientName}</div>
                      <div className="text-sm text-gray-600">{appointment.clientEmail}</div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">{appointment.listingAddress}</div>
                    </TableCell>
                    <TableCell>
                      {new Date(appointment.date).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </TableCell>
                    <TableCell>{appointment.time}</TableCell>
                    <TableCell className="capitalize">{appointment.type}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex gap-1 justify-end">
                        {appointment.status === "scheduled" && (
                          <>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={(e) => {
                                e.stopPropagation();
                                // Complete appointment
                              }}
                            >
                              <Check className="size-4 text-green-600" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={(e) => {
                                e.stopPropagation();
                                // Reschedule appointment
                              }}
                            >
                              <RefreshCw className="size-4 text-blue-600" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={(e) => {
                                e.stopPropagation();
                                // Cancel appointment
                              }}
                            >
                              <X className="size-4 text-red-600" />
                            </Button>
                          </>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Right Drawer */}
        {selectedAppointment && selected && (
          <div className="w-96 border-l flex flex-col">
            <div className="p-4 border-b flex items-center justify-between">
              <h3 className="font-semibold">Appointment Details</h3>
              <Button variant="ghost" size="icon" onClick={() => setSelectedAppointment(null)}>
                <X className="size-4" />
              </Button>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              <div className="space-y-4">
                {/* Status Badge */}
                <div>
                  <Badge 
                    variant={
                      selected.status === "scheduled" ? "default" : 
                      selected.status === "completed" ? "secondary" : 
                      "destructive"
                    }
                    className="text-base px-3 py-1"
                  >
                    {selected.status}
                  </Badge>
                </div>

                {/* Client Info */}
                <div>
                  <div className="text-sm text-gray-600 mb-2 flex items-center gap-2">
                    <User className="size-4" />
                    Client Information
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="font-medium mb-1">{selected.clientName}</div>
                    <div className="text-sm text-gray-600">{selected.clientEmail}</div>
                    <div className="text-sm text-gray-600">{selected.clientPhone}</div>
                  </div>
                </div>

                {/* Date & Time */}
                <div>
                  <div className="text-sm text-gray-600 mb-2 flex items-center gap-2">
                    <Calendar className="size-4" />
                    Date & Time
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="font-medium mb-1">
                      {new Date(selected.date).toLocaleDateString('en-US', { 
                        weekday: 'long',
                        month: 'long', 
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </div>
                    <div className="text-sm text-gray-600 flex items-center gap-1">
                      <Clock className="size-3" />
                      {selected.time}
                    </div>
                  </div>
                </div>

                {/* Type */}
                <div>
                  <div className="text-sm text-gray-600 mb-1">Appointment Type</div>
                  <div className="font-medium capitalize">{selected.type}</div>
                </div>

                {/* Property Info */}
                {selectedListing && (
                  <div>
                    <div className="text-sm text-gray-600 mb-2 flex items-center gap-2">
                      <Home className="size-4" />
                      Property
                    </div>
                    <div className="border rounded-lg overflow-hidden">
                      <img 
                        src={selectedListing.images[0]} 
                        alt={selectedListing.address}
                        className="w-full h-32 object-cover"
                      />
                      <div className="p-3">
                        <div className="font-medium mb-1">{selectedListing.address}</div>
                        <div className="text-sm text-gray-600 mb-2">{selectedListing.community}</div>
                        <div className="text-lg font-semibold">${selectedListing.price.toLocaleString()}</div>
                        <div className="text-sm text-gray-600 mt-1">
                          {selectedListing.beds} bd • {selectedListing.baths} ba • {selectedListing.sqft.toLocaleString()} sqft
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Agent */}
                <div>
                  <div className="text-sm text-gray-600 mb-1">Agent</div>
                  <div className="font-medium">{selected.agentName}</div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="p-4 border-t space-y-2">
              {selected.status === "scheduled" && (
                <>
                  <Button className="w-full">
                    <Check className="size-4 mr-2" />
                    Mark as Completed
                  </Button>
                  <Button variant="outline" className="w-full">
                    <RefreshCw className="size-4 mr-2" />
                    Reschedule
                  </Button>
                  <Button variant="outline" className="w-full text-red-600 hover:text-red-700">
                    <X className="size-4 mr-2" />
                    Cancel Appointment
                  </Button>
                </>
              )}
              {selected.status === "cancelled" && (
                <Button variant="outline" className="w-full">
                  <RefreshCw className="size-4 mr-2" />
                  Reschedule
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}