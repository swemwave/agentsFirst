import { useState } from "react";
import { useParams, Link } from "react-router";
import { ChevronLeft, ChevronRight, Heart, Calendar, MapPin, Bed, Bath, Maximize } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { mockListings } from "../../data/mockData";
import { ImageWithFallback } from "../../components/figma/ImageWithFallback";
import { BuyerHeader } from "../../components/BuyerHeader";
import { Container } from "../../components/Container";

export default function PropertyDetails() {
  const { id } = useParams();
  const listing = mockListings.find(l => l.id === id) || mockListings[0];
  const [currentImage, setCurrentImage] = useState(0);
  
  const priceDiff = listing.price - listing.assessedValue;
  const percentDiff = ((priceDiff / listing.assessedValue) * 100).toFixed(1);

  return (
    <div className="h-screen overflow-auto bg-white">
      {/* Top Bar */}
      <BuyerHeader showSearch={false} />

      <Container className="py-4">
        <Link to="/search" className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900">
          <ChevronLeft className="size-4" />
          Back to search
        </Link>
      </Container>

      <Container className="py-8">
        {/* Image Carousel */}
        <div className="relative mb-8 rounded-2xl overflow-hidden">
          <div className="aspect-[16/9] bg-gray-100">
            <ImageWithFallback 
              src={listing.images[currentImage]} 
              alt={listing.address}
              className="w-full h-full object-cover"
            />
          </div>
          
          {listing.images.length > 1 && (
            <>
              <button 
                onClick={() => setCurrentImage((currentImage - 1 + listing.images.length) % listing.images.length)}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50"
              >
                <ChevronLeft className="size-6" />
              </button>
              <button 
                onClick={() => setCurrentImage((currentImage + 1) % listing.images.length)}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50"
              >
                <ChevronRight className="size-6" />
              </button>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                {currentImage + 1} / {listing.images.length}
              </div>
            </>
          )}
        </div>

        <div className="grid grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="col-span-2">
            {/* Key Facts */}
            <div className="mb-8">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-4xl font-semibold mb-2">
                    ${listing.price.toLocaleString()}
                  </h1>
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="size-4" />
                    <span>{listing.address}, {listing.city}</span>
                  </div>
                </div>
                <Button variant="outline" size="icon">
                  <Heart className="size-5" />
                </Button>
              </div>

              <div className="flex gap-6 text-gray-600">
                <div className="flex items-center gap-2">
                  <Bed className="size-5" />
                  <span>{listing.beds} Bedrooms</span>
                </div>
                <div className="flex items-center gap-2">
                  <Bath className="size-5" />
                  <span>{listing.baths} Bathrooms</span>
                </div>
                <div className="flex items-center gap-2">
                  <Maximize className="size-5" />
                  <span>{listing.sqft.toLocaleString()} sqft</span>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="overview" className="mb-8">
              <TabsList className="w-full justify-start">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="neighborhood">Neighborhood</TabsTrigger>
                <TabsTrigger value="assessment">Assessment</TabsTrigger>
                <TabsTrigger value="demographics">Demographics</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-6">
                <h3 className="font-semibold mb-3">About this property</h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  {listing.description}
                </p>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="border rounded-lg p-4">
                    <div className="text-gray-600 mb-1">Property Type</div>
                    <div className="font-medium">{listing.type}</div>
                  </div>
                  <div className="border rounded-lg p-4">
                    <div className="text-gray-600 mb-1">Community</div>
                    <div className="font-medium">{listing.community}</div>
                  </div>
                  <div className="border rounded-lg p-4">
                    <div className="text-gray-600 mb-1">Listed Date</div>
                    <div className="font-medium">{new Date(listing.dateAdded).toLocaleDateString()}</div>
                  </div>
                  <div className="border rounded-lg p-4">
                    <div className="text-gray-600 mb-1">Status</div>
                    <Badge variant={listing.status === "active" ? "default" : "secondary"}>
                      {listing.status}
                    </Badge>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="neighborhood" className="mt-6">
                <h3 className="font-semibold mb-3">Neighborhood</h3>
                <div className="bg-gray-50 rounded-lg p-6 text-center text-gray-600">
                  <MapPin className="size-12 mx-auto mb-3 text-gray-400" />
                  <p>Interactive neighborhood map and amenities would display here</p>
                  <p className="text-sm mt-2">Schools, parks, transit, shopping nearby</p>
                </div>
              </TabsContent>

              <TabsContent value="assessment" className="mt-6">
                <h3 className="font-semibold mb-3">Property Assessment</h3>
                <div className="space-y-4">
                  <div className="border rounded-lg p-4">
                    <div className="text-sm text-gray-600 mb-1">Assessed Value (2026)</div>
                    <div className="text-2xl font-semibold">
                      ${listing.assessedValue.toLocaleString()}
                    </div>
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    <div className="text-sm text-gray-600 mb-2">Price vs. Assessed</div>
                    <div className="flex items-center gap-3">
                      <Badge variant={priceDiff > 0 ? "destructive" : "default"}>
                        {priceDiff > 0 ? '+' : ''}{percentDiff}%
                      </Badge>
                      <span className="text-sm text-gray-600">
                        ${Math.abs(priceDiff).toLocaleString()} {priceDiff > 0 ? 'above' : 'below'} assessment
                      </span>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="demographics" className="mt-6">
                <h3 className="font-semibold mb-3">Community Demographics</h3>
                <div className="bg-gray-50 rounded-lg p-6 text-center text-gray-600">
                  <p>Census data and community statistics would display here</p>
                  <p className="text-sm mt-2">Population, income levels, age distribution, etc.</p>
                </div>
              </TabsContent>
            </Tabs>

            {/* Similar Listings */}
            <div>
              <h3 className="font-semibold mb-4">Similar Listings</h3>
              <div className="grid grid-cols-2 gap-4">
                {mockListings.slice(0, 2).filter(l => l.id !== id).map((similar) => (
                  <Link key={similar.id} to={`/property/${similar.id}`}>
                    <div className="border rounded-lg overflow-hidden hover:shadow transition-shadow">
                      <div className="h-40">
                        <ImageWithFallback 
                          src={similar.images[0]} 
                          alt={similar.address}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <div className="font-semibold mb-1">
                          ${similar.price.toLocaleString()}
                        </div>
                        <div className="text-sm text-gray-600 mb-2 truncate">
                          {similar.address}
                        </div>
                        <div className="text-sm text-gray-500">
                          {similar.beds} beds • {similar.baths} baths
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <div className="border rounded-xl p-6 sticky top-6">
              <div className="text-sm text-gray-600 mb-1">Listed by</div>
              <div className="font-semibold mb-4">{listing.agentName}</div>
              
              <div className="space-y-3">
                <Button className="w-full" size="lg">
                  <Heart className="size-4 mr-2" />
                  Save to Wishlist
                </Button>
                <Link to="/appointments/new">
                  <Button variant="outline" className="w-full" size="lg">
                    <Calendar className="size-4 mr-2" />
                    Request Viewing
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
