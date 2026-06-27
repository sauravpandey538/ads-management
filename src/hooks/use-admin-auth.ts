"use client";

import { useCallback, useEffect, useState } from "react";
import {
  addAdminUser,
  createAdminUser,
  findUserByCredentials,
  findUserById,
  loadAdminSession,
  loadAdminUsers,
  saveAdminSession,
  saveAdminUsers,
  updateUserPassword,
  updateUserRole,
  type NewAdminUserInput,
} from "@/lib/admin-auth-persistence";
import type { AdminRole, AdminUser } from "@/lib/admin-rbac";

export function useAdminAuth() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [currentUser, setCurrentUser] = useState<AdminUser | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const storedUsers = loadAdminUsers();
    setUsers(storedUsers);
    const session = loadAdminSession();
    if (session) {
      setCurrentUser(findUserById(session.userId, storedUsers) ?? null);
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    saveAdminUsers(users);
  }, [users, hydrated]);

  const login = useCallback(
    (email: string, password: string): { ok: true } | { ok: false; error: string } => {
      const user = findUserByCredentials(email, password, users);
      if (!user) {
        return { ok: false, error: "Invalid email or password." };
      }
      saveAdminSession({ userId: user.id, signedInAt: new Date().toISOString() });
      setCurrentUser(user);
      return { ok: true };
    },
    [users],
  );

  const logout = useCallback(() => {
    saveAdminSession(null);
    setCurrentUser(null);
  }, []);

  const setUserRole = useCallback((userId: string, role: AdminRole) => {
    setUsers((prev) => {
      const next = updateUserRole(prev, userId, role);
      setCurrentUser((cu) => {
        if (cu?.id === userId) return findUserById(userId, next) ?? cu;
        return cu;
      });
      return next;
    });
  }, []);

  const setUserPassword = useCallback((userId: string, password: string) => {
    if (!password.trim()) return;
    setUsers((prev) => updateUserPassword(prev, userId, password.trim()));
  }, []);

  const addUser = useCallback(
    (input: NewAdminUserInput): { ok: true; user: AdminUser } | { ok: false; error: string } => {
      if (!input.name.trim() || !input.email.trim() || !input.password.trim()) {
        return { ok: false, error: "Name, email, and password are required." };
      }
      try {
        const user = createAdminUser(input);
        setUsers((prev) => addAdminUser(prev, user));
        return { ok: true, user };
      } catch (err) {
        return {
          ok: false,
          error: err instanceof Error ? err.message : "Could not add user.",
        };
      }
    },
    [],
  );

  return {
    users,
    currentUser,
    hydrated,
    login,
    logout,
    setUserRole,
    setUserPassword,
    addUser,
  };
}
