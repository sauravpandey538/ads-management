"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  KeyRound,
  LayoutDashboard,
  LayoutTemplate,
  Shield,
  Sparkles,
  UserCheck,
  Users,
} from "lucide-react";
import { useAdminPermissions } from "@/components/admin/admin-auth-provider";
import { cn } from "@/lib/utils";

const navItems = [
  {
    href: "/admin/dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    requiresMetrics: true,
  },
  { href: "/admin/leads", label: "Leads", icon: Users },
  { href: "/admin/employees", label: "Employees", icon: UserCheck },
  {
    href: "/admin/templates",
    label: "Templates",
    icon: LayoutTemplate,
    requiresTemplates: true,
  },
  { href: "/admin/how-it-works", label: "Audit process", icon: Sparkles },
  { href: "/admin/permissions", label: "Permissions", icon: KeyRound },
  {
    href: "/admin/team",
    label: "Team access",
    icon: Shield,
    requiresTeamAccess: true,
  },
] as const;

/** Sidebar nav filtered by signed-in user role. */
export function AdminNav() {
  const pathname = usePathname();
  const { canAccessDashboardMetrics, canAccessTemplates, canManageTeamAccess } =
    useAdminPermissions();

  const visibleItems = navItems.filter((item) => {
    if ("requiresMetrics" in item && item.requiresMetrics && !canAccessDashboardMetrics) {
      return false;
    }
    if ("requiresTemplates" in item && item.requiresTemplates && !canAccessTemplates) {
      return false;
    }
    if ("requiresTeamAccess" in item && item.requiresTeamAccess && !canManageTeamAccess) {
      return false;
    }
    return true;
  });

  return (
    <nav className="flex flex-col gap-1 p-3">
      {visibleItems.map((item) => {
        const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
        return (
          <Link
            key={item.label}
            href={item.href}
            className={cn(
              "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
              active
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground",
            )}
          >
            <item.icon className="size-4 shrink-0" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
