import { useState } from "react";
import { Link } from "react-router";
import { Heart, X, ArrowLeft } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Checkbox } from "../../components/ui/checkbox";
import { mockListings, wishlistIds } from "../../data/mockData";
import { ImageWithFallback } from "../../components/figma/ImageWithFallback";
import { BuyerHeader } from "../../components/BuyerHeader";
import { Container } from "../../components/Container";

export default function Wishlist() {
  const [compareMode, setCompareMode] = useState(false);
  const [selectedForCompare, setSelectedForCompare] = useState<string[]>([]);
  const wishlistListings = mockListings.filter(l => wishlistIds.includes(l.id));

  const toggleCompare = (id: string) => {
    if (selectedForCompare.includes(id)) {
      setSelectedForCompare(selectedForCompare.filter(i => i !== id));
    } else if (selectedForCompare.length < 3) {
      setSelectedForCompare([...selectedForCompare, id]);
    }
  };

  return (
    <div className="h-screen overflow-auto bg-white">
      {/* Top Bar */}
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
            <h1 className="text-3xl font-semibold mb-2">My Wishlist</h1>
            <p className="text-gray-600">{wishlistListings.length} saved properties</p>
          </div>
          
          <Button 
            variant={compareMode ? "default" : "outline"}
            onClick={() => {
              setCompareMode(!compareMode);
              if (compareMode) setSelectedForCompare([]);
            }}
          >
            {compareMode ? "Cancel Compare" : "Compare Properties"}
          </Button>
        </div>

        {wishlistListings.length === 0 ? (
          <div className="text-center py-20">
            <Heart className="size-16 mx-auto mb-4 text-gray-300" />
            <h3 className="text-xl font-semibold mb-2">No saved properties yet</h3>
            <p className="text-gray-600 mb-6">
              Start browsing and save your favorite homes
            </p>
            <Link to="/search">
              <Button>Browse Listings</Button>
            </Link>
          </div>
        ) : (
          <>
            {/* Comparison Bar */}
            {compareMode && selectedForCompare.length > 0 && (
              <div className="bg-gray-50 border rounded-xl p-4 mb-6 flex items-center justify-between">
                <div className="text-sm">
                  {selectedForCompare.length} properties selected for comparison
                  {selectedForCompare.length < 2 && " (select at least 2)"}
                </div>
                {selectedForCompare.length >= 2 && (
                  <Button size="sm">View Comparison</Button>
                )}
              </div>
            )}

            {/* Listings Grid */}
            <div className="grid grid-cols-3 gap-6 mb-8">
              {wishlistListings.map((listing) => (
                <div key={listing.id} className="border rounded-xl overflow-hidden relative">
                  {compareMode && (
                    <div className="absolute top-3 left-3 z-10">
                      <Checkbox 
                        checked={selectedForCompare.includes(listing.id)}
                        onCheckedChange={() => toggleCompare(listing.id)}
                        className="bg-white"
                      />
                    </div>
                  )}
                  
                  <button className="absolute top-3 right-3 z-10 bg-white rounded-full p-2 hover:bg-gray-100">
                    <X className="size-4" />
                  </button>

                  <Link to={`/property/${listing.id}`}>
                    <div className="h-48">
                      <ImageWithFallback 
                        src={listing.images[0]} 
                        alt={listing.address}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <div className="text-2xl font-semibold mb-1">
                        ${listing.price.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-600 mb-2">
                        {listing.address}
                      </div>
                      <div className="flex gap-4 text-sm text-gray-600">
                        <span>{listing.beds} beds</span>
                        <span>{listing.baths} baths</span>
                        <span>{listing.sqft.toLocaleString()} sqft</span>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>

            {/* Comparison Table (when comparing) */}
            {selectedForCompare.length >= 2 && compareMode && (
              <div className="border rounded-xl overflow-hidden">
                <div className="bg-gray-50 p-4 border-b">
                  <h3 className="font-semibold">Property Comparison</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="text-left p-4 text-sm font-medium text-gray-600">Feature</th>
                        {selectedForCompare.map((id) => {
                          const listing = mockListings.find(l => l.id === id);
                          return (
                            <th key={id} className="text-left p-4">
                              <div className="text-sm font-medium">{listing?.address}</div>
                            </th>
                          );
                        })}
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      <tr>
                        <td className="p-4 text-sm text-gray-600">Price</td>
                        {selectedForCompare.map((id) => {
                          const listing = mockListings.find(l => l.id === id);
                          return (
                            <td key={id} className="p-4 font-semibold">
                              ${listing?.price.toLocaleString()}
                            </td>
                          );
                        })}
                      </tr>
                      <tr>
                        <td className="p-4 text-sm text-gray-600">Bedrooms</td>
                        {selectedForCompare.map((id) => {
                          const listing = mockListings.find(l => l.id === id);
                          return <td key={id} className="p-4">{listing?.beds}</td>;
                        })}
                      </tr>
                      <tr>
                        <td className="p-4 text-sm text-gray-600">Bathrooms</td>
                        {selectedForCompare.map((id) => {
                          const listing = mockListings.find(l => l.id === id);
                          return <td key={id} className="p-4">{listing?.baths}</td>;
                        })}
                      </tr>
                      <tr>
                        <td className="p-4 text-sm text-gray-600">Square Feet</td>
                        {selectedForCompare.map((id) => {
                          const listing = mockListings.find(l => l.id === id);
                          return <td key={id} className="p-4">{listing?.sqft.toLocaleString()}</td>;
                        })}
                      </tr>
                      <tr>
                        <td className="p-4 text-sm text-gray-600">Property Type</td>
                        {selectedForCompare.map((id) => {
                          const listing = mockListings.find(l => l.id === id);
                          return <td key={id} className="p-4">{listing?.type}</td>;
                        })}
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </>
        )}
      </Container>
    </div>
  );
}