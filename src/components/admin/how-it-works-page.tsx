"use client";

import Link from "next/link";
import {
  ArrowRight,
  Calendar,
  CheckCircle2,
  ClipboardList,
  FileText,
  Globe,
  LayoutDashboard,
  Mail,
  Send,
  Sparkles,
  Users,
} from "lucide-react";
import { PlayfulBadge } from "@/components/ui/playful-badge";
import { PlayfulCard } from "@/components/ui/playful-card";
import { buttonVariants } from "@/components/ui/button";

/** End-to-end audit process — from website lead to delivered report. */
const AUDIT_PROCESS_STEPS = [
  {
    id: "intake",
    title: "Lead intake",
    summary: "A prospect submits the free audit form on your marketing site.",
    details: [
      "We capture company, spend tier, ad channels, CRM, tracking setup, lead goal, and their main challenge.",
      "The lead appears immediately in Admin → Leads and on the outreach dashboard.",
      "A unique client portal link is generated so they can track progress without logging in.",
    ],
    icon: Globe,
  },
  {
    id: "qualify",
    title: "Qualification & assignment",
    summary: "Each lead is scored, prioritized, and routed to an internal owner.",
    details: [
      "Score reflects ICP fit: monthly spend, tracking maturity, goal type (SQLs, demos, trials), and timeline.",
      "Priority (high / medium / low) and fit label (good fit, review, poor fit) guide who works it first.",
      "An internal assignee is set and initial follow-up tasks are created — e.g. kickoff email, access request.",
    ],
    icon: Sparkles,
  },
  {
    id: "kickoff",
    title: "Kickoff & SLA",
    summary: "The assignee opens the audit and starts the 5 business day delivery clock.",
    details: [
      "Send the audit kickoff template and request read-only ad account access (Meta, Google, YouTube as needed).",
      "Confirm CRM and offline conversion tracking access if applicable.",
      "Share the client portal link — they see submitted status, SLA date, and checklist progress as you work.",
    ],
    icon: Calendar,
  },
  {
    id: "execution",
    title: "Audit execution",
    summary: "The team works through the audit checklist on each lead.",
    details: [
      "Ad account viewer access received",
      "Spend & channel waste review",
      "CRM / offline conversion audit",
      "90-day roadmap written",
      "Mark items complete in Admin → Leads or the dashboard as each phase finishes.",
      "Lead status moves to Audit in progress; the portal stepper and checklist update for the client.",
    ],
    icon: ClipboardList,
  },
  {
    id: "delivery",
    title: "Report delivery",
    summary: "The final audit report is assigned and published to the client portal.",
    details: [
      "From Admin → Dashboard, open Assign report on the lead.",
      "Complete the executive summary, key findings, and 90-day recommendations (or regenerate from intake data and edit).",
      "Saving marks the audit delivered, completes the checklist, and publishes the report to their portal link.",
      "The client sees the full report — summary, findings, and recommendations — plus a CTA to book a strategy call.",
    ],
    icon: FileText,
  },
  {
    id: "followup",
    title: "Follow-up & pipeline",
    summary: "Post-delivery outreach moves qualified leads toward a strategy call or proposal.",
    details: [
      "Use the outreach queue for overdue follow-ups — e.g. offer a strategy call, send case studies, or schedule a decision call.",
      "Send templated emails from Admin → Dashboard or Templates; activity is logged on the lead and visible in the portal.",
      "Update lead status (call booked, proposal, won, lost) as the deal progresses.",
    ],
    icon: Send,
  },
] as const;

const QUICK_LINKS = [
  { href: "/admin/dashboard", label: "Outreach dashboard", icon: LayoutDashboard },
  { href: "/admin/leads", label: "Manage leads", icon: Users },
  { href: "/admin/templates", label: "Email templates", icon: Mail },
  { href: "/free-audit", label: "Free audit form", icon: Globe },
];

/** Internal guide — how audits run from intake through report delivery. */
export function HowItWorksPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-8 pb-8">
      <div>
        <PlayfulBadge variant="stamp" className="mb-3">
          Operations guide
        </PlayfulBadge>
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
          How the audit process works
        </h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          From the first website submission to delivering the final audit report — this is the
          standard workflow your team follows for every free lead gen audit.
        </p>
      </div>

      <PlayfulCard variant="flag" tone="sky" className="p-5 sm:p-6">
        <h2 className="font-bold text-foreground">At a glance</h2>
        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
          Prospect submits form → lead is scored and assigned → kickoff + 5-day SLA → checklist
          execution → report assigned in admin → client reads report in portal → follow-up outreach
          and pipeline updates.
        </p>
      </PlayfulCard>

      <div className="space-y-4">
        {AUDIT_PROCESS_STEPS.map((step, i) => (
          <PlayfulCard key={step.id} variant="ticket" tone="neutral" className="p-5 sm:p-6">
            <div className="flex gap-4">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
                {i + 1}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <step.icon className="size-4 text-primary" />
                  <h2 className="font-bold text-foreground">{step.title}</h2>
                </div>
                <p className="mt-1 text-sm font-medium text-foreground/90">{step.summary}</p>
                <ul className="mt-3 space-y-2">
                  {step.details.map((detail) => (
                    <li
                      key={detail}
                      className="flex items-start gap-2 text-sm text-muted-foreground"
                    >
                      <CheckCircle2 className="size-3.5 shrink-0 text-primary mt-0.5" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </PlayfulCard>
        ))}
      </div>

      <PlayfulCard variant="pin" tone="mint" className="p-6">
        <h2 className="font-bold text-foreground">Client portal</h2>
        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
          Every audit lead receives a private portal link. Clients see their status stepper (Submitted
          → In progress → Delivered), SLA date, checklist progress, email updates you send, and the
          full audit report once assigned. Copy the portal link from any lead in Admin → Leads.
        </p>
      </PlayfulCard>

      <PlayfulCard variant="stamp" tone="neutral" className="p-6">
        <h2 className="font-bold text-foreground">Where to work in admin</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {QUICK_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={buttonVariants({ variant: "outline", size: "sm" })}
            >
              <link.icon className="size-3.5" />
              {link.label}
            </Link>
          ))}
        </div>
      </PlayfulCard>

      <div className="flex justify-center">
        <Link href="/admin/dashboard" className={buttonVariants({ variant: "outline" })}>
          Back to dashboard
          <ArrowRight className="size-4" />
        </Link>
      </div>
    </div>
  );
}
