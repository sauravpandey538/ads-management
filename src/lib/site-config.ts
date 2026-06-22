export const siteConfig = {
  name: "adMarkapture",
  tagline: "Lead Generation & Performance Marketing",
  description:
    "Performance marketing agency for B2B SaaS — lead generation campaigns across Meta, LinkedIn, YouTube & Google. Optimized for qualified leads, demos, and revenue. Not vanity clicks.",
  email: "support@admarkapture.com",
  /** Full Cal.com URL — set NEXT_PUBLIC_CALENDAR_URL in .env.local */
  calendarUrl: process.env.NEXT_PUBLIC_CALENDAR_URL ?? "",
  /** Cal.com path only (username/event) — set NEXT_PUBLIC_CAL_CAL_LINK or derived from calendarUrl */
  calendarCalLink: process.env.NEXT_PUBLIC_CAL_CAL_LINK ?? "",
  calendarResponse:
    "Book directly via calendar — we respond within 4 business hours.",
  ctaPrimary: "Get Your Lead Gen Audit",
  ctaPrimaryBadge: "Free",
  ctaPrimaryHint: "Campaign audit in 5 days · no call required",
  ctaPrimaryHref: "/free-audit",
  ctaSecondary: "Book a Strategy Call",
  ctaSecondaryHint: "30-min performance marketing review · pick a time",
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
  name: "Nabila Farzin",
  title: "CEO & Founder",
  formerRole: "Director",
  formerCompany: "Matricmax",
  linkedinUrl:
    "https://www.linkedin.com/in/nabila-farzin-csca-%E2%84%A2-b7a305b4",
  /** Drop a headshot at public/team/alex-morgan.jpg to replace the SVG placeholder. */
  imageSrc: "/nabila.jpeg",
  bio: [
    "I started adMarkapture after a decade inside SaaS marketing teams — watching great products lose leads to competitors who simply ran better performance marketing campaigns.",
    "We built this agency for founders tired of generalist shops that optimize for clicks while qualified lead volume flatlines. Every lead gen system we run today was battle-tested on real B2B funnels — not e-commerce playbooks repackaged for SaaS.",
  ],
  quote:
    "Your ad budget is too important to hand to people who've never owned a lead generation target.",
} as const;

export type TeamMember = {
  name: string;
  title: string;
  bio: string;
  linkedinUrl: string;
  imageSrc: string;
  formerRole?: string;
  formerCompany?: string;
};

/** About page — team roster (swap SVG placeholders for JPG headshots in /public/team/). */
export const teamMembers: readonly TeamMember[] = [
  {
    name: "Jordan Lee",
    title: "Head of Performance Media",
    bio: "Runs Meta, YouTube, and Google lead gen campaigns with a kill-fast testing cadence. Former performance lead at Notion.",
    linkedinUrl: "https://www.linkedin.com/in/jordanlee",
    imageSrc: "/team/jordan-lee.svg",
    formerRole: "Performance Marketing Lead",
    formerCompany: "Notion",
  },
  {
    name: "Priya Sharma",
    title: "Head of Creative & Messaging",
    bio: "Turns ICP insights into ad creative that converts — from hook tests to full funnel narrative arcs.",
    linkedinUrl: "https://www.linkedin.com/in/priyasharma",
    imageSrc: "/team/priya-sharma.svg",
    formerRole: "Creative Director",
    formerCompany: "Gong",
  },
  {
    name: "Marcus Chen",
    title: "Growth Analyst & Attribution",
    bio: "Connects campaign spend to CRM outcomes — offline conversions, lead quality scores, and sales-ready pipeline velocity.",
    linkedinUrl: "https://www.linkedin.com/in/marcuschen",
    imageSrc: "/team/marcus-chen.svg",
    formerRole: "Marketing Analytics Lead",
    formerCompany: "Ramp",
  },
  {
    name: "Elena Rodriguez",
    title: "Client Strategy Lead",
    bio: "Your weekly strategic partner — challenges assumptions, aligns channel mix to sales cycle, and keeps us accountable to lead volume and quality.",
    linkedinUrl: "https://www.linkedin.com/in/elenarodriguez",
    imageSrc: "/team/elena-rodriguez.svg",
    formerRole: "Director of Demand Gen",
    formerCompany: "BambooHR",
  },
] as const;

export const teamIntro = {
  headline: "Performance marketers, not account managers",
  subheadline:
    "Every person on your account has run B2B lead generation campaigns before — not just managed tickets.",
  body: [
    "We're a small, senior team by design. No junior buyers learning on your budget. No rotating cast of account managers. You work directly with the people optimizing your campaigns.",
    "Combined, we've managed $28M+ in performance ad spend and shipped lead gen creative across Meta, LinkedIn, YouTube, and Google — always tied back to qualified leads, demos, and revenue.",
  ],
} as const;

export const whyOurTeam = {
  headline: "Why our team is different",
  subheadline:
    "Senior performance marketers who've been in your seat — and still run the work themselves.",
  points: [
    {
      title: "Lead gen & SaaS experience",
      description:
        "We've all run performance marketing inside SaaS companies. We know CPL, lead quality, payback windows, and multi-stakeholder sales cycles — not just platform metrics.",
    },
    {
      title: "No delegation layer",
      description:
        "The strategist on your kickoff call is the same person reviewing your campaigns every week. No handoffs to junior staff.",
    },
    {
      title: "Creative + media under one roof",
      description:
        "Messaging, creative, and media buying aren't siloed. One team owns the full loop from hook test to lead gen report.",
    },
    {
      title: "Weekly accountability",
      description:
        "Every client gets a written optimization log — what we tested, what we killed, what we scaled, and why it matters for lead volume and quality.",
    },
  ],
} as const;

export const whyWeAreBetter = {
  headline: "Why we're better than generalist agencies",
  subheadline:
    "Most agencies say yes to everyone. We said no — and built a team that only does B2B performance marketing and lead generation.",
  comparisons: [
    {
      title: "What we optimize for",
      them: "Clicks, impressions, and platform-reported ROAS",
      us: "Qualified leads, SQL volume, cost per lead, and revenue payback",
    },
    {
      title: "Who runs your account",
      them: "Junior media buyers with a senior name on the proposal",
      us: "Senior operators who've managed $1M+ SaaS budgets themselves",
    },
    {
      title: "Creative approach",
      them: "Generic templates and one-size-fits-all messaging",
      us: "ICP-mapped hooks, funnel-stage creative, and 48-hour kill tests",
    },
    {
      title: "Reporting & transparency",
      them: "Monthly PDFs with vanity metrics and vague recommendations",
      us: "Weekly logs, CRM-linked dashboards, and spend you can audit anytime",
    },
    {
      title: "Contracts & ownership",
      them: "12-month lock-ins, assets held hostage on exit",
      us: "90-day proof window, month-to-month after — you own everything",
    },
  ],
} as const;

/** Thin proof strip below hero — keep numbers aligned with real client data. */
export const proofBar = [
  { label: "Trusted by 43+ B2B teams", icon: "stars" as const },
  { label: "$28M+ in performance ad spend managed", icon: "spend" as const },
  { label: "Avg. 3.6x ROAS on lead gen campaigns", icon: "roas" as const },
  { label: "G2 & Clutch verified", icon: "verified" as const },
] as const;

export const auditDeliverables = [
  "Full breakdown of where your lead gen spend is leaking",
  "Attribution gaps costing you qualified lead visibility",
  "Channel-specific fix roadmap (Meta / YouTube / LinkedIn / Google)",
  "Benchmark: how your CPL compares to similar B2B SaaS campaigns",
  "Delivered within 5 business days — yours to keep, no strings attached",
] as const;

/** Free audit form — spend tiers */
export const auditSpendOptions = [
  "<$5K/mo",
  "$5K–$15K/mo",
  "$15K–$30K/mo",
  "$30K+/mo",
  "Not running ads yet",
] as const;

/** Channels the audit can focus on — matches /services */
export const auditChannelOptions = [
  { id: "meta", label: "Meta Ads" },
  { id: "instagram", label: "Instagram Ads" },
  { id: "youtube", label: "YouTube Ads" },
  { id: "linkedin", label: "LinkedIn Ads" },
  { id: "google", label: "Google Ads" },
  { id: "unsure", label: "I'm not sure" },
] as const;

export type AuditChannelId = (typeof auditChannelOptions)[number]["id"];

/** What a qualified lead means for their business */
export const auditLeadGoals = [
  { id: "demos", label: "Booked demos" },
  { id: "trials", label: "Free trials" },
  { id: "sqls", label: "Sales-qualified leads (SQLs)" },
  { id: "mqls", label: "Marketing-qualified leads (MQLs)" },
  { id: "other", label: "Other" },
] as const;

export type AuditLeadGoalId = (typeof auditLeadGoals)[number]["id"];

/** Who currently runs their paid campaigns */
export const auditAdManagers = [
  { id: "in-house", label: "In-house marketer" },
  { id: "agency", label: "Another agency" },
  { id: "founder", label: "Founder / solo marketer" },
  { id: "not-running", label: "Not running ads yet" },
] as const;

export type AuditAdManagerId = (typeof auditAdManagers)[number]["id"];

/** CRM used for lead follow-up — affects tracking audit */
export const auditCrmOptions = [
  { id: "hubspot", label: "HubSpot" },
  { id: "salesforce", label: "Salesforce" },
  { id: "pipedrive", label: "Pipedrive" },
  { id: "other", label: "Other CRM" },
  { id: "none", label: "No CRM yet" },
] as const;

export type AuditCrmId = (typeof auditCrmOptions)[number]["id"];

/** Offline conversion / CRM tracking maturity */
export const auditTrackingOptions = [
  { id: "yes", label: "Yes — CRM events feed back to ads" },
  { id: "partial", label: "Partially — some gaps" },
  { id: "no", label: "No — we optimize on form fills only" },
  { id: "unsure", label: "Not sure" },
] as const;

export type AuditTrackingId = (typeof auditTrackingOptions)[number]["id"];

/** Reference list for /free-audit — what we ask and why */
export const auditIntakeQuestions = [
  {
    category: "About your business",
    items: [
      "Company name, website, and work email",
      "Who you sell to (B2B SaaS, vertical, deal size if known)",
    ],
  },
  {
    category: "Spend & goals",
    items: [
      "Monthly ad spend (or if you haven't launched yet)",
      "Primary lead goal — demos, trials, MQLs, or SQLs",
      "Who manages ads today — in-house, agency, or founder-led",
    ],
  },
  {
    category: "Campaign setup",
    items: [
      "Which channels you run or want to test (Meta, LinkedIn, YouTube, Google)",
      "CRM platform and whether offline conversions are wired to ad platforms",
      "Current cost per lead or demo (if you know it)",
      "Biggest challenge — high CPL, junk leads, bad tracking, wrong channels, etc.",
    ],
  },
] as const;

/** Main topic for a 30-min strategy call */
export const strategyCallTopics = [
  { id: "channel-mix", label: "Review my channel mix & budget" },
  { id: "cpl-roas", label: "Lower CPL / improve ROAS" },
  { id: "tracking", label: "Fix tracking & lead attribution" },
  { id: "scale", label: "Scale what's working" },
  { id: "agency-review", label: "Second opinion on current setup" },
  { id: "getting-started", label: "Getting started with lead gen ads" },
] as const;

export type StrategyCallTopicId = (typeof strategyCallTopics)[number]["id"];

/** When they're looking to start if we partner */
export const strategyCallTimelines = [
  { id: "asap", label: "ASAP — ready to move" },
  { id: "30-days", label: "Within 30 days" },
  { id: "60-days", label: "1–2 months out" },
  { id: "exploring", label: "Just exploring options" },
] as const;

export type StrategyCallTimelineId = (typeof strategyCallTimelines)[number]["id"];

/** Reference list for /contact — what we ask before a strategy call */
export const strategyCallIntakeQuestions = [
  {
    category: "About you",
    items: [
      "Name, work email, company, and website",
      "Preferred call time (if not booking on the calendar)",
    ],
  },
  {
    category: "Your marketing today",
    items: [
      "Monthly ad spend and who runs campaigns today",
      "Primary lead goal — demos, trials, MQLs, or SQLs",
      "Channels you're running or want to discuss",
    ],
  },
  {
    category: "What to cover on the call",
    items: [
      "Main topic — channel mix, CPL/ROAS, tracking, scaling, or getting started",
      "When you're looking to start working together",
      "Anything specific you want us to prepare before the 30-min call",
    ],
  },
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
    "You're a B2B SaaS company spending $5K–$50K/month on lead generation campaigns",
    "You need qualified leads — demos, trials, or sales-ready SQLs — not just form fills",
    "You've tried in-house or generalist performance marketing and CPL kept climbing",
    "You care about lead quality and revenue — not just clicks and impressions",
  ],
  badFit: [
    "You're pre-revenue or pre-product-market fit",
    'You need someone to "just run ads" without a lead gen strategy',
    "You want the cheapest option available",
  ],
} as const;

export const navLinks = [
  { href: "/services", label: "Services" },
  { href: "/testimonials", label: "Testimonials" },
  { href: "/about", label: "About" },
  // { href: "/free-audit", label: "Lead Gen Audit" },
  // { href: "/contact", label: "Book a Call" },
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
    "Average 1–5 rating from post-engagement surveys and third-party reviews on G2 and Clutch, completed by active B2B clients between 2023 and 2025.",
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
    reviewPlatforms.find((p) => p.id === clientRating.primarySource) ??
    reviewPlatforms[0]
  );
}

export const channels = [
  {
    name: "Meta & Instagram",
    description:
      "Lead gen and retargeting campaigns with creative that converts cold B2B traffic.",
    color: "bg-sky/30 text-ink",
  },
  {
    name: "LinkedIn Ads",
    description:
      "Title, company, and ABM targeting for demo-led B2B lead generation.",
    color: "bg-coral/20 text-ink",
  },
  {
    name: "YouTube Ads",
    description:
      "Demand capture and product education that feeds qualified leads.",
    color: "bg-sun/40 text-ink",
  },
  {
    name: "Google Ads",
    description:
      "High-intent search and competitor conquest for buyers ready to convert.",
    color: "bg-mint/30 text-ink",
  },
] as const;

export const funnelSteps = [
  {
    id: "spend",
    question: "I need more qualified leads",
    headline:
      "Your lead gen budget deserves performance marketers who own outcomes",
    body: "You're already paying platforms. The question isn't whether to spend — it's whether your campaigns are optimized for lead quality, CPL, and revenue — not vanity metrics.",
  },
  {
    id: "waste",
    question: "Will this agency waste my money?",
    headline: "We kill waste before we scale lead gen spend",
    body: "Weekly campaign surgery: negative keywords, audience exclusions, creative kill switches, and budget caps tied to cost-per-qualified-lead — not impressions.",
  },
  {
    id: "understand",
    question: "Do they understand lead generation?",
    headline: "Built for B2B lead gen, not generic traffic campaigns",
    body: "Trials, demos, MQL-to-SQL conversion, payback periods, and CRM stages — we optimize performance marketing to how your buyers actually decide.",
  },
  {
    id: "prove",
    question: "Can they prove results?",
    headline: "Leads in the CRM, not screenshots in a deck",
    body: "Offline conversions, lead quality scores, SQL volume, and revenue attribution. You'll see the same numbers your sales team sees.",
  },
  {
    id: "trust",
    question: "Can I trust them?",
    headline: "Your accounts. Your data. No lock-ins.",
    body: "We work inside your ad accounts, share every asset, and stay month-to-month. If we're not earning trust, you walk — with everything we built.",
  },
  {
    id: "book",
    question: "Get started",
    headline: "Start with a free lead gen audit — keep the roadmap either way",
    body: "Get a 90-day performance marketing plan with quick wins, waste to cut, and channels to scale. Whether you hire us or not, you'll leave with clarity.",
  },
] as const;

export const stats = [
  { value: "4.2x", label: "Avg. campaign ROAS" },
  { value: "38%", label: "Avg. CPL reduction in 30 days" },
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
      "Our management fees typically start at $2,500/month and scale based on channels, ad spend, and scope. We work with B2B teams spending anywhere from $5K to $80K/month on lead generation campaigns. The free audit will give us both a clear picture of what makes sense before any commitment.",
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
      "Meta (Facebook & Instagram), LinkedIn, YouTube, and Google Ads. We focus exclusively on performance marketing and lead generation for B2B SaaS — no SEO, no web dev side quests.",
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
      "You do. We work in your accounts, set up tracking in your GA4/GTM, and share dashboards tied to lead volume, quality, and CRM pipeline.",
  },
] as const;
