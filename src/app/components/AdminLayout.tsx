import { Link, useLocation } from "react-router";
import { LayoutDashboard, Home, Bookmark, Settings } from "lucide-react";
import { ReactNode } from "react";

interface AdminLayoutProps {
  children: ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const location = useLocation();

  const navItems = [
    { path: "/admin", icon: LayoutDashboard, label: "Dashboard" },
    { path: "/admin/listings", icon: Home, label: "Listings" },
    { path: "/admin/bookmarks", icon: Bookmark, label: "Bookmarks" },
  ];

  return (
    <div className="h-screen flex bg-white">
      {/* Sidebar */}
      <div className="w-64 border-r flex flex-col">
        <div className="p-6 border-b">
          <Link to="/" className="text-xl font-semibold">FinditWithFahad</Link>
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
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Icon className="size-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t">
          <Link
            to="#"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100"
          >
            <Settings className="size-5" />
            <span className="font-medium">Settings</span>
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {children}
      </div>
    </div>
  );
}
