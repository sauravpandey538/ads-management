import type { SimpleIcon } from "simple-icons";

export type ServiceSlug = "meta" | "instagram" | "youtube" | "linkedin" | "google";

export type ServiceResult = {
  company: string;
  metric: string;
  label: string;
  detail: string;
};

export type ServiceData = {
  slug: ServiceSlug;
  name: string;
  shortName: string;
  headline: string;
  subheadline: string;
  icon: string;
  color: string;
  tabLabel: string;
  badgeVariant: "ticket" | "stamp" | "pin" | "flag" | "chip";
  badgeText: string;
  overview: string;
  painPoints: string[];
  approach: { title: string; description: string }[];
  deliverables: string[];
  results: ServiceResult[];
  faqs: { question: string; answer: string }[];
  dashboard: {
    title: string;
    kpis: { label: string; value: string; change: string }[];
    chartLabel: string;
  };
};

export const services: Record<ServiceSlug, ServiceData> = {
  meta: {
    slug: "meta",
    name: "Meta Ads",
    shortName: "Meta",
    tabLabel: "Meta",
    headline: "Meta lead gen campaigns that fill your pipeline — not your retargeting graveyard",
    subheadline:
      "Facebook & Instagram performance marketing built for B2B: lookalikes from closed-won, creative sprints, and exclusions that stop paying for junk leads.",
    icon: "meta",
    color: "bg-[#0081FB]/15",
    badgeVariant: "flag",
    badgeText: "Demand + Retarget",
    overview:
      "Meta is where SaaS brands win on creative velocity and retargeting depth. We structure campaigns around funnel stage — cold prospecting, engaged visitors, trial abandoners, and demo no-shows — with budget caps tied to cost-per-qualified-demo.",
    painPoints: [
      "Broad targeting burning budget on curiosity clicks",
      "Creative fatigue after 2 weeks with no refresh cadence",
      "iOS tracking gaps hiding true demo attribution",
      "Retargeting pools too small or polluted with bots",
    ],
    approach: [
      {
        title: "Audience architecture",
        description:
          "Seed lookalikes from CRM closed-won, layer ICP interest stacks, and maintain aggressive exclusion lists synced weekly.",
      },
      {
        title: "Creative testing sprints",
        description:
          "Static, carousel, and UGC-style video tested in 48-hour windows. Kill losers fast, scale winners with budget guardrails.",
      },
      {
        title: "Full-funnel retargeting",
        description:
          "Separate sequences for pricing page visitors, trial starters, and demo no-shows — each with distinct offer and urgency.",
      },
      {
        title: "Offline conversion feedback",
        description:
          "Demo booked, SQL, and closed-won events piped back to Meta so the algorithm optimizes for revenue — not form fills.",
      },
    ],
    deliverables: [
      "Campaign & ad set structure rebuild",
      "Creative brief + 8–12 ad variants/month",
      "Audience exclusions & lookalike refresh",
      "CAPI + offline conversion setup",
      "Weekly optimization & pipeline reporting",
    ],
    results: [
      {
        company: "RevStack",
        metric: "-52%",
        label: "Cost per demo",
        detail: "Rebuilt prospecting + retargeting layers; CPL dropped in 28 days.",
      },
      {
        company: "CloudMetrics",
        metric: "3.8x",
        label: "Pipeline ROAS",
        detail: "Lookalike from closed-won + demo retargeting sequence.",
      },
      {
        company: "StackFlow",
        metric: "31",
        label: "Qualified demos / mo",
        detail: "From $9K/mo spend after creative sprint overhaul.",
      },
    ],
    faqs: [
      {
        question: "Does Meta work for B2B SaaS?",
        answer:
          "Yes — when targeting, creative, and retargeting are built for long cycles. We focus on ICP layers and down-funnel signals, not B2C-style broad reach.",
      },
      {
        question: "What's a realistic Meta budget?",
        answer:
          "Most SaaS clients start at $5K–$15K/mo. Below ~$3K, retargeting pools stay too thin for reliable learning.",
      },
    ],
    dashboard: {
      title: "Meta Ads Overview",
      kpis: [
        { label: "Pipeline ROAS", value: "3.8x", change: "+24%" },
        { label: "Cost / Demo", value: "$142", change: "-52%" },
        { label: "Retarget CVR", value: "8.4%", change: "+18%" },
      ],
      chartLabel: "Weekly qualified demos",
    },
  },
  instagram: {
    slug: "instagram",
    name: "Instagram Ads",
    shortName: "Instagram",
    tabLabel: "Instagram",
    headline: "Instagram lead gen that looks native — and converts like landing pages",
    subheadline:
      "Performance marketing on Instagram for B2B: Reels, Stories, and feed placements engineered for qualified lead capture and demo paths that match your offer.",
    icon: "instagram",
    color: "bg-gradient-to-br from-[#F58529]/20 via-[#DD2A7B]/15 to-[#8134AF]/15",
    badgeVariant: "stamp",
    badgeText: "Reels + Stories",
    overview:
      "Instagram is where SaaS brands build familiarity before the demo. We run placement-specific creative — Reels for cold, Stories for retargeting, feed for proof-heavy angles — all tied to the same pipeline metrics.",
    painPoints: [
      "Repurposed Facebook creative that feels off-platform",
      "Reels getting views but zero demo page visits",
      "Story ads with broken swipe-up message match",
      "No separation between TOFU awareness and BOFU retargeting",
    ],
    approach: [
      {
        title: "Placement-native creative",
        description:
          "Reels get hook-first 15s cuts; Stories get urgency + social proof; feed gets comparison and case-study angles.",
      },
      {
        title: "Creator-style UGC",
        description:
          "Founder-led and customer-quote formats that outperform polished studio ads for dev tools and PLG SaaS.",
      },
      {
        title: "Engagement retargeting",
        description:
          "Video viewers, profile visitors, and engagers fed into demo-focused retargeting within 7-day windows.",
      },
      {
        title: "Landing page parity",
        description:
          "Every ad promise mirrored on the landing page — headline, proof, and CTA — to protect CVR.",
      },
    ],
    deliverables: [
      "Placement-specific campaign structure",
      "Reels + Stories creative pipeline",
      "Engagement-based retargeting pools",
      "Landing page message-match audit",
      "Bi-weekly creative refresh cadence",
    ],
    results: [
      {
        company: "DevPulse",
        metric: "-44%",
        label: "Cost per trial",
        detail: "Reels-first creative + trial retargeting on Stories.",
      },
      {
        company: "LedgerPro",
        metric: "2.9x",
        label: "Demo ROAS",
        detail: "UGC-style Reels outperforming studio ads 3:1.",
      },
      {
        company: "FinLedger",
        metric: "19",
        label: "Demos from Reels",
        detail: "In 60 days from $6K/mo Instagram spend.",
      },
    ],
    faqs: [
      {
        question: "Instagram vs Meta — separate campaigns?",
        answer:
          "We often run Instagram as a placement focus within Meta, but with placement-specific creative and budget splits when Reels or Stories outperform feed.",
      },
      {
        question: "Do we need video for Instagram?",
        answer:
          "Reels and Stories strongly favor video. We produce lightweight motion graphics and UGC-style cuts — no Hollywood budget required.",
      },
    ],
    dashboard: {
      title: "Instagram Ads Overview",
      kpis: [
        { label: "Reels CTR", value: "2.1%", change: "+67%" },
        { label: "Story CVR", value: "6.2%", change: "+31%" },
        { label: "Cost / Trial", value: "$89", change: "-44%" },
      ],
      chartLabel: "Placement performance",
    },
  },
  youtube: {
    slug: "youtube",
    name: "YouTube Ads",
    shortName: "YouTube",
    tabLabel: "YouTube",
    headline: "YouTube lead gen that educates buyers before they hit your pricing page",
    subheadline:
      "Performance marketing on YouTube for B2B SaaS: in-stream, discovery, and Shorts campaigns that educate buyers and drive qualified leads down-funnel.",
    icon: "youtube",
    color: "bg-[#FF0000]/10",
    badgeVariant: "ticket",
    badgeText: "Long-cycle SaaS",
    overview:
      "YouTube is your classroom. We capture category search intent, run skippable in-stream for problem-aware buyers, and remarket engaged viewers with demo CTAs — all measured against CRM pipeline.",
    painPoints: [
      "High CPV with no connection to demo pipeline",
      "Generic brand videos that don't address buyer pain",
      "No remarketing of 25%+ video viewers",
      "Competitor keywords left uncontested",
    ],
    approach: [
      {
        title: "Intent-based targeting",
        description:
          "Custom intent audiences from category keywords, competitor terms, and affinity stacks aligned to your ICP.",
      },
      {
        title: "Educational ad formats",
        description:
          "60–90s product walkthroughs, 'vs competitor' comparisons, and use-case shorts that pre-sell before the demo.",
      },
      {
        title: "Engagement remarketing",
        description:
          "25%, 50%, 75% video view segments retargeted with tighter demo offers and urgency.",
      },
      {
        title: "Search + YouTube orchestration",
        description:
          "Google Ads search captures active intent; YouTube warms cold accounts — budget split by funnel stage.",
      },
    ],
    deliverables: [
      "Campaign structure by intent tier",
      "Video ad scripts + thumbnail guidance",
      "View-based remarketing audiences",
      "YouTube + Google cross-channel reporting",
      "Monthly creative & keyword refresh",
    ],
    results: [
      {
        company: "DevPulse",
        metric: "-41%",
        label: "Cost per trial",
        detail: "YouTube intent + Google search orchestration.",
      },
      {
        company: "PlatformOps",
        metric: "847",
        label: "Demo page visits",
        detail: "From in-stream campaigns in 90 days.",
      },
      {
        company: "DataForge",
        metric: "4.1x",
        label: "Pipeline ROAS",
        detail: "75% view remarketing into demo sequence.",
      },
    ],
    faqs: [
      {
        question: "Do we need professional video?",
        answer:
          "Screen recordings with voiceover often outperform polished brand films for dev tools. We script and guide; you can record in-house or we coordinate lightweight production.",
      },
      {
        question: "YouTube vs Google — same budget?",
        answer:
          "We allocate by funnel role: Google for capture, YouTube for education and remarketing. Split adjusts monthly based on pipeline data.",
      },
    ],
    dashboard: {
      title: "YouTube Ads Overview",
      kpis: [
        { label: "View Rate", value: "34%", change: "+12%" },
        { label: "Demo Visits", value: "847", change: "+56%" },
        { label: "Pipeline ROAS", value: "4.1x", change: "+29%" },
      ],
      chartLabel: "Video engagement funnel",
    },
  },
  linkedin: {
    slug: "linkedin",
    name: "LinkedIn Ads",
    shortName: "LinkedIn",
    tabLabel: "LinkedIn",
    headline: "LinkedIn lead gen that reaches the exact title signing your checks",
    subheadline:
      "ABM and title-targeted performance marketing on LinkedIn — built for demo-led B2B lead generation through long evaluation cycles.",
    icon: "linkedin",
    color: "bg-[#0A66C2]/12",
    badgeVariant: "pin",
    badgeText: "ABM + Titles",
    overview:
      "LinkedIn is precision targeting for B2B. We map personas to campaign tiers, run ABM against named accounts, and use document/thought-leader formats to hold attention through 6–12 week cycles.",
    painPoints: [
      "Targeting too broad — paying for junior titles with no budget authority",
      "Single-message ads across awareness and decision stages",
      "No ABM sync from CRM target account lists",
      "Lead gen forms with no sales follow-up SLA",
    ],
    approach: [
      {
        title: "Persona-tier campaigns",
        description:
          "Separate ad sets for economic buyer, champion, and influencer — each with stage-appropriate messaging.",
      },
      {
        title: "ABM list orchestration",
        description:
          "CRM target accounts synced weekly; matched audiences + company exclusions for non-ICP bleed.",
      },
      {
        title: "Document & TL ads",
        description:
          "Gated guides and founder POV posts that warm accounts before demo CTAs in retargeting.",
      },
      {
        title: "CRM-connected lead routing",
        description:
          "Lead gen forms mapped to Salesforce/HubSpot with scoring rules and sales SLAs.",
      },
    ],
    deliverables: [
      "Persona & ABM campaign architecture",
      "Document ad creative + landing paths",
      "Matched audience refresh cadence",
      "Lead gen form + CRM integration",
      "Weekly bid & audience optimization",
    ],
    results: [
      {
        company: "FinLedger",
        metric: "62",
        label: "SQLs in Q1",
        detail: "ABM + retargeting across 6-week cycles.",
      },
      {
        company: "RevStack",
        metric: "-38%",
        label: "Cost per SQL",
        detail: "Title narrowing + document ad warm-up sequence.",
      },
      {
        company: "SalesForge",
        metric: "$180K",
        label: "Pipeline generated",
        detail: "From $22K/mo LinkedIn spend.",
      },
    ],
    faqs: [
      {
        question: "Is LinkedIn too expensive for SaaS?",
        answer:
          "CPMs are higher — but so is ICP precision. We optimize for cost-per-SQL and pipeline ROAS, not CPL alone.",
      },
      {
        question: "Lead gen forms or landing pages?",
        answer:
          "Depends on ACV and sales motion. High-touch demo-led → landing pages. Mid-market with fast follow-up → forms with CRM routing.",
      },
    ],
    dashboard: {
      title: "LinkedIn Ads Overview",
      kpis: [
        { label: "SQL Volume", value: "62", change: "+48%" },
        { label: "Cost / SQL", value: "$354", change: "-38%" },
        { label: "ABM Match Rate", value: "91%", change: "+15%" },
      ],
      chartLabel: "Pipeline by persona tier",
    },
  },
  google: {
    slug: "google",
    name: "Google Ads",
    shortName: "Google",
    tabLabel: "Google",
    headline: "Google lead gen that captures buyers the moment they search",
    subheadline:
      "High-intent search, competitor conquest, and Performance Max with lead gen guardrails — optimized for qualified leads, not junk form fills.",
    icon: "google",
    color: "bg-mint/30",
    badgeVariant: "chip",
    badgeText: "High-intent capture",
    overview:
      "Google captures active demand. We own brand, category, competitor, and 'alternative to' clusters — with aggressive negatives, message-matched landing pages, and offline conversions feeding Smart Bidding.",
    painPoints: [
      "Broad match bleeding budget on irrelevant queries",
      "Competitor terms with no differentiated landing pages",
      "Conversion tracking counting junk form fills",
      "Performance Max spending on display with no pipeline proof",
    ],
    approach: [
      {
        title: "Intent cluster architecture",
        description:
          "Brand, category, competitor, and comparison keywords in separate campaigns with distinct bids and landing pages.",
      },
      {
        title: "Negative keyword discipline",
        description:
          "Weekly search term reviews; job-seeker, free-tool, and consumer queries excluded aggressively.",
      },
      {
        title: "Landing page message match",
        description:
          "Dynamic headline alignment per ad group — ad promise = H1 on landing page = form offer.",
      },
      {
        title: "Offline conversion bidding",
        description:
          "Demo booked, SQL, and closed-won imported so tCPA and tROAS optimize for real revenue.",
      },
    ],
    deliverables: [
      "Search campaign restructure",
      "Negative keyword master list",
      "RSA copy per intent cluster",
      "Landing page audit + recommendations",
      "Offline conversion import setup",
    ],
    results: [
      {
        company: "DevPulse",
        metric: "-41%",
        label: "Cost per trial",
        detail: "Search intent rebuild + landing page message match.",
      },
      {
        company: "CloudMetrics",
        metric: "156",
        label: "Qualified clicks / wk",
        detail: "After negative keyword purge and cluster split.",
      },
      {
        company: "StackFlow",
        metric: "5.2x",
        label: "Search ROAS",
        detail: "Competitor conquest with comparison landing pages.",
      },
    ],
    faqs: [
      {
        question: "Performance Max for SaaS?",
        answer:
          "Only with strict asset group control, audience signals from CRM, and offline conversion feedback. We don't set-and-forget PMax.",
      },
      {
        question: "How fast does Google show results?",
        answer:
          "Search often shows wins in 2–3 weeks after structure fixes. Compounding gains over 60–90 days as Smart Bidding learns on CRM data.",
      },
    ],
    dashboard: {
      title: "Google Ads Overview",
      kpis: [
        { label: "Search ROAS", value: "5.2x", change: "+33%" },
        { label: "Cost / Trial", value: "$67", change: "-41%" },
        { label: "Quality Score", value: "8.4", change: "+1.2" },
      ],
      chartLabel: "Intent cluster performance",
    },
  },
};

export const serviceSlugs = Object.keys(services) as ServiceSlug[];

export const heroTabSlugs: ServiceSlug[] = ["meta", "youtube", "instagram"];

import type { BrandLogoEntry, BrandSlug } from "@/components/shared/brand-logo";

export const clientLogos: BrandLogoEntry[] = [
  { name: "Notion", slug: "siNotion" },
  { name: "Calendly", slug: "siCalendly" },
  { name: "HubSpot", slug: "siHubspot" },
  { name: "Intercom", slug: "siIntercom" },
  { name: "Zendesk", slug: "siZendesk" },
  { name: "Stripe", slug: "siStripe" },
  { name: "Figma", slug: "siFigma" },
  { name: "Airtable", slug: "siAirtable" },
];
