import {
  auditAdManagers,
  auditChannelOptions,
  auditCrmOptions,
  auditLeadGoals,
  auditTrackingOptions,
  strategyCallTimelines,
  strategyCallTopics,
} from "@/lib/site-config";
import {
  createLeadAction,
  createEmptyLead,
  normalizeLead,
  type FitLabel,
  type LeadPriority,
  type LeadSource,
  type OutreachLead,
} from "@/lib/admin-mock-data";
import {
  addBusinessDays,
  createDefaultAuditChecklist,
  createPortalToken,
} from "@/lib/product-mock-utils";

export type IntakePayload = {
  source: LeadSource;
  name: string;
  email: string;
  phone?: string;
  company: string;
  website: string;
  monthlySpend: string;
  leadGoalId?: string;
  adManagerId?: string;
  channelIds?: string[];
  crmId?: string;
  trackingId?: string;
  callTopicId?: string;
  timelineId?: string;
  preferredSlot?: string;
  challenge?: string;
};

function labelFromOptions<T extends { id: string; label: string }>(
  options: readonly T[],
  id?: string,
): string {
  if (!id) return "";
  return options.find((o) => o.id === id)?.label ?? "";
}

function channelLabels(ids: string[] = []): string[] {
  return ids
    .map((id) => auditChannelOptions.find((c) => c.id === id)?.label)
    .filter(Boolean) as string[];
}

/** Mock ICP scoring — mirrors how a real rules engine would route leads. */
export function scoreIntake(payload: IntakePayload): {
  score: number;
  priority: LeadPriority;
  fitLabel: FitLabel;
  assignedTo: string;
} {
  let score = 50;

  if (payload.monthlySpend === "$30K+/mo") score += 25;
  else if (payload.monthlySpend === "$15K–$30K/mo") score += 18;
  else if (payload.monthlySpend === "$5K–$15K/mo") score += 10;
  else if (payload.monthlySpend === "<$5K/mo") score -= 15;
  else if (payload.monthlySpend === "Not running ads yet") score -= 20;

  if (payload.leadGoalId === "sqls" || payload.leadGoalId === "demos") score += 8;
  if (payload.trackingId === "yes") score += 10;
  else if (payload.trackingId === "no") score -= 5;
  if (payload.timelineId === "asap") score += 12;

  score = Math.max(0, Math.min(100, score));

  let fitLabel: FitLabel = "review";
  if (score >= 75) fitLabel = "good-fit";
  else if (score < 45) fitLabel = "poor-fit";

  let priority: LeadPriority = "medium";
  if (score >= 80) priority = "high";
  else if (score < 50) priority = "low";

  const assignees = ["Jordan Lee", "Priya Sharma", "Marcus Chen", "Elena Rodriguez"];
  const assignedTo =
    score >= 80
      ? "Jordan Lee"
      : assignees[Math.abs(payload.email.length) % assignees.length];

  return { score, priority, fitLabel, assignedTo };
}

/** Build a lead from website intake — persisted to localStorage (mock pipeline). */
export function buildLeadFromIntake(payload: IntakePayload): OutreachLead {
  const now = new Date().toISOString();
  const routing = scoreIntake(payload);
  const slaDue = addBusinessDays(new Date(), 5).toISOString().slice(0, 10);

  const leadGoal = labelFromOptions(auditLeadGoals, payload.leadGoalId);
  const adManager = labelFromOptions(auditAdManagers, payload.adManagerId);
  const crm = labelFromOptions(auditCrmOptions, payload.crmId);
  const tracking = labelFromOptions(auditTrackingOptions, payload.trackingId);
  const callTopic = labelFromOptions(strategyCallTopics, payload.callTopicId);
  const timeline = labelFromOptions(strategyCallTimelines, payload.timelineId);
  const channels = channelLabels(payload.channelIds);

  const initialActions =
    payload.source === "audit"
      ? [
          createLeadAction("Send audit kickoff + request ad account access", slaDue),
          createLeadAction("Complete 5-day audit SLA delivery", slaDue),
        ]
      : [
          createLeadAction(
            "Confirm strategy call slot",
            addBusinessDays(new Date(), 1).toISOString().slice(0, 10),
          ),
          createLeadAction(
            "Prep call benchmarks deck",
            addBusinessDays(new Date(), 2).toISOString().slice(0, 10),
          ),
        ];

  return normalizeLead({
    ...createEmptyLead(payload.source),
    id: `lead-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
    portalToken: createPortalToken(),
    submittedAt: now,
    updatedAt: now,
    status: "new",
    name: payload.name,
    email: payload.email,
    phone: payload.phone?.trim() || "Pending — collect on kickoff",
    company: payload.company,
    website: payload.website,
    monthlySpend: payload.monthlySpend,
    leadGoal,
    adManager,
    channels,
    crm: crm || undefined,
    tracking: tracking || undefined,
    callTopic: callTopic || undefined,
    timeline: timeline || undefined,
    preferredSlot: payload.preferredSlot,
    challenge: payload.challenge,
    ...routing,
    actions: initialActions,
    auditChecklist: payload.source === "audit" ? createDefaultAuditChecklist() : [],
    auditSlaDue: payload.source === "audit" ? slaDue : undefined,
    emailLog: [],
    notes: [
      `[Intake] Submitted via ${payload.source === "audit" ? "/free-audit" : "/contact"} form`,
    ],
  });
}
