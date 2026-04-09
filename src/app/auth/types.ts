export type AppRole = "buyer" | "seller" | "admin";

export interface UserProfile {
  uid: string;
  email: string;
  fullName: string;
  role: AppRole;
  createdAt?: unknown;
}

export function getDefaultPathForRole(role: AppRole) {
  switch (role) {
    case "admin":
      return "/admin";
    default:
      return "/search";
  }
}
