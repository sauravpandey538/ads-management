"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, ChevronRight, Shield, Timer } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PlayfulBadge } from "@/components/ui/playful-badge";
import { PlayfulCard } from "@/components/ui/playful-card";
import { PrimaryButton } from "@/components/shared/primary-button";
import { LegalConsent } from "@/components/shared/legal-consent";
import { cn } from "@/lib/utils";

const auditPerks = [
  "Account waste analysis across all active channels",
  "Tracking & CRM integration review",
  "90-day roadmap with quick wins",
  "Channel budget allocation recommendation",
] as const;

const spendOptions = [
  "<$5K/mo",
  "$5K–$15K/mo",
  "$15K–$30K/mo",
  "$30K+/mo",
] as const;

/** Optional audit question — matches channels we manage on /services. */
const adChannelOptions = [
  { id: "meta", label: "Meta Ads" },
  { id: "instagram", label: "Instagram Ads" },
  { id: "youtube", label: "YouTube Ads" },
  { id: "linkedin", label: "LinkedIn Ads" },
  { id: "google", label: "Google Ads" },
  { id: "unsure", label: "I'm not sure" },
] as const;

type AdChannelId = (typeof adChannelOptions)[number]["id"];

type LeadFormProps = {
  title?: string;
  description?: string;
  submitLabel?: string;
  className?: string;
};

export function LeadForm({
  title = "Get your free ads audit",
  description = "Two steps. Under 60 seconds. Roadmap in 5 business days.",
  submitLabel = "Send my free audit",
  className,
}: LeadFormProps) {
  const [step, setStep] = useState<1 | 2>(1);
  const [submitted, setSubmitted] = useState(false);
  const [spend, setSpend] = useState<string>("");
  const [adChannels, setAdChannels] = useState<AdChannelId[]>([]);

  /** "I'm not sure" is exclusive; other channels can be multi-selected. */
  const toggleAdChannel = (id: AdChannelId) => {
    if (id === "unsure") {
      setAdChannels((prev) => (prev.includes("unsure") ? [] : ["unsure"]));
      return;
    }
    setAdChannels((prev) => {
      const withoutUnsure = prev.filter((channel) => channel !== "unsure");
      return withoutUnsure.includes(id)
        ? withoutUnsure.filter((channel) => channel !== id)
        : [...withoutUnsure, id];
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
      return;
    }
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <PlayfulCard
        variant="ticket"
        tone="mint"
        className={cn("p-8 sm:p-10 text-center max-w-2xl mx-auto", className)}
      >
        <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-white border-[2.5px] border-ink shadow-[3px_3px_0_0_var(--ink)] text-3xl">
          ✓
        </div>
        <h3 className="text-2xl font-bold text-ink">Audit request received!</h3>
        <p className="mt-3 text-ink/70 leading-relaxed">
          We&apos;ll deliver your custom 90-day roadmap within 5 business days. Check
          your inbox.
        </p>
        <Link
          href="/services"
          className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
        >
          Browse our channel services <ChevronRight className="size-4" />
        </Link>
      </PlayfulCard>
    );
  }

  return (
    <div className={cn("grid gap-6 lg:grid-cols-[1fr_1.15fr]", className)}>
      {/* Value panel — pin note style */}
      <PlayfulCard
        variant="pin"
        tone="sun"
        className="p-6 sm:p-8 flex flex-col justify-between"
      >
        <div>
          <PlayfulBadge variant="stamp" className="mb-4">
            $2,500 value · Free
          </PlayfulBadge>
          <h3 className="text-xl font-bold text-ink">
            What&apos;s in your audit
          </h3>
          <ul className="mt-5 space-y-3">
            {auditPerks.map((perk) => (
              <li
                key={perk}
                className="flex gap-3 text-sm text-ink/80 leading-relaxed"
              >
                <span className="flex size-7 shrink-0 items-center justify-center rounded-md bg-white border-2 border-ink shadow-[1px_1px_0_0_var(--ink)]">
                  <Check className="size-3.5 text-ink" strokeWidth={3} />
                </span>
                {perk}
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-8 grid gap-3 sm:grid-cols-1">
          <div className="flex items-center gap-3 rounded-lg bg-white/80 border-2 border-ink/20 px-3 py-2.5">
            <span className="flex size-9 items-center justify-center rounded-lg bg-sky/30 border border-ink/20">
              <Timer className="size-4 text-ink" />
            </span>
            <span className="text-sm font-medium text-ink">
              Delivered within 5 business days
            </span>
          </div>
          <div className="flex items-center gap-3 rounded-lg bg-white/80 border-2 border-ink/20 px-3 py-2.5">
            <span className="flex size-9 items-center justify-center rounded-lg bg-mint/40 border border-ink/20">
              <Shield className="size-4 text-ink" />
            </span>
            <span className="text-sm font-medium text-ink">
              Keep the roadmap even if we&apos;re not a fit
            </span>
          </div>
        </div>
      </PlayfulCard>

      {/* Form panel — ticket style */}
      <PlayfulCard variant="ticket" tone="neutral" className="p-6 sm:p-8">
        <div className="flex items-center justify-between gap-2 mb-1">
          <PlayfulBadge variant="flag">Step {step} of 2</PlayfulBadge>
          <div className="flex gap-1">
            {[1, 2].map((s) => (
              <span
                key={s}
                className={cn(
                  "size-2.5 rounded-full border-2 border-ink",
                  step >= s ? "bg-primary" : "bg-white",
                )}
              />
            ))}
          </div>
        </div>
        <h3 className="text-xl font-bold text-ink mt-3">{title}</h3>
        <p className="mt-1 text-sm text-ink/65">{description}</p>

        <div className="mt-5 h-2 rounded-full border-2 border-ink/20 bg-white overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-300"
            style={{ width: step === 1 ? "50%" : "100%" }}
          />
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {step === 1 ? (
            <>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-ink font-semibold">
                    Your name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    required
                    placeholder="Jane Smith"
                    className="border-2 border-ink/25 rounded-lg bg-white shadow-[2px_2px_0_0_var(--ink)] focus-visible:ring-primary"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-ink font-semibold">
                    Work email
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="jane@saas.co"
                    className="border-2 border-ink/25 rounded-lg bg-white shadow-[2px_2px_0_0_var(--ink)] focus-visible:ring-primary"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="company" className="text-ink font-semibold">
                  Company
                </Label>
                <Input
                  id="company"
                  name="company"
                  required
                  placeholder="Your SaaS company"
                  className="border-2 border-ink/25 rounded-lg bg-white shadow-[2px_2px_0_0_var(--ink)] focus-visible:ring-primary"
                />
              </div>
              <PrimaryButton type="submit" className="w-full justify-center">
                Continue
              </PrimaryButton>
            </>
          ) : (
            <>
              <div className="space-y-2">
                <Label className="text-ink font-semibold">
                  Monthly ad spend
                </Label>
                <div className="grid grid-cols-2 gap-2">
                  {spendOptions.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setSpend(opt)}
                      className={cn(
                        "rounded-lg px-3 py-2.5 text-sm font-semibold border-2 transition-all",
                        spend === opt
                          ? "bg-primary text-white border-ink shadow-[2px_2px_0_0_var(--ink)]"
                          : "bg-white border-ink/25 hover:border-ink/50 shadow-[2px_2px_0_0_var(--ink)]",
                      )}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                  <Label className="text-ink font-semibold">
                    Where should we focus your audit?
                  </Label>
                  <span className="text-xs font-medium text-ink/50">
                    Optional · channels you run or want to test
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {adChannelOptions.map((channel) => {
                    const selected = adChannels.includes(channel.id);
                    return (
                      <button
                        key={channel.id}
                        type="button"
                        aria-pressed={selected}
                        onClick={() => toggleAdChannel(channel.id)}
                        className={cn(
                          "rounded-lg px-3 py-2.5 text-left text-sm font-semibold border-2 transition-all",
                          selected
                            ? "bg-play-blue text-white border-ink shadow-[2px_2px_0_0_var(--ink)]"
                            : "bg-white border-ink/25 hover:border-ink/50 shadow-[2px_2px_0_0_var(--ink)]",
                          channel.id === "unsure" && "sm:col-span-3",
                        )}
                      >
                        {channel.label}
                      </button>
                    );
                  })}
                </div>
                <input
                  type="hidden"
                  name="adChannels"
                  value={adChannels.join(",")}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="goal" className="text-ink font-semibold">
                  Primary goal
                </Label>
                <Input
                  id="goal"
                  name="goal"
                  placeholder="Demos, trials, SQLs..."
                  className="border-2 border-ink/25 rounded-lg bg-white shadow-[2px_2px_0_0_var(--ink)]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message" className="text-ink font-semibold">
                  What&apos;s broken? (optional)
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="High CPL, bad tracking, wrong channels..."
                  rows={3}
                  className="border-2 border-ink/25 rounded-lg bg-white resize-none shadow-[2px_2px_0_0_var(--ink)]"
                />
              </div>
              <PrimaryButton type="submit" className="w-full justify-center">
                {submitLabel}
              </PrimaryButton>
            </>
          )}
          <LegalConsent />
        </form>
      </PlayfulCard>
    </div>
  );
}
