/**
 * Admin lead types, seed data, and option lists for lead management UI.
 */

import { addBusinessDays, createDefaultAuditChecklist, createPortalToken } from "@/lib/product-mock-utils";
import { createAuditReportFromDraft, buildAuditReportDraft } from "@/lib/audit-report-utils";

export type LeadSource = "audit" | "strategy-call";

export type LeadStatus =
  | "new"
  | "contacted"
  | "audit-in-progress"
  | "audit-delivered"
  | "call-booked"
  | "proposal"
  | "won"
  | "lost";

export type LeadPriority = "high" | "medium" | "low";

export type FitLabel = "good-fit" | "review" | "poor-fit";

/** A follow-up task on a lead — supports multiple entries with completion tracking. */
export type LeadAction = {
  id: string;
  text: string;
  /** YYYY-MM-DD */
  dueDate: string;
  completed: boolean;
  completedAt?: string;
  createdAt: string;
};

/** Mock sent email log — simulates outreach without a real ESP. */
export type EmailLogEntry = {
  id: string;
  templateName: string;
  subject: string;
  sentAt: string;
};

/** Audit delivery checklist — visualized on lead + client portal. */
export type AuditChecklistItem = {
  id: string;
  label: string;
  done: boolean;
};

/** Delivered audit report — assigned by admin, visible on client portal. */
export type AuditReport = {
  title: string;
  executiveSummary: string;
  findings: string;
  recommendations: string;
  assignedAt: string;
  assignedBy?: string;
};

export type OutreachLead = {
  id: string;
  source: LeadSource;
  status: LeadStatus;
  priority: LeadPriority;
  /** 0–100 ICP + spend + timeline score */
  score: number;
  fitLabel: FitLabel;
  submittedAt: string;
  updatedAt: string;
  /** Required contact fields */
  name: string;
  email: string;
  phone: string;
  secondaryEmail?: string;
  secondaryPhone?: string;
  company: string;
  website: string;
  monthlySpend: string;
  leadGoal: string;
  adManager: string;
  channels: string[];
  crm?: string;
  tracking?: string;
  callTopic?: string;
  timeline?: string;
  preferredSlot?: string;
  challenge?: string;
  assignedTo?: string;
  /** Multiple follow-up tasks — mark individual items complete */
  actions: LeadAction[];
  /** Multiple admin notes — append-only in UI */
  notes: string[];
  /** Client portal link token (mock) */
  portalToken: string;
  /** 5-day audit SLA due date YYYY-MM-DD */
  auditSlaDue?: string;
  auditChecklist: AuditChecklistItem[];
  /** Mock email send history */
  emailLog: EmailLogEntry[];
  /** Assigned audit report — shown on client portal when set */
  auditReport?: AuditReport;
};

export const LEAD_STATUSES: LeadStatus[] = [
  "new",
  "contacted",
  "audit-in-progress",
  "audit-delivered",
  "call-booked",
  "proposal",
  "won",
  "lost",
];

export const LEAD_PRIORITIES: LeadPriority[] = ["high", "medium", "low"];

export const FIT_LABELS: FitLabel[] = ["good-fit", "review", "poor-fit"];

export const LEAD_SOURCES: LeadSource[] = ["audit", "strategy-call"];

export const statusLabels: Record<LeadStatus, string> = {
  new: "New",
  contacted: "Contacted",
  "audit-in-progress": "Audit in progress",
  "audit-delivered": "Audit delivered",
  "call-booked": "Call booked",
  proposal: "Proposal",
  won: "Won",
  lost: "Lost",
};

export const sourceLabels: Record<LeadSource, string> = {
  audit: "Free audit",
  "strategy-call": "Strategy call",
};

export const TEAM_ASSIGNEES = [
  "Jordan Lee",
  "Priya Sharma",
  "Marcus Chen",
  "Elena Rodriguez",
  "Nabila Farzin",
] as const;

export const STORAGE_KEY = "admarkapture-admin-leads";

export function createLeadAction(text: string, dueDate?: string): LeadAction {
  const now = new Date().toISOString();
  return {
    id: `action-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
    text,
    dueDate: dueDate ?? now.slice(0, 10),
    completed: false,
    createdAt: now,
  };
}

/** Blank lead for the add-lead form — name, email, phone required on save. */
export function createEmptyLead(source: LeadSource = "audit"): OutreachLead {
  const now = new Date().toISOString();
  return {
    id: `lead-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
    source,
    status: "new",
    priority: "medium",
    score: 50,
    fitLabel: "review",
    submittedAt: now,
    updatedAt: now,
    name: "",
    email: "",
    phone: "",
    secondaryEmail: "",
    secondaryPhone: "",
    company: "",
    website: "",
    monthlySpend: "",
    leadGoal: "",
    adManager: "",
    channels: [],
    notes: [],
    actions: [createLeadAction("Initial outreach")],
    portalToken: createPortalToken(),
    auditChecklist: source === "audit" ? createDefaultAuditChecklist() : [],
    auditSlaDue:
      source === "audit" ? addBusinessDays(new Date(), 5).toISOString().slice(0, 10) : undefined,
    emailLog: [],
  };
}

type LegacyLead = OutreachLead & { nextAction?: string; nextActionDue?: string };

/** Ensure persisted leads have all required fields after schema changes. */
export function normalizeLead(raw: LegacyLead): OutreachLead {
  let actions: LeadAction[] = Array.isArray(raw.actions) ? raw.actions : [];

  // Migrate single nextAction / nextActionDue from older saves
  if (actions.length === 0 && raw.nextAction?.trim()) {
    actions = [createLeadAction(raw.nextAction, raw.nextActionDue)];
  }
  if (actions.length === 0) {
    actions = [createLeadAction("Initial outreach")];
  }

  return {
    ...createEmptyLead(raw.source),
    ...raw,
    phone: raw.phone ?? "",
    notes: Array.isArray(raw.notes) ? raw.notes : [],
    channels: raw.channels ?? [],
    actions: actions.map((a) => ({
      ...createLeadAction(""),
      ...a,
      text: a.text ?? "",
      dueDate: a.dueDate ?? new Date().toISOString().slice(0, 10),
      completed: Boolean(a.completed),
    })),
    portalToken: raw.portalToken ?? createPortalToken(),
    auditChecklist: Array.isArray(raw.auditChecklist)
      ? raw.auditChecklist
      : raw.source === "audit"
        ? createDefaultAuditChecklist()
        : [],
    auditSlaDue: raw.auditSlaDue,
    emailLog: Array.isArray(raw.emailLog) ? raw.emailLog : [],
    auditReport: raw.auditReport?.title ? raw.auditReport : undefined,
    updatedAt: raw.updatedAt ?? raw.submittedAt ?? new Date().toISOString(),
  };
}

export const seedLeads: OutreachLead[] = [
  {
    id: "lead-001",
    source: "audit",
    status: "new",
    priority: "high",
    score: 92,
    fitLabel: "good-fit",
    submittedAt: "2026-06-27T09:14:00Z",
    updatedAt: "2026-06-27T09:14:00Z",
    name: "Sarah Chen",
    email: "sarah@revstack.io",
    phone: "+1 (415) 555-0142",
    secondaryEmail: "s.chen@revstack.io",
    company: "RevStack",
    website: "https://revstack.io",
    monthlySpend: "$15K–$30K/mo",
    leadGoal: "Booked demos",
    adManager: "Another agency",
    channels: ["Meta Ads", "Google Ads"],
    crm: "HubSpot",
    tracking: "Partially — some gaps",
    challenge: "CPL looks fine but demo show rate is under 40%",
    assignedTo: "Jordan Lee",
    actions: [
      createLeadAction("Send audit kickoff email + request ad account viewer access", "2026-06-27"),
    ],
    notes: ["Submitted via /free-audit — high intent, unhappy with current agency"],
  },
  {
    id: "lead-002",
    source: "strategy-call",
    status: "call-booked",
    priority: "high",
    score: 88,
    fitLabel: "good-fit",
    submittedAt: "2026-06-26T16:30:00Z",
    updatedAt: "2026-06-26T17:00:00Z",
    name: "Marcus Webb",
    email: "marcus@devpulse.io",
    phone: "+1 (628) 555-0198",
    company: "DevPulse",
    website: "https://devpulse.io",
    monthlySpend: "$5K–$15K/mo",
    leadGoal: "Free trials",
    adManager: "Founder / solo marketer",
    channels: ["YouTube Ads", "Google Ads"],
    callTopic: "Lower CPL / improve ROAS",
    timeline: "ASAP — ready to move",
    preferredSlot: "Tuesday, July 1, 2026 at 2:00 PM PT",
    assignedTo: "Elena Rodriguez",
    actions: [
      createLeadAction("Prep funnel map + trial-to-paid benchmarks before call", "2026-06-30"),
      createLeadAction("Send pre-call agenda", "2026-06-29"),
    ],
    notes: [
      "Call confirmed for Jul 1",
      "Founder runs ads himself — wants help scaling YouTube",
    ],
  },
  {
    id: "lead-003",
    source: "audit",
    status: "audit-in-progress",
    priority: "medium",
    score: 74,
    fitLabel: "good-fit",
    submittedAt: "2026-06-24T11:00:00Z",
    updatedAt: "2026-06-25T10:00:00Z",
    name: "Priya Nair",
    email: "priya@finledger.com",
    phone: "+1 (212) 555-0167",
    secondaryPhone: "+1 (212) 555-0168",
    company: "FinLedger",
    website: "https://finledger.com",
    monthlySpend: "$30K+/mo",
    leadGoal: "Sales-qualified leads (SQLs)",
    adManager: "In-house marketer",
    channels: ["Meta Ads", "Google Ads"],
    crm: "Salesforce",
    tracking: "No — we optimize on form fills only",
    challenge: "Retargeting fragmented, SQL quality inconsistent",
    assignedTo: "Marcus Chen",
    actions: [
      createLeadAction("Complete tracking audit section — deliver by day 5", "2026-06-29"),
    ],
    notes: ["Tracking audit started — waiting on Salesforce admin access"],
  },
  {
    id: "lead-006",
    source: "strategy-call",
    status: "new",
    priority: "high",
    score: 90,
    fitLabel: "good-fit",
    submittedAt: "2026-06-27T07:55:00Z",
    updatedAt: "2026-06-27T07:55:00Z",
    name: "Lisa Park",
    email: "lisa@dataforge.com",
    phone: "+1 (650) 555-0133",
    company: "DataForge",
    website: "https://dataforge.com",
    monthlySpend: "$30K+/mo",
    leadGoal: "Sales-qualified leads (SQLs)",
    adManager: "In-house marketer",
    channels: ["YouTube Ads", "Meta Ads", "Google Ads"],
    callTopic: "Scale what's working",
    timeline: "ASAP — ready to move",
    assignedTo: "Jordan Lee",
    actions: [createLeadAction("Confirm calendar slot — send pre-call questionnaire", "2026-06-27")],
    notes: [],
  },
  {
    id: "lead-004",
    source: "audit",
    status: "audit-delivered",
    priority: "medium",
    score: 68,
    fitLabel: "review",
    submittedAt: "2026-06-20T14:20:00Z",
    updatedAt: "2026-06-25T09:00:00Z",
    name: "Tom Bradley",
    email: "tom@cloudkit.dev",
    phone: "+1 (503) 555-0171",
    company: "CloudKit",
    website: "https://cloudkit.dev",
    monthlySpend: "$5K–$15K/mo",
    leadGoal: "Free trials",
    adManager: "Founder / solo marketer",
    channels: ["Google Ads"],
    crm: "No CRM yet",
    tracking: "Not sure",
    assignedTo: "Priya Sharma",
    actions: [createLeadAction("Follow up on audit — offer strategy call", "2026-06-28")],
    notes: ["Audit delivered Jun 25 — trial signup rate is the main bottleneck"],
    auditChecklist: createDefaultAuditChecklist().map((item) => ({ ...item, done: true })),
    auditReport: createAuditReportFromDraft(
      buildAuditReportDraft({
        company: "CloudKit",
        name: "Tom Bradley",
        monthlySpend: "$5K–$15K/mo",
        leadGoal: "Free trials",
        channels: ["Google Ads"],
        challenge: "Trial signup rate is the main bottleneck",
        tracking: "Not sure",
        crm: "No CRM yet",
      }),
      "Priya Sharma",
    ),
  },
  {
    id: "lead-005",
    source: "strategy-call",
    status: "contacted",
    priority: "medium",
    score: 62,
    fitLabel: "review",
    submittedAt: "2026-06-22T10:45:00Z",
    updatedAt: "2026-06-23T11:00:00Z",
    name: "Anita Rao",
    email: "anita@metricflow.io",
    phone: "+1 (737) 555-0189",
    company: "MetricFlow",
    website: "https://metricflow.io",
    monthlySpend: "<$5K/mo",
    leadGoal: "Marketing-qualified leads (MQLs)",
    adManager: "Not running ads yet",
    channels: ["Meta Ads"],
    callTopic: "Launch paid acquisition",
    timeline: "1–3 months",
    assignedTo: "Marcus Chen",
    actions: [createLeadAction("Send case study + nurture sequence", "2026-06-29")],
    notes: ["Below spend threshold — nurture unless budget increases"],
  },
  {
    id: "lead-007",
    source: "audit",
    status: "proposal",
    priority: "high",
    score: 85,
    fitLabel: "good-fit",
    submittedAt: "2026-06-18T08:00:00Z",
    updatedAt: "2026-06-26T15:00:00Z",
    name: "James Holt",
    email: "james@scaleops.com",
    phone: "+1 (312) 555-0124",
    secondaryEmail: "j.holt@scaleops.com",
    company: "ScaleOps",
    website: "https://scaleops.com",
    monthlySpend: "$30K+/mo",
    leadGoal: "Booked demos",
    adManager: "Another agency",
    channels: ["Meta Ads", "YouTube Ads", "Google Ads"],
    crm: "HubSpot",
    tracking: "Yes — CRM events feed back to ads",
    assignedTo: "Jordan Lee",
    actions: [
      createLeadAction("Send proposal — follow up Friday", "2026-06-27"),
      createLeadAction("Schedule decision call", "2026-06-30"),
    ],
    notes: [
      "Audit completed — wants full funnel rebuild",
      "Proposal sent Jun 26 at $8K/mo retainer",
    ],
  },
  {
    id: "lead-008",
    source: "strategy-call",
    status: "lost",
    priority: "low",
    score: 35,
    fitLabel: "poor-fit",
    submittedAt: "2026-06-15T12:00:00Z",
    updatedAt: "2026-06-20T10:00:00Z",
    name: "Chris Nguyen",
    email: "chris@localbiz.co",
    phone: "+1 (408) 555-0156",
    company: "LocalBiz Co",
    website: "https://localbiz.co",
    monthlySpend: "<$5K/mo",
    leadGoal: "Other",
    adManager: "Not running ads yet",
    channels: ["I'm not sure"],
    callTopic: "Not sure where to start",
    timeline: "Just exploring",
    assignedTo: "Elena Rodriguez",
    actions: [createLeadAction("Archive — wrong ICP", "2026-06-20")],
    notes: ["Local services — not B2B SaaS ICP"],
  },
  {
    id: "lead-009",
    source: "audit",
    status: "won",
    priority: "high",
    score: 94,
    fitLabel: "good-fit",
    submittedAt: "2026-06-01T09:00:00Z",
    updatedAt: "2026-06-10T14:00:00Z",
    name: "Emily Torres",
    email: "emily@pipelinehq.com",
    phone: "+1 (646) 555-0191",
    company: "PipelineHQ",
    website: "https://pipelinehq.com",
    monthlySpend: "$15K–$30K/mo",
    leadGoal: "Sales-qualified leads (SQLs)",
    adManager: "In-house marketer",
    channels: ["Meta Ads", "Google Ads"],
    crm: "HubSpot",
    tracking: "Partially — some gaps",
    assignedTo: "Jordan Lee",
    actions: [createLeadAction("Onboarding kickoff", "2026-06-12")],
    notes: ["Signed Jun 10 — onboarding complete"],
  },
  {
    id: "lead-010",
    source: "strategy-call",
    status: "proposal",
    priority: "high",
    score: 82,
    fitLabel: "good-fit",
    submittedAt: "2026-06-19T11:30:00Z",
    updatedAt: "2026-06-27T08:00:00Z",
    name: "David Kim",
    email: "david@launchpad.io",
    phone: "+1 (206) 555-0137",
    company: "Launchpad",
    website: "https://launchpad.io",
    monthlySpend: "$15K–$30K/mo",
    leadGoal: "Booked demos",
    adManager: "In-house marketer",
    channels: ["YouTube Ads", "Google Ads"],
    callTopic: "Lower CPL / improve ROAS",
    timeline: "ASAP — ready to move",
    preferredSlot: "Thursday, July 3, 2026 at 10:00 AM PT",
    assignedTo: "Priya Sharma",
    actions: [createLeadAction("Negotiate scope — decision by Jul 4", "2026-06-30")],
    notes: ["Strong call — comparing 2 agencies"],
  },
].map((raw) => normalizeLead(raw as OutreachLead));

/** Static activity feed — supplement with lead updates in UI later */
export const recentActivity = [
  {
    id: "act-1",
    company: "RevStack",
    action: "New free audit submission",
    timestamp: "2026-06-27T09:14:00Z",
  },
  {
    id: "act-2",
    company: "DataForge",
    action: "Strategy call requested — ASAP timeline",
    timestamp: "2026-06-27T07:55:00Z",
  },
  {
    id: "act-3",
    company: "ScaleOps",
    action: "Proposal sent after audit delivery",
    timestamp: "2026-06-26T15:00:00Z",
  },
  {
    id: "act-4",
    company: "DevPulse",
    action: "Call booked for Jul 1",
    timestamp: "2026-06-26T17:00:00Z",
  },
  {
    id: "act-5",
    company: "FinLedger",
    action: "Audit in progress — tracking review",
    timestamp: "2026-06-25T10:00:00Z",
  },
] as const;

/** @deprecated Use seedLeads — kept for gradual migration */
export const outreachLeads = seedLeads;
