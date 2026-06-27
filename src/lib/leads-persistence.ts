import {
  normalizeLead,
  seedLeads,
  STORAGE_KEY,
  type OutreachLead,
} from "@/lib/admin-mock-data";

/** Shared localStorage access — marketing forms and admin use the same mock pipeline. */
export function loadLeads(): OutreachLead[] {
  if (typeof window === "undefined") return seedLeads;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      return (JSON.parse(raw) as OutreachLead[]).map(normalizeLead);
    }
  } catch {
    /* fall through */
  }
  return seedLeads;
}

export function saveLeads(leads: OutreachLead[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(leads));
}

export function appendLead(lead: OutreachLead): OutreachLead {
  const leads = loadLeads();
  const normalized = normalizeLead(lead);
  saveLeads([normalized, ...leads]);
  return normalized;
}

export function findLeadByPortalToken(token: string): OutreachLead | undefined {
  return loadLeads().find((l) => l.portalToken === token);
}

export function updateLeadInStorage(
  id: string,
  patch: Partial<OutreachLead>,
): OutreachLead | undefined {
  let updated: OutreachLead | undefined;
  const leads = loadLeads().map((lead) => {
    if (lead.id !== id) return lead;
    updated = normalizeLead({
      ...lead,
      ...patch,
      id: lead.id,
      updatedAt: new Date().toISOString(),
    });
    return updated;
  });
  if (updated) saveLeads(leads);
  return updated;
}
