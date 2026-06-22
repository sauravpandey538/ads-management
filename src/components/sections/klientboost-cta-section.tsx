"use client";

import { FadeIn } from "@/components/motion/fade-in";
import { CtaPair } from "@/components/shared/cta-pair";
import { PlayfulCard } from "@/components/ui/playful-card";
import { PlayfulBadge } from "@/components/ui/playful-badge";
import { Shield, Timer, Zap } from "lucide-react";

const trustPoints = [
  { icon: Timer, text: "90-day proof window" },
  { icon: Shield, text: "You own every account" },
  { icon: Zap, text: "Leads, not clicks" },
] as const;

/** Closing CTA — cream backdrop, warm card, no gradient band. */
export function KlientBoostCtaSection() {
  return (
    <section className="py-20 sm:py-28 page-dots">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <FadeIn>
          <PlayfulCard variant="pin" tone="sun" className="p-8 sm:p-12 text-center">
            <PlayfulBadge variant="stamp" className="mb-5">
              Last step
            </PlayfulBadge>
            <h2 className="text-2xl font-bold text-ink sm:text-3xl lg:text-4xl text-balance leading-tight">
              We&apos;ll be the last performance marketing agency you&apos;ll ever need to vet
            </h2>
            <p className="mt-4 text-ink/65 text-lg max-w-xl mx-auto leading-relaxed">
              Start with a free lead gen audit. Keep the 90-day roadmap even if we&apos;re not the right fit.
            </p>

            <div className="mt-8">
              <CtaPair />
            </div>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-4 sm:gap-6">
              {trustPoints.map(({ icon: Icon, text }) => (
                <span
                  key={text}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-ink/75"
                >
                  <span className="flex size-8 items-center justify-center rounded-lg bg-white border-2 border-ink/25 shadow-[2px_2px_0_0_var(--ink)]">
                    <Icon className="size-4 text-primary" />
                  </span>
                  {text}
                </span>
              ))}
            </div>
          </PlayfulCard>
        </FadeIn>
      </div>
    </section>
  );
}
