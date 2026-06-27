"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAdminPermissions, useAdminSession } from "@/components/admin/admin-auth-provider";

type AdminRouteGuardProps = {
  children: React.ReactNode;
};

/** Enforces sign-in and role-based route access for admin pages. */
export function AdminRouteGuard({ children }: AdminRouteGuardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { currentUser, hydrated } = useAdminSession();
  const { canAccessDashboardMetrics, canAccessTemplates, canManageTeamAccess } =
    useAdminPermissions();

  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    if (!hydrated) return;

    if (!currentUser && !isLoginPage) {
      router.replace("/admin/login");
      return;
    }

    if (currentUser && isLoginPage) {
      router.replace(canAccessDashboardMetrics ? "/admin/dashboard" : "/admin/leads");
      return;
    }

    if (!currentUser) return;

    if (!canAccessDashboardMetrics && pathname === "/admin/dashboard") {
      router.replace("/admin/leads");
      return;
    }

    if (!canAccessTemplates && pathname.startsWith("/admin/templates")) {
      router.replace("/admin/leads");
      return;
    }

    if (!canManageTeamAccess && pathname.startsWith("/admin/team")) {
      router.replace("/admin/leads");
    }
  }, [
    hydrated,
    currentUser,
    isLoginPage,
    pathname,
    router,
    canAccessDashboardMetrics,
    canAccessTemplates,
    canManageTeamAccess,
  ]);

  if (!hydrated) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center text-sm text-muted-foreground">
        Loading…
      </div>
    );
  }

  if (!currentUser && !isLoginPage) return null;
  if (currentUser && isLoginPage) return null;

  return <>{children}</>;
}
