"use client";

import { useEffect } from "react";
import Cal, { getCalApi } from "@calcom/embed-react";
import { ExternalLink } from "lucide-react";
import { getCalLink, siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

type CalendarEmbedProps = {
  className?: string;
  height?: number;
};

/** Cal.com inline calendar — real booking UI via @calcom/embed-react. */
export function CalendarEmbed({ className, height = 600 }: CalendarEmbedProps) {
  const calLink = getCalLink();

  useEffect(() => {
    if (!calLink) return;
    (async () => {
      const cal = await getCalApi();
      cal("ui", {
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    })();
  }, [calLink]);

  if (!calLink) return null;

  const calendarPageUrl = siteConfig.calendarUrl.startsWith("http")
    ? siteConfig.calendarUrl
    : `https://cal.com/${calLink}`;

  return (
    <div className={cn("card-2d overflow-hidden bg-white", className)}>
      <div className="flex items-center justify-between gap-2 border-b-2 border-ink/10 bg-cream/50 px-4 py-2.5">
        <p className="text-xs font-semibold text-ink/70">
          {siteConfig.ctaSecondary} — pick a date & time below
        </p>
        <a
          href={calendarPageUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline shrink-0"
        >
          Open in new tab
          <ExternalLink className="size-3" />
        </a>
      </div>
      <Cal
        calLink={calLink}
        style={{ width: "100%", height, overflow: "auto" }}
        config={{ layout: "month_view" }}
      />
    </div>
  );
}
