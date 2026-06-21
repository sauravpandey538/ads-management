import type { Metadata } from "next";
import { LeadForm } from "@/components/shared/lead-form";
import { FadeIn } from "@/components/motion/fade-in";
import { PlayfulBadge } from "@/components/ui/playful-badge";
import { PageShell } from "@/components/layout/page-shell";

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
              $2,500 value · $0 cost
            </PlayfulBadge>
            <h1 className="text-4xl font-bold text-ink sm:text-5xl text-balance max-w-3xl mx-auto leading-tight">
              Your free SaaS ads audit — keep the roadmap either way
            </h1>
            <p className="mt-5 text-lg text-ink/65 max-w-2xl mx-auto leading-relaxed">
              We&apos;ll map waste to cut, quick wins to grab, and channels to scale — delivered in
              48 hours whether you hire us or not.
            </p>
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
