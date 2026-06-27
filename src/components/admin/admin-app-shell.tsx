"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut, Shield } from "lucide-react";
import { LeadsProvider } from "@/components/admin/leads-provider";
import { EmployeesProvider } from "@/components/admin/employees-provider";
import { AdminAuthProvider, useAdminPermissions, useAdminSession } from "@/components/admin/admin-auth-provider";
import { AdminRouteGuard } from "@/components/admin/admin-route-guard";
import { AdminNav } from "@/components/admin/admin-nav";
import { AdminPagePermissionsBanner } from "@/components/admin/admin-page-permissions-banner";
import { AdminToastProvider } from "@/components/admin/admin-toast";
import { TemplatesProvider } from "@/components/admin/templates-provider";
import { Button } from "@/components/ui/button";
import { PlayfulBadge } from "@/components/ui/playful-badge";
import { siteConfig } from "@/lib/site-config";
import { ROLE_LABELS } from "@/lib/admin-rbac";

function AdminShellInner({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { currentUser, logout } = useAdminSession();
  const { role } = useAdminPermissions();
  const isLoginPage = pathname === "/admin/login";

  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-muted/40 flex">
      <aside className="hidden w-56 shrink-0 border-r border-border bg-card md:flex md:flex-col">
        <div className="border-b border-border px-4 py-5">
          <Link
            href="/"
            className="text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:text-primary"
          >
            ← {siteConfig.name}
          </Link>
          <p className="mt-2 font-bold text-foreground">Outreach Admin</p>
          <p className="text-xs text-muted-foreground">Internal operations</p>
        </div>
        <AdminNav />
        <div className="mt-auto border-t border-border p-3">
          {currentUser && (
            <div className="space-y-2">
              <div>
                <p className="text-sm font-semibold text-foreground truncate">{currentUser.name}</p>
                <p className="text-xs text-muted-foreground truncate">{currentUser.email}</p>
                {role && (
                  <PlayfulBadge variant="chip" className="mt-1.5">
                    {ROLE_LABELS[role]}
                  </PlayfulBadge>
                )}
              </div>
              <Button type="button" variant="outline" size="sm" className="w-full" onClick={logout}>
                <LogOut className="size-3.5" />
                Sign out
              </Button>
            </div>
          )}
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="border-b border-border bg-card px-4 py-3 md:px-6 flex flex-wrap items-center justify-between gap-2">
          <p className="text-sm text-muted-foreground">
            {role === "employee"
              ? `Your assigned leads · ${currentUser?.assigneeName ?? "Team member"}`
              : "Manage leads, team attendance, templates, and outreach"}
          </p>
          <div className="flex items-center gap-2 md:hidden">
            {currentUser && role && (
              <PlayfulBadge variant="ticket" className="gap-1">
                <Shield className="size-3" />
                {ROLE_LABELS[role]}
              </PlayfulBadge>
            )}
            <Button type="button" variant="outline" size="sm" onClick={logout}>
              <LogOut className="size-3.5" />
              Sign out
            </Button>
          </div>
        </header>
        <div className="flex-1 p-4 md:p-6">
          <AdminPagePermissionsBanner />
          {children}
        </div>
      </div>
    </div>
  );
}

export function AdminAppShell({ children }: { children: React.ReactNode }) {
  return (
    <AdminAuthProvider>
      <AdminRouteGuard>
        <LeadsProvider>
          <EmployeesProvider>
            <TemplatesProvider>
              <AdminToastProvider>
                <AdminShellInner>{children}</AdminShellInner>
              </AdminToastProvider>
            </TemplatesProvider>
          </EmployeesProvider>
        </LeadsProvider>
      </AdminRouteGuard>
    </AdminAuthProvider>
  );
}
