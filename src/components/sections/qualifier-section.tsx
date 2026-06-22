import { Check, X } from "lucide-react";
import { PlayfulBadge } from "@/components/ui/playful-badge";
import { PlayfulCard } from "@/components/ui/playful-card";
import { FadeIn } from "@/components/motion/fade-in";
import { qualifier } from "@/lib/site-config";

/** Filters bad-fit leads and makes good-fit visitors feel seen. */
export function QualifierSection() {
  return (
    <section className="py-20 sm:py-28 bg-cream/50">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <FadeIn className="text-center max-w-2xl mx-auto mb-12">
          <PlayfulBadge variant="stamp" className="mb-4">
            Fit check
          </PlayfulBadge>
          <h2 className="text-3xl font-bold text-ink sm:text-4xl text-balance">
            Is adMarkapture right for you?
          </h2>
        </FadeIn>

        <div className="grid gap-6 md:grid-cols-2">
          <FadeIn delay={0.05}>
            <PlayfulCard variant="pin" tone="mint" className="p-6 sm:p-8 h-full">
              <h3 className="font-bold text-lg text-ink mb-5">
                adMarkapture is built for you if:
              </h3>
              <ul className="space-y-3">
                {qualifier.goodFit.map((item) => (
                  <li key={item} className="flex gap-3 text-sm text-ink/80 leading-relaxed">
                    <Check className="size-5 shrink-0 text-mint stroke-[3]" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </PlayfulCard>
          </FadeIn>

          <FadeIn delay={0.1}>
            <PlayfulCard variant="ticket" tone="neutral" className="p-6 sm:p-8 h-full">
              <h3 className="font-bold text-lg text-ink mb-5">
                We&apos;re probably NOT the right fit if:
              </h3>
              <ul className="space-y-3">
                {qualifier.badFit.map((item) => (
                  <li key={item} className="flex gap-3 text-sm text-ink/70 leading-relaxed">
                    <X className="size-5 shrink-0 text-primary stroke-[3]" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </PlayfulCard>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
