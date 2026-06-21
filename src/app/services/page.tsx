import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageShell } from "@/components/layout/page-shell";
import { Card2D } from "@/components/ui/card-2d";
import { PlayfulBadge } from "@/components/ui/playful-badge";
import { FadeIn } from "@/components/motion/fade-in";
import { PrimaryButton } from "@/components/shared/primary-button";
import { serviceSlugs, services } from "@/lib/services-data";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Paid Ads Services",
  description:
    "Dedicated paid ads services for B2B SaaS — Meta, Instagram, YouTube, LinkedIn, and Google. Deep expertise, channel-specific results.",
};

const badgeRotation: Array<"ticket" | "stamp" | "pin" | "flag" | "chip"> = [
  "flag",
  "stamp",
  "ticket",
  "pin",
  "chip",
];

export default function ServicesPage() {
  return (
    <PageShell>
      <section className="pt-16 pb-16 sm:pt-20 sm:pb-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <FadeIn className="max-w-3xl mb-14 sm:mb-16">
            <PlayfulBadge variant="stamp" className="mb-4">
              Ads only — zero scope creep
            </PlayfulBadge>
            <h1 className="text-4xl font-bold text-ink sm:text-5xl text-balance">
              One agency. Five channels. Every dollar tied to pipeline.
            </h1>
            <p className="mt-6 text-lg text-ink/70 leading-relaxed">
              Each channel gets its own playbook, creative system, and results benchmark — because
              Meta, YouTube, and LinkedIn don&apos;t behave the same way.
            </p>
            <div className="mt-8">
              <PrimaryButton href="/free-audit" size="lg">
                {siteConfig.ctaPrimary}
              </PrimaryButton>
            </div>
          </FadeIn>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {serviceSlugs.map((slug, i) => {
              const service = services[slug];
              return (
                <FadeIn key={slug} delay={i * 0.06}>
                  <Link href={`/services/${slug}`} className="block group">
                    <Card2D hover className="p-6 h-full bg-white">
                      <PlayfulBadge
                        variant={badgeRotation[i % badgeRotation.length]}
                        className="mb-4"
                      >
                        {service.badgeText}
                      </PlayfulBadge>
                      <h2 className="text-xl font-bold text-ink group-hover:text-primary transition-colors">
                        {service.name}
                      </h2>
                      <p className="mt-3 text-sm text-ink/65 leading-relaxed line-clamp-3">
                        {service.subheadline}
                      </p>
                      <div className="mt-5 flex items-center gap-1 text-sm font-semibold text-primary">
                        Deep dive + results
                        <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                      <div className="mt-4 pt-4 border-t border-ink/10">
                        <p className="text-2xl font-bold text-primary">
                          {service.results[0]?.metric}
                        </p>
                        <p className="text-xs text-ink/55">
                          {service.results[0]?.label} · {service.results[0]?.company}
                        </p>
                      </div>
                    </Card2D>
                  </Link>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
