import type { Metadata } from "next";
import { Check } from "lucide-react";
import { LeadForm } from "@/components/shared/lead-form";
import { FadeIn } from "@/components/motion/fade-in";
import { PlayfulBadge } from "@/components/ui/playful-badge";
import { PlayfulCard } from "@/components/ui/playful-card";
import { PageShell } from "@/components/layout/page-shell";
import { auditDeliverables, auditTestimonial } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Free Ads Audit",
  description:
    "Get a free 90-day SaaS paid ads roadmap — waste analysis, quick wins, and channel priorities. Keep it even if you don't hire us.",
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
              Your free SaaS ads audit — written roadmap, delivered by email
            </h1>
            <p className="mt-5 text-lg text-ink/65 max-w-2xl mx-auto leading-relaxed">
              We&apos;ll map waste to cut, quick wins to grab, and channels to scale — delivered in 5
              business days whether you hire us or not.
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
              description="Two quick steps — then we get to work."
              submitLabel="Send my free audit"
            />
          </FadeIn>
        </div>
      </section>
    </PageShell>
  );
}
