/**
 * Outreach email templates — editable by admin, used from dashboard send flow.
 */

export type TemplateCategory =
  | "thank-you"
  | "case-study"
  | "educational"
  | "custom";

export type EmailTemplate = {
  id: string;
  name: string;
  category: TemplateCategory;
  subject: string;
  body: string;
  updatedAt: string;
};

export const TEMPLATE_CATEGORIES: TemplateCategory[] = [
  "thank-you",
  "case-study",
  "educational",
  "custom",
];

export const categoryLabels: Record<TemplateCategory, string> = {
  "thank-you": "Thank you / Introduce company & process",
  "case-study": "Share case study / results",
  educational: "Share educational content",
  custom: "Custom",
};

export const TEMPLATES_STORAGE_KEY = "admarkapture-admin-templates";

export function createEmptyTemplate(): EmailTemplate {
  const now = new Date().toISOString();
  return {
    id: `tpl-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
    name: "",
    category: "custom",
    subject: "",
    body: "",
    updatedAt: now,
  };
}

export function normalizeTemplate(raw: EmailTemplate): EmailTemplate {
  return {
    ...createEmptyTemplate(),
    ...raw,
    updatedAt: raw.updatedAt ?? new Date().toISOString(),
  };
}

export function validateTemplate(tpl: EmailTemplate): string | null {
  if (!tpl.name.trim()) return "Template name is required";
  if (!tpl.subject.trim()) return "Subject is required";
  if (!tpl.body.trim()) return "Body is required";
  return null;
}

/** Replace {{name}}, {{company}}, {{email}} placeholders for preview/send. */
export function applyTemplatePlaceholders(
  text: string,
  vars: { name?: string; company?: string; email?: string },
): string {
  return text
    .replace(/\{\{name\}\}/gi, vars.name ?? "")
    .replace(/\{\{company\}\}/gi, vars.company ?? "")
    .replace(/\{\{email\}\}/gi, vars.email ?? "");
}

export const seedTemplates: EmailTemplate[] = [
  {
    id: "tpl-001",
    name: "Thank you / Introduce company & process",
    category: "thank-you",
    subject: "Thanks for reaching out — how {{company}} can work with adMarkapture",
    body: `Hi {{name}},

Thank you for getting in touch with adMarkapture.

We help B2B SaaS teams generate qualified leads through Meta, YouTube, and Google — with tracking tied to demos, trials, and revenue (not just form fills).

Here's what working with us typically looks like:
1. Free lead gen audit (delivered in 5 business days)
2. Strategy call to align on goals, spend, and funnel gaps
3. Campaign rebuild or scale plan with clear CPL / SQL targets

If you have ad account viewer access handy, we can move faster on the audit. Reply anytime with questions.

Best,
The adMarkapture team`,
    updatedAt: "2026-06-27T10:00:00Z",
  },
  {
    id: "tpl-002",
    name: "Share case study / results",
    category: "case-study",
    subject: "How RevStack improved demo volume — relevant for {{company}}",
    body: `Hi {{name}},

Wanted to share a quick result that maps to what you told us on intake.

RevStack (B2B SaaS) came to us with healthy CPL but weak demo show rate. After restructuring Meta + Google campaigns and fixing offline conversion tracking into HubSpot, they saw:
• 40% lower cost per booked demo
• 2.1× increase in SQL volume from paid
• Clear channel split: Meta for volume, Google for high-intent capture

Full breakdown: [link to case study]

Happy to walk through what we'd test first for {{company}} on a 30-min call.

Best,
The adMarkapture team`,
    updatedAt: "2026-06-27T10:00:00Z",
  },
  {
    id: "tpl-003",
    name: "Share educational content",
    category: "educational",
    subject: "3 paid ads fixes that improve demo show rate",
    body: `Hi {{name}},

Sharing a short checklist we use in audits — often helps before we even jump on a call:

1. **Optimize for the right event** — form fills lie; book demos or SQLs in your CRM and feed them back to the ad platforms.
2. **Match ad promise to landing page** — one offer, one CTA; drop navigation on paid landing pages.
3. **Retarget by funnel stage** — site visitors, partial form fills, and demo no-shows need different creative and frequency caps.

We wrote a deeper guide on tying HubSpot/Salesforce events to Meta & Google offline conversions — reply "guide" and I'll send it over.

Cheers,
The adMarkapture team`,
    updatedAt: "2026-06-27T10:00:00Z",
  },
].map((raw) => normalizeTemplate(raw as EmailTemplate));
