"use client";

import { useState } from "react";
import { CalendarDays, FileText } from "lucide-react";
import { CalendarEmbed } from "@/components/shared/calendar-embed";
import { SchedulePicker } from "@/components/shared/schedule-picker";
import { StrategyCallForm } from "@/components/shared/strategy-call-form";
import { isCalendarConfigured } from "@/lib/site-config";
import { cn } from "@/lib/utils";

type BookingMode = "calendar" | "form";

/** Contact booking — Cal.com calendar or inline scheduler, plus form fallback. */
export function BookingSection() {
  const [mode, setMode] = useState<BookingMode>("calendar");
  const [preferredSlot, setPreferredSlot] = useState("");

  const handleSlotConfirm = (slot: string) => {
    setPreferredSlot(slot);
    setMode("form");
    requestAnimationFrame(() => {
      document.getElementById("contact-fallback")?.scrollIntoView({ behavior: "smooth" });
    });
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* Calendar vs form toggle */}
      <div className="flex rounded-full border-2 border-ink bg-white p-1 card-2d-sm shadow-none">
        <button
          type="button"
          onClick={() => setMode("calendar")}
          className={cn(
            "flex-1 inline-flex items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition-all",
            mode === "calendar"
              ? "bg-play-blue text-white"
              : "text-ink/70 hover:text-ink"
          )}
        >
          <CalendarDays className="size-4" />
          Pick a time
        </button>
        <button
          type="button"
          onClick={() => setMode("form")}
          className={cn(
            "flex-1 inline-flex items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition-all",
            mode === "form"
              ? "bg-play-blue text-white"
              : "text-ink/70 hover:text-ink"
          )}
        >
          <FileText className="size-4" />
          Send a request
        </button>
      </div>

      {mode === "calendar" ? (
        <div className="card-2d bg-white overflow-hidden">
          {isCalendarConfigured() ? (
            <CalendarEmbed className="border-0 shadow-none" />
          ) : (
            <>
              <div className="border-b-2 border-ink/10 bg-cream/50 px-4 py-3">
                <p className="text-sm font-semibold text-ink">
                  Choose your preferred call time
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Select a date and time — we&apos;ll confirm by email within one business day.
                </p>
              </div>
              <SchedulePicker onSlotConfirm={handleSlotConfirm} />
            </>
          )}
        </div>
      ) : (
        <div id="contact-fallback">
          <StrategyCallForm
            title="Confirm your strategy call"
            description={
              preferredSlot
                ? `Tell us about your funnel — we'll confirm your slot: ${preferredSlot}`
                : "Share a few details so we can make your 30-min call count."
            }
            preferredSlot={preferredSlot}
            onClearSlot={() => setPreferredSlot("")}
          />
        </div>
      )}

      {mode === "calendar" && (
        <p className="text-center text-sm text-muted-foreground">
          Prefer to send details first?{" "}
          <button
            type="button"
            onClick={() => setMode("form")}
            className="font-semibold text-primary hover:underline"
          >
            Use the booking request form →
          </button>
        </p>
      )}
    </div>
  );
}
