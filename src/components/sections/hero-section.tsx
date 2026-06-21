"use client";

import { Badge } from "@/components/ui/badge";
import { AdDashboardIllustration } from "@/components/illustrations/ad-illustrations";
import { Float } from "@/components/motion/float";
import { FadeIn } from "@/components/motion/fade-in";
import { CtaButton } from "@/components/shared/cta-button";
import { stats } from "@/lib/site-config";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,var(--tw-gradient-stops))] from-sky/20 via-background to-background" />
      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:items-center lg:py-24">
        <FadeIn>
          <Badge className="mb-4 rounded-full bg-sun/40 text-ink hover:bg-sun/50 border-0">
            SaaS Paid Ads Only — Meta, LinkedIn, YouTube & Google
          </Badge>
          <h1 className="text-4xl font-bold tracking-tight text-ink sm:text-5xl lg:text-6xl text-balance">
            You spend on ads.{" "}
            <span className="text-primary">
              We make sure none of it vanishes.
            </span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-xl">
            adMarkapture is the playful-but-serious paid ads agency for B2B
            SaaS. We turn Meta, Instagram, LinkedIn, YouTube, and Google spend
            into qualified demos, trials, and pipeline — with zero vanity metric
            nonsense.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <CtaButton size="lg" />
            <CtaButton href="/contact" variant="outline" size="lg">
              Book a Strategy Call
            </CtaButton>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            Free 90-day roadmap. You keep it even if you don&apos;t hire us.
          </p>
        </FadeIn>

        <FadeIn
          delay={0.15}
          direction="left"
          className="relative flex justify-center"
        >
          <Float amplitude={10} duration={5}>
            <AdDashboardIllustration />
          </Float>
          <div className="absolute -bottom-4 -left-2 rounded-2xl bg-white p-4 playful-shadow doodle-border hidden sm:block">
            <p className="text-xs font-medium text-muted-foreground">
              Pipeline this month
            </p>
            <p className="text-2xl font-bold text-primary">+$47K</p>
          </div>
        </FadeIn>
      </div>

      <div className="border-y border-border bg-white/60">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-4 py-8 sm:grid-cols-4 sm:px-6">
          {stats.map((stat, i) => (
            <FadeIn key={stat.label} delay={i * 0.05}>
              <div className="text-center">
                <p className="text-3xl font-bold text-primary">{stat.value}</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {stat.label}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
