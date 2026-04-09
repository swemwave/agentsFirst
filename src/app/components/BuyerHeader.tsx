import { Search as SearchIcon, User, Calendar, Settings, LogOut, UserCircle } from "lucide-react";
import { Link } from "react-router";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "./ui/dropdown-menu";

interface BuyerHeaderProps {
  showSearch?: boolean;
}

export function BuyerHeader({ showSearch = true }: BuyerHeaderProps) {
  return (
    <div className="border-b px-6 py-4 flex items-center gap-4">
      <Link to="/" className="text-xl font-semibold">FinditWithFahad</Link>
      {showSearch && (
        <div className="flex-1 max-w-xl relative">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
          <Input 
            placeholder="Search by address, community..."
            className="pl-10"
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
              <div className="font-semibold">John Smith</div>
              <div className="text-xs text-gray-500">john.smith@email.com</div>
            </div>
            <div className="px-3 py-2 bg-blue-50 border-b">
              <div className="text-xs font-medium text-blue-900 mb-1">Example Profiles</div>
              <div className="text-xs text-blue-700">View sample buyer/seller profiles</div>
            </div>
            <DropdownMenuItem onClick={() => window.location.href = '/admin/buyer-profile'}>
              <UserCircle className="size-4 mr-2" />
              Buyer Profile Example
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => window.location.href = '/admin/seller-profile'}>
              <UserCircle className="size-4 mr-2" />
              Seller Profile Example
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Settings className="size-4 mr-2" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => window.location.href = '/'}>
              <LogOut className="size-4 mr-2" />
              Log Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
