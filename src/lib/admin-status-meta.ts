import type { LucideIcon } from "lucide-react";
import {
  CalendarCheck,
  CircleDashed,
  FileCheck2,
  FileText,
  Inbox,
  MessageSquare,
  Search,
  Trophy,
  XCircle,
} from "lucide-react";
import type { FitLabel, LeadPriority, LeadStatus } from "@/lib/admin-mock-data";
import type { TemplateCategory } from "@/lib/admin-template-data";
import type { PlayfulBadgeVariant } from "@/components/ui/playful-badge";

/** Icon, label, tooltip copy, and badge shape per lead status. */
export const statusMeta: Record<
  LeadStatus,
  { icon: LucideIcon; description: string; badgeVariant: PlayfulBadgeVariant }
> = {
  new: {
    icon: Inbox,
    badgeVariant: "chip",
    description:
      "Fresh inbound lead — not contacted yet. Review intake details and send first outreach.",
  },
  contacted: {
    icon: MessageSquare,
    badgeVariant: "ticket",
    description:
      "Initial email or message sent. Waiting for a reply or next step from the prospect.",
  },
  "audit-in-progress": {
    icon: Search,
    badgeVariant: "flag",
    description:
      "Free audit is being prepared. Team is reviewing ads, tracking, and funnel gaps.",
  },
  "audit-delivered": {
    icon: FileCheck2,
    badgeVariant: "stamp",
    description:
      "Audit report sent to the prospect. Follow up to book a strategy call or proposal.",
  },
  "call-booked": {
    icon: CalendarCheck,
    badgeVariant: "pin",
    description:
      "Strategy or review call is scheduled. Prep benchmarks and intake notes before the meeting.",
  },
  proposal: {
    icon: FileText,
    badgeVariant: "flag",
    description:
      "Commercial proposal or scope sent. Track decision timeline and handle objections.",
  },
  won: {
    icon: Trophy,
    badgeVariant: "stamp",
    description: "Deal closed — client signed. Move to onboarding and handoff.",
  },
  lost: {
    icon: XCircle,
    badgeVariant: "chip",
    description:
      "Opportunity closed without a win. Log reason in notes and archive from active queue.",
  },
};

export const priorityMeta: Record<
  LeadPriority,
  { badgeVariant: PlayfulBadgeVariant; description: string }
> = {
  high: {
    badgeVariant: "flag",
    description: "Urgent follow-up — high ICP fit, strong spend, or overdue action.",
  },
  medium: {
    badgeVariant: "ticket",
    description: "Standard queue — follow up within the normal SLA window.",
  },
  low: {
    badgeVariant: "chip",
    description: "Lower urgency — nurture or revisit when bandwidth allows.",
  },
};

export const fitMeta: Record<
  FitLabel,
  { badgeVariant: PlayfulBadgeVariant; description: string }
> = {
  "good-fit": {
    badgeVariant: "stamp",
    description: "Matches ICP — B2B SaaS, budget, and goals align with our offer.",
  },
  review: {
    badgeVariant: "pin",
    description: "Borderline fit — validate spend, goals, or timeline before prioritizing.",
  },
  "poor-fit": {
    badgeVariant: "chip",
    description: "Outside ICP — wrong vertical, budget, or intent. Consider archiving.",
  },
};

export const templateCategoryMeta: Record<
  TemplateCategory,
  { badgeVariant: PlayfulBadgeVariant }
> = {
  "thank-you": { badgeVariant: "ticket" },
  "case-study": { badgeVariant: "stamp" },
  educational: { badgeVariant: "pin" },
  custom: { badgeVariant: "chip" },
};

/** Fallback icon for unknown / loading states */
export const defaultStatusIcon = CircleDashed;
