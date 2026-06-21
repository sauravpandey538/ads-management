import { LeadForm } from "@/components/shared/lead-form";
import { KlientBoostIcons } from "@/components/illustrations/klientboost-icons";
import { FadeIn } from "@/components/motion/fade-in";
import { PlayfulBadge } from "@/components/ui/playful-badge";

export function AuditTeaserSection() {
  return (
    <section id="book" className="py-20 sm:py-28 page-dots">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <FadeIn className="text-center max-w-2xl mx-auto mb-12">
          <PlayfulBadge variant="ticket" className="mb-4">
            Free · No strings attached
          </PlayfulBadge>
          <h2 className="text-3xl font-bold text-ink sm:text-4xl text-balance">
            Get your free ads audit — keep the 90-day roadmap either way
          </h2>
          <p className="mt-4 text-lg text-ink/65">
            Tell us your funnel, spend, and what&apos;s broken. We&apos;ll show you exactly where to
            cut waste and scale.
          </p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <LeadForm />
        </FadeIn>
      </div>
    </section>
  );
}
