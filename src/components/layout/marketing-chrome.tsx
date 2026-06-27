"use client";

import { usePathname } from "next/navigation";
import { SiteHeader } from "@/components/layout/site-header";
import { MobileStickyCta } from "@/components/layout/mobile-sticky-cta";
import { ScrollMicroCta } from "@/components/shared/scroll-micro-cta";

/** Marketing header + floating CTAs — hidden on /admin routes. Footer is MarketingFooter. */
export function MarketingChrome() {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) return null;

  return (
    <>
      <SiteHeader />
      <MobileStickyCta />
      <ScrollMicroCta />
    </>
  );
}
