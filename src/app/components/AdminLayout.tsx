import { Link, useLocation, useNavigate } from "react-router";
import { LayoutDashboard, Home, Bookmark, LogOut } from "lucide-react";
import { type ReactNode } from "react";
import { useAuth } from "../auth/AuthContext";
import { Button } from "./ui/button";

interface AdminLayoutProps {
  children: ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { profile, signOut } = useAuth();

  const navItems = [
    { path: "/admin", icon: LayoutDashboard, label: "Dashboard" },
    { path: "/admin/listings", icon: Home, label: "Listings" },
    { path: "/admin/bookmarks", icon: Bookmark, label: "Bookmarks" },
  ];

  async function handleSignOut() {
    await signOut();
    navigate("/", { replace: true });
  }

  return (
    <div className="h-screen flex bg-white">
      <div className="w-64 border-r flex flex-col">
        <div className="p-6 border-b">
          <Link to="/" className="text-xl font-semibold">
            FinditWithFahad
          </Link>
          <div className="text-sm text-gray-600 mt-1">Admin Console</div>
        </div>

        <nav className="flex-1 p-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition-colors ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <Icon className="size-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t space-y-3">
          <div className="px-4">
            <div className="text-sm font-medium text-gray-900">
              {profile?.fullName || "Admin"}
            </div>
            <div className="text-xs text-gray-500 break-all">{profile?.email}</div>
          </div>
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 px-4 py-3 h-auto text-gray-700"
            onClick={() => void handleSignOut()}
          >
            <LogOut className="size-5" />
            <span className="font-medium">Log Out</span>
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-auto">{children}</div>
    </div>
  );
}
