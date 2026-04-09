import { AdminLayout } from "../../components/AdminLayout";
import { Link } from "react-router";
import { ArrowLeft, Mail, Phone, MapPin, Home, DollarSign, Calendar, Heart, Eye, FileText, CheckCircle, Clock } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { mockListings } from "../../data/mockData";

const buyerProfile = {
  id: "u1",
  name: "John Smith",
  email: "john.smith@email.com",
  phone: "(403) 555-0123",
  joinDate: "2025-11-15",
  status: "active",
  profileImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
  
  preferences: {
    priceRange: { min: 400000, max: 750000 },
    propertyTypes: ["Single Family", "Townhouse"],
    neighborhoods: ["Kensington", "Beltline", "Mission", "Bridgeland"],
    minBeds: 3,
    minBaths: 2,
    mustHaves: ["Garage", "Updated Kitchen", "Hardwood Floors"],
    niceToHaves: ["Finished Basement", "Backyard", "Close to Transit"],
  },
  
  financials: {
    preApproved: true,
    preApprovalAmount: 750000,
    lender: "TD Bank",
    approvalDate: "2026-01-15",
    downPayment: 150000,
  },
  
  timeline: {
    urgency: "moderate",
    targetMoveDate: "2026-06-01",
    currentSituation: "Currently renting, lease ends May 31",
  },
  
  activity: {
    totalViews: 47,
    savedProperties: 8,
    scheduledViewings: 3,
    completedViewings: 12,
    lastActive: "2026-03-02T15:30:00",
  },
  
  notes: [
    {
      id: "n1",
      date: "2026-03-01",
      author: "Fahad",
      note: "Client is very motivated. Pre-approved and ready to make an offer on the right property. Prefers move-in ready homes.",
    },
    {
      id: "n2",
      date: "2026-02-25",
      author: "Fahad",
      note: "Showed 2345 Elbow Drive - loved the kitchen and layout. Concerned about the price being above assessed value. Following up with comparable sales.",
    },
    {
      id: "n3",
      date: "2026-02-18",
      author: "Fahad",
      note: "First meeting completed. Client is a first-time buyer, needs guidance through the process. Sent buyer's guide and mortgage pre-approval checklist.",
    },
  ],
  
  savedProperties: ["1", "2", "6"],
  viewingHistory: [
    { listingId: "1", address: "2345 Elbow Drive SW", date: "2026-02-25", feedback: "Loved it, but price is a concern" },
    { listingId: "3", address: "567 Mission Road SW", date: "2026-02-20", feedback: "Too expensive" },
    { listingId: "2", address: "1234 Kensington Road NW", date: "2026-02-15", feedback: "Great location, considering" },
  ],
};

export default function BuyerProfile() {
  const savedListings = mockListings.filter(l => buyerProfile.savedProperties.includes(l.id));

  return (
    <AdminLayout>
      <div className="p-6">
        {/* Header */}
        <div className="mb-6">
          <Link to="/admin/users" className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-4">
            <ArrowLeft className="size-4" />
            Back to Users
          </Link>
          
          <div className="flex items-start gap-6">
            <div className="size-24 rounded-full bg-gray-200 overflow-hidden">
              <img src={buyerProfile.profileImage} alt={buyerProfile.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h1 className="text-2xl font-semibold mb-1">{buyerProfile.name}</h1>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1.5">
                      <Mail className="size-4" />
                      {buyerProfile.email}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Phone className="size-4" />
                      {buyerProfile.phone}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    <CheckCircle className="size-3 mr-1" />
                    Pre-Approved
                  </Badge>
                  <Badge variant="outline">Active Buyer</Badge>
                </div>
              </div>
              
              {/* Quick Stats */}
              <div className="grid grid-cols-4 gap-4 mt-4">
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="text-2xl font-semibold mb-1">{buyerProfile.activity.savedProperties}</div>
                  <div className="text-sm text-gray-600">Saved Properties</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="text-2xl font-semibold mb-1">{buyerProfile.activity.completedViewings}</div>
                  <div className="text-sm text-gray-600">Viewings Done</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="text-2xl font-semibold mb-1">{buyerProfile.activity.scheduledViewings}</div>
                  <div className="text-sm text-gray-600">Upcoming</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="text-2xl font-semibold mb-1">${(buyerProfile.financials.preApprovalAmount / 1000).toFixed(0)}K</div>
                  <div className="text-sm text-gray-600">Budget</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="overview">
          <TabsList className="mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="notes">Notes</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              {/* Financial Information */}
              <div className="border rounded-xl overflow-hidden">
                <div className="bg-gray-50 p-4 border-b">
                  <h3 className="font-semibold flex items-center gap-2">
                    <DollarSign className="size-4" />
                    Financial Information
                  </h3>
                </div>
                <div className="p-6 space-y-4">
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Pre-Approval Status</div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="size-4 text-green-600" />
                      <span className="font-medium">Pre-Approved</span>
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Pre-Approval Amount</div>
                    <div className="font-medium">${buyerProfile.financials.preApprovalAmount.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Down Payment</div>
                    <div className="font-medium">${buyerProfile.financials.downPayment.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Lender</div>
                    <div className="font-medium">{buyerProfile.financials.lender}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Approval Date</div>
                    <div className="font-medium">{new Date(buyerProfile.financials.approvalDate).toLocaleDateString()}</div>
                  </div>
                </div>
              </div>

              {/* Timeline */}
              <div className="border rounded-xl overflow-hidden">
                <div className="bg-gray-50 p-4 border-b">
                  <h3 className="font-semibold flex items-center gap-2">
                    <Calendar className="size-4" />
                    Timeline & Urgency
                  </h3>
                </div>
                <div className="p-6 space-y-4">
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Urgency Level</div>
                    <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                      <Clock className="size-3 mr-1" />
                      {buyerProfile.timeline.urgency.charAt(0).toUpperCase() + buyerProfile.timeline.urgency.slice(1)}
                    </Badge>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Target Move Date</div>
                    <div className="font-medium">{new Date(buyerProfile.timeline.targetMoveDate).toLocaleDateString()}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Current Situation</div>
                    <div className="font-medium">{buyerProfile.timeline.currentSituation}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Time to Target Date</div>
                    <div className="font-medium">~3 months</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Saved Properties */}
            <div className="border rounded-xl overflow-hidden">
              <div className="bg-gray-50 p-4 border-b">
                <h3 className="font-semibold flex items-center gap-2">
                  <Heart className="size-4" />
                  Saved Properties ({savedListings.length})
                </h3>
              </div>
              <div className="p-6">
                <div className="space-y-3">
                  {savedListings.map((listing) => (
                    <div key={listing.id} className="flex items-center gap-4 border rounded-lg p-4">
                      <div className="size-20 rounded-lg bg-gray-100 overflow-hidden">
                        <img src={listing.images[0]} alt={listing.address} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium mb-1">{listing.address}</div>
                        <div className="text-sm text-gray-600 mb-1">${listing.price.toLocaleString()}</div>
                        <div className="text-sm text-gray-500">
                          {listing.beds} beds • {listing.baths} baths • {listing.sqft.toLocaleString()} sqft
                        </div>
                      </div>
                      <Button variant="outline" size="sm">View Details</Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Preferences Tab */}
          <TabsContent value="preferences" className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              {/* Search Criteria */}
              <div className="border rounded-xl overflow-hidden">
                <div className="bg-gray-50 p-4 border-b">
                  <h3 className="font-semibold">Search Criteria</h3>
                </div>
                <div className="p-6 space-y-4">
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Price Range</div>
                    <div className="font-medium">
                      ${buyerProfile.preferences.priceRange.min.toLocaleString()} - ${buyerProfile.preferences.priceRange.max.toLocaleString()}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 mb-2">Property Types</div>
                    <div className="flex gap-2">
                      {buyerProfile.preferences.propertyTypes.map((type) => (
                        <Badge key={type} variant="outline">{type}</Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Minimum Bedrooms</div>
                    <div className="font-medium">{buyerProfile.preferences.minBeds}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Minimum Bathrooms</div>
                    <div className="font-medium">{buyerProfile.preferences.minBaths}</div>
                  </div>
                </div>
              </div>

              {/* Neighborhoods */}
              <div className="border rounded-xl overflow-hidden">
                <div className="bg-gray-50 p-4 border-b">
                  <h3 className="font-semibold flex items-center gap-2">
                    <MapPin className="size-4" />
                    Preferred Neighborhoods
                  </h3>
                </div>
                <div className="p-6">
                  <div className="space-y-2">
                    {buyerProfile.preferences.neighborhoods.map((neighborhood) => (
                      <div key={neighborhood} className="p-3 border rounded-lg">
                        <div className="font-medium">{neighborhood}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Must-Haves and Nice-to-Haves */}
            <div className="grid grid-cols-2 gap-6">
              <div className="border rounded-xl overflow-hidden">
                <div className="bg-gray-50 p-4 border-b">
                  <h3 className="font-semibold">Must-Have Features</h3>
                </div>
                <div className="p-6">
                  <div className="space-y-2">
                    {buyerProfile.preferences.mustHaves.map((feature) => (
                      <div key={feature} className="flex items-center gap-2">
                        <CheckCircle className="size-4 text-green-600" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="border rounded-xl overflow-hidden">
                <div className="bg-gray-50 p-4 border-b">
                  <h3 className="font-semibold">Nice-to-Have Features</h3>
                </div>
                <div className="p-6">
                  <div className="space-y-2">
                    {buyerProfile.preferences.niceToHaves.map((feature) => (
                      <div key={feature} className="flex items-center gap-2">
                        <div className="size-4 rounded-full border-2 border-gray-300" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Activity Tab */}
          <TabsContent value="activity" className="space-y-6">
            {/* Viewing History */}
            <div className="border rounded-xl overflow-hidden">
              <div className="bg-gray-50 p-4 border-b">
                <h3 className="font-semibold flex items-center gap-2">
                  <Eye className="size-4" />
                  Viewing History
                </h3>
              </div>
              <div className="p-6">
                <div className="space-y-3">
                  {buyerProfile.viewingHistory.map((viewing, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <div className="font-medium mb-1">{viewing.address}</div>
                          <div className="text-sm text-gray-600">
                            {new Date(viewing.date).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-3 mt-2">
                        <div className="text-sm text-gray-600 mb-1">Feedback:</div>
                        <div className="text-sm">{viewing.feedback}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Activity Stats */}
            <div className="grid grid-cols-4 gap-4">
              <div className="border rounded-xl p-6">
                <div className="text-sm text-gray-600 mb-1">Total Property Views</div>
                <div className="text-3xl font-semibold">{buyerProfile.activity.totalViews}</div>
              </div>
              <div className="border rounded-xl p-6">
                <div className="text-sm text-gray-600 mb-1">Saved Properties</div>
                <div className="text-3xl font-semibold">{buyerProfile.activity.savedProperties}</div>
              </div>
              <div className="border rounded-xl p-6">
                <div className="text-sm text-gray-600 mb-1">Completed Viewings</div>
                <div className="text-3xl font-semibold">{buyerProfile.activity.completedViewings}</div>
              </div>
              <div className="border rounded-xl p-6">
                <div className="text-sm text-gray-600 mb-1">Scheduled Viewings</div>
                <div className="text-3xl font-semibold">{buyerProfile.activity.scheduledViewings}</div>
              </div>
            </div>
          </TabsContent>

          {/* Notes Tab */}
          <TabsContent value="notes" className="space-y-6">
            <div className="border rounded-xl overflow-hidden">
              <div className="bg-gray-50 p-4 border-b flex items-center justify-between">
                <h3 className="font-semibold flex items-center gap-2">
                  <FileText className="size-4" />
                  Agent Notes
                </h3>
                <Button size="sm">Add Note</Button>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {buyerProfile.notes.map((note) => (
                    <div key={note.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="size-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-sm font-semibold">
                            {note.author.charAt(0)}
                          </div>
                          <div>
                            <div className="font-medium text-sm">{note.author}</div>
                            <div className="text-xs text-gray-500">{new Date(note.date).toLocaleDateString()}</div>
                          </div>
                        </div>
                      </div>
                      <div className="text-sm text-gray-700 leading-relaxed">{note.note}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}
