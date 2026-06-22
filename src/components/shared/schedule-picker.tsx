"use client";

import { useState } from "react";
import { format, isBefore, isWeekend, startOfDay } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

const TIME_SLOTS = [
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
] as const;

type SchedulePickerProps = {
  onSlotConfirm: (slotLabel: string) => void;
  className?: string;
};

/** Inline date + time picker when Cal.com isn’t configured yet. */
export function SchedulePicker({ onSlotConfirm, className }: SchedulePickerProps) {
  const [date, setDate] = useState<Date | undefined>();
  const [time, setTime] = useState<string | null>(null);
  const today = startOfDay(new Date());

  const slotLabel =
    date && time
      ? `${format(date, "EEEE, MMMM d, yyyy")} at ${time} PT`
      : null;

  return (
    <div className={cn("p-4 sm:p-6", className)}>
      <div className="grid gap-6 md:grid-cols-[auto_1fr]">
        <div className="rounded-xl border-2 border-ink/15 bg-white p-2 mx-auto md:mx-0">
          <Calendar
            mode="single"
            selected={date}
            onSelect={(d) => {
              setDate(d);
              setTime(null);
            }}
            disabled={(d) => isBefore(d, today) || isWeekend(d)}
          />
        </div>

        <div className="min-w-0">
          <p className="text-sm font-semibold text-ink mb-3">
            {date ? "Pick a time (Pacific)" : "Select a weekday to see available times"}
          </p>

          {date ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {TIME_SLOTS.map((slot) => (
                <button
                  key={slot}
                  type="button"
                  onClick={() => setTime(slot)}
                  className={cn(
                    "rounded-lg border-2 px-3 py-2 text-sm font-semibold transition-all",
                    time === slot
                      ? "border-ink bg-primary text-white shadow-[2px_2px_0_0_var(--ink)]"
                      : "border-ink/25 bg-white hover:border-ink/50 shadow-[2px_2px_0_0_var(--ink)]"
                  )}
                >
                  {slot}
                </button>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              Mon–Fri only · 30-minute strategy calls
            </p>
          )}

          {slotLabel && (
            <div className="mt-6 rounded-xl border-2 border-ink/15 bg-cream/50 p-4">
              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Your preferred slot
              </p>
              <p className="mt-1 font-semibold text-ink">{slotLabel}</p>
              <button
                type="button"
                onClick={() => onSlotConfirm(slotLabel)}
                className="mt-4 w-full rounded-lg border-2 border-ink bg-primary px-4 py-2.5 text-sm font-bold text-white shadow-[2px_2px_0_0_var(--ink)] hover:translate-x-px hover:translate-y-px hover:shadow-[1px_1px_0_0_var(--ink)] transition-all"
              >
                Continue to confirm →
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
