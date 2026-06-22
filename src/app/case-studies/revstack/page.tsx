import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { PlayfulBadge } from "@/components/ui/playful-badge";
import { PlayfulCard } from "@/components/ui/playful-card";
import { FadeIn } from "@/components/motion/fade-in";
import { CtaButton } from "@/components/shared/cta-button";
import { LinkedInButton, PersonAvatar } from "@/components/shared/person-links";
import { FinalCtaSection } from "@/components/sections/final-cta-section";
import { PageShell } from "@/components/layout/page-shell";
import { caseStudy } from "@/lib/site-config";

export const metadata: Metadata = {
  title: `${caseStudy.client} Case Study`,
  description: caseStudy.headline,
};

export default function RevStackCaseStudyPage() {
  return (
    <PageShell>
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <FadeIn>
            <PlayfulBadge variant="stamp" className="mb-4">
              Case study · {caseStudy.timeline}
            </PlayfulBadge>
            <h1 className="text-4xl font-bold text-ink sm:text-5xl text-balance leading-tight">
              {caseStudy.headline}
            </h1>
            <div className="mt-4 flex flex-wrap gap-2">
              {caseStudy.channels.map((ch) => (
                <span
                  key={ch}
                  className="rounded-full border-2 border-ink/15 bg-sky/20 px-3 py-0.5 text-xs font-semibold"
                >
                  {ch}
                </span>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={0.06} className="mt-12 space-y-10">
            <div>
              <h2 className="text-xl font-bold text-ink">The problem</h2>
              <p className="mt-3 text-muted-foreground leading-relaxed">{caseStudy.problem}</p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-ink">What we did</h2>
              <ul className="mt-4 space-y-2">
                {caseStudy.tactics.map((tactic) => (
                  <li
                    key={tactic}
                    className="flex gap-2 text-muted-foreground leading-relaxed text-sm"
                  >
                    <span className="text-primary font-bold">→</span>
                    {tactic}
                  </li>
                ))}
              </ul>
            </div>

            <PlayfulCard variant="pin" tone="sun" className="p-6 sm:p-8">
              <h2 className="text-xl font-bold text-ink">The results</h2>
              <div className="mt-6 space-y-4">
                {caseStudy.results.map((r) => (
                  <div
                    key={r.label}
                    className="flex flex-wrap items-baseline justify-between gap-2 border-b border-ink/10 pb-3 last:border-0"
                  >
                    <span className="text-sm font-medium text-ink/70">{r.label}</span>
                    <span className="font-bold text-ink">
                      {r.before}{" "}
                      <span className="text-muted-foreground font-normal">→</span> {r.after}
                    </span>
                  </div>
                ))}
              </div>
              <p className="mt-6 text-2xl font-bold text-primary">
                {caseStudy.roas} pipeline ROAS in Q3
              </p>
            </PlayfulCard>

            <blockquote className="rounded-xl border-2 border-ink/15 bg-white p-6 card-2d-sm shadow-none">
              <p className="text-ink leading-relaxed italic">&ldquo;{caseStudy.quote}&rdquo;</p>
              <footer className="mt-5 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <PersonAvatar name={caseStudy.contact.name} className="size-11 text-sm" />
                  <cite className="not-italic">
                    <p className="font-semibold text-ink">{caseStudy.contact.name}</p>
                    <p className="text-sm text-muted-foreground">{caseStudy.contact.role}</p>
                  </cite>
                </div>
                <div className="flex flex-wrap gap-3">
                  <LinkedInButton href={caseStudy.contact.linkedinUrl} />
                  <a
                    href={caseStudy.clientUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
                  >
                    {caseStudy.client}
                    <ExternalLink className="size-3.5" />
                  </a>
                </div>
              </footer>
            </blockquote>

            <div className="text-center pt-4">
              <CtaButton size="lg" />
              <p className="mt-4">
                <Link href="/testimonials" className="text-sm font-semibold text-primary hover:underline">
                  ← All client testimonials
                </Link>
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      <FinalCtaSection compact />
    </PageShell>
  );
}
