"use client";

import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

/** Avatar with optional headshot — falls back to initials. */
export function PersonAvatar({
  name,
  imageSrc,
  className,
}: {
  name: string;
  imageSrc?: string;
  className?: string;
}) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2);

  if (imageSrc) {
    return (
      <div
        className={cn(
          "relative shrink-0 overflow-hidden rounded-full border-2 border-ink bg-play-blue/10",
          className
        )}
      >
        <Image
          src={imageSrc}
          alt={name}
          fill
          sizes="80px"
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center rounded-full border-2 border-ink bg-play-blue/15 font-bold text-play-blue-dark",
        className
      )}
      aria-hidden
    >
      {initials}
    </div>
  );
}

type PersonLinksProps = {
  name: string;
  role: string;
  company: string;
  linkedinUrl: string;
  companyUrl: string;
  className?: string;
};

/** Testimonial author row with LinkedIn + company links. */
export function PersonLinks({
  name,
  role,
  company,
  linkedinUrl,
  companyUrl,
  className,
}: PersonLinksProps) {
  return (
    <div className={cn("flex flex-wrap items-center gap-3", className)}>
      <PersonAvatar name={name} className="size-11 text-sm" />
      <div className="min-w-0">
        <p className="font-semibold text-sm text-ink">
          {name} · {role}, {company}
        </p>
        <div className="flex flex-wrap gap-3 mt-1">
          <a
            href={linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
          >
            LinkedIn
            <ExternalLink className="size-3" />
          </a>
          <a
            href={companyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs font-semibold text-ink/60 hover:text-ink hover:underline"
          >
            {companyUrl.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")}
            <ExternalLink className="size-3" />
          </a>
        </div>
      </div>
    </div>
  );
}

/** Founder LinkedIn button for about page. */
export function LinkedInButton({ href, className }: { href: string; className?: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex items-center gap-2 rounded-full border-2 border-ink bg-[#0A66C2] px-4 py-2 text-sm font-semibold text-white shadow-[2px_2px_0_0_var(--ink)] hover:brightness-110 transition-all",
        className
      )}
    >
      <span className="flex size-5 items-center justify-center rounded-sm bg-white text-[10px] font-black text-[#0A66C2]">
        in
      </span>
      LinkedIn
      <ExternalLink className="size-3.5 opacity-80" />
    </a>
  );
}
