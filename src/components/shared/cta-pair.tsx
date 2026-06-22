import { PrimaryButton } from "@/components/shared/primary-button";
import { CtaButton } from "@/components/shared/cta-button";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

type CtaPairProps = {
  className?: string;
  size?: "default" | "lg";
  /** stack on mobile, row on desktop */
  layout?: "row" | "stack";
};

/** Side-by-side CTAs with distinct purpose — audit (async) vs strategy call (live). */
export function CtaPair({ className, size = "lg", layout = "row" }: CtaPairProps) {
  return (
    <div
      className={cn(
        "flex gap-4",
        layout === "row"
          ? "flex-col sm:flex-row items-stretch sm:items-start justify-center"
          : "flex-col items-stretch",
        className
      )}
    >
      <div className="flex flex-col items-center sm:items-start gap-1.5">
        <PrimaryButton href={siteConfig.ctaPrimaryHref} size={size}>
          {siteConfig.ctaPrimary}
        </PrimaryButton>
        <p className="text-xs text-muted-foreground text-center sm:text-left max-w-[220px]">
          {siteConfig.ctaPrimaryHint}
        </p>
      </div>
      <div className="flex flex-col items-center sm:items-start gap-1.5">
        <CtaButton href={siteConfig.ctaSecondaryHref} variant="outline" size={size}>
          {siteConfig.ctaSecondary}
        </CtaButton>
        <p className="text-xs text-muted-foreground text-center sm:text-left max-w-[220px]">
          {siteConfig.ctaSecondaryHint}
        </p>
      </div>
    </div>
  );
}
