"use client";

import { useState } from "react";
import { ChevronDown, Quote } from "lucide-react";
import { Card2D } from "@/components/ui/card-2d";
import { PlayfulBadge } from "@/components/ui/playful-badge";
import { Button } from "@/components/ui/button";
import type { ClientTestimonial } from "@/lib/site-config";
import { cn } from "@/lib/utils";

type TestimonialCardProps = {
  testimonial: ClientTestimonial;
  /** Compact cards for homepage grid; expanded layout for testimonials page. */
  variant?: "compact" | "full";
  defaultExpanded?: boolean;
};

/** Expandable client story card — summary upfront, full issue/approach/progress on read more. */
export function TestimonialCard({
  testimonial,
  variant = "compact",
  defaultExpanded = false,
}: TestimonialCardProps) {
  const [expanded, setExpanded] = useState(defaultExpanded);
  const primaryMetric =
    testimonial.metrics.find((m) => m.highlight) ?? testimonial.metrics[0];

  return (
    <Card2D
      hover={!expanded}
      className={cn(
        "overflow-hidden bg-white transition-shadow",
        variant === "full" && "p-0"
      )}
    >
      <div className={cn(variant === "compact" ? "p-6" : "p-6 sm:p-8")}>
        <div
          className={cn(
            "flex gap-4",
            variant === "full" ? "flex-col md:flex-row md:items-start md:justify-between" : "flex-col"
          )}
        >
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <h3
                className={cn(
                  "font-bold text-ink",
                  variant === "full" ? "text-2xl" : "text-xl"
                )}
              >
                {testimonial.company}
              </h3>
              <PlayfulBadge variant="chip">{testimonial.vertical}</PlayfulBadge>
              <PlayfulBadge variant="stamp">{testimonial.spend} spend</PlayfulBadge>
            </div>

            <div className="flex flex-wrap gap-1.5 mb-4">
              {testimonial.channels.map((channel) => (
                <span
                  key={channel}
                  className="rounded-full border-2 border-ink/15 bg-sky/20 px-2.5 py-0.5 text-[10px] font-semibold text-ink"
                >
                  {channel}
                </span>
              ))}
              <span className="rounded-full border-2 border-ink/15 bg-muted/60 px-2.5 py-0.5 text-[10px] font-semibold text-muted-foreground">
                {testimonial.timeline}
              </span>
            </div>

            <p
              className={cn(
                "font-bold text-primary leading-snug",
                variant === "full" ? "text-xl sm:text-2xl" : "text-lg sm:text-xl"
              )}
            >
              {testimonial.headline}
            </p>

            <div className="mt-4 flex gap-3 rounded-xl border-2 border-ink/10 bg-cream/50 p-3">
              <Quote className="size-4 shrink-0 text-primary mt-0.5" aria-hidden />
              <p className="text-sm text-ink/80 leading-relaxed italic">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
            </div>

            <p className="mt-3 text-xs text-muted-foreground">
              — {testimonial.contact.name}, {testimonial.contact.role}
            </p>
          </div>

          <div
            className={cn(
              "shrink-0 rounded-2xl border-2 border-ink bg-sun/30 p-5 text-center card-2d-sm shadow-none",
              variant === "full" ? "md:min-w-[160px]" : "self-start"
            )}
          >
            <p className="text-3xl sm:text-4xl font-bold text-ink">{primaryMetric.value}</p>
            <p className="mt-1 text-xs font-medium text-muted-foreground">{primaryMetric.label}</p>
          </div>
        </div>

        {/* Collapsed preview: first metric row */}
        {!expanded && (
          <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-2 border-t-2 border-ink/10 pt-4">
            {testimonial.metrics.slice(0, 4).map((metric) => (
              <div key={metric.label} className="rounded-lg bg-muted/40 px-2 py-2 text-center">
                <p className="text-sm font-bold text-ink">{metric.value}</p>
                <p className="text-[10px] text-muted-foreground leading-tight">{metric.label}</p>
              </div>
            ))}
          </div>
        )}

        {expanded && (
          <div className="mt-6 space-y-5 border-t-2 border-ink/10 pt-6 animate-in fade-in slide-in-from-top-2 duration-300">
            <StoryBlock title="The issue" body={testimonial.issue} tone="coral" />
            <StoryBlock title="Our approach" body={testimonial.approach} tone="blue" />
            <StoryBlock title="How it's going" body={testimonial.progress} tone="mint" />

            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">
                Results at a glance
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {testimonial.metrics.map((metric) => (
                  <div
                    key={metric.label}
                    className={cn(
                      "rounded-xl border-2 px-3 py-3 text-center",
                      metric.highlight
                        ? "border-ink bg-sun/25"
                        : "border-ink/15 bg-white"
                    )}
                  >
                    <p className="text-lg font-bold text-ink">{metric.value}</p>
                    <p className="text-[10px] text-muted-foreground">{metric.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 rounded-xl border-2 border-ink/10 bg-muted/30 px-4 py-3">
              <div className="flex size-10 items-center justify-center rounded-full border-2 border-ink/20 bg-play-blue/15 text-sm font-bold text-play-blue-dark">
                {testimonial.contact.name[0]}
              </div>
              <div>
                <p className="text-sm font-semibold text-ink">{testimonial.contact.name}</p>
                <p className="text-xs text-muted-foreground">
                  {testimonial.contact.role} · {testimonial.company}
                </p>
              </div>
              <div className="ml-auto flex flex-wrap gap-2 text-[10px] font-semibold text-muted-foreground">
                <span>{testimonial.spend}/mo</span>
                <span>·</span>
                <span>{testimonial.timeline}</span>
              </div>
            </div>
          </div>
        )}

        <div className="mt-5 flex justify-center sm:justify-start">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setExpanded((open) => !open)}
            aria-expanded={expanded}
            className="rounded-full border-2 border-ink bg-white font-semibold text-ink shadow-[2px_2px_0_0_var(--ink)] hover:bg-cream"
          >
            {expanded ? "Show less" : "Read full story"}
            <ChevronDown
              className={cn(
                "size-4 transition-transform duration-300",
                expanded && "rotate-180"
              )}
            />
          </Button>
        </div>
      </div>
    </Card2D>
  );
}

function StoryBlock({
  title,
  body,
  tone,
}: {
  title: string;
  body: string;
  tone: "coral" | "blue" | "mint";
}) {
  const accent = {
    coral: "border-primary/40 bg-primary/5",
    blue: "border-play-blue/40 bg-play-blue/5",
    mint: "border-mint/50 bg-mint/10",
  }[tone];

  return (
    <div className={cn("rounded-xl border-l-4 pl-4 py-1", accent)}>
      <p className="text-xs font-bold uppercase tracking-wider text-ink mb-1.5">{title}</p>
      <p className="text-sm text-muted-foreground leading-relaxed">{body}</p>
    </div>
  );
}
