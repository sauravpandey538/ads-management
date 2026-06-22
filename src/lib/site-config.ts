export const siteConfig = {
  name: "adMarkapture",
  tagline: "The SaaS Paid Ads Agency",
  description:
    "We run Meta, LinkedIn, YouTube & Google ads for B2B SaaS — built around demos, trials, and pipeline. Not clicks.",
  email: "support@admarkapture.com",
  /** Full Cal.com URL — set NEXT_PUBLIC_CALENDAR_URL in .env.local */
  calendarUrl: process.env.NEXT_PUBLIC_CALENDAR_URL ?? "",
  /** Cal.com path only (username/event) — set NEXT_PUBLIC_CAL_CAL_LINK or derived from calendarUrl */
  calendarCalLink: process.env.NEXT_PUBLIC_CAL_CAL_LINK ?? "",
  calendarResponse:
    "Book directly via calendar — we respond within 4 business hours.",
  ctaPrimary: "Get Your Free Ads Audit",
  ctaPrimaryHint: "Written roadmap in 5 days · no call required",
  ctaPrimaryHref: "/free-audit",
  ctaSecondary: "Book a Strategy Call",
  ctaSecondaryHint: "30-min live funnel review · pick a time",
  ctaSecondaryHref: "/contact",
} as const;

/** Cal.com booking link as `username/event-type` for @calcom/embed-react. */
export function getCalLink(): string {
  if (siteConfig.calendarCalLink) return siteConfig.calendarCalLink;
  const url = siteConfig.calendarUrl;
  if (!url?.startsWith("http")) return "";
  try {
    return new URL(url).pathname.replace(/^\//, "").replace(/\/$/, "");
  } catch {
    return "";
  }
}

/** True when Cal.com embed can load (real calLink configured). */
export function isCalendarConfigured(): boolean {
  return getCalLink().length > 0;
}

export const founder = {
  name: "Alex Morgan",
  title: "Founder & Head of Strategy",
  formerRole: "Head of Performance Marketing",
  formerCompany: "Lattice",
  linkedinUrl: "https://www.linkedin.com/in/alexmorgan",
  bio: [
    "adMarkapture was built by paid media operators, not account managers.",
    "Our founding team has managed over $12M in SaaS ad spend across Meta, YouTube, and LinkedIn — before starting this agency. We got tired of watching great SaaS products lose to inferior competitors who simply outspent them. So we built the system we wished we had.",
  ],
} as const;

/** Thin proof strip below hero — keep numbers aligned with real client data. */
export const proofBar = [
  { label: "Trusted by 43+ SaaS teams", icon: "stars" as const },
  { label: "$28M+ in ad spend managed", icon: "spend" as const },
  { label: "Avg. 3.6x pipeline ROAS across clients", icon: "roas" as const },
  { label: "G2 & Clutch verified", icon: "verified" as const },
] as const;

export const auditDeliverables = [
  "Full breakdown of where your ad spend is leaking",
  "Attribution gaps costing you demo visibility",
  "Channel-specific fix roadmap (Meta / YouTube / LinkedIn)",
  "Benchmark: how your CPL compares to similar SaaS companies",
  "Delivered within 5 business days — yours to keep, no strings attached",
] as const;

export const auditTestimonial = {
  quote:
    "The audit alone was more useful than 6 months of reports from our previous agency.",
  name: "Sarah Chen",
  role: "VP Marketing",
  company: "RevStack",
} as const;

export const qualifier = {
  goodFit: [
    "You're a B2B SaaS company spending $5K–$50K/month on paid ads",
    "Your sales cycle is 14–90 days and you sell through demos or trials",
    "You've tried running ads in-house or with a generalist agency and it didn't work",
    "You care about pipeline and revenue — not just clicks and impressions",
  ],
  badFit: [
    "You're pre-revenue or pre-product-market fit",
    "You need someone to \"just run ads\" without a strategy",
    "You want the cheapest option available",
  ],
} as const;

export const navLinks = [
  { href: "/services", label: "Services" },
  { href: "/testimonials", label: "Testimonials" },
  { href: "/about", label: "About" },
  { href: "/free-audit", label: "Free Audit" },
  { href: "/contact", label: "Book a Call" },
] as const;

export type ClientTestimonial = {
  company: string;
  vertical: string;
  spend: string;
  channels: readonly string[];
  timeline: string;
  headline: string;
  issue: string;
  approach: string;
  progress: string;
  quote: string;
  /** Client rating on a 1–5 scale (from post-engagement survey). */
  rating: number;
  /** ISO date when the review was collected. */
  dateReviewed: string;
  contact: { name: string; role: string };
  linkedinUrl: string;
  companyUrl: string;
  metrics: readonly { value: string; label: string; highlight?: boolean }[];
};

/** Verified client rating — hero claim ties to G2, Clutch, and on-site testimonials. */
export const clientRating = {
  score: 4.9,
  maxScore: 5,
  clientCount: 43,
  /** Primary external source shown in hero (swap URL when your live profile is ready). */
  primarySource: "g2" as const,
  methodology:
    "Average 1–5 rating from post-engagement surveys and third-party reviews on G2 and Clutch, completed by active B2B SaaS clients between 2023 and 2025.",
  lastUpdated: "2025-06-01",
} as const;

export type ReviewPlatformId = "g2" | "clutch" | "testimonials";

export type ReviewPlatform = {
  id: ReviewPlatformId;
  name: string;
  href: string;
  score: number;
  reviewCount: number;
  /** false = internal route; true = opens in new tab */
  external: boolean;
};

/** Review platform links — update hrefs when your G2 / Clutch profiles go live. */
export const reviewPlatforms: readonly ReviewPlatform[] = [
  {
    id: "g2",
    name: "G2",
    href: "https://www.g2.com/products/admarkapture/reviews",
    score: 4.9,
    reviewCount: 28,
    external: true,
  },
  {
    id: "clutch",
    name: "Clutch",
    href: "https://clutch.co/profile/admarkapture",
    score: 5.0,
    reviewCount: 12,
    external: true,
  },
  {
    id: "testimonials",
    name: "Client stories",
    href: "/testimonials#reviews",
    score: 4.9,
    reviewCount: 43,
    external: false,
  },
] as const;

export function getPrimaryReviewPlatform(): ReviewPlatform {
  return (
    reviewPlatforms.find((p) => p.id === clientRating.primarySource) ?? reviewPlatforms[0]
  );
}

export const channels = [
  {
    name: "Meta & Instagram",
    description:
      "Retargeting, lookalikes, and creative that converts cold SaaS traffic.",
    color: "bg-sky/30 text-ink",
  },
  {
    name: "LinkedIn Ads",
    description: "Title, company, and ABM targeting for demo-led B2B SaaS.",
    color: "bg-coral/20 text-ink",
  },
  {
    name: "YouTube Ads",
    description: "Demand capture and product education for long sales cycles.",
    color: "bg-sun/40 text-ink",
  },
  {
    name: "Google Ads",
    description: "High-intent search and competitor conquest for SaaS buyers.",
    color: "bg-mint/30 text-ink",
  },
] as const;

export const funnelSteps = [
  {
    id: "spend",
    question: "I spend money on ads",
    headline: "Your ad budget deserves a grown-up in the room",
    body: "You're already paying platforms. The question isn't whether to spend — it's whether anyone is protecting every dollar from waste, drift, and vanity metrics.",
  },
  {
    id: "waste",
    question: "Will this agency waste my money?",
    headline: "We kill waste before we scale spend",
    body: "Weekly account surgery: negative keywords, audience exclusions, creative kill switches, and budget caps tied to qualified pipeline — not impressions.",
  },
  {
    id: "understand",
    question: "Do they understand my business?",
    headline: "Built for SaaS funnels, not generic lead gen",
    body: "Trials, demos, multi-stakeholder buying, payback periods, and CRM stages — we optimize to how your buyers actually decide, not how ad platforms want you to spend.",
  },
  {
    id: "prove",
    question: "Can they prove results?",
    headline: "Pipeline in the CRM, not screenshots in a deck",
    body: "Offline conversions, demo show rates, SQL volume, and revenue attribution. You'll see the same numbers your sales team sees.",
  },
  {
    id: "trust",
    question: "Can I trust them?",
    headline: "Your accounts. Your data. No lock-ins.",
    body: "We work inside your ad accounts, share every asset, and stay month-to-month. If we're not earning trust, you walk — with everything we built.",
  },
  {
    id: "book",
    question: "Book a call",
    headline: "Start with a free ads audit — keep the roadmap either way",
    body: "Get a 90-day growth plan with quick wins, waste to cut, and where to scale. Whether you hire us or not, you'll leave with clarity.",
  },
] as const;

export const stats = [
  { value: "4.2x", label: "Avg. pipeline ROAS" },
  { value: "38%", label: "Avg. waste cut in 30 days" },
  { value: "90", label: "Day proof window" },
  { value: "0", label: "Long-term lock-ins" },
] as const;

/** Full client stories — issue, approach, progress, and CRM-linked numbers. */
export const clientTestimonials: readonly ClientTestimonial[] = [
  {
    company: "RevStack",
    vertical: "Revenue SaaS",
    spend: "$14K/mo",
    channels: ["Meta", "LinkedIn"],
    timeline: "90 days",
    headline: "47 qualified demos in 90 days",
    issue:
      "RevStack was spending on broad Meta and LinkedIn campaigns with broken offline conversion tracking. Sales saw MQLs in HubSpot, but ads optimized on form fills — so CPL looked fine while demo show rates cratered.",
    approach:
      "We rebuilt campaign structure around demo-booked events, split prospecting vs. retargeting, and synced CRM stages back to both platforms. Creative was rewritten for VP RevOps pain points, not generic SaaS hooks.",
    progress:
      "Month four and scaling: demo volume holds at 15–18/week, CPL down 52%, and sales reports 71% show rate on ad-sourced demos. Budget increased 20% last month with the same ROAS guardrails.",
    quote:
      "Before adMarkapture, we were spending $14K/month and had no idea which campaigns were driving actual pipeline. Within 60 days, they showed us exactly where the leaks were. Our cost per qualified demo dropped 44%.",
    rating: 5,
    dateReviewed: "2024-11-12",
    contact: { name: "Sarah Chen", role: "VP Marketing" },
    linkedinUrl: "https://www.linkedin.com/in/sarahchen",
    companyUrl: "https://revstack.io",
    metrics: [
      { value: "3.8x", label: "Pipeline ROAS", highlight: true },
      { value: "47", label: "Qualified demos" },
      { value: "-52%", label: "Cost per demo" },
      { value: "71%", label: "Demo show rate" },
    ],
  },
  {
    company: "DevPulse",
    vertical: "Developer Tools",
    spend: "$8K/mo",
    channels: ["YouTube", "Google"],
    timeline: "120 days",
    headline: "Trial-to-paid up 34%",
    issue:
      "DevPulse drove cheap trials from YouTube top-of-funnel, but activation was weak and cost per paid conversion was unsustainable. Landing pages promised features the product didn't highlight in onboarding.",
    approach:
      "We shifted budget toward high-intent Google search and YouTube in-feed with message-matched landing pages. Trial onboarding emails were aligned to ad angles, and we paused any creative that didn't hit activation within 7 days.",
    progress:
      "Trials are fewer but healthier — trial-to-paid is up 34% and cost per paid user dropped 41%. We're now testing competitor conquest on Google while keeping YouTube for education-led demand.",
    quote:
      "They mapped our funnel before touching a single campaign. Trial-to-paid improved 34% and our cost per paid user dropped 41% in under 120 days.",
    rating: 5,
    dateReviewed: "2025-02-08",
    contact: { name: "Marcus Webb", role: "Founder" },
    linkedinUrl: "https://www.linkedin.com/in/marcuswebb",
    companyUrl: "https://devpulse.io",
    metrics: [
      { value: "-41%", label: "Cost per trial", highlight: true },
      { value: "+34%", label: "Trial-to-paid" },
      { value: "2.1x", label: "Activated trials" },
      { value: "$8K", label: "Monthly ad spend" },
    ],
  },
  {
    company: "FinLedger",
    vertical: "Finance SaaS",
    spend: "$22K/mo",
    channels: ["LinkedIn", "Meta"],
    timeline: "Q1 (6 weeks live)",
    headline: "$180K pipeline in Q1",
    issue:
      "FinLedger's LinkedIn ABM was reaching the right titles but not the buying committee. Retargeting was fragmented across Meta and LinkedIn with no orchestration, so CFO-level stakeholders never saw proof-heavy creative.",
    approach:
      "We built a 6-week ABM cycle: LinkedIn for account penetration, Meta for retargeting site visitors and engagers, and sequential creative by funnel stage — problem, proof, product. Offline SQL events became the primary optimization signal.",
    progress:
      "Q1 closed with $180K net-new pipeline and 62 SQLs from paid. Cycle two is live with expanded target accounts and a 15% budget shift toward retargeting after week three engagement signals.",
    quote:
      "Before adMarkapture, we were spending $22K/month and had no idea which campaigns were driving actual pipeline. Within 60 days, they showed us exactly where the leaks were. Our cost per qualified demo dropped 44%.",
    rating: 4.7,
    dateReviewed: "2025-04-19",
    contact: { name: "Priya Nair", role: "Head of Growth" },
    linkedinUrl: "https://www.linkedin.com/in/priyanair",
    companyUrl: "https://finledger.com",
    metrics: [
      { value: "62", label: "SQLs generated", highlight: true },
      { value: "$180K", label: "Pipeline added" },
      { value: "6 wk", label: "ABM cycle length" },
      { value: "$22K", label: "Monthly ad spend" },
    ],
  },
] as const;

/** Short quote cards for the trust section — derived from full client stories. */
export const testimonials = clientTestimonials.map((t) => ({
  quote: t.quote,
  name: t.contact.name,
  role: t.contact.role,
  company: t.company,
  rating: t.rating,
  dateReviewed: t.dateReviewed,
  linkedinUrl: t.linkedinUrl,
  companyUrl: t.companyUrl,
}));

export type CaseStudy = {
  slug: string;
  client: string;
  clientUrl: string;
  headline: string;
  timeline: string;
  problem: string;
  tactics: readonly string[];
  results: readonly { label: string; before: string; after: string }[];
  roas: string;
  quote: string;
  contact: { name: string; role: string; linkedinUrl: string };
  channels: readonly string[];
};

export const caseStudy: CaseStudy = {
  slug: "revstack",
  client: "RevStack",
  clientUrl: "https://revstack.io",
  headline: "RevStack went from $180 CPL to $67 CPL in 11 weeks",
  timeline: "11 weeks",
  problem:
    "RevStack was spending $14K/month across Meta and LinkedIn with broken offline conversion tracking. Form fills looked cheap, but demo show rates were under 35% and sales couldn't tell which campaigns drove qualified pipeline.",
  tactics: [
    "Rebuilt Meta + LinkedIn campaign structure around demo-booked CRM events — not form fills",
    "Synced HubSpot stages back to both ad platforms for offline conversion optimization",
    "Split prospecting vs. retargeting with separate creative angles per funnel stage",
    "Cut 6 underperforming ad sets in week two and reallocated budget to demo-booked winners",
    "Rewrote ad copy for VP RevOps pain points with proof-heavy landing page message match",
  ],
  results: [
    { label: "Cost per qualified demo", before: "$180", after: "$67" },
    { label: "Demo show rate", before: "34%", after: "61%" },
    { label: "Pipeline ROAS (Q3)", before: "1.4x", after: "3.8x" },
  ],
  roas: "3.8x",
  quote:
    "Before adMarkapture, we were spending $14K/month and had no idea which campaigns were driving actual pipeline. Within 60 days, they showed us exactly where the leaks were. Our cost per qualified demo dropped 44%.",
  contact: {
    name: "Sarah Chen",
    role: "VP Marketing",
    linkedinUrl: "https://www.linkedin.com/in/sarahchen",
  },
  channels: ["Meta", "LinkedIn"],
};

export const faqs = [
  {
    question: "How much does working with you cost?",
    answer:
      "Our management fees typically start at $2,500/month and scale based on channels, ad spend, and scope. We work with SaaS teams spending anywhere from $5K to $80K/month on paid ads. The free audit will give us both a clear picture of what makes sense before any commitment.",
  },
  {
    question: "Do your fees include ad spend?",
    answer:
      "No. Management fees are separate so budgets stay transparent and you always know exactly where every dollar goes.",
  },
  {
    question: "What budget do we need to start?",
    answer:
      "Most SaaS clients start between $5K–$25K/month in ad spend. If you can't hit ~15 conversions/month on your primary action, we'll recommend a phased plan.",
  },
  {
    question: "Which platforms do you manage?",
    answer:
      "Meta (Facebook & Instagram), LinkedIn, YouTube, and Google Ads. We focus exclusively on paid media for B2B SaaS — no SEO, no web dev side quests.",
  },
  {
    question: "How fast will we see results?",
    answer:
      "Quick wins often appear in 2–4 weeks. Steady, compounding gains typically take 60–90 days as tests run and CRM feedback loops tighten.",
  },
  {
    question: "Do you require long-term contracts?",
    answer:
      "No lock-ins. We recommend 90 days to prove the model, then month-to-month. You keep all accounts, audiences, and creative assets.",
  },
  {
    question: "Who owns the ad accounts?",
    answer:
      "You do. We work in your accounts, set up tracking in your GA4/GTM, and share dashboards tied to your CRM pipeline.",
  },
] as const;
