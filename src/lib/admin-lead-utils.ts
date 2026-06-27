import type { LeadAction, OutreachLead, LeadSource } from "@/lib/admin-mock-data";
import { teamMembers } from "@/lib/site-config";

const assigneeTitles = Object.fromEntries(teamMembers.map((m) => [m.name, m.title]));

export type QueueItem = {
  lead: OutreachLead;
  action: LeadAction;
};

export function getIncompleteActions(lead: OutreachLead): LeadAction[] {
  return lead.actions
    .filter((a) => !a.completed)
    .sort((a, b) => a.dueDate.localeCompare(b.dueDate));
}

export function getNextIncompleteAction(lead: OutreachLead): LeadAction | undefined {
  return getIncompleteActions(lead)[0];
}

export function countIncompleteActionsDueBy(
  leads: OutreachLead[],
  cutoffDate: string,
  assignee?: string,
): number {
  let count = 0;
  for (const lead of leads) {
    if (assignee && lead.assignedTo !== assignee) continue;
    if (!assignee && (lead.status === "won" || lead.status === "lost")) continue;
    if (assignee && (lead.status === "won" || lead.status === "lost")) continue;
    for (const action of lead.actions) {
      if (!action.completed && action.dueDate <= cutoffDate) count++;
    }
  }
  return count;
}

/** Due today or overdue — one row per incomplete action */
export function computeOutreachQueue(leads: OutreachLead[]): QueueItem[] {
  const today = new Date().toISOString().slice(0, 10);
  const items: QueueItem[] = [];

  for (const lead of leads) {
    if (lead.status === "won" || lead.status === "lost") continue;
    for (const action of lead.actions) {
      if (!action.completed && action.dueDate <= today) {
        items.push({ lead, action });
      }
    }
  }

  return items.sort((a, b) => b.lead.score - a.lead.score);
}

export function computeChannelBreakdown(leads: OutreachLead[]) {
  const counts = new Map<string, number>();
  for (const lead of leads) {
    for (const ch of lead.channels) {
      counts.set(ch, (counts.get(ch) ?? 0) + 1);
    }
  }
  const total = [...counts.values()].reduce((a, b) => a + b, 0) || 1;
  return [...counts.entries()]
    .map(([channel, count]) => ({
      channel,
      leads: count,
      percent: Math.round((count / total) * 100),
    }))
    .sort((a, b) => b.leads - a.leads);
}

export function computeSpendBreakdown(leads: OutreachLead[]) {
  const counts = new Map<string, number>();
  for (const lead of leads) {
    const tier = lead.monthlySpend || "Unknown";
    counts.set(tier, (counts.get(tier) ?? 0) + 1);
  }
  return [...counts.entries()].map(([tier, count]) => ({ tier, count }));
}

export function computeTeamWorkload(leads: OutreachLead[]) {
  const map = new Map<string, { activeLeads: number; dueThisWeek: number }>();
  const weekOut = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);

  for (const lead of leads) {
    if (!lead.assignedTo || lead.status === "won" || lead.status === "lost") continue;
    const cur = map.get(lead.assignedTo) ?? { activeLeads: 0, dueThisWeek: 0 };
    cur.activeLeads += 1;
    cur.dueThisWeek += countIncompleteActionsDueBy([lead], weekOut);
    map.set(lead.assignedTo, cur);
  }

  return [...map.entries()].map(([assignee, stats]) => ({
    assignee,
    role: assigneeTitles[assignee] ?? "Internal teammate",
    ...stats,
  }));
}

export function computeKpis(leads: OutreachLead[]) {
  const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
  const newThisWeek = leads.filter((l) => new Date(l.submittedAt).getTime() >= weekAgo);
  const inProgress = leads.filter((l) =>
    ["contacted", "audit-in-progress", "proposal"].includes(l.status),
  );
  const dueQueue = computeOutreachQueue(leads);
  const highPriority = leads.filter((l) => l.priority === "high");

  return [
    {
      id: "new-leads",
      label: "New leads (7d)",
      value: String(newThisWeek.length),
      change: `${leads.length} total in pipeline`,
      trend: "neutral" as const,
    },
    {
      id: "in-progress",
      label: "In progress",
      value: String(inProgress.length),
      change: "Contacted, audit, or proposal stage",
      trend: "neutral" as const,
    },
    {
      id: "due-follow-ups",
      label: "Due follow-ups",
      value: String(dueQueue.length),
      change: "Incomplete actions due today or overdue",
      trend: "up" as const,
    },
    {
      id: "high-priority",
      label: "High priority",
      value: String(highPriority.length),
      change: "Flagged for urgent outreach",
      trend: "neutral" as const,
    },
    {
      id: "notes",
      label: "Total notes",
      value: String(leads.reduce((n, l) => n + l.notes.length, 0)),
      change: "Across all leads",
      trend: "neutral" as const,
    },
    {
      id: "conversion",
      label: "Won",
      value: String(leads.filter((l) => l.status === "won").length),
      change: `${leads.filter((l) => l.status === "lost").length} lost`,
      trend: "up" as const,
    },
  ];
}

export function validateLead(lead: OutreachLead): string | null {
  if (!lead.name.trim()) return "Name is required";
  if (!lead.email.trim()) return "Email is required";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email.trim())) return "Invalid email";
  if (!lead.phone.trim()) return "Phone number is required";
  if (lead.score < 0 || lead.score > 100) return "Score must be 0–100";
  if (!lead.actions.length) return "At least one follow-up action is required";
  if (lead.actions.some((a) => !a.text.trim())) return "All actions need a description";
  return null;
}

export function formatNoteEntry(text: string): string {
  const date = new Date().toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
  return `[${date}] ${text.trim()}`;
}

export function formatActionCompletedNote(action: LeadAction): string {
  return formatNoteEntry(`Completed follow-up: ${action.text}`);
}

export function filterLeadsBySource(leads: OutreachLead[], source: LeadSource | "all") {
  if (source === "all") return leads;
  return leads.filter((l) => l.source === source);
}
