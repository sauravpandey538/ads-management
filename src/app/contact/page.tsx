import type { Metadata } from "next";
import { Mail, Phone, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { FadeIn } from "@/components/motion/fade-in";
import { LeadForm } from "@/components/shared/lead-form";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Book a Strategy Call",
  description:
    "Book a strategy call with adMarkapture — SaaS paid ads experts for Meta, LinkedIn, YouTube, and Google.",
};

const contactOptions = [
  {
    icon: Calendar,
    title: "Strategy call",
    detail: "30-min funnel review + next steps",
  },
  {
    icon: Mail,
    title: siteConfig.email,
    detail: "We reply within one business day",
  },
  {
    icon: Phone,
    title: siteConfig.phone,
    detail: "Mon–Fri, 9am–6pm PT",
  },
] as const;

export default function ContactPage() {
  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <FadeIn className="text-center max-w-2xl mx-auto mb-14">
          <Badge className="mb-4 rounded-full bg-sky/30 text-ink border-0">
            Let&apos;s talk pipeline
          </Badge>
          <h1 className="text-4xl font-bold text-ink sm:text-5xl text-balance">
            Book a call — we&apos;ll tell you if we&apos;re a fit
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            No pitch deck ambush. Just an honest conversation about your funnel,
            spend, and whether we can move the needle in 90 days.
          </p>
        </FadeIn>

        <FadeIn delay={0.15}>
          <div className="mx-auto max-w-6xl">
            <LeadForm
              title="Book your strategy call"
              description="Share your funnel details and we'll reach out to schedule."
              submitLabel="Book my call"
            />
          </div>
        </FadeIn>

        <div className="grid gap-8 mb-12 sm:grid-cols-3 mt-8">
          {contactOptions.map((opt, i) => (
            <FadeIn key={opt.title} delay={i * 0.06}>
              <div className="rounded-2xl bg-muted/50 p-6 text-center doodle-border">
                <div className="mx-auto mb-3 flex size-11 items-center justify-center rounded-xl bg-white playful-shadow">
                  <opt.icon className="size-5 text-primary" />
                </div>
                <p className="font-semibold text-ink">{opt.title}</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {opt.detail}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
