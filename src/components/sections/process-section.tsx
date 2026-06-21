"use client";

import { Search, Target, FlaskConical, TrendingUp } from "lucide-react";
import { PlayfulBadge } from "@/components/ui/playful-badge";
import {
  PlayfulCard,
  PlayfulCardLabel,
  type PlayfulCardVariant,
} from "@/components/ui/playful-card";
import { FadeIn } from "@/components/motion/fade-in";

const processSteps = [
  {
    icon: Search,
    week: "Week 1",
    title: "Audit & fix tracking",
    description:
      "Account structure, waste, GA4/GTM, CRM offline conversions — fix the foundation first.",
    variant: "ticket" as PlayfulCardVariant,
    tone: "sun" as const,
    labelVariant: "ticket" as PlayfulCardVariant,
  },
  {
    icon: Target,
    week: "Week 2–3",
    title: "ICP & offer mapping",
    description:
      "Persona angles, funnel stages, landing page message match before scaling a dollar.",
    variant: "stamp" as PlayfulCardVariant,
    tone: "mint" as const,
    labelVariant: "stamp" as PlayfulCardVariant,
  },
  {
    icon: FlaskConical,
    week: "Week 4–8",
    title: "Test & kill fast",
    description:
      "Creative, audiences, and bids tested weekly. Losers cut in 48h. Winners get budget.",
    variant: "pin" as PlayfulCardVariant,
    tone: "sky" as const,
    labelVariant: "pin" as PlayfulCardVariant,
  },
  {
    icon: TrendingUp,
    week: "Week 9–12",
    title: "Scale with math",
    description:
      "Pipeline ROAS, payback, and CAC ceilings drive every scaling decision.",
    variant: "flag" as PlayfulCardVariant,
    tone: "neutral" as const,
    labelVariant: "flag" as PlayfulCardVariant,
  },
] as const;

export function ProcessSection() {
  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <FadeIn className="text-center max-w-2xl mx-auto mb-14">
          <PlayfulBadge variant="stamp" className="mb-4">
            90-day sprint
          </PlayfulBadge>
          <h2 className="text-3xl font-bold text-ink sm:text-4xl text-balance">
            90 days to prove it — or walk away
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">
            A structured sprint, not an endless retainer with vague &quot;optimization.&quot;
          </p>
        </FadeIn>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((step, i) => (
            <FadeIn key={step.title} delay={i * 0.08}>
              <PlayfulCard variant={step.variant} tone={step.tone} className="h-full p-6 pt-8">
                <PlayfulCardLabel variant={step.labelVariant} className="mb-4">
                  {step.week}
                </PlayfulCardLabel>
                <div className="flex size-12 items-center justify-center rounded-xl bg-white border-2 border-ink shadow-[2px_2px_0_0_var(--ink)]">
                  <step.icon className="size-5 text-ink" strokeWidth={2.5} />
                </div>
                <h3 className="mt-4 font-bold text-ink text-lg leading-snug">{step.title}</h3>
                <p className="mt-2 text-sm text-ink/75 leading-relaxed">{step.description}</p>
              </PlayfulCard>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
