"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Shield } from "lucide-react";
import { useAdminPermissions } from "@/components/admin/admin-auth-provider";
import { PlayfulBadge } from "@/components/ui/playful-badge";
import { PlayfulCard } from "@/components/ui/playful-card";
import {
  getAccessLabel,
  getPagePermissionByPath,
} from "@/lib/admin-permissions-catalog";
import { ROLE_LABELS, type AdminRole } from "@/lib/admin-rbac";

const ROLES: AdminRole[] = ["super-admin", "admin", "employee"];

/** Super admin only — shows role access matrix for the current admin page. */
export function AdminPagePermissionsBanner() {
  const pathname = usePathname();
  const { isSuperAdmin } = useAdminPermissions();

  if (!isSuperAdmin || pathname === "/admin/login") return null;

  const page = getPagePermissionByPath(pathname);
  if (!page) return null;

  return (
    <PlayfulCard variant="pin" tone="sky" className="mb-5 p-4">
      <div className="flex flex-wrap items-center gap-2 mb-3">
        <Shield className="size-4 text-primary" />
        <p className="text-sm font-bold text-foreground">
          Page permissions · {page.label}
        </p>
        <Link
          href="/admin/permissions"
          className="text-xs font-semibold text-primary hover:underline ml-auto"
        >
          Full matrix →
        </Link>
      </div>
      <div className="grid gap-2 sm:grid-cols-3">
        {ROLES.map((role) => (
          <div
            key={role}
            className="rounded-lg border border-border/80 bg-card/80 px-3 py-2 text-xs"
          >
            <div className="flex items-center justify-between gap-2 mb-1">
              <span className="font-semibold text-foreground">{ROLE_LABELS[role]}</span>
              <PlayfulBadge variant="chip">{getAccessLabel(page.access[role])}</PlayfulBadge>
            </div>
            <ul className="space-y-0.5 text-muted-foreground">
              {page.capabilities[role].allowed.slice(0, 2).map((item) => (
                <li key={item}>✓ {item}</li>
              ))}
              {page.capabilities[role].restricted.slice(0, 1).map((item) => (
                <li key={item}>✗ {item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </PlayfulCard>
  );
}
