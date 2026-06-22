"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PlayfulBadge } from "@/components/ui/playful-badge";
import { FadeIn } from "@/components/motion/fade-in";
import { CtaButton } from "@/components/shared/cta-button";
import { TestimonialCard } from "@/components/shared/testimonial-card";
import { clientTestimonials } from "@/lib/site-config";

export function TestimonialsSection() {
  return (
    <section id="prove" className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <FadeIn className="text-center max-w-2xl mx-auto mb-14">
          <PlayfulBadge variant="flag" className="mb-4">
            Client testimonials
          </PlayfulBadge>
          <h2 className="mt-3 text-3xl font-bold text-ink sm:text-4xl text-balance">
            Real clients. Real lead gen numbers.
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Every story includes what was broken, what we changed, and where things stand today —
            tied to qualified leads, SQLs, and revenue metrics your team already tracks.
          </p>
        </FadeIn>

        <div className="grid gap-6 lg:grid-cols-1">
          {clientTestimonials.map((testimonial, i) => (
            <FadeIn key={testimonial.company} delay={i * 0.08}>
              <TestimonialCard testimonial={testimonial} variant="compact" />
            </FadeIn>
          ))}
        </div>

        <FadeIn className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <CtaButton href="/testimonials" variant="secondary">
            See all testimonials
          </CtaButton>
          <Link
            href="/case-studies/revstack"
            className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
          >
            Read RevStack case study
            <ArrowUpRight className="size-4" />
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}
