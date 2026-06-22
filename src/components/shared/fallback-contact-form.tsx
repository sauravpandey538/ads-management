"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PlayfulCard } from "@/components/ui/playful-card";
import { PrimaryButton } from "@/components/shared/primary-button";
import { LegalConsent } from "@/components/shared/legal-consent";
import { cn } from "@/lib/utils";

type FallbackContactFormProps = {
  title?: string;
  description?: string;
  className?: string;
  /** Pre-filled from the inline schedule picker. */
  preferredSlot?: string;
  onClearSlot?: () => void;
};

/** Booking request form — used when not booking directly on Cal.com. */
export function FallbackContactForm({
  title = "Send a booking request",
  description = "Drop your details and we'll reach out within one business day.",
  className,
  preferredSlot = "",
  onClearSlot,
}: FallbackContactFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [message, setMessage] = useState(
    preferredSlot ? `Preferred call time: ${preferredSlot}` : ""
  );

  useEffect(() => {
    if (preferredSlot) {
      setMessage(`Preferred call time: ${preferredSlot}`);
    }
  }, [preferredSlot]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <PlayfulCard variant="ticket" tone="mint" className={cn("p-8 text-center", className)}>
        <p className="text-2xl font-bold text-ink">Booking request received!</p>
        <p className="mt-2 text-ink/70">
          We&apos;ll confirm your call within one business day
          {preferredSlot ? ` for ${preferredSlot}` : ""}.
        </p>
      </PlayfulCard>
    );
  }

  return (
    <PlayfulCard variant="ticket" tone="neutral" className={cn("p-6 sm:p-8", className)}>
      <h3 className="text-xl font-bold text-ink">{title}</h3>
      <p className="mt-1 text-sm text-ink/65">{description}</p>

      {preferredSlot && (
        <div className="mt-4 flex items-center justify-between gap-2 rounded-lg border-2 border-play-blue/30 bg-play-blue/5 px-3 py-2">
          <p className="text-sm font-medium text-ink">
            <span className="text-muted-foreground">Slot: </span>
            {preferredSlot}
          </p>
          {onClearSlot && (
            <button
              type="button"
              onClick={onClearSlot}
              className="text-xs font-semibold text-primary hover:underline shrink-0"
            >
              Change
            </button>
          )}
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="fallback-name" className="text-ink font-semibold">
              Your name
            </Label>
            <Input
              id="fallback-name"
              name="name"
              required
              className="border-2 border-ink/25 rounded-lg bg-white shadow-[2px_2px_0_0_var(--ink)]"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="fallback-email" className="text-ink font-semibold">
              Work email
            </Label>
            <Input
              id="fallback-email"
              name="email"
              type="email"
              required
              className="border-2 border-ink/25 rounded-lg bg-white shadow-[2px_2px_0_0_var(--ink)]"
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="fallback-company" className="text-ink font-semibold">
            Company
          </Label>
          <Input
            id="fallback-company"
            name="company"
            required
            className="border-2 border-ink/25 rounded-lg bg-white shadow-[2px_2px_0_0_var(--ink)]"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="fallback-message" className="text-ink font-semibold">
            {preferredSlot ? "Anything else we should know?" : "Preferred times or questions"}
          </Label>
          <Textarea
            id="fallback-message"
            name="message"
            rows={3}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={
              preferredSlot
                ? "Optional — funnel context, current ad spend, etc."
                : "e.g. Tue–Thu afternoons PT, or questions about our services"
            }
            className="border-2 border-ink/25 rounded-lg bg-white resize-none shadow-[2px_2px_0_0_var(--ink)]"
          />
        </div>
        <PrimaryButton type="submit" className="w-full justify-center">
          Send booking request
        </PrimaryButton>
        <LegalConsent />
      </form>
    </PlayfulCard>
  );
}
