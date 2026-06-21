"use client";

import { FadeIn } from "@/components/motion/fade-in";
import { stats } from "@/lib/site-config";
import { Card2D } from "@/components/ui/card-2d";

export function StatsStripSection() {
  return (
    <section className="py-8">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-4 px-4 sm:grid-cols-4 sm:px-6">
        {stats.map((stat, i) => (
          <FadeIn key={stat.label} delay={i * 0.05}>
            <Card2D className="p-4 text-center card-2d-sm">
              <p className="text-2xl sm:text-3xl font-bold text-primary">{stat.value}</p>
              <p className="mt-1 text-xs sm:text-sm text-muted-foreground">{stat.label}</p>
            </Card2D>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
