"use client";

import { useCallback, useEffect, useState } from "react";
import { X } from "lucide-react";
import { PrimaryButton } from "@/components/shared/primary-button";
import { siteConfig } from "@/lib/site-config";

const TOAST_STORAGE_KEY = "admarkapture-scroll-cta-shown";

/** Scroll-triggered CTA — shows once at 70% depth, never again after dismiss or first view. */
export function ScrollMicroCta() {
  const [ready, setReady] = useState(false);
  /** Persisted — once true, the toast never appears again */
  const [isToastShown, setIsToastShown] = useState(true);
  const [visible, setVisible] = useState(false);

  const markToastShown = useCallback(() => {
    try {
      localStorage.setItem(TOAST_STORAGE_KEY, "true");
    } catch {
      /* private browsing — still hide for this session */
    }
    setIsToastShown(true);
  }, []);

  // Read persisted flag after mount (avoids SSR/hydration flash)
  useEffect(() => {
    try {
      setIsToastShown(localStorage.getItem(TOAST_STORAGE_KEY) === "true");
    } catch {
      setIsToastShown(false);
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready || isToastShown) return;

    const onScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollable <= 0) return;
      const depth = window.scrollY / scrollable;
      if (depth >= 0.7) {
        setVisible(true);
        markToastShown();
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [ready, isToastShown, markToastShown]);

  const handleDismiss = () => {
    markToastShown();
    setVisible(false);
  };

  if (!ready || !visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Free lead gen audit offer"
      className="fixed bottom-20 md:bottom-6 left-4 right-4 z-50 mx-auto max-w-lg animate-in slide-in-from-bottom-4 fade-in duration-300"
    >
      <div className="card-2d bg-white p-4 sm:p-5 shadow-lg relative">
        <button
          type="button"
          onClick={handleDismiss}
          className="absolute top-3 right-3 rounded-full p-1 text-ink/50 hover:text-ink hover:bg-muted"
          aria-label="Dismiss"
        >
          <X className="size-4" />
        </button>
        <p className="font-bold text-ink pr-8">Not ready to book a call?</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Get the free lead gen audit instead. Takes 2 minutes. Keeps the roadmap either way.
        </p>
        <div className="mt-4">
          <PrimaryButton
            href="/free-audit"
            badge={siteConfig.ctaPrimaryBadge}
            onClick={markToastShown}
          >
            {siteConfig.ctaPrimary} →
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}
