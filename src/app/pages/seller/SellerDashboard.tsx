import { Link } from "react-router";
import { ArrowLeft, Eye, Heart, CheckCircle, Calendar, Home, AlertCircle } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";

export default function SellerDashboard() {
  const showings = [
    { id: "1", date: "2026-03-05", time: "2:00 PM", buyerName: "John Smith", status: "confirmed" },
    { id: "2", date: "2026-03-06", time: "10:00 AM", buyerName: "Emily Davis", status: "pending" },
    { id: "3", date: "2026-03-07", time: "4:00 PM", buyerName: "Robert Wilson", status: "confirmed" },
  ];

  return (
    <div className="h-screen overflow-auto bg-gray-50">
      {/* Top Bar */}
      <div className="border-b px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900">
            <ArrowLeft className="size-4" />
            Back to home
          </Link>
          <Link to="/" className="text-xl font-semibold">FinditWithFahad</Link>
          <div className="w-24" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold mb-2">Seller Dashboard</h1>
          <p className="text-gray-600">Manage your property listing and viewings</p>
        </div>

        {/* Status Cards */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          <div className="border rounded-xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <Eye className="size-5 text-orange-600" />
              <Badge variant="outline">In Progress</Badge>
            </div>
            <h3 className="font-semibold mb-1">Request Submitted</h3>
            <p className="text-sm text-gray-600">Awaiting agent review</p>
          </div>

          <div className="border rounded-xl p-6 opacity-50">
            <div className="flex items-center gap-3 mb-2">
              <Heart className="size-5 text-blue-600" />
              <Badge variant="outline">Pending</Badge>
            </div>
            <h3 className="font-semibold mb-1">Info Needed</h3>
            <p className="text-sm text-gray-600">Additional details required</p>
          </div>

          <div className="border rounded-xl p-6 opacity-50">
            <div className="flex items-center gap-3 mb-2">
              <CheckCircle className="size-5 text-green-600" />
              <Badge variant="default">Active</Badge>
            </div>
            <h3 className="font-semibold mb-1">Live Listing</h3>
            <p className="text-sm text-gray-600">Your property is live</p>
          </div>

          <div className="border rounded-xl p-6 opacity-50">
            <div className="flex items-center gap-3 mb-2">
              <Calendar className="size-5 text-purple-600" />
              <Badge variant="outline">Upcoming</Badge>
            </div>
            <h3 className="font-semibold mb-1">Showings Scheduled</h3>
            <p className="text-sm text-gray-600">Viewings booked</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="col-span-2 space-y-6">
            {/* Listing Status */}
            <div className="border rounded-xl overflow-hidden">
              <div className="bg-gray-50 p-4 border-b">
                <h2 className="font-semibold">Your Listing</h2>
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Home className="size-5 text-gray-400" />
                      <Badge variant="outline">Pending Review</Badge>
                    </div>
                    <h3 className="text-xl font-semibold mb-1">123 Main Street SW</h3>
                    <p className="text-gray-600">Calgary, AB T2P 1J9</p>
                  </div>
                  <Link to="/list-home">
                    <Button variant="outline" size="sm">Edit Details</Button>
                  </Link>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex gap-3">
                    <AlertCircle className="size-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium text-blue-900 mb-1">
                        Agent Review in Progress
                      </div>
                      <p className="text-sm text-blue-800">
                        Sarah Johnson is reviewing your listing request. You should hear back within 24 hours.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t">
                  <h4 className="font-medium mb-3">Property Details</h4>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <div className="text-gray-600 mb-1">Type</div>
                      <div className="font-medium">Single Family</div>
                    </div>
                    <div>
                      <div className="text-gray-600 mb-1">Bedrooms</div>
                      <div className="font-medium">4</div>
                    </div>
                    <div>
                      <div className="text-gray-600 mb-1">Bathrooms</div>
                      <div className="font-medium">3</div>
                    </div>
                    <div>
                      <div className="text-gray-600 mb-1">Square Feet</div>
                      <div className="font-medium">2,400</div>
                    </div>
                    <div>
                      <div className="text-gray-600 mb-1">Submitted</div>
                      <div className="font-medium">Mar 1, 2026</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Showings Schedule */}
            <div className="border rounded-xl overflow-hidden">
              <div className="bg-gray-50 p-4 border-b flex items-center justify-between">
                <h2 className="font-semibold">Upcoming Showings</h2>
                <Button size="sm" variant="outline">Update Availability</Button>
              </div>
              <div className="divide-y">
                {showings.map((showing) => (
                  <div key={showing.id} className="p-4 flex items-center justify-between hover:bg-gray-50">
                    <div className="flex gap-4">
                      <div className="bg-blue-100 rounded-lg p-3 text-center min-w-16">
                        <div className="text-xs font-medium text-blue-900">
                          {new Date(showing.date).toLocaleDateString('en-US', { month: 'short' })}
                        </div>
                        <div className="text-xl font-semibold text-blue-900">
                          {new Date(showing.date).getDate()}
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium">{showing.time}</span>
                          <Badge variant={showing.status === "confirmed" ? "default" : "outline"}>
                            {showing.status}
                          </Badge>
                        </div>
                        <div className="text-sm text-gray-600">
                          Viewing with {showing.buyerName}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {showing.status === "pending" && (
                        <>
                          <Button size="sm" variant="outline">Confirm</Button>
                          <Button size="sm" variant="ghost">Decline</Button>
                        </>
                      )}
                      {showing.status === "confirmed" && (
                        <Button size="sm" variant="ghost">Cancel</Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Your Agent */}
            <div className="border rounded-xl p-6">
              <h3 className="font-semibold mb-4">Your Agent</h3>
              <div className="mb-4">
                <div className="font-medium mb-1">Sarah Johnson</div>
                <div className="text-sm text-gray-600">Senior Real Estate Agent</div>
              </div>
              <div className="space-y-2">
                <Button variant="outline" className="w-full" size="sm">
                  Schedule Call
                </Button>
              </div>
            </div>

            {/* Quick Stats (when live) */}
            <div className="border rounded-xl p-6 opacity-50">
              <h3 className="font-semibold mb-4">Listing Performance</h3>
              <div className="space-y-3">
                <div>
                  <div className="text-sm text-gray-600 mb-1">Total Views</div>
                  <div className="text-2xl font-semibold">—</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-1">Saved by</div>
                  <div className="text-2xl font-semibold">—</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-1">Inquiries</div>
                  <div className="text-2xl font-semibold">—</div>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-4">
                Stats will appear once your listing is live
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
