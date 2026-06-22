"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { PrimaryButton } from "@/components/shared/primary-button";

/** Scroll-triggered CTA for visitors who reach 70% depth without converting. */
export function ScrollMicroCta() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (dismissed) return;

    const onScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollable <= 0) return;
      const depth = window.scrollY / scrollable;
      if (depth >= 0.7) setVisible(true);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [dismissed]);

  if (!visible || dismissed) return null;

  return (
    <div
      role="dialog"
      aria-label="Free audit offer"
      className="fixed bottom-20 md:bottom-6 left-4 right-4 z-50 mx-auto max-w-lg animate-in slide-in-from-bottom-4 fade-in duration-300"
    >
      <div className="card-2d bg-white p-4 sm:p-5 shadow-lg relative">
        <button
          type="button"
          onClick={() => setDismissed(true)}
          className="absolute top-3 right-3 rounded-full p-1 text-ink/50 hover:text-ink hover:bg-muted"
          aria-label="Dismiss"
        >
          <X className="size-4" />
        </button>
        <p className="font-bold text-ink pr-8">Not ready to book a call?</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Get the free audit instead. Takes 2 minutes. Keeps the roadmap either way.
        </p>
        <div className="mt-4">
          <PrimaryButton href="/free-audit">
            Get My Free Audit →
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}
