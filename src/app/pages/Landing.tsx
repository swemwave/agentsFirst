import { Search, Heart, Calendar, Home, Award, Users, CheckCircle2, MapPin, Star, ArrowRight } from "lucide-react";
import { Link } from "react-router";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export default function Landing() {
  return (
    <div className="h-screen overflow-auto bg-white">
      {/* Top Nav */}
      <nav className="border-b bg-white/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-12 py-4 flex items-center justify-between" style={{ maxWidth: '1440px' }}>
          <div className="text-2xl font-semibold">FinditWithFahad</div>
          <div className="flex items-center gap-8">
            <Link to="/login">
              <Button variant="outline" size="sm">Sign In</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section with Background */}
      <div className="relative bg-gray-50">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/20 z-10" />
          <ImageWithFallback 
            src="https://images.unsplash.com/photo-1639663742190-1b3dba2eebcf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBsdXh1cnklMjBsaXZpbmclMjByb29tJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzczMTAxMTA2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Modern luxury living room"
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="relative z-20 max-w-5xl mx-auto px-6 py-32">
          <div className="text-center mb-12">
            <h1 className="text-6xl font-semibold mb-6 text-white">Find your next home</h1>
            <p className="text-xl text-white/95">Discover the perfect property in Calgary with personalized guidance</p>
          </div>

          {/* Search Bar */}
          <div className="max-w-3xl mx-auto mb-8">
            <div className="flex gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
                <Input 
                  placeholder="Search by address, community, or postal code"
                  className="pl-11 h-14 text-base bg-white"
                />
              </div>
              <Button size="lg" className="px-8 h-14">Search</Button>
            </div>
            
            <div className="flex gap-2 mt-4 justify-center flex-wrap">
              <Badge variant="outline" className="cursor-pointer px-4 py-2 bg-white">Any Price</Badge>
              <Badge variant="outline" className="cursor-pointer px-4 py-2 bg-white">Any Beds</Badge>
              <Badge variant="outline" className="cursor-pointer px-4 py-2 bg-white">Any Baths</Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="border-b bg-white">
        <div className="container mx-auto px-12 py-16" style={{ maxWidth: '1440px' }}>
          <div className="grid grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-semibold mb-2">500+</div>
              <div className="text-sm text-gray-600">Properties Sold</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-semibold mb-2">98%</div>
              <div className="text-sm text-gray-600">Client Satisfaction</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-semibold mb-2">15+</div>
              <div className="text-sm text-gray-600">Years Experience</div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t bg-white py-12">
        <div className="container mx-auto px-12" style={{ maxWidth: '1440px' }}>
          <div className="grid grid-cols-4 gap-12 mb-12">
            <div>
              <div className="text-2xl font-semibold mb-4">FinditWithFahad</div>
              <p className="text-sm text-gray-600 mb-4">Your trusted partner in Calgary real estate.</p>
              <div className="flex gap-4">
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  <Users className="size-5" />
                </a>
              </div>
            </div>

            <div>
              <div className="font-semibold mb-4">For Buyers</div>
              <div className="space-y-2 text-sm">
                <div><Link to="/search" className="text-gray-600 hover:text-gray-900">Browse Listings</Link></div>
                <div><Link to="/wishlist" className="text-gray-600 hover:text-gray-900">Saved Properties</Link></div>
                <div><Link to="/appointments" className="text-gray-600 hover:text-gray-900">My Appointments</Link></div>
                <div><a href="#" className="text-gray-600 hover:text-gray-900">Buyer's Guide</a></div>
              </div>
            </div>

            <div>
              <div className="font-semibold mb-4">For Sellers</div>
              <div className="space-y-2 text-sm">
                <div><Link to="/list-home" className="text-gray-600 hover:text-gray-900">List Your Home</Link></div>
                <div><Link to="/seller/dashboard" className="text-gray-600 hover:text-gray-900">Seller Dashboard</Link></div>
                <div><a href="#" className="text-gray-600 hover:text-gray-900">Home Valuation</a></div>
                <div><a href="#" className="text-gray-600 hover:text-gray-900">Seller's Guide</a></div>
              </div>
            </div>

            <div>
              <div className="font-semibold mb-4">Contact</div>
              <div className="space-y-2 text-sm text-gray-600">
                <div>Calgary, Alberta</div>
                <div>(403) 555-0123</div>
                <div>fahad@finditwithfahad.com</div>
              </div>
            </div>
          </div>

          <div className="border-t pt-8 flex justify-between items-center text-sm text-gray-600">
            <div>© 2026 FinditWithFahad Realty. All rights reserved.</div>
            <div className="flex gap-6">
              <a href="#" className="hover:text-gray-900">Privacy Policy</a>
              <a href="#" className="hover:text-gray-900">Terms of Service</a>
              <a href="#" className="hover:text-gray-900">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}