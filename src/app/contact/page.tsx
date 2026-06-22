import type { Metadata } from "next";
import { Calendar, Check, Clock } from "lucide-react";
import { PlayfulBadge } from "@/components/ui/playful-badge";
import { PlayfulCard } from "@/components/ui/playful-card";
import { FadeIn } from "@/components/motion/fade-in";
import { PageShell } from "@/components/layout/page-shell";
import { BookingSection } from "@/components/shared/booking-section";
import { siteConfig, strategyCallIntakeQuestions } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Book a Strategy Call",
  description:
    "Book a live 30-minute performance marketing strategy call with adMarkapture — pick a time on the calendar or send a booking request.",
};

const contactOptions = [
  {
    icon: Calendar,
    title: "Pick a time",
    detail: "Use the calendar to choose your 30-min slot",
  },
  {
    icon: Clock,
    title: "Fast response",
    detail: siteConfig.calendarResponse,
  },
] as const;

export default function ContactPage() {
  return (
    <PageShell>
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <FadeIn className="text-center max-w-2xl mx-auto mb-10">
            <PlayfulBadge variant="flag" className="mb-4">
              Live call · Not the free audit
            </PlayfulBadge>
            <h1 className="text-4xl font-bold text-ink sm:text-5xl text-balance">
              Book a strategy call
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Pick a time on the calendar, or send a booking request — whichever is easier for you.
            </p>
            <p className="mt-3 text-sm text-ink/55">
              Want a written audit instead?{" "}
              <a href="/free-audit" className="font-semibold text-primary hover:underline">
                Get your free lead gen audit →
              </a>{" "}
              — no call required, delivered in 5 business days.
            </p>
          </FadeIn>

          <FadeIn delay={0.08} className="max-w-2xl mx-auto mb-10">
            <PlayfulCard variant="ticket" tone="neutral" className="p-6 sm:p-8">
              <h2 className="text-lg font-bold text-ink">
                What we&apos;ll ask before your call
              </h2>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                Whether you book on the calendar or send a request, these answers help us
                prepare a focused 30-minute strategy session — not a generic sales pitch.
              </p>
              <div className="mt-5 space-y-5">
                {strategyCallIntakeQuestions.map((group) => (
                  <div key={group.category}>
                    <p className="text-xs font-bold text-primary uppercase tracking-wide">
                      {group.category}
                    </p>
                    <ul className="mt-2 space-y-2">
                      {group.items.map((item) => (
                        <li
                          key={item}
                          className="flex gap-2 text-sm text-ink/80 leading-relaxed"
                        >
                          <Check
                            className="size-4 shrink-0 text-primary stroke-[3] mt-0.5"
                            aria-hidden
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </PlayfulCard>
          </FadeIn>

          <FadeIn delay={0.1}>
            <BookingSection />
          </FadeIn>

          <div className="grid gap-6 sm:grid-cols-2 mt-12 max-w-2xl mx-auto">
            {contactOptions.map((opt, i) => (
              <FadeIn key={opt.title} delay={0.15 + i * 0.06}>
                <div className="rounded-2xl bg-white border-2 border-ink/15 p-6 text-center card-2d-sm shadow-none">
                  <div className="mx-auto mb-3 flex size-11 items-center justify-center rounded-xl bg-sky/30 border border-ink/15">
                    <opt.icon className="size-5 text-ink" />
                  </div>
                  <p className="font-semibold text-ink">{opt.title}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{opt.detail}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
