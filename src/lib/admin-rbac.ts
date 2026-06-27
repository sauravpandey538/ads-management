import type { OutreachLead } from "@/lib/admin-mock-data";

export type AdminRole = "super-admin" | "admin" | "employee";

export type AdminUser = {
  id: string;
  email: string;
  password: string;
  name: string;
  role: AdminRole;
  /** Matches TEAM_ASSIGNEES — used to scope leads for employees. */
  assigneeName?: string;
};

export const ROLE_LABELS: Record<AdminRole, string> = {
  "super-admin": "Super admin",
  admin: "Admin",
  employee: "Employee",
};

export function canAccessDashboardMetrics(role: AdminRole): boolean {
  return role === "super-admin" || role === "admin";
}

export function canAccessTemplates(role: AdminRole): boolean {
  return role === "super-admin" || role === "admin";
}

export function canAssignAuditReport(role: AdminRole): boolean {
  return role === "super-admin" || role === "admin";
}

export function canManageTeamAccess(role: AdminRole): boolean {
  return role === "super-admin";
}

export function canViewAllLeads(role: AdminRole): boolean {
  return role === "super-admin" || role === "admin";
}

export function canCreateLeads(role: AdminRole): boolean {
  return role === "super-admin" || role === "admin";
}

export function canReassignLeadOwner(role: AdminRole): boolean {
  return role === "super-admin" || role === "admin";
}

/** Employees only see leads assigned to their assigneeName. */
export function filterLeadsForUser(leads: OutreachLead[], user: AdminUser): OutreachLead[] {
  if (canViewAllLeads(user.role)) return leads;
  if (!user.assigneeName) return [];
  return leads.filter((lead) => lead.assignedTo === user.assigneeName);
}

export function userCanAccessLead(lead: OutreachLead, user: AdminUser): boolean {
  if (canViewAllLeads(user.role)) return true;
  return lead.assignedTo === user.assigneeName;
}
