import { useEffect, useState } from "react";
import { MapPin, Heart, LayoutGrid, Map } from "lucide-react";
import { Link, useSearchParams } from "react-router";
import { Button } from "../../components/ui/button";
import { Slider } from "../../components/ui/slider";
import { Input } from "../../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { mockListings } from "../../data/mockData";
import { ImageWithFallback } from "../../components/figma/ImageWithFallback";
import { PropertyMap } from "../../components/PropertyMap";
import { BuyerHeader } from "../../components/BuyerHeader";

const DEFAULT_PRICE_RANGE: [number, number] = [0, 2000000];
const DEFAULT_SQFT_RANGE: [number, number] = [0, 5000];

function normalizeText(value: string) {
  return value.trim().toLowerCase();
}

export default function Search() {
  const [searchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState<"list" | "map">("list");
  const [searchQuery, setSearchQuery] = useState(() => searchParams.get("q") ?? "");
  const [priceRange, setPriceRange] =
    useState<[number, number]>(DEFAULT_PRICE_RANGE);
  const [sqftRange, setSqftRange] =
    useState<[number, number]>(DEFAULT_SQFT_RANGE);
  const [bedrooms, setBedrooms] = useState("any");
  const [bathrooms, setBathrooms] = useState("any");
  const [propertyType, setPropertyType] = useState("any");
  const [community, setCommunity] = useState("");

  useEffect(() => {
    setSearchQuery(searchParams.get("q") ?? "");
  }, [searchParams]);

  function handlePriceRangeChange(values: number[]) {
    if (values.length === 2) {
      setPriceRange([values[0], values[1]]);
    }
  }

  function handleSqftRangeChange(values: number[]) {
    if (values.length === 2) {
      setSqftRange([values[0], values[1]]);
    }
  }

  function resetFilters() {
    setSearchQuery("");
    setPriceRange(DEFAULT_PRICE_RANGE);
    setSqftRange(DEFAULT_SQFT_RANGE);
    setBedrooms("any");
    setBathrooms("any");
    setPropertyType("any");
    setCommunity("");
  }

  const normalizedQuery = normalizeText(searchQuery);
  const normalizedCommunity = normalizeText(community);

  const filteredListings = mockListings.filter((listing) => {
    const matchesQuery =
      normalizedQuery.length === 0 ||
      [
        listing.address,
        listing.city,
        listing.community,
        listing.postalCode,
      ].some((value) => normalizeText(value).includes(normalizedQuery));

    const matchesPrice =
      listing.price >= priceRange[0] && listing.price <= priceRange[1];
    const matchesSqft =
      listing.sqft >= sqftRange[0] && listing.sqft <= sqftRange[1];
    const matchesBedrooms =
      bedrooms === "any" || listing.beds >= Number(bedrooms);
    const matchesBathrooms =
      bathrooms === "any" || listing.baths >= Number(bathrooms);
    const matchesType =
      propertyType === "any" ||
      normalizeText(listing.type) === normalizeText(propertyType);
    const matchesCommunity =
      normalizedCommunity.length === 0 ||
      normalizeText(listing.community).includes(normalizedCommunity);

    return (
      matchesQuery &&
      matchesPrice &&
      matchesSqft &&
      matchesBedrooms &&
      matchesBathrooms &&
      matchesType &&
      matchesCommunity
    );
  });

  const recommendedListings =
    filteredListings.length > 3 ? filteredListings.slice(0, 3) : [];

  return (
    <div className="h-screen overflow-auto bg-gray-50">
      <BuyerHeader
        searchValue={searchQuery}
        onSearchChange={setSearchQuery}
      />
      <div className="flex-1 flex overflow-hidden">
        <div className="w-72 border-r p-6 overflow-y-auto">
          <h3 className="font-semibold mb-4">Filters</h3>

          <div className="space-y-6">
            <div>
              <label className="text-sm font-medium mb-2 block">Price Range</label>
              <div className="space-y-3">
                <Slider
                  value={priceRange}
                  onValueChange={handlePriceRangeChange}
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
                  onValueChange={handleSqftRangeChange}
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
              <Select value={bedrooms} onValueChange={setBedrooms}>
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
              <Select value={bathrooms} onValueChange={setBathrooms}>
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
              <Select value={propertyType} onValueChange={setPropertyType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any</SelectItem>
                  <SelectItem value="Single Family">Single Family</SelectItem>
                  <SelectItem value="Townhouse">Townhouse</SelectItem>
                  <SelectItem value="Condo">Condo</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Community</label>
              <Input
                placeholder="e.g. Kensington"
                value={community}
                onChange={(event) => setCommunity(event.target.value)}
              />
            </div>

            <Button variant="outline" className="w-full" onClick={resetFilters}>
              Reset Filters
            </Button>
          </div>
        </div>

        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="border-b px-6 py-3 flex items-center justify-between">
            <p className="text-sm text-gray-600">
              {filteredListings.length} properties found
            </p>
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
            <div className="flex-1 overflow-y-auto p-6">
              {filteredListings.length > 0 ? (
                <>
                  <div className="grid grid-cols-2 gap-6 mb-8">
                    {filteredListings.map((listing) => (
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

                  {recommendedListings.length > 0 && (
                    <div>
                      <h3 className="font-semibold mb-4">Recommended for you</h3>
                      <div className="grid grid-cols-3 gap-4">
                        {recommendedListings.map((listing) => (
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
                                  {listing.beds} beds | {listing.baths} baths
                                </div>
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="border rounded-2xl bg-white p-10 text-center">
                  <h3 className="text-xl font-semibold mb-2">
                    No properties match your filters
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Try widening your price range, changing bedrooms, or clearing
                    the search.
                  </p>
                  <Button variant="outline" onClick={resetFilters}>
                    Reset Filters
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex-1 flex">
              <div className="w-1/2 overflow-y-auto p-4">
                {filteredListings.length > 0 ? (
                  <div className="space-y-3">
                    {filteredListings.map((listing) => (
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
                              {listing.beds} beds | {listing.baths} baths |{" "}
                              {listing.sqft.toLocaleString()} sqft
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="border rounded-2xl bg-white p-8 text-center">
                    <h3 className="font-semibold mb-2">
                      No properties to show on the map
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Clear or adjust your filters to see listings again.
                    </p>
                    <Button variant="outline" onClick={resetFilters}>
                      Reset Filters
                    </Button>
                  </div>
                )}
              </div>
              <div className="w-1/2 bg-gray-100 flex items-center justify-center relative">
                <PropertyMap listings={filteredListings} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
