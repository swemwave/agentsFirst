import { createElement } from "react";
import { createBrowserRouter } from "react-router";
import { ProtectedRoute, PublicOnlyRoute } from "./auth/RouteGuards";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import BuyerSearch from "./pages/buyer/Search";
import PropertyDetails from "./pages/buyer/PropertyDetails";
import Wishlist from "./pages/buyer/Wishlist";
import AppointmentScheduler from "./pages/buyer/AppointmentScheduler";
import Calendar from "./pages/buyer/Calendar";
import ListHomeWizard from "./pages/seller/ListHomeWizard";
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
    path: "/search",
    Component: BuyerSearch,
  },
  {
    path: "/property/:id",
    Component: PropertyDetails,
  },
  {
    element: createElement(PublicOnlyRoute),
    children: [
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/signup",
        Component: SignUp,
      },
    ],
  },
  {
    element: createElement(ProtectedRoute, {
      allowedRoles: ["buyer", "seller"],
    }),
    children: [
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
    ],
  },
  {
    element: createElement(ProtectedRoute, {
      allowedRoles: ["seller"],
    }),
    children: [
      {
        path: "/list-home",
        Component: ListHomeWizard,
      },
    ],
  },
  {
    element: createElement(ProtectedRoute, {
      allowedRoles: ["admin"],
    }),
    children: [
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
    ],
  },
  {
    path: "*",
    Component: Landing,
  },
]);
