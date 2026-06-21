"use client";

import { motion, useReducedMotion } from "framer-motion";
import { funnelSteps } from "@/lib/site-config";
import { PlayfulBadge } from "@/components/ui/playful-badge";
import {
  PlayfulCard,
  type PlayfulCardVariant,
} from "@/components/ui/playful-card";
import { FadeIn } from "@/components/motion/fade-in";
import { cn } from "@/lib/utils";

const questionBadges: Array<"ticket" | "stamp" | "pin" | "flag" | "chip"> = [
  "ticket",
  "stamp",
  "pin",
  "flag",
  "chip",
  "ticket",
];

const bodyVariants: PlayfulCardVariant[] = ["pin", "flag", "ticket", "stamp", "pin", "flag"];
const bodyTones: Array<"neutral" | "mint" | "sky" | "sun"> = [
  "neutral",
  "mint",
  "sky",
  "sun",
  "neutral",
  "mint",
];

function TimelineLine() {
  const reduceMotion = useReducedMotion();
  if (reduceMotion) {
    return (
      <div className="absolute left-4 top-0 bottom-0 w-1 rounded-full bg-ink/15 hidden sm:block sm:left-1/2 sm:-translate-x-1/2" />
    );
  }
  return (
    <motion.div
      className="absolute left-4 top-0 bottom-0 w-1 origin-top rounded-full bg-gradient-to-b from-primary via-sun to-mint hidden sm:block sm:left-1/2 sm:-translate-x-1/2"
      initial={{ scaleY: 0 }}
      whileInView={{ scaleY: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
    />
  );
}

export function ConversionJourneySection() {
  return (
    <section className="relative py-16 sm:py-24 overflow-hidden bg-[radial-gradient(circle_at_1px_1px,oklch(0.22_0.04_260/0.06)_1px,transparent_0)] bg-[length:24px_24px]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <FadeIn className="text-center mb-14 max-w-2xl mx-auto">
          <PlayfulBadge variant="flag" className="mb-4">
            Your questions, answered
          </PlayfulBadge>
          <h2 className="text-2xl font-bold text-ink sm:text-3xl text-balance">
            Every question you&apos;re already asking — answered on this page
          </h2>
        </FadeIn>

        <div className="relative">
          <TimelineLine />

          <div className="space-y-10 sm:space-y-14">
            {funnelSteps.map((step, i) => {
              const isRight = i % 2 === 1;
              return (
                <FadeIn key={step.id} delay={i * 0.06} direction={isRight ? "left" : "right"}>
                  <div className="relative grid sm:grid-cols-2 sm:gap-10 items-center">
                    {/* Question + headline side */}
                    <div
                      className={cn(
                        "sm:px-6",
                        isRight ? "sm:order-2 sm:text-left" : "sm:text-right"
                      )}
                    >
                      <PlayfulBadge
                        variant={questionBadges[i]}
                        className={cn("mb-3", !isRight && "sm:ml-auto")}
                      >
                        {step.question}
                      </PlayfulBadge>
                      <h3 className="font-bold text-xl sm:text-2xl text-ink leading-snug text-balance">
                        {step.headline}
                      </h3>
                    </div>

                    {/* Body card side */}
                    <div className={cn("mt-4 sm:mt-0 sm:px-4", isRight ? "sm:order-1" : "")}>
                      <PlayfulCard
                        variant={bodyVariants[i]}
                        tone={bodyTones[i]}
                        className="p-5 sm:p-6"
                      >
                        <p className="text-sm sm:text-base text-ink/80 leading-relaxed">
                          {step.body}
                        </p>
                      </PlayfulCard>
                    </div>

                    {/* Step node */}
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 hidden sm:flex sm:left-1/2 sm:-translate-x-1/2 z-10">
                      <span className="flex size-11 items-center justify-center rounded-full bg-primary border-[2.5px] border-ink text-white text-sm font-bold shadow-[3px_3px_0_0_var(--ink)]">
                        {i + 1}
                      </span>
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
