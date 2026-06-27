/** Product demo helpers — no imports from admin-mock-data (avoids circular deps). */

export type ChecklistItem = { id: string; label: string; done: boolean };

/** Add N business days (Mon–Fri) for mock audit SLA. */
export function addBusinessDays(from: Date, days: number): Date {
  const d = new Date(from);
  let added = 0;
  while (added < days) {
    d.setDate(d.getDate() + 1);
    const dow = d.getDay();
    if (dow !== 0 && dow !== 6) added += 1;
  }
  return d;
}

export function createPortalToken(): string {
  return `pt-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

export const DEFAULT_AUDIT_CHECKLIST_LABELS = [
  "Ad account viewer access received",
  "Spend & channel waste review",
  "CRM / offline conversion audit",
  "90-day roadmap written",
  "Audit report delivered to client",
] as const;

export function createDefaultAuditChecklist(): ChecklistItem[] {
  return DEFAULT_AUDIT_CHECKLIST_LABELS.map((label, i) => ({
    id: `chk-${i}`,
    label,
    done: false,
  }));
}

export function auditProgress(checklist: ChecklistItem[]): number {
  if (!checklist.length) return 0;
  return Math.round((checklist.filter((c) => c.done).length / checklist.length) * 100);
}

export function portalStatusFromLead(lead: {
  status: string;
  auditChecklist: ChecklistItem[];
  auditReport?: { title: string };
}): "submitted" | "in-progress" | "delivered" {
  if (
    lead.status === "audit-delivered" ||
    lead.status === "won" ||
    lead.auditReport?.title
  ) {
    return "delivered";
  }
  if (lead.status === "audit-in-progress" || lead.auditChecklist.some((c) => c.done)) {
    return "in-progress";
  }
  return "submitted";
}

export const PORTAL_STATUS_LABELS = {
  submitted: "Submitted",
  "in-progress": "Audit in progress",
  delivered: "Delivered",
} as const;

export const PRODUCT_FLOW_STEPS = [
  {
    id: "intake",
    title: "Lead intake",
    description: "Free audit form captures spend, channels, goals, and challenges.",
  },
  {
    id: "route",
    title: "Qualify & assign",
    description: "Score, priority, fit label, and internal owner are set.",
  },
  {
    id: "work",
    title: "Audit delivery",
    description: "Checklist, SLA, follow-ups, and templated outreach.",
  },
  {
    id: "portal",
    title: "Report & portal",
    description: "Assign the audit report — client reads it in their portal.",
  },
] as const;
