"use client";

import { DayPicker, type DayPickerProps } from "react-day-picker";
import { cn } from "@/lib/utils";

/** Day picker for the contact page booking scheduler (react-day-picker v10). */
export function Calendar({ className, ...props }: DayPickerProps) {
  return (
    <DayPicker
      className={cn("rdp-root", className)}
      {...props}
    />
  );
}
