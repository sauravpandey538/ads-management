import type { Metadata } from "next";
import { PlayfulBadge } from "@/components/ui/playful-badge";
import { FadeIn } from "@/components/motion/fade-in";
import { CtaButton } from "@/components/shared/cta-button";
import { JsonLd } from "@/components/shared/json-ld";
import { ReviewSourceLink } from "@/components/shared/review-source-link";
import { TestimonialCard } from "@/components/shared/testimonial-card";
import { FinalCtaSection } from "@/components/sections/final-cta-section";
import { organizationReviewJsonLd } from "@/lib/json-ld";
import { clientRating, clientTestimonials } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Client Testimonials",
  description:
    "SaaS paid ads testimonials with full context — the issue, our approach, current progress, and CRM-linked results across Meta, LinkedIn, YouTube, and Google.",
};

export default function TestimonialsPage() {
  return (
    <>
      <JsonLd data={organizationReviewJsonLd()} />

      <section className="py-16 sm:py-24 page-dots">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <FadeIn className="max-w-3xl">
            <PlayfulBadge variant="ticket" className="mb-4">
              CRM-verified outcomes
            </PlayfulBadge>
            <h1 className="text-4xl font-bold text-ink sm:text-5xl text-balance">
              Testimonials that show up in your pipeline — not a slide deck
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              Read the full story behind each client: what was broken, how we fixed it, and where
              things stand today. Every number ties to demos, SQLs, trials, or revenue — because
              that&apos;s what your CFO actually cares about.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
              <ReviewSourceLink variant="badge" />
              <p className="text-xs text-muted-foreground max-w-md">
                {clientRating.methodology} Last updated{" "}
                {new Date(clientRating.lastUpdated).toLocaleDateString("en-US", {
                  month: "long",
                  year: "numeric",
                })}
                .
              </p>
            </div>
          </FadeIn>

          <div id="reviews" className="mt-16 flex flex-col gap-8">
            {clientTestimonials.map((testimonial, i) => (
              <FadeIn key={testimonial.company} delay={i * 0.06}>
                <TestimonialCard testimonial={testimonial} variant="full" />
              </FadeIn>
            ))}
          </div>

          <FadeIn className="mt-12 text-center">
            <p className="text-muted-foreground mb-6">
              Want outcomes like these? Start with a free audit — we&apos;ll map your 90-day plan.
            </p>
            <CtaButton size="lg" />
          </FadeIn>
        </div>
      </section>

      <FinalCtaSection compact />
    </>
  );
}
