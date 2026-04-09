import { Link } from "react-router";
import { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Shield, User } from "lucide-react";

export default function Login() {
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <div className="h-screen overflow-auto bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="text-2xl font-semibold">FinditWithFahad</Link>
        </div>

        <div className="bg-white rounded-2xl border p-8 shadow-sm">
          <h2 className="text-2xl font-semibold mb-2">Sign In</h2>
          
          {/* Account Type Toggle */}
          <div className="flex gap-2 mb-6">
            <button
              type="button"
              onClick={() => setIsAdmin(false)}
              className={`flex-1 py-2.5 px-4 rounded-lg border font-medium text-sm transition-all ${
                !isAdmin 
                  ? 'bg-gray-900 text-white border-gray-900' 
                  : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
              }`}
            >
              <User className="size-4 inline-block mr-2" />
              Client Account
            </button>
            <button
              type="button"
              onClick={() => setIsAdmin(true)}
              className={`flex-1 py-2.5 px-4 rounded-lg border font-medium text-sm transition-all ${
                isAdmin 
                  ? 'bg-gray-900 text-white border-gray-900' 
                  : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
              }`}
            >
              <Shield className="size-4 inline-block mr-2" />
              Admin Account
            </button>
          </div>
          
          <form className="space-y-4">
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

            <div className="flex justify-end">
              <Link to="#" className="text-sm text-gray-600 hover:text-gray-900">
                Forgot password?
              </Link>
            </div>

            <Link to={isAdmin ? "/admin" : "/search"}>
              <Button className="w-full" size="lg">
                Sign In {isAdmin && "as Admin"}
              </Button>
            </Link>
          </form>

          <div className="mt-6 pt-6 border-t text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link to="/signup" className="font-semibold text-gray-900 hover:underline">
                Create account
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