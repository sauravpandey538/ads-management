import type { AdminUser } from "@/lib/admin-rbac";

export const ADMIN_AUTH_STORAGE_KEY = "admarkapture-admin-auth";
export const ADMIN_USERS_STORAGE_KEY = "admarkapture-admin-users";

/** Default internal accounts — passwords managed by super admin. */
export const seedAdminUsers: AdminUser[] = [
  {
    id: "user-nabila",
    email: "nabila@admarkapture.com",
    password: "admin123",
    name: "Nabila Farzin",
    role: "super-admin",
    assigneeName: "Nabila Farzin",
  },
  {
    id: "user-jordan",
    email: "jordan@admarkapture.com",
    password: "admin123",
    name: "Jordan Lee",
    role: "admin",
    assigneeName: "Jordan Lee",
  },
  {
    id: "user-priya",
    email: "priya@admarkapture.com",
    password: "admin123",
    name: "Priya Sharma",
    role: "admin",
    assigneeName: "Priya Sharma",
  },
  {
    id: "user-marcus",
    email: "marcus@admarkapture.com",
    password: "admin123",
    name: "Marcus Chen",
    role: "employee",
    assigneeName: "Marcus Chen",
  },
  {
    id: "user-elena",
    email: "elena@admarkapture.com",
    password: "admin123",
    name: "Elena Rodriguez",
    role: "employee",
    assigneeName: "Elena Rodriguez",
  },
];

export type AdminSession = {
  userId: string;
  signedInAt: string;
};
