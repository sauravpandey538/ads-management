import type { AdminRole } from "@/lib/admin-rbac";

export type PermissionAccess = "full" | "scoped" | "none";

export type PagePermission = {
  id: string;
  label: string;
  path: string;
  description: string;
  /** Which roles can open this page. */
  access: Record<AdminRole, PermissionAccess>;
  capabilities: Record<
    AdminRole,
    { allowed: string[]; restricted: string[] }
  >;
};

export const ADMIN_PAGE_PERMISSIONS: PagePermission[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/admin/dashboard",
    description: "Outreach KPIs, pipeline metrics, audit delivery queue, and team workload.",
    access: {
      "super-admin": "full",
      admin: "full",
      employee: "none",
    },
    capabilities: {
      "super-admin": {
        allowed: [
          "View all KPIs and pipeline metrics",
          "Audit report delivery queue",
          "Outreach queue and team workload",
          "Send emails and assign audit reports",
        ],
        restricted: [],
      },
      admin: {
        allowed: [
          "View all KPIs and pipeline metrics",
          "Audit report delivery queue",
          "Outreach queue and team workload",
          "Send emails and assign audit reports",
        ],
        restricted: ["Cannot manage team access or add users"],
      },
      employee: {
        allowed: [],
        restricted: ["Page not accessible — use Leads for assigned work"],
      },
    },
  },
  {
    id: "leads",
    label: "Leads",
    path: "/admin/leads",
    description: "Lead records, follow-ups, audit checklist, and client portal links.",
    access: {
      "super-admin": "full",
      admin: "full",
      employee: "scoped",
    },
    capabilities: {
      "super-admin": {
        allowed: [
          "View and edit all leads",
          "Add leads and reassign owners",
          "Publish audit reports to client portal",
        ],
        restricted: [],
      },
      admin: {
        allowed: [
          "View and edit all leads",
          "Add leads and reassign owners",
          "Publish audit reports to client portal",
        ],
        restricted: ["Cannot manage team access"],
      },
      employee: {
        allowed: [
          "View and edit assigned leads only",
          "Update checklist, notes, and follow-ups",
          "Copy client portal link",
        ],
        restricted: [
          "Cannot add leads",
          "Cannot reassign lead owner",
          "Cannot publish final audit report",
        ],
      },
    },
  },
  {
    id: "employees",
    label: "Employees",
    path: "/admin/employees",
    description: "Team attendance calendar with daily status and targets achieved.",
    access: {
      "super-admin": "full",
      admin: "full",
      employee: "full",
    },
    capabilities: {
      "super-admin": {
        allowed: [
          "View all team members",
          "Mark attendance for any employee",
          "Log targets achieved on present days",
        ],
        restricted: [],
      },
      admin: {
        allowed: [
          "View all team members",
          "Mark attendance for any employee",
          "Log targets achieved on present days",
        ],
        restricted: [],
      },
      employee: {
        allowed: [
          "View all team members",
          "Mark own attendance and targets achieved",
        ],
        restricted: ["Cannot manage other users' roles"],
      },
    },
  },
  {
    id: "templates",
    label: "Templates",
    path: "/admin/templates",
    description: "Email templates for outreach and audit communication.",
    access: {
      "super-admin": "full",
      admin: "full",
      employee: "none",
    },
    capabilities: {
      "super-admin": {
        allowed: ["Create, edit, and delete email templates"],
        restricted: [],
      },
      admin: {
        allowed: ["Create, edit, and delete email templates"],
        restricted: [],
      },
      employee: {
        allowed: [],
        restricted: ["Page not accessible"],
      },
    },
  },
  {
    id: "audit-process",
    label: "Audit process",
    path: "/admin/how-it-works",
    description: "Internal guide from lead intake through report delivery.",
    access: {
      "super-admin": "full",
      admin: "full",
      employee: "full",
    },
    capabilities: {
      "super-admin": { allowed: ["Read full audit workflow guide"], restricted: [] },
      admin: { allowed: ["Read full audit workflow guide"], restricted: [] },
      employee: { allowed: ["Read full audit workflow guide"], restricted: [] },
    },
  },
  {
    id: "team",
    label: "Team access",
    path: "/admin/team",
    description: "Manage internal user roles, passwords, and new employee accounts.",
    access: {
      "super-admin": "full",
      admin: "none",
      employee: "none",
    },
    capabilities: {
      "super-admin": {
        allowed: [
          "Add new employees",
          "Change roles and passwords",
          "View all role definitions",
        ],
        restricted: [],
      },
      admin: {
        allowed: [],
        restricted: ["Page not accessible"],
      },
      employee: {
        allowed: [],
        restricted: ["Page not accessible"],
      },
    },
  },
  {
    id: "permissions",
    label: "Permissions",
    path: "/admin/permissions",
    description: "Role capabilities and page access reference.",
    access: {
      "super-admin": "full",
      admin: "full",
      employee: "full",
    },
    capabilities: {
      "super-admin": {
        allowed: ["View full permission matrix for all roles and pages"],
        restricted: [],
      },
      admin: {
        allowed: ["View admin role permissions and page access"],
        restricted: ["Cannot view super-admin-only team management details"],
      },
      employee: {
        allowed: ["View own role permissions and allowed actions"],
        restricted: ["Cannot view other roles' full matrix"],
      },
    },
  },
];

export function getPagePermissionByPath(pathname: string): PagePermission | undefined {
  return ADMIN_PAGE_PERMISSIONS.find(
    (page) => pathname === page.path || pathname.startsWith(`${page.path}/`),
  );
}

export function getAccessLabel(access: PermissionAccess): string {
  if (access === "full") return "Full access";
  if (access === "scoped") return "Assigned scope only";
  return "No access";
}
