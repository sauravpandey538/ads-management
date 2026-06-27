"use client";

import { createContext, useContext, useMemo, type ReactNode } from "react";
import { useAdminAuth } from "@/hooks/use-admin-auth";
import {
  canAssignAuditReport,
  canCreateLeads,
  canManageTeamAccess,
  canReassignLeadOwner,
  filterLeadsForUser,
  type AdminRole,
} from "@/lib/admin-rbac";
import type { OutreachLead } from "@/lib/admin-mock-data";
import { useLeads } from "@/components/admin/leads-provider";

type AdminAuthStore = ReturnType<typeof useAdminAuth>;

const AdminAuthContext = createContext<AdminAuthStore | null>(null);

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const store = useAdminAuth();
  return <AdminAuthContext.Provider value={store}>{children}</AdminAuthContext.Provider>;
}

export function useAdminSession() {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) {
    throw new Error("useAdminSession must be used within AdminAuthProvider");
  }
  return ctx;
}

/** Role-based permission flags for the signed-in admin user. */
export function useAdminPermissions() {
  const { currentUser } = useAdminSession();
  const role: AdminRole | null = currentUser?.role ?? null;

  return useMemo(
    () => ({
      role,
      isSuperAdmin: role === "super-admin",
      isAdmin: role === "admin",
      isEmployee: role === "employee",
      canAccessDashboardMetrics: role === "super-admin" || role === "admin",
      canAccessTemplates: role === "super-admin" || role === "admin",
      canAssignAuditReport: role ? canAssignAuditReport(role) : false,
      canManageTeamAccess: role ? canManageTeamAccess(role) : false,
      canCreateLeads: role ? canCreateLeads(role) : false,
      canReassignLeadOwner: role ? canReassignLeadOwner(role) : false,
    }),
    [role],
  );
}

/** Leads visible to the current user — employees see assigned leads only. */
export function useScopedLeads() {
  const { leads, ...rest } = useLeads();
  const { currentUser } = useAdminSession();

  const scopedLeads = useMemo(() => {
    if (!currentUser) return [] as OutreachLead[];
    return filterLeadsForUser(leads, currentUser);
  }, [leads, currentUser]);

  return { leads: scopedLeads, allLeads: leads, ...rest };
}
