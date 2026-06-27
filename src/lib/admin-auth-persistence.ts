import {
  ADMIN_AUTH_STORAGE_KEY,
  ADMIN_USERS_STORAGE_KEY,
  seedAdminUsers,
  type AdminSession,
} from "@/lib/admin-auth-data";
import type { AdminRole, AdminUser } from "@/lib/admin-rbac";

export function loadAdminUsers(): AdminUser[] {
  if (typeof window === "undefined") return seedAdminUsers;
  try {
    const raw = localStorage.getItem(ADMIN_USERS_STORAGE_KEY);
    if (raw) return JSON.parse(raw) as AdminUser[];
  } catch {
    /* fall through */
  }
  return seedAdminUsers;
}

export function saveAdminUsers(users: AdminUser[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(ADMIN_USERS_STORAGE_KEY, JSON.stringify(users));
}

export function loadAdminSession(): AdminSession | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(ADMIN_AUTH_STORAGE_KEY);
    if (raw) return JSON.parse(raw) as AdminSession;
  } catch {
    /* fall through */
  }
  return null;
}

export function saveAdminSession(session: AdminSession | null): void {
  if (typeof window === "undefined") return;
  if (session) {
    localStorage.setItem(ADMIN_AUTH_STORAGE_KEY, JSON.stringify(session));
  } else {
    localStorage.removeItem(ADMIN_AUTH_STORAGE_KEY);
  }
}

export function findUserByCredentials(
  email: string,
  password: string,
  users: AdminUser[],
): AdminUser | undefined {
  const normalized = email.trim().toLowerCase();
  return users.find(
    (u) => u.email.toLowerCase() === normalized && u.password === password,
  );
}

export function findUserById(id: string, users: AdminUser[]): AdminUser | undefined {
  return users.find((u) => u.id === id);
}

export function updateUserRole(
  users: AdminUser[],
  userId: string,
  role: AdminRole,
): AdminUser[] {
  return users.map((u) => (u.id === userId ? { ...u, role } : u));
}

export function updateUserPassword(
  users: AdminUser[],
  userId: string,
  password: string,
): AdminUser[] {
  return users.map((u) => (u.id === userId ? { ...u, password } : u));
}

export type NewAdminUserInput = {
  name: string;
  email: string;
  password: string;
  role: AdminRole;
  assigneeName?: string;
};

export function createAdminUser(input: NewAdminUserInput): AdminUser {
  const name = input.name.trim();
  const email = input.email.trim().toLowerCase();
  return {
    id: `user-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
    name,
    email,
    password: input.password,
    role: input.role,
    assigneeName: input.assigneeName?.trim() || name,
  };
}

export function addAdminUser(users: AdminUser[], user: AdminUser): AdminUser[] {
  if (users.some((u) => u.email.toLowerCase() === user.email.toLowerCase())) {
    throw new Error("An account with this email already exists.");
  }
  return [...users, user];
}

export function getAssigneeOptions(users: AdminUser[]): string[] {
  return [...new Set(users.map((u) => u.assigneeName ?? u.name))].sort();
}
