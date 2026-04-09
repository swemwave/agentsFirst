import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { Shield, User } from "lucide-react";
import { useAuth } from "../auth/AuthContext";
import { getFirebaseErrorMessage } from "../auth/errors";
import { getDefaultPathForRole } from "../auth/types";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";

export default function Login() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { configError, signIn } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const redirectTarget =
    (location.state as { from?: { pathname?: string } } | null)?.from?.pathname ??
    null;

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const profile = await signIn({
        email,
        password,
        access: isAdmin ? "admin" : "client",
      });

      navigate(redirectTarget ?? getDefaultPathForRole(profile.role), {
        replace: true,
      });
    } catch (signInError) {
      setError(getFirebaseErrorMessage(signInError));
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
          <h2 className="text-2xl font-semibold mb-2">Sign In</h2>
          <p className="text-sm text-gray-600 mb-6">
            Buyer and seller accounts use Client Account. Admin accounts must be
            created separately in Firebase.
          </p>

          <div className="flex gap-2 mb-6">
            <button
              type="button"
              onClick={() => setIsAdmin(false)}
              className={`flex-1 py-2.5 px-4 rounded-lg border font-medium text-sm transition-all ${
                !isAdmin
                  ? "bg-gray-900 text-white border-gray-900"
                  : "bg-white text-gray-600 border-gray-200 hover:border-gray-300"
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
                  ? "bg-gray-900 text-white border-gray-900"
                  : "bg-white text-gray-600 border-gray-200 hover:border-gray-300"
              }`}
            >
              <Shield className="size-4 inline-block mr-2" />
              Admin Account
            </button>
          </div>

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
                placeholder="********"
                className="mt-1.5"
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                disabled={isSubmitting || Boolean(configError)}
              />
            </div>

            <div className="flex justify-end">
              <Link to="#" className="text-sm text-gray-600 hover:text-gray-900">
                Forgot password?
              </Link>
            </div>

            <Button
              className="w-full"
              size="lg"
              type="submit"
              disabled={isSubmitting || Boolean(configError)}
            >
              {isSubmitting ? "Signing In..." : `Sign In${isAdmin ? " as Admin" : ""}`}
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t text-center">
            <p className="text-sm text-gray-600">
              Don&apos;t have an account?{" "}
              <Link
                to="/signup"
                className="font-semibold text-gray-900 hover:underline"
              >
                Create account
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
