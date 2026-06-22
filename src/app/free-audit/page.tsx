import type { Metadata } from "next";
import { Check } from "lucide-react";
import { LeadForm } from "@/components/shared/lead-form";
import { FadeIn } from "@/components/motion/fade-in";
import { PlayfulBadge } from "@/components/ui/playful-badge";
import { PlayfulCard } from "@/components/ui/playful-card";
import { PageShell } from "@/components/layout/page-shell";
import { auditDeliverables, auditIntakeQuestions, auditTestimonial } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Free Lead Gen Audit",
  description:
    "Get a free 90-day performance marketing roadmap — lead gen waste analysis, quick wins, and channel priorities. Keep it even if you don't hire us.",
};

export default function FreeAuditPage() {
  return (
    <PageShell>
      <section className="pt-12 pb-8 sm:pt-16 sm:pb-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 text-center">
          <FadeIn>
            <PlayfulBadge variant="stamp" className="mb-4">
              Async audit · No call required
            </PlayfulBadge>
            <h1 className="text-4xl font-bold text-ink sm:text-5xl text-balance max-w-3xl mx-auto leading-tight">
              Your free lead gen audit — written roadmap, delivered by email
            </h1>
            <p className="mt-5 text-lg text-ink/65 max-w-2xl mx-auto leading-relaxed">
              We&apos;ll map lead gen waste to cut, quick wins to grab, and campaigns to scale —
              delivered in 5 business days whether you hire us or not.
            </p>
            <p className="mt-3 text-sm text-ink/55 max-w-xl mx-auto">
              Want a live conversation instead?{" "}
              <a href="/contact" className="font-semibold text-primary hover:underline">
                Book a strategy call →
              </a>
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="pb-8">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <FadeIn>
            <PlayfulCard variant="pin" tone="sun" className="p-6 sm:p-8">
              <h2 className="text-xl font-bold text-ink">
                Here&apos;s what you&apos;ll get inside your free audit:
              </h2>
              <ul className="mt-5 space-y-3">
                {auditDeliverables.map((item) => (
                  <li key={item} className="flex gap-3 text-sm text-ink/80 leading-relaxed">
                    <Check className="size-5 shrink-0 text-primary stroke-[3]" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm font-semibold text-ink/70 italic">
                Even if we&apos;re not the right fit, you&apos;ll walk away knowing exactly what to
                fix.
              </p>
            </PlayfulCard>
          </FadeIn>

          <FadeIn delay={0.08} className="mt-8">
            <PlayfulCard variant="ticket" tone="neutral" className="p-6 sm:p-8">
              <h2 className="text-xl font-bold text-ink">
                What we&apos;ll ask you (3 quick steps)
              </h2>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                These answers let us tailor your audit — spend analysis, tracking review, and
                channel recommendations specific to your funnel.
              </p>
              <div className="mt-6 space-y-6">
                {auditIntakeQuestions.map((group) => (
                  <div key={group.category}>
                    <p className="text-sm font-bold text-primary uppercase tracking-wide">
                      {group.category}
                    </p>
                    <ul className="mt-2 space-y-2">
                      {group.items.map((item) => (
                        <li
                          key={item}
                          className="flex gap-2 text-sm text-ink/80 leading-relaxed"
                        >
                          <Check
                            className="size-4 shrink-0 text-primary stroke-[3] mt-0.5"
                            aria-hidden
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </PlayfulCard>
          </FadeIn>

          <FadeIn delay={0.12} className="mt-8">
            <blockquote className="rounded-xl border-2 border-ink/15 bg-white p-6 text-center card-2d-sm shadow-none">
              <p className="text-ink leading-relaxed italic">
                &ldquo;{auditTestimonial.quote}&rdquo;
              </p>
              <footer className="mt-4">
                <cite className="text-sm font-semibold text-muted-foreground not-italic">
                  — {auditTestimonial.name}, {auditTestimonial.role}, {auditTestimonial.company}
                </cite>
              </footer>
            </blockquote>
          </FadeIn>
        </div>
      </section>

      <section className="pb-16 sm:pb-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <FadeIn delay={0.1}>
            <LeadForm
              title="Start your audit"
              description="Three quick steps — then we get to work on your roadmap."
              submitLabel="Send my free lead gen audit"
            />
          </FadeIn>
        </div>
      </section>
    </PageShell>
  );
}
