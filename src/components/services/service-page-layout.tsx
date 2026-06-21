"use client";

import Link from "next/link";
import { ArrowRight, Check, X } from "lucide-react";
import { PageShell } from "@/components/layout/page-shell";
import { PlayfulBadge } from "@/components/ui/playful-badge";
import {
  PlayfulCard,
  PlayfulCardLabel,
  type PlayfulCardVariant,
} from "@/components/ui/playful-card";
import { FadeIn } from "@/components/motion/fade-in";
import { PrimaryButton } from "@/components/shared/primary-button";
import { CtaButton } from "@/components/shared/cta-button";
import type { ServiceData } from "@/lib/services-data";
import { siteConfig } from "@/lib/site-config";

type ServicePageLayoutProps = {
  service: ServiceData;
};

const painVariants: PlayfulCardVariant[] = ["stamp", "flag", "stamp", "flag"];
const approachVariants: PlayfulCardVariant[] = ["ticket", "stamp", "pin", "flag"];
const resultVariants: PlayfulCardVariant[] = ["ticket", "pin", "flag"];

export function ServicePageLayout({ service }: ServicePageLayoutProps) {
  return (
    <PageShell>
      {/* Hero + overview — one block, no divider */}
      <section className="pt-16 pb-12 sm:pt-20 sm:pb-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <FadeIn className="max-w-3xl">
            <PlayfulBadge variant={service.badgeVariant} className="mb-4">
              {service.badgeText}
            </PlayfulBadge>
            <h1 className="text-4xl font-bold text-ink sm:text-5xl text-balance leading-tight">
              {service.headline}
            </h1>
            <p className="mt-6 text-lg text-ink/75 leading-relaxed">{service.subheadline}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <PrimaryButton href="/free-audit" size="lg">
                {siteConfig.ctaPrimary}
              </PrimaryButton>
              <CtaButton href="/contact" variant="outline" size="lg">
                Book a Strategy Call
              </CtaButton>
            </div>
          </FadeIn>

          <FadeIn delay={0.08} className="mt-14 max-w-3xl">
            <PlayfulBadge variant="pin" className="mb-3">
              Overview
            </PlayfulBadge>
            <p className="text-ink/70 text-lg leading-relaxed">{service.overview}</p>
          </FadeIn>
        </div>
      </section>

      {/* Problems + approach — merged, spacing only */}
      <section className="pb-16 sm:pb-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 space-y-16 sm:space-y-20">
          <div>
            <FadeIn>
              <PlayfulBadge variant="stamp" className="mb-4">
                Day-one fixes
              </PlayfulBadge>
              <h2 className="text-2xl font-bold text-ink sm:text-3xl mb-8">
                Problems we fix on day one
              </h2>
            </FadeIn>
            <div className="grid gap-6 sm:grid-cols-2">
              {service.painPoints.map((pain, i) => (
                <FadeIn key={pain} delay={i * 0.05}>
                  <PlayfulCard variant={painVariants[i]} tone="rose" className="p-5 sm:p-6">
                    <div className="flex gap-4">
                      <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-white border-2 border-ink shadow-[2px_2px_0_0_var(--ink)]">
                        <X className="size-5 text-destructive" strokeWidth={2.5} />
                      </span>
                      <p className="text-sm sm:text-base text-ink/85 leading-relaxed pt-1.5">
                        {pain}
                      </p>
                    </div>
                  </PlayfulCard>
                </FadeIn>
              ))}
            </div>
          </div>

          <div>
            <FadeIn>
              <PlayfulBadge variant="flag" className="mb-4">
                Our playbook
              </PlayfulBadge>
              <h2 className="text-2xl font-bold text-ink sm:text-3xl mb-10">Our approach</h2>
            </FadeIn>
            <div className="grid gap-8 md:grid-cols-2">
              {service.approach.map((item, i) => (
                <FadeIn key={item.title} delay={i * 0.06}>
                  <PlayfulCard
                    variant={approachVariants[i]}
                    tone="neutral"
                    className="h-full p-6 pt-8"
                  >
                    <PlayfulCardLabel variant={approachVariants[i]}>
                      Step {i + 1}
                    </PlayfulCardLabel>
                    <h3 className="mt-4 font-bold text-lg text-ink">{item.title}</h3>
                    <p className="mt-2 text-sm text-ink/75 leading-relaxed">{item.description}</p>
                  </PlayfulCard>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Single mid-page divider before results */}
      <section className="border-t-2 border-ink/10 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <FadeIn>
            <PlayfulBadge variant="ticket" className="mb-4">
              Channel-specific results
            </PlayfulBadge>
            <h2 className="text-2xl font-bold text-ink sm:text-3xl mb-10">
              {service.name} results from real SaaS clients
            </h2>
          </FadeIn>
          <div className="grid gap-8 md:grid-cols-3">
            {service.results.map((result, i) => (
              <FadeIn key={result.company} delay={i * 0.08}>
                <PlayfulCard variant={resultVariants[i]} tone="neutral" className="h-full p-6">
                  <p className="font-bold text-ink text-lg">{result.company}</p>
                  <p className="mt-3 text-4xl font-bold text-primary">{result.metric}</p>
                  <PlayfulCardLabel variant="chip" className="mt-1">
                    {result.label}
                  </PlayfulCardLabel>
                  <p className="mt-4 text-sm text-ink/75 leading-relaxed">{result.detail}</p>
                </PlayfulCard>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Included + FAQ + CTA — one flowing block */}
      <section className="pb-16 sm:pb-24 pt-4 sm:pt-8">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-12 lg:grid-cols-2 mb-16 sm:mb-20">
            <FadeIn>
              <h2 className="text-2xl font-bold text-ink sm:text-3xl mb-6">What&apos;s included</h2>
              <PlayfulCard variant="ticket" tone="neutral" className="p-6">
                <ul className="space-y-3">
                  {service.deliverables.map((item) => (
                    <li key={item} className="flex gap-3 text-sm text-ink/80">
                      <span className="flex size-6 shrink-0 items-center justify-center rounded-md bg-sun/50 border border-ink/30">
                        <Check className="size-3.5 text-ink" strokeWidth={3} />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </PlayfulCard>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h2 className="text-2xl font-bold text-ink sm:text-3xl mb-6">FAQ</h2>
              <div className="space-y-4">
                {service.faqs.map((faq, i) => (
                  <PlayfulCard
                    key={faq.question}
                    variant={i % 2 === 0 ? "pin" : "stamp"}
                    tone="neutral"
                    className="p-5"
                    hover={false}
                  >
                    <p className="font-semibold text-ink text-sm">{faq.question}</p>
                    <p className="mt-2 text-sm text-ink/75 leading-relaxed">{faq.answer}</p>
                  </PlayfulCard>
                ))}
              </div>
            </FadeIn>
          </div>

          <FadeIn className="text-center">
            <PlayfulCard variant="flag" tone="neutral" className="inline-block px-6 py-4 mb-8">
              <h2 className="text-xl font-bold text-ink sm:text-2xl text-balance">
                Ready to scale {service.shortName} ads with pipeline accountability?
              </h2>
            </PlayfulCard>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <PrimaryButton href="/free-audit" size="lg">
                {siteConfig.ctaPrimary}
              </PrimaryButton>
              <Link
                href="/services"
                className="inline-flex items-center gap-1 text-sm font-semibold text-ink/80 hover:text-ink underline-offset-4 hover:underline"
              >
                All services <ArrowRight className="size-4" />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </PageShell>
  );
}
