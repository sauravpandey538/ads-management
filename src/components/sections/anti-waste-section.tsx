"use client";

import { Check, X } from "lucide-react";
import { PlayfulCard } from "@/components/ui/playful-card";
import { PlayfulBadge } from "@/components/ui/playful-badge";
import { MoneyShieldIllustration } from "@/components/illustrations/ad-illustrations";
import { FadeIn } from "@/components/motion/fade-in";
import { Float } from "@/components/motion/float";

const protections = [
  "Weekly waste audits on every active campaign",
  "Budget caps tied to cost-per-qualified-lead, not CPL on junk form fills",
  "Creative kill switches after 48h underperformance",
  "Full spend transparency — no hidden markups",
  "Kill or pause any channel that isn't pacing to goals",
] as const;

const wasteSigns = [
  "Optimizing for clicks while demos flatline",
  "Broad targeting with no ICP exclusions",
  "No offline conversion feedback to ad platforms",
  "Landing pages that don't match ad promises",
] as const;

export function AntiWasteSection() {
  return (
    <section id="waste" className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <FadeIn className="text-center max-w-2xl mx-auto mb-14">
          <PlayfulBadge variant="stamp" className="mb-4">
            Will this agency waste my money?
          </PlayfulBadge>
          <h2 className="mt-3 text-3xl font-bold text-ink sm:text-4xl text-balance">
            We treat your budget like it&apos;s ours — because our reputation depends on it
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">
            Most agencies scale spend first and ask questions later. We audit, cut waste, fix
            tracking, then scale what&apos;s already working.
          </p>
        </FadeIn>

        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <FadeIn direction="right">
            <Float amplitude={6}>
              <MoneyShieldIllustration className="mx-auto" />
            </Float>
          </FadeIn>

          <div className="space-y-6">
            <FadeIn delay={0.1}>
              <PlayfulCard variant="ticket" tone="mint" className="p-6 sm:p-7">
                <h3 className="font-bold text-ink mb-5 flex items-center gap-2.5 text-lg">
                  <span className="flex size-8 items-center justify-center rounded-lg bg-white border-2 border-ink shadow-[2px_2px_0_0_var(--ink)]">
                    <Check className="size-4 text-primary" strokeWidth={3} />
                  </span>
                  How we protect your spend
                </h3>
                <ul className="space-y-3.5">
                  {protections.map((item) => (
                    <li key={item} className="flex gap-3 text-sm text-ink/80 leading-relaxed">
                      <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-md bg-sun/50 border-2 border-ink/60">
                        <Check className="size-3.5 text-ink" strokeWidth={3} />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </PlayfulCard>
            </FadeIn>

            <FadeIn delay={0.2}>
              <PlayfulCard variant="stamp" tone="rose" className="p-6 sm:p-7">
                <h3 className="font-bold text-ink mb-5 flex items-center gap-2.5 text-lg">
                  <span className="flex size-8 items-center justify-center rounded-lg bg-white border-2 border-ink shadow-[2px_2px_0_0_var(--ink)]">
                    <X className="size-4 text-destructive" strokeWidth={3} />
                  </span>
                  Red flags we fix on day one
                </h3>
                <ul className="space-y-3.5">
                  {wasteSigns.map((item) => (
                    <li key={item} className="flex gap-3 text-sm text-ink/80 leading-relaxed">
                      <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-md bg-destructive/15 border-2 border-destructive/40">
                        <X className="size-3.5 text-destructive" strokeWidth={3} />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </PlayfulCard>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
