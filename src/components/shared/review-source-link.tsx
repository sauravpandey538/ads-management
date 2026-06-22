import Link from "next/link";
import { ExternalLink } from "lucide-react";
import {
  clientRating,
  getPrimaryReviewPlatform,
  reviewPlatforms,
} from "@/lib/site-config";
import { ReviewPlatformBadges } from "@/components/shared/review-platform-badges";
import { StarRating } from "@/components/shared/star-rating";
import { cn } from "@/lib/utils";

type ReviewSourceLinkProps = {
  className?: string;
  /** Hero uses a compact inline layout; testimonials page uses a badge style. */
  variant?: "hero" | "badge";
};

/** Clickable hero rating tied to G2, Clutch, and on-site client testimonials. */
export function ReviewSourceLink({ className, variant = "hero" }: ReviewSourceLinkProps) {
  const primary = getPrimaryReviewPlatform();

  if (variant === "badge") {
    return (
      <div className={cn("flex flex-col gap-3", className)}>
        <PrimaryReviewBadge platform={primary} />
        <ReviewPlatformBadges platforms={reviewPlatforms} />
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col items-center gap-3", className)}>
      <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-sm text-muted-foreground">
        <StarRating value={clientRating.score} size="sm" />
        <span>
          <span className="font-semibold text-ink">{clientRating.score} stars</span> across{" "}
          {clientRating.clientCount}+ SaaS clients
        </span>
        {primary.external ? (
          <a
            href={primary.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-0.5 text-xs font-semibold text-primary underline-offset-2 hover:underline"
            title={clientRating.methodology}
          >
            Verified on {primary.name}
            <ExternalLink className="size-3" aria-hidden />
          </a>
        ) : (
          <Link
            href={primary.href}
            className="group inline-flex items-center gap-0.5 text-xs font-semibold text-primary underline-offset-2 hover:underline"
            title={clientRating.methodology}
          >
            Verified on {primary.name}
            <ExternalLink className="size-3" aria-hidden />
          </Link>
        )}
      </div>
      <ReviewPlatformBadges platforms={reviewPlatforms} />
    </div>
  );
}

function PrimaryReviewBadge({ platform }: { platform: ReturnType<typeof getPrimaryReviewPlatform> }) {
  const classes =
    "inline-flex items-center gap-2 rounded-full border-2 border-ink bg-white px-4 py-2 text-sm font-semibold text-ink shadow-[2px_2px_0_0_var(--ink)] hover:bg-cream transition-colors w-fit";

  const content = (
    <>
      <StarRating value={clientRating.score} size="sm" />
      <span>{clientRating.score}/5</span>
      <span className="text-ink/50">·</span>
      <span>Verified on {platform.name}</span>
      <ExternalLink className="size-3.5 text-ink/50" aria-hidden />
    </>
  );

  if (platform.external) {
    return (
      <a
        href={platform.href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
        title={clientRating.methodology}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={platform.href} className={classes} title={clientRating.methodology}>
      {content}
    </Link>
  );
}
