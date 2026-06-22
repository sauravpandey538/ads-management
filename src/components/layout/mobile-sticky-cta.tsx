"use client";

import { siteConfig } from "@/lib/site-config";
import { PrimaryButton } from "@/components/shared/primary-button";
import { CtaButton } from "@/components/shared/cta-button";

/** Mobile CTAs — audit (async) and book call (live) stay distinct. */
export function MobileStickyCta() {
  return (
    <div className="fixed bottom-0 inset-x-0 z-40 border-t-2 border-ink/10 bg-background/95 p-2 backdrop-blur-md md:hidden">
      <div className="grid grid-cols-2 gap-2">
        <PrimaryButton
          href={siteConfig.ctaPrimaryHref}
          className="w-full justify-center text-[10px] sm:text-xs px-2"
        >
          Free Audit
        </PrimaryButton>
        <CtaButton
          href={siteConfig.ctaSecondaryHref}
          variant="outline"
          className="w-full justify-center text-[10px] sm:text-xs px-2"
        >
          Book Call
        </CtaButton>
      </div>
    </div>
  );
}
