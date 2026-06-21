"use client";

import { Shield, Unlock, Users, Zap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { TrustHandshakeIllustration } from "@/components/illustrations/ad-illustrations";
import { FadeIn } from "@/components/motion/fade-in";
import { Float } from "@/components/motion/float";
import { testimonials } from "@/lib/site-config";

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

          <div className="space-y-6">
            <FadeIn delay={0.1} direction="left" className="flex justify-center">
              <Float amplitude={6}>
                <TrustHandshakeIllustration />
              </Float>
            </FadeIn>

            {testimonials.map((t, i) => (
              <FadeIn key={t.name} delay={0.15 + i * 0.08}>
                <Card className="doodle-border border-0 bg-white playful-shadow">
                  <CardContent className="pt-6">
                    <p className="text-ink leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
                    <div className="mt-4 flex items-center gap-3">
                      <div className="size-10 rounded-full bg-sky/30 flex items-center justify-center font-bold text-ink">
                        {t.name[0]}
                      </div>
                      <div>
                        <p className="font-semibold text-sm">{t.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {t.role}, {t.company}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
