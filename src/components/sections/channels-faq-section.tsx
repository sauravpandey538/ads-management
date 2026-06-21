"use client";

import { FadeIn } from "@/components/motion/fade-in";
import { faqs } from "@/lib/site-config";
import { cn } from "@/lib/utils";

export function FaqSection() {
  return (
    <section id="faq" className="py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <FadeIn className="text-center mb-12">
          <h2 className="text-3xl font-bold text-ink">Questions before you book?</h2>
          <p className="mt-3 text-muted-foreground">
            Straight answers. No sales-script dodgeball.
          </p>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="w-full space-y-3">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-xl border border-border bg-white px-5 py-1 playful-shadow"
              >
                <summary
                  className={cn(
                    "cursor-pointer list-none py-3 font-semibold text-ink",
                    "[&::-webkit-details-marker]:hidden"
                  )}
                >
                  <span className="flex items-center justify-between gap-4">
                    {faq.question}
                    <span className="text-primary text-xl leading-none group-open:rotate-45 transition-transform">
                      +
                    </span>
                  </span>
                </summary>
                <p className="pb-4 text-muted-foreground leading-relaxed">{faq.answer}</p>
              </details>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
