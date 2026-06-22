"use client";

import { PlayfulBadge } from "@/components/ui/playful-badge";
import { PlayfulCard, PlayfulCardLabel, type PlayfulCardVariant } from "@/components/ui/playful-card";
import { FunnelIllustration } from "@/components/illustrations/ad-illustrations";
import { FadeIn } from "@/components/motion/fade-in";
import { Float } from "@/components/motion/float";

const saasSignals: {
  title: string;
  description: string;
  badge: string;
  variant: PlayfulCardVariant;
  tone: "mint" | "sun" | "sky" | "neutral";
  labelVariant: PlayfulCardVariant;
}[] = [
  {
    title: "Unit economics first",
    description:
      "We plan spend around payback, ACV, sales cycle, and close rates — not platform defaults.",
    badge: "CAC aware",
    variant: "ticket",
    tone: "sun",
    labelVariant: "ticket",
  },
  {
    title: "Funnel-stage messaging",
    description:
      "Different ads for problem-aware vs. solution-aware buyers. No one-size-fits-all creative.",
    badge: "ICP mapped",
    variant: "stamp",
    tone: "mint",
    labelVariant: "stamp",
  },
  {
    title: "Down-funnel optimization",
    description:
      "Lead quality, SQL conversion, and pipeline velocity feed back into bids and budgets weekly.",
    badge: "CRM connected",
    variant: "pin",
    tone: "sky",
    labelVariant: "pin",
  },
  {
    title: "Channel orchestration",
    description:
      "Google captures demand. LinkedIn targets titles. Meta retargets. YouTube educates. Each has a job.",
    badge: "Full funnel",
    variant: "flag",
    tone: "neutral",
    labelVariant: "flag",
  },
];

const verticals = [
  "Revenue & Sales Tech",
  "Developer Tools",
  "Finance & Billing SaaS",
  "HR & People Ops",
  "Vertical SaaS",
  "Customer Success Platforms",
] as const;

export function SaasExpertiseSection() {
  return (
    <section id="understand" className="bg-sky/10 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <FadeIn>
            <PlayfulBadge variant="pin" className="mb-4">
              Performance marketing
            </PlayfulBadge>
            <h2 className="mt-3 text-3xl font-bold text-ink sm:text-4xl text-balance">
              Lead generation campaigns built for B2B — not generic traffic plays
            </h2>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
              CPL, lead quality, MQL-to-SQL conversion, and payback math — we&apos;ve mapped hundreds
              of B2B funnels. Your performance marketing is built around qualified leads and revenue,
              not how ad reps want you to spend.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {verticals.map((v, i) => {
                const variants: Array<"ticket" | "stamp" | "pin" | "flag" | "chip"> = [
                  "ticket",
                  "stamp",
                  "pin",
                  "flag",
                  "chip",
                  "ticket",
                ];
                return (
                  <PlayfulBadge key={v} variant={variants[i % variants.length]}>
                    {v}
                  </PlayfulBadge>
                );
              })}
            </div>
          </FadeIn>

          <FadeIn delay={0.15} direction="left">
            <Float amplitude={8}>
              <FunnelIllustration className="mx-auto" />
            </Float>
          </FadeIn>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2">
          {saasSignals.map((item, i) => (
            <FadeIn key={item.title} delay={i * 0.08}>
              <PlayfulCard variant={item.variant} tone={item.tone} className="h-full p-6 pt-8">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <h3 className="font-bold text-lg text-ink leading-snug">{item.title}</h3>
                  <PlayfulCardLabel variant={item.labelVariant}>{item.badge}</PlayfulCardLabel>
                </div>
                <p className="text-sm text-ink/75 leading-relaxed">{item.description}</p>
              </PlayfulCard>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
