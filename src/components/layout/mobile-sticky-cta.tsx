"use client";

import { siteConfig } from "@/lib/site-config";
import { PrimaryButton } from "@/components/shared/primary-button";

/** Persistent mobile CTA — keeps audit request one tap away on small screens. */
export function MobileStickyCta() {
  return (
    <div className="fixed bottom-0 inset-x-0 z-40 border-t-2 border-ink/10 bg-background/95 p-3 backdrop-blur-md md:hidden">
      <PrimaryButton href="/free-audit" className="w-full justify-center text-xs sm:text-sm">
        {siteConfig.ctaPrimary}
      </PrimaryButton>
    </div>
  );
}
