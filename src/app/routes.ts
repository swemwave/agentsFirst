import { createBrowserRouter } from "react-router";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import BuyerSearch from "./pages/buyer/Search";
import PropertyDetails from "./pages/buyer/PropertyDetails";
import Wishlist from "./pages/buyer/Wishlist";
import AppointmentScheduler from "./pages/buyer/AppointmentScheduler";
import Calendar from "./pages/buyer/Calendar";
import ListHomeWizard from "./pages/seller/ListHomeWizard";
import SellerDashboard from "./pages/seller/SellerDashboard";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminListings from "./pages/admin/Listings";
import AdminBookmarks from "./pages/admin/Bookmarks";
import AdminAppointments from "./pages/admin/Appointments";
import BuyerProfile from "./pages/admin/BuyerProfile";
import SellerProfile from "./pages/admin/SellerProfile";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Landing,
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/signup",
    Component: SignUp,
  },
  // Buyer routes
  {
    path: "/search",
    Component: BuyerSearch,
  },
  {
    path: "/property/:id",
    Component: PropertyDetails,
  },
  {
    path: "/wishlist",
    Component: Wishlist,
  },
  {
    path: "/appointments/new",
    Component: AppointmentScheduler,
  },
  {
    path: "/calendar",
    Component: Calendar,
  },
  // Seller routes
  {
    path: "/list-home",
    Component: ListHomeWizard,
  },
  {
    path: "/seller/dashboard",
    Component: SellerDashboard,
  },
  // Admin routes
  {
    path: "/admin",
    Component: AdminDashboard,
  },
  {
    path: "/admin/listings",
    Component: AdminListings,
  },
  {
    path: "/admin/appointments",
    Component: AdminAppointments,
  },
  {
    path: "/admin/bookmarks",
    Component: AdminBookmarks,
  },
  {
    path: "/admin/buyer-profile",
    Component: BuyerProfile,
  },
  {
    path: "/admin/seller-profile",
    Component: SellerProfile,
  },
  // Catch-all route
  {
    path: "*",
    Component: Landing,
  },
]);
