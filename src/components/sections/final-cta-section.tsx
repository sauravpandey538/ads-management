"use client";

import { LeadForm } from "@/components/shared/lead-form";
import { FadeIn } from "@/components/motion/fade-in";
import { Float } from "@/components/motion/float";
import { AdDashboardIllustration } from "@/components/illustrations/ad-illustrations";

type FinalCtaSectionProps = {
  compact?: boolean;
};

export function FinalCtaSection({ compact = false }: FinalCtaSectionProps) {
  return (
    <section
      id="book"
      className={compact ? "py-12" : "py-20 sm:py-28 bg-ink text-white"}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-1 lg:items-center">
          <FadeIn>
            <p className="text-sm font-semibold uppercase tracking-wider text-sun">
              Ready when you are
            </p>
            <h2 className="mt-3 text-3xl font-bold sm:text-4xl text-balance">
              Book a call. Walk away with a free ads audit either way.
            </h2>
            <p className="mt-4 text-white/70 text-lg leading-relaxed">
              Tell us your ACV, funnel, and current spend. We&apos;ll send a
              90-day roadmap with waste to cut, quick wins, and where to scale —
              whether you hire us or not.
            </p>
            {!compact && (
              <div className="mt-8 hidden lg:block">
                <Float amplitude={6}>
                  <AdDashboardIllustration className="opacity-90 [&_rect]:stroke-white/30 [&_path]:stroke-sun [&_circle]:stroke-white/30" />
                </Float>
              </div>
            )}
          </FadeIn>

          <FadeIn delay={0.15} direction="left">
            <LeadForm />
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
