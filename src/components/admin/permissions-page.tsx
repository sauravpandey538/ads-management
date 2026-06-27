"use client";

import Link from "next/link";
import { CheckCircle2, Shield, XCircle } from "lucide-react";
import { useAdminPermissions, useAdminSession } from "@/components/admin/admin-auth-provider";
import { PlayfulBadge } from "@/components/ui/playful-badge";
import { PlayfulCard } from "@/components/ui/playful-card";
import {
  ADMIN_PAGE_PERMISSIONS,
  getAccessLabel,
  type PagePermission,
} from "@/lib/admin-permissions-catalog";
import { ROLE_LABELS, type AdminRole } from "@/lib/admin-rbac";
import { cn } from "@/lib/utils";

const ROLES: AdminRole[] = ["super-admin", "admin", "employee"];

function AccessBadge({ access }: { access: PagePermission["access"][AdminRole] }) {
  const label = getAccessLabel(access);
  if (access === "full") {
    return <PlayfulBadge variant="stamp">{label}</PlayfulBadge>;
  }
  if (access === "scoped") {
    return <PlayfulBadge variant="ticket">{label}</PlayfulBadge>;
  }
  return <PlayfulBadge variant="flag">{label}</PlayfulBadge>;
}

function RoleCapabilities({ page, role }: { page: PagePermission; role: AdminRole }) {
  const caps = page.capabilities[role];
  return (
    <div className="space-y-2 text-sm">
      {caps.allowed.map((item) => (
        <div key={item} className="flex items-start gap-2 text-foreground">
          <CheckCircle2 className="size-4 shrink-0 text-emerald-600 mt-0.5" />
          <span>{item}</span>
        </div>
      ))}
      {caps.restricted.map((item) => (
        <div key={item} className="flex items-start gap-2 text-muted-foreground">
          <XCircle className="size-4 shrink-0 mt-0.5" />
          <span>{item}</span>
        </div>
      ))}
    </div>
  );
}

/** Role-aware permissions reference — employees see their scope; super admin sees full matrix. */
export function PermissionsPage() {
  const { currentUser } = useAdminSession();
  const { role, isSuperAdmin, isEmployee } = useAdminPermissions();

  const myPages = ADMIN_PAGE_PERMISSIONS.filter((page) => {
    if (!role) return false;
    if (isEmployee) return page.access.employee !== "none" || page.id === "permissions";
    return true;
  });

  return (
    <div className="mx-auto max-w-5xl space-y-6 pb-8">
      <div>
        <PlayfulBadge variant="stamp" className="mb-3">
          Access control
        </PlayfulBadge>
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">Permissions</h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          {isSuperAdmin
            ? "Full permission matrix for every admin page and role."
            : isEmployee
              ? "What you can and cannot do in admin based on your employee role."
              : "Your admin role capabilities across each section."}
        </p>
        {currentUser && role && (
          <p className="mt-2 text-sm text-foreground">
            Signed in as <strong>{currentUser.name}</strong> · {ROLE_LABELS[role]}
            {currentUser.assigneeName && isEmployee && (
              <> · Lead scope: {currentUser.assigneeName}</>
            )}
          </p>
        )}
      </div>

      {!isSuperAdmin && role && (
        <PlayfulCard variant="flag" tone="sky" className="p-5">
          <h2 className="font-bold text-foreground flex items-center gap-2">
            <Shield className="size-4" />
            Your role summary
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {myPages.map((page) => (
              <div key={page.id} className="rounded-lg border border-border bg-card/80 p-4">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <Link href={page.path} className="font-semibold text-foreground hover:text-primary">
                    {page.label}
                  </Link>
                  <AccessBadge access={page.access[role]} />
                </div>
                <RoleCapabilities page={page} role={role} />
              </div>
            ))}
          </div>
        </PlayfulCard>
      )}

      {isSuperAdmin && (
        <div className="space-y-6">
          {ADMIN_PAGE_PERMISSIONS.map((page) => (
            <PlayfulCard key={page.id} variant="ticket" tone="neutral" className="p-5 sm:p-6">
              <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                <div>
                  <Link href={page.path} className="text-lg font-bold text-foreground hover:text-primary">
                    {page.label}
                  </Link>
                  <p className="text-sm text-muted-foreground mt-1">{page.description}</p>
                </div>
                <code className="text-xs text-muted-foreground">{page.path}</code>
              </div>
              <div className="grid gap-4 lg:grid-cols-3">
                {ROLES.map((r) => (
                  <div
                    key={r}
                    className={cn(
                      "rounded-lg border p-4",
                      r === "super-admin" && "border-primary/30 bg-primary/5",
                    )}
                  >
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <p className="font-semibold text-sm">{ROLE_LABELS[r]}</p>
                      <AccessBadge access={page.access[r]} />
                    </div>
                    <RoleCapabilities page={page} role={r} />
                  </div>
                ))}
              </div>
            </PlayfulCard>
          ))}
        </div>
      )}
    </div>
  );
}
