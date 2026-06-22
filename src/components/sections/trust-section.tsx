"use client";

import { Shield, Unlock, Users, Zap } from "lucide-react";
import { Card2D } from "@/components/ui/card-2d";
import { StarRating } from "@/components/shared/star-rating";
import { PersonLinks } from "@/components/shared/person-links";
import { ReviewSourceLink } from "@/components/shared/review-source-link";
import { TrustHandshakeIllustration } from "@/components/illustrations/ad-illustrations";
import { FadeIn } from "@/components/motion/fade-in";
import { Float } from "@/components/motion/float";
import { siteConfig, testimonials } from "@/lib/site-config";

const trustPoints = [
  {
    icon: Unlock,
    title: "You own everything",
    description: "Ad accounts, audiences, creative, and data stay in your name. Always.",
  },
  {
    icon: Shield,
    title: "No lock-in contracts",
    description: "90-day proof window, then month-to-month. Leave anytime with everything we built.",
  },
  {
    icon: Zap,
    title: "Radical transparency",
    description: "Weekly optimization logs, spend breakdowns, and CRM-linked dashboards.",
  },
  {
    icon: Users,
    title: "Partner, not vendor",
    description: "We challenge assumptions, push back on bad ideas, and tie every decision to pipeline.",
  },
] as const;

export function TrustSection() {
  return (
    <section id="trust" className="bg-sun/15 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
          <FadeIn>
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">
              Can I trust them?
            </p>
            <h2 className="mt-3 text-3xl font-bold text-ink sm:text-4xl text-balance">
              The last ads agency you&apos;ll ever need to vet
            </h2>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
              No black boxes. No bait-and-switch retainers. No &quot;trust us, impressions are up.&quot;
              We earn trust weekly — or you walk with every asset we created.
            </p>

            <div className="mt-6">
              <ReviewSourceLink variant="badge" />
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {trustPoints.map((point, i) => (
                <FadeIn key={point.title} delay={i * 0.06}>
                  <div className="flex gap-3">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white playful-shadow">
                      <point.icon className="size-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-ink">{point.title}</p>
                      <p className="text-sm text-muted-foreground mt-1">{point.description}</p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </FadeIn>

          <div className="space-y-6" id="reviews">
            <FadeIn delay={0.1} direction="left" className="flex justify-center">
              <Float amplitude={6}>
                <TrustHandshakeIllustration />
              </Float>
            </FadeIn>

            {testimonials.map((t, i) => (
              <FadeIn key={t.name} delay={0.15 + i * 0.08}>
                <Card2D className="bg-white p-6">
                  <figure itemScope itemType="https://schema.org/Review">
                    <meta itemProp="datePublished" content={t.dateReviewed} />
                    <div itemProp="itemReviewed" itemScope itemType="https://schema.org/Organization">
                      <meta itemProp="name" content={siteConfig.name} />
                    </div>
                    <StarRating value={t.rating} size="sm" itemProp className="mb-3" />
                    <blockquote
                      cite="/testimonials#reviews"
                      className="text-ink leading-relaxed not-italic"
                      itemProp="reviewBody"
                    >
                      <p>&ldquo;{t.quote}&rdquo;</p>
                    </blockquote>
                    <figcaption className="mt-4">
                      <PersonLinks
                        name={t.name}
                        role={t.role}
                        company={t.company}
                        linkedinUrl={t.linkedinUrl}
                        companyUrl={t.companyUrl}
                      />
                    </figcaption>
                  </figure>
                </Card2D>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
