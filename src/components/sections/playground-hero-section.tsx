"use client";

import { useState } from "react";
import { Play, Star } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlayfulBadge } from "@/components/ui/playful-badge";
import { DashboardMockup } from "@/components/illustrations/dashboard-mockup";
import { PlaygroundDoodle } from "@/components/illustrations/playground-doodles";
import { FadeIn } from "@/components/motion/fade-in";
import { PrimaryButton } from "@/components/shared/primary-button";
import { LogoMarquee } from "@/components/shared/logo-marquee";
import { heroTabSlugs, services, type ServiceSlug } from "@/lib/services-data";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

const tabIcons: Record<string, string> = {
  meta: "📘",
  youtube: "▶️",
  instagram: "📸",
};

/** Playground-style hero: centered headline, tabbed dashboard mockup, side doodles. */
export function PlaygroundHeroSection() {
  const [activeTab, setActiveTab] = useState<ServiceSlug>(heroTabSlugs[0]);

  return (
    <section className="relative overflow-hidden bg-cream pt-12 pb-4 sm:pt-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 text-center">
        <FadeIn>
          <PlayfulBadge variant="ticket" className="mb-6">
            B2B SaaS · Paid Ads Only
          </PlayfulBadge>
          <h1 className="text-4xl font-bold tracking-tight text-ink sm:text-5xl lg:text-[3.25rem] text-balance max-w-4xl mx-auto leading-[1.1]">
            Paid ads management SaaS founders{" "}
            <span className="text-play-blue-dark">actually trust</span>
          </h1>
          <p className="mt-5 text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Meta, Instagram, and YouTube campaigns built around demos, trials, and pipeline — with
            the transparency your budget deserves.
          </p>
          <div className="mt-8 flex justify-center">
            <PrimaryButton href="/free-audit" size="lg">
              {siteConfig.ctaPrimary}
            </PrimaryButton>
          </div>
          <div className="mt-5 flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="size-4 fill-sun text-sun" />
              ))}
            </div>
            <span>4.9 stars across 40+ SaaS clients</span>
          </div>
        </FadeIn>

        <FadeIn delay={0.1} className="mt-12">
          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as ServiceSlug)}>
            <div className="relative mx-auto flex justify-center">
              <TabsList className="inline-flex w-auto justify-center rounded-full card-2d-sm bg-white p-1.5 h-auto gap-1 overflow-hidden">
                {heroTabSlugs.map((slug) => {
                  const s = services[slug];
                  return (
                    <TabsTrigger
                      key={slug}
                      value={slug}
                      className={cn(
                        "rounded-full px-4 py-2 text-sm font-semibold shrink-0 flex-none",
                        "data-active:bg-play-blue data-active:text-white data-active:shadow-none"
                      )}
                    >
                      <span className="mr-1.5">{tabIcons[slug]}</span>
                      {s.tabLabel}
                    </TabsTrigger>
                  );
                })}
              </TabsList>
            </div>

            <div className="mt-8 flex items-center justify-center gap-2 sm:gap-6 lg:gap-10">
              <PlaygroundDoodle side="left" className="hidden md:block" />
              <div className="w-full max-w-xl lg:max-w-2xl">
                {heroTabSlugs.map((slug) => (
                  <TabsContent key={slug} value={slug} className="mt-0">
                    <DashboardMockup service={services[slug]} />
                    <button
                      type="button"
                      className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-play-blue-dark hover:underline"
                    >
                      <span className="flex size-8 items-center justify-center rounded-full bg-play-blue/15">
                        <Play className="size-4 fill-play-blue-dark text-play-blue-dark" />
                      </span>
                      Watch channel walkthrough · 8 min
                    </button>
                  </TabsContent>
                ))}
              </div>
              <PlaygroundDoodle side="right" className="hidden md:block" />
            </div>
          </Tabs>
        </FadeIn>
      </div>

      <LogoMarquee className="mt-10 border-t border-border/60" />
    </section>
  );
}
