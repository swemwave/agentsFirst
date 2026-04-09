import { Link } from "react-router";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { useState } from "react";

export default function SignUp() {
  const [accountType, setAccountType] = useState<"buyer" | "seller">("buyer");

  return (
    <div className="h-screen overflow-auto bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="text-2xl font-semibold">FinditWithFahad</Link>
        </div>

        <div className="bg-white rounded-2xl border p-8 shadow-sm">
          <h2 className="text-2xl font-semibold mb-6">Create Account</h2>
          
          <form className="space-y-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input 
                id="name"
                type="text" 
                placeholder="John Smith"
                className="mt-1.5"
              />
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email"
                type="email" 
                placeholder="your@email.com"
                className="mt-1.5"
              />
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password"
                type="password" 
                placeholder="••••••••"
                className="mt-1.5"
              />
            </div>

            <div>
              <Label>Account Type</Label>
              <div className="flex gap-2 mt-1.5">
                <Button
                  type="button"
                  variant={accountType === "buyer" ? "default" : "outline"}
                  className="flex-1"
                  onClick={() => setAccountType("buyer")}
                >
                  Buyer
                </Button>
                <Button
                  type="button"
                  variant={accountType === "seller" ? "default" : "outline"}
                  className="flex-1"
                  onClick={() => setAccountType("seller")}
                >
                  Seller
                </Button>
              </div>
            </div>

            <Link to="/search">
              <Button className="w-full" size="lg">Create Account</Button>
            </Link>
          </form>

          <div className="mt-6 pt-6 border-t text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="font-semibold text-gray-900 hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>

        <div className="text-center mt-8">
          <Link to="/" className="text-sm text-gray-600 hover:text-gray-900">
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}