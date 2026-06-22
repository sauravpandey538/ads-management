import Link from "next/link";
import * as SimpleIcons from "simple-icons";
import type { ReviewPlatform } from "@/lib/site-config";
import { cn } from "@/lib/utils";

type ReviewPlatformBadgesProps = {
  platforms: readonly ReviewPlatform[];
  className?: string;
  size?: "sm" | "md";
};

/** G2 / Clutch / on-site review badges — external links open in a new tab. */
export function ReviewPlatformBadges({
  platforms,
  className,
  size = "sm",
}: ReviewPlatformBadgesProps) {
  return (
    <div className={cn("flex flex-wrap items-center justify-center gap-2", className)}>
      {platforms.map((platform) => (
        <ReviewPlatformBadge key={platform.id} platform={platform} size={size} />
      ))}
    </div>
  );
}

function ReviewPlatformBadge({
  platform,
  size,
}: {
  platform: ReviewPlatform;
  size: "sm" | "md";
}) {
  const classes = cn(
    "inline-flex items-center gap-1.5 rounded-full border-2 border-ink bg-white font-semibold text-ink shadow-[2px_2px_0_0_var(--ink)] hover:bg-cream transition-colors",
    size === "sm" ? "px-3 py-1 text-[11px]" : "px-4 py-1.5 text-xs"
  );

  const content = (
    <>
      <PlatformIcon id={platform.id} />
      <span>{platform.name}</span>
      <span className="text-ink/45">·</span>
      <span>{platform.score}/5</span>
      <span className="sr-only">({platform.reviewCount} reviews)</span>
    </>
  );

  if (platform.external) {
    return (
      <a
        href={platform.href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
        title={`${platform.score}/5 on ${platform.name} — ${platform.reviewCount} reviews`}
      >
        {content}
      </a>
    );
  }

  return (
    <Link
      href={platform.href}
      className={classes}
      title={`${platform.score}/5 — ${platform.reviewCount} verified client stories`}
    >
      {content}
    </Link>
  );
}

function PlatformIcon({ id }: { id: ReviewPlatform["id"] }) {
  if (id === "g2") {
    const icon = SimpleIcons.siG2;
    return (
      <svg
        role="img"
        viewBox="0 0 24 24"
        aria-label="G2"
        className="size-3.5 shrink-0"
        fill={`#${icon.hex}`}
      >
        <path d={icon.path} />
      </svg>
    );
  }

  if (id === "clutch") {
    return (
      <span
        className="flex size-3.5 shrink-0 items-center justify-center rounded-sm bg-[#FF3D2E] text-[8px] font-black text-white leading-none"
        aria-hidden
      >
        C
      </span>
    );
  }

  return (
    <span
      className="flex size-3.5 shrink-0 items-center justify-center rounded-full bg-play-blue/20 text-[9px] font-bold text-play-blue-dark"
      aria-hidden
    >
      ★
    </span>
  );
}
