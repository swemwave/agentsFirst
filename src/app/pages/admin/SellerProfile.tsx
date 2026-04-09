import { AdminLayout } from "../../components/AdminLayout";
import { Link } from "react-router";
import { ArrowLeft, Mail, Phone, Home, DollarSign, Calendar, TrendingUp, Eye, FileText, Camera, CheckCircle, Clock, Users } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const sellerProfile = {
  id: "u2",
  name: "Emily Davis",
  email: "emily.davis@email.com",
  phone: "(403) 555-0456",
  joinDate: "2026-01-20",
  status: "active",
  profileImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
  
  property: {
    id: "5",
    address: "123 Mahogany Boulevard SE",
    city: "Calgary",
    postalCode: "T3M 1A4",
    listPrice: 725000,
    originalPrice: 749000,
    assessedValue: 710000,
    beds: 4,
    baths: 3.5,
    sqft: 2600,
    type: "Single Family",
    community: "Mahogany",
    yearBuilt: 2018,
    listDate: "2026-02-10",
    status: "pending",
    daysOnMarket: 20,
    images: ["https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?w=800"],
  },
  
  marketing: {
    photoShoot: {
      scheduled: true,
      date: "2026-02-05",
      photographer: "Pro Real Estate Photos",
      status: "completed",
    },
    virtualTour: true,
    floorPlan: true,
    videoWalkthrough: false,
    socialMediaPosts: 8,
    emailBlasts: 3,
    openHouses: [
      { date: "2026-02-15", time: "2:00 PM - 4:00 PM", visitors: 12 },
      { date: "2026-02-22", time: "1:00 PM - 3:00 PM", visitors: 8 },
    ],
  },
  
  performance: {
    totalViews: 234,
    uniqueVisitors: 187,
    savedByUsers: 16,
    inquiries: 9,
    viewings: 18,
    offers: 1,
    currentOffer: {
      amount: 715000,
      conditions: ["Financing", "Home Inspection"],
      expiryDate: "2026-03-05",
      status: "under review",
    },
  },
  
  pricing: {
    history: [
      { date: "2026-02-10", price: 749000, event: "Initial listing" },
      { date: "2026-02-25", price: 725000, event: "Price reduction" },
    ],
    competitiveAnalysis: {
      averageInArea: 720000,
      highestSimilar: 785000,
      lowestSimilar: 695000,
    },
  },
  
  timeline: {
    reason: "Relocating for work",
    targetSaleDate: "2026-04-30",
    flexibility: "moderate",
    occupancy: "Vacant by April 15",
  },
  
  showingFeedback: [
    {
      id: "f1",
      date: "2026-03-01",
      viewer: "Anonymous Buyer",
      rating: 4,
      comments: "Beautiful property, loved the lake access. Slightly over budget but very interested.",
    },
    {
      id: "f2",
      date: "2026-02-28",
      viewer: "Anonymous Buyer",
      rating: 5,
      comments: "Perfect family home. Considering making an offer this week.",
    },
    {
      id: "f3",
      date: "2026-02-26",
      viewer: "Anonymous Buyer",
      rating: 3,
      comments: "Nice home but too far from downtown for our needs.",
    },
  ],
  
  notes: [
    {
      id: "n1",
      date: "2026-03-01",
      author: "Fahad",
      note: "Received first offer at $715K with financing and inspection conditions. Seller is reviewing. Offer expires March 5th.",
    },
    {
      id: "n2",
      date: "2026-02-25",
      author: "Fahad",
      note: "Reduced price to $725K based on market feedback and comparable sales. Already seeing increased interest.",
    },
    {
      id: "n3",
      date: "2026-02-15",
      author: "Fahad",
      note: "First open house was successful - 12 visitors. Received very positive feedback on the renovations and lake access.",
    },
    {
      id: "n4",
      date: "2026-02-10",
      author: "Fahad",
      note: "Property listed at $749K. Professional photos turned out excellent. Marketing materials ready and distributed.",
    },
  ],
};

const viewsData = [
  { date: "Feb 10", views: 28 },
  { date: "Feb 12", views: 42 },
  { date: "Feb 14", views: 35 },
  { date: "Feb 16", views: 48 },
  { date: "Feb 18", views: 31 },
  { date: "Feb 20", views: 25 },
  { date: "Feb 22", views: 25 },
];

export default function SellerProfile() {
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
              <img src={sellerProfile.profileImage} alt={sellerProfile.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h1 className="text-2xl font-semibold mb-1">{sellerProfile.name}</h1>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1.5">
                      <Mail className="size-4" />
                      {sellerProfile.email}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Phone className="size-4" />
                      {sellerProfile.phone}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                    <Clock className="size-3 mr-1" />
                    Pending Offer
                  </Badge>
                  <Badge variant="outline">Active Seller</Badge>
                </div>
              </div>
              
              {/* Quick Stats */}
              <div className="grid grid-cols-4 gap-4 mt-4">
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="text-2xl font-semibold mb-1">{sellerProfile.property.daysOnMarket}</div>
                  <div className="text-sm text-gray-600">Days on Market</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="text-2xl font-semibold mb-1">{sellerProfile.performance.viewings}</div>
                  <div className="text-sm text-gray-600">Total Viewings</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="text-2xl font-semibold mb-1">{sellerProfile.performance.inquiries}</div>
                  <div className="text-sm text-gray-600">Inquiries</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="text-2xl font-semibold mb-1">{sellerProfile.performance.offers}</div>
                  <div className="text-sm text-gray-600">Offers Received</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="overview">
          <TabsList className="mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="property">Property Details</TabsTrigger>
            <TabsTrigger value="marketing">Marketing</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="notes">Notes</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              {/* Current Listing */}
              <div className="border rounded-xl overflow-hidden">
                <div className="bg-gray-50 p-4 border-b">
                  <h3 className="font-semibold flex items-center gap-2">
                    <Home className="size-4" />
                    Listed Property
                  </h3>
                </div>
                <div className="p-6">
                  <div className="mb-4">
                    <div className="aspect-video rounded-lg bg-gray-100 overflow-hidden mb-3">
                      <img src={sellerProfile.property.images[0]} alt={sellerProfile.property.address} className="w-full h-full object-cover" />
                    </div>
                    <div className="font-semibold mb-1">{sellerProfile.property.address}</div>
                    <div className="text-sm text-gray-600 mb-2">
                      {sellerProfile.property.city}, {sellerProfile.property.postalCode}
                    </div>
                    <div className="flex items-center gap-2 mb-3">
                      <Badge variant={sellerProfile.property.status === "pending" ? "default" : "outline"}>
                        {sellerProfile.property.status.charAt(0).toUpperCase() + sellerProfile.property.status.slice(1)}
                      </Badge>
                      <span className="text-sm text-gray-600">{sellerProfile.property.daysOnMarket} days on market</span>
                    </div>
                    <div className="text-2xl font-semibold text-blue-600 mb-2">
                      ${sellerProfile.property.listPrice.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600">
                      {sellerProfile.property.beds} beds • {sellerProfile.property.baths} baths • {sellerProfile.property.sqft.toLocaleString()} sqft
                    </div>
                  </div>
                  <Button className="w-full" variant="outline">View Full Listing</Button>
                </div>
              </div>

              {/* Current Offer */}
              {sellerProfile.performance.currentOffer && (
                <div className="border rounded-xl overflow-hidden">
                  <div className="bg-gray-50 p-4 border-b">
                    <h3 className="font-semibold flex items-center gap-2">
                      <DollarSign className="size-4" />
                      Current Offer
                    </h3>
                  </div>
                  <div className="p-6 space-y-4">
                    <div>
                      <div className="text-sm text-gray-600 mb-1">Offer Amount</div>
                      <div className="text-2xl font-semibold text-green-600">
                        ${sellerProfile.performance.currentOffer.amount.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-500 mt-1">
                        ${(sellerProfile.property.listPrice - sellerProfile.performance.currentOffer.amount).toLocaleString()} below asking
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600 mb-2">Conditions</div>
                      <div className="space-y-1">
                        {sellerProfile.performance.currentOffer.conditions.map((condition) => (
                          <div key={condition} className="flex items-center gap-2 text-sm">
                            <div className="size-1.5 rounded-full bg-gray-400" />
                            {condition}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600 mb-1">Offer Expires</div>
                      <div className="font-medium">{new Date(sellerProfile.performance.currentOffer.expiryDate).toLocaleDateString()}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600 mb-1">Status</div>
                      <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                        {sellerProfile.performance.currentOffer.status.charAt(0).toUpperCase() + sellerProfile.performance.currentOffer.status.slice(1)}
                      </Badge>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Timeline */}
            <div className="border rounded-xl overflow-hidden">
              <div className="bg-gray-50 p-4 border-b">
                <h3 className="font-semibold flex items-center gap-2">
                  <Calendar className="size-4" />
                  Seller Timeline
                </h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-4 gap-6">
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Reason for Selling</div>
                    <div className="font-medium">{sellerProfile.timeline.reason}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Target Sale Date</div>
                    <div className="font-medium">{new Date(sellerProfile.timeline.targetSaleDate).toLocaleDateString()}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Flexibility</div>
                    <Badge variant="outline">
                      {sellerProfile.timeline.flexibility.charAt(0).toUpperCase() + sellerProfile.timeline.flexibility.slice(1)}
                    </Badge>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Occupancy</div>
                    <div className="font-medium">{sellerProfile.timeline.occupancy}</div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Property Details Tab */}
          <TabsContent value="property" className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              {/* Property Info */}
              <div className="border rounded-xl overflow-hidden">
                <div className="bg-gray-50 p-4 border-b">
                  <h3 className="font-semibold">Property Information</h3>
                </div>
                <div className="p-6 space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Property Type</span>
                    <span className="font-medium">{sellerProfile.property.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Year Built</span>
                    <span className="font-medium">{sellerProfile.property.yearBuilt}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Bedrooms</span>
                    <span className="font-medium">{sellerProfile.property.beds}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Bathrooms</span>
                    <span className="font-medium">{sellerProfile.property.baths}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Square Footage</span>
                    <span className="font-medium">{sellerProfile.property.sqft.toLocaleString()} sqft</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Community</span>
                    <span className="font-medium">{sellerProfile.property.community}</span>
                  </div>
                </div>
              </div>

              {/* Pricing */}
              <div className="border rounded-xl overflow-hidden">
                <div className="bg-gray-50 p-4 border-b">
                  <h3 className="font-semibold">Pricing Analysis</h3>
                </div>
                <div className="p-6 space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Current List Price</span>
                    <span className="font-semibold text-blue-600">${sellerProfile.property.listPrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Original List Price</span>
                    <span className="font-medium">${sellerProfile.property.originalPrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Assessed Value</span>
                    <span className="font-medium">${sellerProfile.property.assessedValue.toLocaleString()}</span>
                  </div>
                  <div className="h-px bg-gray-200 my-2" />
                  <div className="flex justify-between">
                    <span className="text-gray-600">Area Average</span>
                    <span className="font-medium">${sellerProfile.pricing.competitiveAnalysis.averageInArea.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Highest Similar</span>
                    <span className="font-medium">${sellerProfile.pricing.competitiveAnalysis.highestSimilar.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Lowest Similar</span>
                    <span className="font-medium">${sellerProfile.pricing.competitiveAnalysis.lowestSimilar.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Pricing History */}
            <div className="border rounded-xl overflow-hidden">
              <div className="bg-gray-50 p-4 border-b">
                <h3 className="font-semibold flex items-center gap-2">
                  <TrendingUp className="size-4" />
                  Pricing History
                </h3>
              </div>
              <div className="p-6">
                <div className="space-y-3">
                  {sellerProfile.pricing.history.map((entry, index) => (
                    <div key={index} className="flex items-center justify-between border rounded-lg p-4">
                      <div>
                        <div className="font-medium mb-1">{entry.event}</div>
                        <div className="text-sm text-gray-600">{new Date(entry.date).toLocaleDateString()}</div>
                      </div>
                      <div className="text-xl font-semibold">${entry.price.toLocaleString()}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Marketing Tab */}
          <TabsContent value="marketing" className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              {/* Marketing Materials */}
              <div className="border rounded-xl overflow-hidden">
                <div className="bg-gray-50 p-4 border-b">
                  <h3 className="font-semibold flex items-center gap-2">
                    <Camera className="size-4" />
                    Marketing Materials
                  </h3>
                </div>
                <div className="p-6 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Professional Photos</span>
                    <CheckCircle className="size-5 text-green-600" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Virtual Tour</span>
                    {sellerProfile.marketing.virtualTour ? (
                      <CheckCircle className="size-5 text-green-600" />
                    ) : (
                      <div className="size-5 rounded-full border-2 border-gray-300" />
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Floor Plan</span>
                    {sellerProfile.marketing.floorPlan ? (
                      <CheckCircle className="size-5 text-green-600" />
                    ) : (
                      <div className="size-5 rounded-full border-2 border-gray-300" />
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Video Walkthrough</span>
                    {sellerProfile.marketing.videoWalkthrough ? (
                      <CheckCircle className="size-5 text-green-600" />
                    ) : (
                      <div className="size-5 rounded-full border-2 border-gray-300" />
                    )}
                  </div>
                  <div className="h-px bg-gray-200 my-2" />
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="text-sm text-gray-600 mb-1">Photo Shoot Details</div>
                    <div className="text-sm font-medium mb-1">{sellerProfile.marketing.photoShoot.photographer}</div>
                    <div className="text-xs text-gray-500">
                      {new Date(sellerProfile.marketing.photoShoot.date).toLocaleDateString()} • {sellerProfile.marketing.photoShoot.status}
                    </div>
                  </div>
                </div>
              </div>

              {/* Marketing Activity */}
              <div className="border rounded-xl overflow-hidden">
                <div className="bg-gray-50 p-4 border-b">
                  <h3 className="font-semibold">Marketing Activity</h3>
                </div>
                <div className="p-6 space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-gray-600">Social Media Posts</span>
                      <span className="font-semibold">{sellerProfile.marketing.socialMediaPosts}</span>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-gray-600">Email Blasts Sent</span>
                      <span className="font-semibold">{sellerProfile.marketing.emailBlasts}</span>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-gray-600">Open Houses</span>
                      <span className="font-semibold">{sellerProfile.marketing.openHouses.length}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Open House History */}
            <div className="border rounded-xl overflow-hidden">
              <div className="bg-gray-50 p-4 border-b">
                <h3 className="font-semibold flex items-center gap-2">
                  <Users className="size-4" />
                  Open House History
                </h3>
              </div>
              <div className="p-6">
                <div className="space-y-3">
                  {sellerProfile.marketing.openHouses.map((openHouse, index) => (
                    <div key={index} className="flex items-center justify-between border rounded-lg p-4">
                      <div>
                        <div className="font-medium mb-1">{new Date(openHouse.date).toLocaleDateString()}</div>
                        <div className="text-sm text-gray-600">{openHouse.time}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-semibold text-blue-600">{openHouse.visitors}</div>
                        <div className="text-sm text-gray-600">visitors</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Performance Tab */}
          <TabsContent value="performance" className="space-y-6">
            {/* Performance Stats */}
            <div className="grid grid-cols-4 gap-4">
              <div className="border rounded-xl p-6">
                <div className="text-sm text-gray-600 mb-1">Total Views</div>
                <div className="text-3xl font-semibold">{sellerProfile.performance.totalViews}</div>
              </div>
              <div className="border rounded-xl p-6">
                <div className="text-sm text-gray-600 mb-1">Unique Visitors</div>
                <div className="text-3xl font-semibold">{sellerProfile.performance.uniqueVisitors}</div>
              </div>
              <div className="border rounded-xl p-6">
                <div className="text-sm text-gray-600 mb-1">Saved by Users</div>
                <div className="text-3xl font-semibold">{sellerProfile.performance.savedByUsers}</div>
              </div>
              <div className="border rounded-xl p-6">
                <div className="text-sm text-gray-600 mb-1">In-Person Viewings</div>
                <div className="text-3xl font-semibold">{sellerProfile.performance.viewings}</div>
              </div>
            </div>

            {/* Views Over Time */}
            <div className="border rounded-xl overflow-hidden">
              <div className="bg-gray-50 p-4 border-b">
                <h3 className="font-semibold flex items-center gap-2">
                  <Eye className="size-4" />
                  Online Views Over Time
                </h3>
              </div>
              <div className="p-6">
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={viewsData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="views" stroke="#3b82f6" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Showing Feedback */}
            <div className="border rounded-xl overflow-hidden">
              <div className="bg-gray-50 p-4 border-b">
                <h3 className="font-semibold flex items-center gap-2">
                  <Users className="size-4" />
                  Showing Feedback
                </h3>
              </div>
              <div className="p-6">
                <div className="space-y-3">
                  {sellerProfile.showingFeedback.map((feedback) => (
                    <div key={feedback.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <div className="font-medium mb-1">{feedback.viewer}</div>
                          <div className="text-sm text-gray-600">{new Date(feedback.date).toLocaleDateString()}</div>
                        </div>
                        <div className="flex gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <div
                              key={i}
                              className={`size-4 ${i < feedback.rating ? 'text-yellow-400' : 'text-gray-200'}`}
                            >
                              ★
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-3 text-sm">{feedback.comments}</div>
                    </div>
                  ))}
                </div>
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
                  {sellerProfile.notes.map((note) => (
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
