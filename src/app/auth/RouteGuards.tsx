import { Navigate, Outlet, useLocation } from "react-router";
import { useAuth } from "./AuthContext";
import { type AppRole, getDefaultPathForRole } from "./types";

interface ProtectedRouteProps {
  allowedRoles: AppRole[];
}

function AuthStatusScreen({
  title,
  message,
}: {
  title: string;
  message: string;
}) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-lg rounded-2xl border bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-semibold mb-3">{title}</h1>
        <p className="text-sm text-gray-600">{message}</p>
      </div>
    </div>
  );
}

export function PublicOnlyRoute() {
  const { configError, loading, profile, user } = useAuth();

  if (configError) {
    return <Outlet />;
  }

  if (loading) {
    return (
      <AuthStatusScreen
        title="Checking your session"
        message="Please wait while we restore your account."
      />
    );
  }

  if (user && profile) {
    return <Navigate to={getDefaultPathForRole(profile.role)} replace />;
  }

  return <Outlet />;
}

export function ProtectedRoute({ allowedRoles }: ProtectedRouteProps) {
  const { configError, loading, profile, user } = useAuth();
  const location = useLocation();

  if (configError) {
    return (
      <AuthStatusScreen
        title="Firebase setup is incomplete"
        message={configError}
      />
    );
  }

  if (loading) {
    return (
      <AuthStatusScreen
        title="Checking your session"
        message="Please wait while we restore your account."
      />
    );
  }

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (!profile) {
    return (
      <AuthStatusScreen
        title="Account setup problem"
        message="Your Firebase Auth user is signed in, but no Firestore profile was found."
      />
    );
  }

  if (!allowedRoles.includes(profile.role)) {
    return <Navigate to={getDefaultPathForRole(profile.role)} replace />;
  }

  return <Outlet />;
}
