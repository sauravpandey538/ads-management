import type { AuditReport, OutreachLead } from "@/lib/admin-mock-data";

/** Draft audit report content pre-filled from lead intake data. */
export function buildAuditReportDraft(
  lead: Pick<
    OutreachLead,
    "company" | "name" | "monthlySpend" | "leadGoal" | "channels" | "challenge" | "tracking" | "crm"
  >,
): Omit<AuditReport, "assignedAt" | "assignedBy"> {
  const company = lead.company || lead.name;
  const channels = lead.channels.length ? lead.channels.join(", ") : "paid channels";
  const challenge = lead.challenge?.trim() || "conversion efficiency and lead quality";

  return {
    title: `${company} — Lead Gen Audit Report`,
    executiveSummary: `${company} is investing ${lead.monthlySpend || "in paid media"} toward ${lead.leadGoal || "pipeline growth"}. This audit reviews ${channels}, tracking setup (${lead.tracking || "unknown"}), and CRM handoff (${lead.crm || "not specified"}) to identify waste and quick wins.`,
    findings: `• Channel mix: ${channels} — budget may be overweight on top-of-funnel without enough mid-funnel nurture.\n• Tracking: ${lead.tracking || "Not confirmed"} — risk of optimizing on vanity metrics instead of qualified pipeline.\n• Primary bottleneck: ${challenge}.\n• CRM integration: ${lead.crm || "No CRM yet"} — limits closed-loop optimization and audience quality signals.`,
    recommendations: `1. Rebuild conversion events to match ${lead.leadGoal || "your primary goal"} — not form fills alone.\n2. Consolidate retargeting into 2–3 intent-based segments with frequency caps.\n3. Run a 14-day creative test matrix on highest-spend ad sets.\n4. Add offline conversion import within 30 days for true CPL/SQL reporting.\n5. Book a strategy call to prioritize the 90-day roadmap execution.`,
  };
}

export function createAuditReportFromDraft(
  draft: Omit<AuditReport, "assignedAt" | "assignedBy">,
  assignedBy?: string,
): AuditReport {
  return {
    ...draft,
    title: draft.title.trim(),
    executiveSummary: draft.executiveSummary.trim(),
    findings: draft.findings.trim(),
    recommendations: draft.recommendations.trim(),
    assignedAt: new Date().toISOString(),
    assignedBy,
  };
}

/** Lead fields to update when an admin assigns the audit report from the dashboard. */
export function buildLeadUpdatesOnReportAssign(
  lead: OutreachLead,
  report: AuditReport,
): Partial<OutreachLead> {
  return {
    auditReport: report,
    status: "audit-delivered",
    auditChecklist: lead.auditChecklist.map((item) => ({ ...item, done: true })),
  };
}
