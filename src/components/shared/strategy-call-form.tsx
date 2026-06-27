"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { IntakeSuccessPanel } from "@/components/shared/intake-success-panel";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PlayfulBadge } from "@/components/ui/playful-badge";
import { PlayfulCard } from "@/components/ui/playful-card";
import { FormOptionChips } from "@/components/shared/form-option-chips";
import { PrimaryButton } from "@/components/shared/primary-button";
import { LegalConsent } from "@/components/shared/legal-consent";
import {
  auditAdManagers,
  auditChannelOptions,
  auditLeadGoals,
  auditSpendOptions,
  strategyCallTimelines,
  strategyCallTopics,
  type AuditAdManagerId,
  type AuditChannelId,
  type AuditLeadGoalId,
  type StrategyCallTimelineId,
  type StrategyCallTopicId,
} from "@/lib/site-config";
import { appendLead } from "@/lib/leads-persistence";
import { buildLeadFromIntake } from "@/lib/intake-scoring";
import type { OutreachLead } from "@/lib/admin-mock-data";
import { cn } from "@/lib/utils";

const TOTAL_STEPS = 2;

type StrategyCallFormProps = {
  title?: string;
  description?: string;
  submitLabel?: string;
  className?: string;
  preferredSlot?: string;
  onClearSlot?: () => void;
};

/** Strategy call booking form — intake questions before a live 30-min call. */
export function StrategyCallForm({
  title = "Book your strategy call",
  description = "Two quick steps so we can make the most of your 30 minutes.",
  submitLabel = "Send booking request",
  className,
  preferredSlot = "",
  onClearSlot,
}: StrategyCallFormProps) {
  const [step, setStep] = useState<1 | 2>(1);
  const [submitted, setSubmitted] = useState(false);
  const [spend, setSpend] = useState("");
  const [leadGoal, setLeadGoal] = useState<AuditLeadGoalId | "">("");
  const [adManager, setAdManager] = useState<AuditAdManagerId | "">("");
  const [callTopic, setCallTopic] = useState<StrategyCallTopicId | "">("");
  const [timeline, setTimeline] = useState<StrategyCallTimelineId | "">("");
  const [adChannels, setAdChannels] = useState<AuditChannelId[]>([]);
  const [preferredTimes, setPreferredTimes] = useState(
    preferredSlot ? `Preferred: ${preferredSlot}` : "",
  );
  const [submittedLead, setSubmittedLead] = useState<OutreachLead | null>(null);

  const toggleAdChannel = (id: AuditChannelId) => {
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
    const fd = new FormData(e.currentTarget);
    const lead = buildLeadFromIntake({
      source: "strategy-call",
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      company: String(fd.get("company") ?? ""),
      website: String(fd.get("website") ?? ""),
      monthlySpend: spend,
      leadGoalId: leadGoal,
      adManagerId: adManager,
      channelIds: adChannels,
      callTopicId: callTopic,
      timelineId: timeline,
      preferredSlot: preferredSlot || preferredTimes || undefined,
      challenge: String(fd.get("callPrep") ?? "") || undefined,
    });
    appendLead(lead);
    setSubmittedLead(lead);
    setSubmitted(true);
  };

  if (submitted && submittedLead) {
    return (
      <IntakeSuccessPanel
        lead={submittedLead}
        headline="Strategy call request received!"
        subline={`We'll confirm your 30-min call within one business day${preferredSlot ? ` for ${preferredSlot}` : ""}. Your request is already routed in our admin demo.`}
        className={className}
      />
    );
  }

  return (
    <PlayfulCard variant="ticket" tone="neutral" className={cn("p-6 sm:p-8", className)}>
      <div className="flex items-center justify-between gap-2 mb-1">
        <PlayfulBadge variant="flag">
          Step {step} of {TOTAL_STEPS}
        </PlayfulBadge>
        <div className="flex gap-1">
          {([1, 2] as const).map((s) => (
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

      <div className="mt-5 h-2 rounded-full border-2 border-ink/20 bg-white overflow-hidden">
        <div
          className="h-full bg-primary transition-all duration-300"
          style={{ width: step === 1 ? "50%" : "100%" }}
        />
      </div>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        {step === 1 && (
          <>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              About you
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="call-name" className="text-ink font-semibold">
                  Your name
                </Label>
                <Input
                  id="call-name"
                  name="name"
                  required
                  placeholder="Jane Smith"
                  className="border-2 border-ink/25 rounded-lg bg-white shadow-[2px_2px_0_0_var(--ink)]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="call-email" className="text-ink font-semibold">
                  Work email
                </Label>
                <Input
                  id="call-email"
                  name="email"
                  type="email"
                  required
                  placeholder="jane@saas.co"
                  className="border-2 border-ink/25 rounded-lg bg-white shadow-[2px_2px_0_0_var(--ink)]"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="call-company" className="text-ink font-semibold">
                Company name
              </Label>
              <Input
                id="call-company"
                name="company"
                required
                placeholder="Your SaaS company"
                className="border-2 border-ink/25 rounded-lg bg-white shadow-[2px_2px_0_0_var(--ink)]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="call-website" className="text-ink font-semibold">
                Website URL
              </Label>
              <Input
                id="call-website"
                name="website"
                type="url"
                required
                placeholder="https://yoursaas.com"
                className="border-2 border-ink/25 rounded-lg bg-white shadow-[2px_2px_0_0_var(--ink)]"
              />
            </div>
            {!preferredSlot && (
              <div className="space-y-2">
                <Label htmlFor="call-times" className="text-ink font-semibold">
                  Preferred call times{" "}
                  <span className="font-normal text-muted-foreground">(optional)</span>
                </Label>
                <Input
                  id="call-times"
                  name="preferredTimes"
                  value={preferredTimes}
                  onChange={(e) => setPreferredTimes(e.target.value)}
                  placeholder="e.g. Tue–Thu afternoons PT"
                  className="border-2 border-ink/25 rounded-lg bg-white shadow-[2px_2px_0_0_var(--ink)]"
                />
              </div>
            )}
            {preferredSlot && (
              <input type="hidden" name="preferredSlot" value={preferredSlot} />
            )}
            <PrimaryButton type="submit" className="w-full justify-center">
              Continue
            </PrimaryButton>
          </>
        )}

        {step === 2 && (
          <>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Your marketing &amp; call focus
            </p>
            <div className="space-y-2">
              <Label className="text-ink font-semibold">Monthly ad spend</Label>
              <div className="grid grid-cols-2 gap-2">
                {auditSpendOptions.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setSpend(opt)}
                    className={cn(
                      "rounded-lg px-3 py-2.5 text-sm font-semibold border-2 transition-all text-left",
                      spend === opt
                        ? "bg-primary text-white border-ink shadow-[2px_2px_0_0_var(--ink)]"
                        : "bg-white border-ink/25 hover:border-ink/50 shadow-[2px_2px_0_0_var(--ink)]",
                      opt === "Not running ads yet" && "col-span-2",
                    )}
                  >
                    {opt}
                  </button>
                ))}
              </div>
              <input type="hidden" name="monthlySpend" value={spend} required />
            </div>

            <div className="space-y-2">
              <Label className="text-ink font-semibold">Primary lead goal</Label>
              <FormOptionChips
                options={auditLeadGoals}
                value={leadGoal}
                onChange={setLeadGoal}
                columns={2}
              />
              <input type="hidden" name="leadGoal" value={leadGoal} required />
            </div>

            <div className="space-y-2">
              <Label className="text-ink font-semibold">Who manages ads today?</Label>
              <FormOptionChips
                options={auditAdManagers}
                value={adManager}
                onChange={setAdManager}
                columns={2}
              />
              <input type="hidden" name="adManager" value={adManager} required />
            </div>

            <div className="space-y-2">
              <Label className="text-ink font-semibold">
                What should we focus on in the call?
              </Label>
              <FormOptionChips
                options={strategyCallTopics}
                value={callTopic}
                onChange={setCallTopic}
                columns={1}
              />
              <input type="hidden" name="callTopic" value={callTopic} required />
            </div>

            <div className="space-y-2">
              <Label className="text-ink font-semibold">
                When are you looking to start?
              </Label>
              <FormOptionChips
                options={strategyCallTimelines}
                value={timeline}
                onChange={setTimeline}
                columns={2}
              />
              <input type="hidden" name="timeline" value={timeline} required />
            </div>

            <div className="space-y-2">
              <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                <Label className="text-ink font-semibold">Channels to discuss</Label>
                <span className="text-xs font-medium text-ink/50">Optional</span>
              </div>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {auditChannelOptions.map((channel) => {
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
              <input type="hidden" name="adChannels" value={adChannels.join(",")} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="call-prep" className="text-ink font-semibold">
                Anything we should prepare?{" "}
                <span className="font-normal text-muted-foreground">(optional)</span>
              </Label>
              <Textarea
                id="call-prep"
                name="callPrep"
                rows={3}
                placeholder="Current CPL, agency frustrations, specific campaigns to review..."
                className="border-2 border-ink/25 rounded-lg bg-white resize-none shadow-[2px_2px_0_0_var(--ink)]"
              />
            </div>

            <PrimaryButton
              type="submit"
              className="w-full justify-center"
              disabled={!spend || !leadGoal || !adManager || !callTopic || !timeline}
            >
              {submitLabel}
            </PrimaryButton>
          </>
        )}
        <LegalConsent />
      </form>
    </PlayfulCard>
  );
}
