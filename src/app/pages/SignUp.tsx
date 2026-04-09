import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../auth/AuthContext";
import { getFirebaseErrorMessage } from "../auth/errors";
import { getDefaultPathForRole } from "../auth/types";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";

export default function SignUp() {
  const [accountType, setAccountType] = useState<"buyer" | "seller">("buyer");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { configError, signUp } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const profile = await signUp({
        fullName,
        email,
        password,
        role: accountType,
      });

      navigate(getDefaultPathForRole(profile.role), { replace: true });
    } catch (signUpError) {
      setError(getFirebaseErrorMessage(signUpError));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="h-screen overflow-auto bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="text-2xl font-semibold">
            FinditWithFahad
          </Link>
        </div>

        <div className="bg-white rounded-2xl border p-8 shadow-sm">
          <h2 className="text-2xl font-semibold mb-6">Create Account</h2>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {configError && (
              <div className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-900">
                {configError}
              </div>
            )}

            {error && (
              <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                {error}
              </div>
            )}

            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="John Smith"
                className="mt-1.5"
                autoComplete="name"
                value={fullName}
                onChange={(event) => setFullName(event.target.value)}
                disabled={isSubmitting || Boolean(configError)}
              />
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                className="mt-1.5"
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                disabled={isSubmitting || Boolean(configError)}
              />
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="At least 6 characters"
                className="mt-1.5"
                autoComplete="new-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                disabled={isSubmitting || Boolean(configError)}
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
                  disabled={isSubmitting || Boolean(configError)}
                >
                  Buyer
                </Button>
                <Button
                  type="button"
                  variant={accountType === "seller" ? "default" : "outline"}
                  className="flex-1"
                  onClick={() => setAccountType("seller")}
                  disabled={isSubmitting || Boolean(configError)}
                >
                  Seller
                </Button>
              </div>
            </div>

            <div className="text-xs text-gray-500">
              Admin accounts are provisioned separately in Firebase and cannot
              be self-created here.
            </div>

            <Button
              className="w-full"
              size="lg"
              type="submit"
              disabled={isSubmitting || Boolean(configError)}
            >
              {isSubmitting ? "Creating Account..." : "Create Account"}
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-semibold text-gray-900 hover:underline"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>

        <div className="text-center mt-8">
          <Link to="/" className="text-sm text-gray-600 hover:text-gray-900">
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
