import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { Heart, Rocket, Target, Users } from "lucide-react";
import { PlayfulBadge } from "@/components/ui/playful-badge";
import { PlayfulCard } from "@/components/ui/playful-card";
import { FadeIn } from "@/components/motion/fade-in";
import { CtaButton } from "@/components/shared/cta-button";
import {
  CeoIntroSection,
  TeamSection,
  WhyBetterSection,
  WhyTeamSection,
} from "@/components/sections/about-team-sections";
import { FinalCtaSection } from "@/components/sections/final-cta-section";
import { PageShell } from "@/components/layout/page-shell";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Meet the adMarkapture team — SaaS paid media operators obsessed with pipeline, transparency, and protecting your budget.",
};

const values = [
  {
    icon: Target,
    title: "Pipeline over vanity",
    description: "If it doesn't show up in your CRM, we don't optimize for it. Period.",
  },
  {
    icon: Heart,
    title: "We give a damn",
    description: "Your budget is real money. We treat waste like a personal insult.",
  },
  {
    icon: Rocket,
    title: "Test fast, kill faster",
    description: "Losers get cut in 48 hours. Winners get budget. No sacred cows.",
  },
  {
    icon: Users,
    title: "Partner energy",
    description: "We push back, challenge ideas, and think alongside you — not just execute tickets.",
  },
] as const;

export default function AboutPage() {
  return (
    <PageShell>
      <section className="bg-sun/15 py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <FadeIn className="max-w-3xl">
            <PlayfulBadge variant="chip" className="mb-4">
              About adMarkapture
            </PlayfulBadge>
            <h1 className="text-4xl font-bold text-ink sm:text-5xl text-balance">
              A paid ads agency that&apos;s serious about play — and your pipeline
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              We built adMarkapture because SaaS founders kept hiring generalist agencies that
              optimized for clicks while demos flatlined. We do one thing: paid ads for B2B SaaS
              across Meta, Instagram, LinkedIn, YouTube, and Google — with full-funnel accountability.
            </p>
          </FadeIn>
        </div>
      </section>

      <CeoIntroSection />
      <TeamSection />
      <WhyTeamSection />
      <WhyBetterSection />

      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-12 lg:grid-cols-2">
            <FadeIn>
              <h2 className="text-3xl font-bold text-ink">Why we exist</h2>
              <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Most agencies say yes to everyone. We said no — to SEO, to web dev, to
                  &quot;full-service&quot; scope creep. SaaS paid media has its own math: ACV,
                  payback, demo show rates, multi-stakeholder cycles.
                </p>
                <p>
                  Every client gets a 90-day proof window. Month-to-month after that. Your accounts,
                  your data, your assets — always.
                </p>
                <Link
                  href="/case-studies/revstack"
                  className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
                >
                  Read our RevStack case study
                  <ExternalLink className="size-3.5" />
                </Link>
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <PlayfulCard variant="flag" tone="sky" className="p-6 sm:p-8 h-full">
                <h3 className="text-xl font-bold text-ink mb-6">What we believe</h3>
                <div className="grid gap-6 sm:grid-cols-2">
                  {values.map((v) => (
                    <div key={v.title} className="flex gap-3">
                      <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white border-2 border-ink/15">
                        <v.icon className="size-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold text-ink text-sm">{v.title}</p>
                        <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                          {v.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </PlayfulCard>
            </FadeIn>
          </div>

          <FadeIn className="mt-16 text-center">
            <CtaButton size="lg" />
          </FadeIn>
        </div>
      </section>

      <FinalCtaSection compact />
    </PageShell>
  );
}
