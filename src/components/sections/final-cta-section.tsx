"use client";

import { LeadForm } from "@/components/shared/lead-form";
import { CtaPair } from "@/components/shared/cta-pair";
import { FadeIn } from "@/components/motion/fade-in";
import { Float } from "@/components/motion/float";
import { AdDashboardIllustration } from "@/components/illustrations/ad-illustrations";

type FinalCtaSectionProps = {
  compact?: boolean;
};

export function FinalCtaSection({ compact = false }: FinalCtaSectionProps) {
  return (
    <section
      id="audit"
      className={compact ? "py-12" : "py-20 sm:py-28 bg-ink text-white"}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-1 lg:items-center">
          <FadeIn>
            <p className="text-sm font-semibold uppercase tracking-wider text-sun">
              Free lead gen audit
            </p>
            <h2 className="mt-3 text-3xl font-bold sm:text-4xl text-balance">
              Get a written 90-day roadmap — no call required
            </h2>
            <p className="mt-4 text-white/70 text-lg leading-relaxed">
              Tell us your ACV, funnel, and current spend. We&apos;ll send a full performance marketing
              audit with lead gen waste to cut, quick wins, and campaigns to scale — delivered in 5
              business days whether you hire us or not.
            </p>
            {!compact && (
              <div className="mt-8">
                <p className="text-sm text-white/60 mb-4">
                  Ready to talk live instead? Use &quot;Book a Strategy Call&quot; — that&apos;s a
                  separate 30-minute conversation, not this audit form.
                </p>
                <CtaPair layout="stack" />
              </div>
            )}
            {!compact && (
              <div className="mt-8 hidden lg:block">
                <Float amplitude={6}>
                  <AdDashboardIllustration className="opacity-90 [&_rect]:stroke-white/30 [&_path]:stroke-sun [&_circle]:stroke-white/30" />
                </Float>
              </div>
            )}
          </FadeIn>

          <FadeIn delay={0.15} direction="left">
            <LeadForm
              title="Start your free lead gen audit"
              description="Async delivery — we'll email your performance marketing roadmap within 5 business days."
              submitLabel="Send my free lead gen audit"
            />
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
