"use client";

import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

/** Main content wrapper — no marketing bottom padding on admin routes. */
export function MarketingMain({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  return (
    <main className={cn("flex-1", !isAdmin && "pb-20 md:pb-0")}>{children}</main>
  );
}
