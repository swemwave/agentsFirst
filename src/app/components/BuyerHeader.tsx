import { Search as SearchIcon, User, Calendar, LogOut, LogIn } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../auth/AuthContext";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

interface BuyerHeaderProps {
  showSearch?: boolean;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
}

export function BuyerHeader({
  showSearch = true,
  searchValue = "",
  onSearchChange,
}: BuyerHeaderProps) {
  const { profile, signOut } = useAuth();
  const navigate = useNavigate();

  async function handleSignOut() {
    await signOut();
    navigate("/", { replace: true });
  }

  return (
    <div className="border-b px-6 py-4 flex items-center gap-4">
      <Link to="/" className="text-xl font-semibold">
        FinditWithFahad
      </Link>
      {showSearch && (
        <div className="flex-1 max-w-xl relative">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
          <Input
            placeholder="Search by address, community..."
            className="pl-10"
            value={searchValue}
            onChange={(event) => onSearchChange?.(event.target.value)}
          />
        </div>
      )}
      {!showSearch && <div className="flex-1" />}
      <div className="flex items-center gap-1">
        <Link to="/calendar">
          <Button variant="ghost" size="sm" className="gap-2">
            <Calendar className="size-4" />
            Appointments
          </Button>
        </Link>
        <div className="w-px h-6 bg-gray-200 mx-2" />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <User className="size-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <div className="px-3 py-2 border-b">
              <div className="font-semibold">{profile?.fullName || "Guest"}</div>
              <div className="text-xs text-gray-500">
                {profile?.email || "Sign in to book appointments and save activity"}
              </div>
            </div>
            <DropdownMenuSeparator />
            {profile ? (
              <DropdownMenuItem onClick={() => void handleSignOut()}>
                <LogOut className="size-4 mr-2" />
                Log Out
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem onClick={() => navigate("/login")}>
                <LogIn className="size-4 mr-2" />
                Sign In
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
