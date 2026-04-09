import { useState } from "react";
import { MapPin, Heart, LayoutGrid, Map } from "lucide-react";
import { Link } from "react-router";
import { Button } from "../../components/ui/button";
import { Slider } from "../../components/ui/slider";
import { Input } from "../../components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { mockListings } from "../../data/mockData";
import { ImageWithFallback } from "../../components/figma/ImageWithFallback";
import { PropertyMap } from "../../components/PropertyMap";
import { BuyerHeader } from "../../components/BuyerHeader";

export default function Search() {
  const [viewMode, setViewMode] = useState<"list" | "map">("list");
  const [priceRange, setPriceRange] = useState([0, 2000000]);
  const [sqftRange, setSqftRange] = useState([0, 5000]);

  return (
    <div className="h-screen overflow-auto bg-gray-50">
      <BuyerHeader />
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel - Filters */}
        <div className="w-72 border-r p-6 overflow-y-auto">
          <h3 className="font-semibold mb-4">Filters</h3>
          
          <div className="space-y-6">
            <div>
              <label className="text-sm font-medium mb-2 block">Price Range</label>
              <div className="space-y-3">
                <Slider 
                  value={priceRange}
                  onValueChange={setPriceRange}
                  max={2000000}
                  step={50000}
                  className="mt-2"
                />
                <div className="flex justify-between text-sm text-gray-600">
                  <span>${(priceRange[0] / 1000).toFixed(0)}K</span>
                  <span>${(priceRange[1] / 1000).toFixed(0)}K</span>
                </div>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Square Footage</label>
              <div className="space-y-3">
                <Slider 
                  value={sqftRange}
                  onValueChange={setSqftRange}
                  max={5000}
                  step={100}
                  className="mt-2"
                />
                <div className="flex justify-between text-sm text-gray-600">
                  <span>{sqftRange[0]} sqft</span>
                  <span>{sqftRange[1]} sqft</span>
                </div>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Bedrooms</label>
              <Select defaultValue="any">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any</SelectItem>
                  <SelectItem value="1">1+</SelectItem>
                  <SelectItem value="2">2+</SelectItem>
                  <SelectItem value="3">3+</SelectItem>
                  <SelectItem value="4">4+</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Bathrooms</label>
              <Select defaultValue="any">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any</SelectItem>
                  <SelectItem value="1">1+</SelectItem>
                  <SelectItem value="2">2+</SelectItem>
                  <SelectItem value="3">3+</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Property Type</label>
              <Select defaultValue="any">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any</SelectItem>
                  <SelectItem value="single">Single Family</SelectItem>
                  <SelectItem value="townhouse">Townhouse</SelectItem>
                  <SelectItem value="condo">Condo</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Community</label>
              <Input placeholder="e.g. Kensington" />
            </div>

            <Button variant="outline" className="w-full">Reset Filters</Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* View Toggle */}
          <div className="border-b px-6 py-3 flex items-center justify-between">
            <p className="text-sm text-gray-600">{mockListings.length} properties found</p>
            <div className="flex gap-2">
              <Button 
                variant={viewMode === "list" ? "default" : "outline"} 
                size="sm"
                onClick={() => setViewMode("list")}
              >
                <LayoutGrid className="size-4 mr-2" />
                List
              </Button>
              <Button 
                variant={viewMode === "map" ? "default" : "outline"} 
                size="sm"
                onClick={() => setViewMode("map")}
              >
                <Map className="size-4 mr-2" />
                Map
              </Button>
            </div>
          </div>

          {viewMode === "list" ? (
            <>
              {/* Results Grid */}
              <div className="flex-1 overflow-y-auto p-6">
                <div className="grid grid-cols-2 gap-6 mb-8">
                  {mockListings.map((listing) => (
                    <Link key={listing.id} to={`/property/${listing.id}`}>
                      <div className="border rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
                        <div className="relative h-48">
                          <ImageWithFallback 
                            src={listing.images[0]} 
                            alt={listing.address}
                            className="w-full h-full object-cover"
                          />
                          <button className="absolute top-3 right-3 bg-white rounded-full p-2 hover:bg-gray-100">
                            <Heart className="size-4" />
                          </button>
                        </div>
                        <div className="p-4">
                          <div className="text-2xl font-semibold mb-1">
                            ${listing.price.toLocaleString()}
                          </div>
                          <div className="text-sm text-gray-600 mb-2 flex items-center gap-1">
                            <MapPin className="size-3" />
                            {listing.address}
                          </div>
                          <div className="flex gap-4 text-sm text-gray-600">
                            <span>{listing.beds} beds</span>
                            <span>{listing.baths} baths</span>
                            <span>{listing.sqft.toLocaleString()} sqft</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>

                {/* Recommended */}
                <div>
                  <h3 className="font-semibold mb-4">Recommended for you</h3>
                  <div className="grid grid-cols-3 gap-4">
                    {mockListings.slice(0, 3).map((listing) => (
                      <Link key={listing.id} to={`/property/${listing.id}`}>
                        <div className="border rounded-lg overflow-hidden hover:shadow transition-shadow">
                          <div className="h-32">
                            <ImageWithFallback 
                              src={listing.images[0]} 
                              alt={listing.address}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="p-3">
                            <div className="font-semibold mb-1">
                              ${listing.price.toLocaleString()}
                            </div>
                            <div className="text-xs text-gray-600">
                              {listing.beds} beds • {listing.baths} baths
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex">
              {/* Map Split View */}
              <div className="w-1/2 overflow-y-auto p-4">
                <div className="space-y-3">
                  {mockListings.map((listing) => (
                    <Link key={listing.id} to={`/property/${listing.id}`}>
                      <div className="border rounded-lg p-3 hover:shadow transition-shadow flex gap-3">
                        <div className="w-24 h-24 flex-shrink-0">
                          <ImageWithFallback 
                            src={listing.images[0]} 
                            alt={listing.address}
                            className="w-full h-full object-cover rounded"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold mb-1">
                            ${listing.price.toLocaleString()}
                          </div>
                          <div className="text-sm text-gray-600 truncate mb-1">
                            {listing.address}
                          </div>
                          <div className="text-xs text-gray-500">
                            {listing.beds} beds • {listing.baths} baths • {listing.sqft.toLocaleString()} sqft
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
              <div className="w-1/2 bg-gray-100 flex items-center justify-center relative">
                <PropertyMap listings={mockListings} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
