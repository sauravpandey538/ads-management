"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2, ExternalLink, Sparkles } from "lucide-react";
import { PlayfulBadge } from "@/components/ui/playful-badge";
import { PlayfulCard } from "@/components/ui/playful-card";
import type { OutreachLead } from "@/lib/admin-mock-data";
import { cn } from "@/lib/utils";

type IntakeSuccessPanelProps = {
  lead: OutreachLead;
  headline: string;
  subline: string;
  className?: string;
};

/** Post-submit panel — shows mock auto-routing and links to portal + admin demo. */
export function IntakeSuccessPanel({
  lead,
  headline,
  subline,
  className,
}: IntakeSuccessPanelProps) {
  const portalUrl = `/portal/audit/${lead.portalToken}`;

  return (
    <PlayfulCard
      variant="ticket"
      tone="mint"
      className={cn("p-8 sm:p-10 max-w-2xl mx-auto space-y-6", className)}
    >
      <div className="text-center">
        <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-white border-[2.5px] border-ink shadow-[3px_3px_0_0_var(--ink)] text-3xl">
          ✓
        </div>
        <h3 className="text-2xl font-bold text-ink">{headline}</h3>
        <p className="mt-3 text-ink/70 leading-relaxed">{subline}</p>
      </div>

      <div className="rounded-xl border-2 border-ink/15 bg-white/90 p-4 space-y-3">
        <div className="flex items-center gap-2">
          <Sparkles className="size-4 text-primary" />
          <p className="text-sm font-bold text-ink">Mock auto-routing (product preview)</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <PlayfulBadge variant="ticket">Score {lead.score}</PlayfulBadge>
          <PlayfulBadge variant="flag">{lead.priority} priority</PlayfulBadge>
          <PlayfulBadge variant="stamp">{lead.fitLabel.replace("-", " ")}</PlayfulBadge>
          <PlayfulBadge variant="pin">→ {lead.assignedTo}</PlayfulBadge>
        </div>
        <p className="text-xs text-ink/60 leading-relaxed">
          This lead was saved to your admin demo (same browser). In production, rules like spend
          tier, tracking maturity, and timeline would route instantly — no manual triage.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <Link
          href={portalUrl}
          className="flex items-center justify-between gap-2 rounded-lg border-2 border-ink/20 bg-white px-4 py-3 text-sm font-semibold text-ink hover:border-primary/50 transition-colors"
        >
          <span className="flex items-center gap-2">
            <ExternalLink className="size-4 text-primary" />
            Client portal preview
          </span>
          <ArrowRight className="size-4 shrink-0" />
        </Link>
        <Link
          href="/admin/leads"
          className="flex items-center justify-between gap-2 rounded-lg border-2 border-ink/20 bg-white px-4 py-3 text-sm font-semibold text-ink hover:border-primary/50 transition-colors"
        >
          <span className="flex items-center gap-2">
            <CheckCircle2 className="size-4 text-primary" />
            View in admin
          </span>
          <ArrowRight className="size-4 shrink-0" />
        </Link>
      </div>

      {lead.source === "audit" && lead.auditSlaDue && (
        <p className="text-center text-xs text-ink/55">
          Audit SLA target: <strong>{lead.auditSlaDue}</strong> (5 business days · mock)
        </p>
      )}
    </PlayfulCard>
  );
}
