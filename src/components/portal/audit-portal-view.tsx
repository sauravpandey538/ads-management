"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Calendar, CheckCircle2, Circle, FileText, Mail } from "lucide-react";
import { AuditReportView } from "@/components/shared/audit-report-view";
import { PlayfulBadge } from "@/components/ui/playful-badge";
import { PlayfulCard } from "@/components/ui/playful-card";
import { findLeadByPortalToken } from "@/lib/leads-persistence";
import type { OutreachLead } from "@/lib/admin-mock-data";
import {
  PORTAL_STATUS_LABELS,
  auditProgress,
  portalStatusFromLead,
} from "@/lib/product-mock-utils";
import { cn } from "@/lib/utils";

const STEPS = [
  { key: "submitted", label: "Submitted" },
  { key: "in-progress", label: "In progress" },
  { key: "delivered", label: "Delivered" },
] as const;

function ChecklistCard({
  checklist,
  progress,
  className,
}: {
  checklist: OutreachLead["auditChecklist"];
  progress: number;
  className?: string;
}) {
  return (
    <PlayfulCard variant="ticket" tone="neutral" className={cn("p-5", className)}>
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-bold text-ink flex items-center gap-2 text-sm">
          <FileText className="size-4" />
          Audit progress
        </h2>
        <PlayfulBadge variant="chip">{progress}%</PlayfulBadge>
      </div>
      <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
        {checklist.map((item) => (
          <li
            key={item.id}
            className="flex items-start gap-2 rounded-lg border border-ink/10 bg-white/80 px-3 py-2 text-xs sm:text-sm"
          >
            {item.done ? (
              <CheckCircle2 className="size-4 shrink-0 text-emerald-600 mt-0.5" />
            ) : (
              <Circle className="size-4 shrink-0 text-ink/30 mt-0.5" />
            )}
            <span className={cn(item.done && "text-ink/50 line-through")}>{item.label}</span>
          </li>
        ))}
      </ul>
    </PlayfulCard>
  );
}

function EmailLogCard({
  emailLog,
  className,
}: {
  emailLog: OutreachLead["emailLog"];
  className?: string;
}) {
  return (
    <PlayfulCard variant="ticket" tone="neutral" className={cn("p-5", className)}>
      <h2 className="font-bold text-ink flex items-center gap-2 mb-3 text-sm">
        <Mail className="size-4" />
        Updates sent to you
      </h2>
      <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1 text-sm">
        {emailLog.map((e) => (
          <li key={e.id} className="rounded-lg border border-ink/10 bg-white/80 px-3 py-2">
            <p className="font-medium text-ink text-xs sm:text-sm">{e.subject}</p>
            <p className="text-[11px] text-ink/50">{new Date(e.sentAt).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </PlayfulCard>
  );
}

/** Client-facing audit tracker — reads mock lead from localStorage by portal token. */
export function AuditPortalView() {
  const params = useParams();
  const token = params.token as string;
  const [lead, setLead] = useState<OutreachLead | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const load = () => setLead(findLeadByPortalToken(token) ?? null);
    load();
    setLoaded(true);

    const onFocus = () => load();
    window.addEventListener("focus", onFocus);
    return () => window.removeEventListener("focus", onFocus);
  }, [token]);

  if (!loaded) {
    return <p className="text-sm text-muted-foreground text-center py-16">Loading…</p>;
  }

  if (!lead) {
    return (
      <PlayfulCard variant="pin" tone="sun" className="p-8 max-w-lg mx-auto text-center">
        <p className="font-bold text-ink">Portal link not found</p>
        <p className="mt-2 text-sm text-ink/65">
          This portal link is invalid or has expired. Request a new audit on{" "}
          <Link href="/free-audit" className="text-primary font-semibold hover:underline">
            our free audit page
          </Link>
          .
        </p>
      </PlayfulCard>
    );
  }

  const status = portalStatusFromLead(lead);
  const progress = auditProgress(lead.auditChecklist);
  const stepIndex = STEPS.findIndex((s) => s.key === status);
  const showSla = Boolean(lead.auditSlaDue && status !== "delivered");
  const hasChecklist = lead.auditChecklist.length > 0;
  const hasEmails = lead.emailLog.length > 0;

  return (
    <div className="mx-auto max-w-6xl space-y-5">
      <div className="text-center max-w-3xl mx-auto">
        <PlayfulBadge variant="ticket" className="mb-3">
          adMarkapture · Client portal
        </PlayfulBadge>
        <h1 className="text-2xl font-bold text-ink sm:text-3xl">
          {lead.company || lead.name} — audit status
        </h1>
        <p className="mt-2 text-ink/65">
          Hi {lead.name.split(" ")[0]}, track your free lead gen audit here — no login required.
        </p>
      </div>

      {/* Status strip — progress + SLA in one row */}
      <div
        className={cn(
          "grid gap-4",
          showSla ? "md:grid-cols-[1fr_minmax(220px,280px)]" : "max-w-3xl mx-auto w-full",
        )}
      >
        <PlayfulCard variant="flag" tone="neutral" className="p-5">
          <div className="flex items-center justify-between gap-2">
            {STEPS.map((step, i) => (
              <div key={step.key} className="flex flex-1 flex-col items-center gap-1.5">
                <div
                  className={cn(
                    "flex size-9 items-center justify-center rounded-full border-2 border-ink text-sm font-bold",
                    i <= stepIndex ? "bg-primary text-white" : "bg-white text-ink/40",
                  )}
                >
                  {i < stepIndex ? <CheckCircle2 className="size-4" /> : i + 1}
                </div>
                <span
                  className={cn(
                    "text-[11px] font-semibold text-center",
                    i <= stepIndex ? "text-ink" : "text-ink/40",
                  )}
                >
                  {step.label}
                </span>
              </div>
            ))}
          </div>
          <p className="mt-3 text-center text-sm font-medium text-ink">
            Current: {PORTAL_STATUS_LABELS[status]}
          </p>
        </PlayfulCard>

        {showSla && (
          <PlayfulCard variant="pin" tone="sky" className="p-4 flex items-center gap-3">
            <Calendar className="size-5 shrink-0 text-ink" />
            <div>
              <p className="text-sm font-bold text-ink">Estimated delivery</p>
              <p className="text-sm text-ink/70">{lead.auditSlaDue} (5 business day SLA)</p>
            </div>
          </PlayfulCard>
        )}
      </div>

      {/* Report + sidebar, or checklist/emails grid when no report yet */}
      {lead.auditReport ? (
        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(260px,300px)] items-start">
          <AuditReportView
            report={lead.auditReport}
            companyName={lead.company || lead.name}
            compact
          />
          {(hasChecklist || hasEmails) && (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              {hasChecklist && <ChecklistCard checklist={lead.auditChecklist} progress={progress} />}
              {hasEmails && <EmailLogCard emailLog={lead.emailLog} />}
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-5">
          {status === "delivered" && (
            <PlayfulCard variant="stamp" tone="mint" className="p-6 text-center max-w-xl mx-auto">
              <p className="font-bold text-ink text-lg">Your audit is ready</p>
              <p className="mt-2 text-sm text-ink/70">
                Check your inbox at {lead.email} — or contact{" "}
                <a href="mailto:support@admarkapture.com" className="text-primary font-semibold">
                  support@admarkapture.com
                </a>
              </p>
            </PlayfulCard>
          )}

          {(hasChecklist || hasEmails) && (
            <div
              className={cn(
                "grid gap-4",
                hasChecklist && hasEmails ? "md:grid-cols-2" : "max-w-xl mx-auto w-full",
              )}
            >
              {hasChecklist && (
                <ChecklistCard checklist={lead.auditChecklist} progress={progress} />
              )}
              {hasEmails && <EmailLogCard emailLog={lead.emailLog} />}
            </div>
          )}
        </div>
      )}

      <p className="text-center text-xs text-ink/45 pb-2">
        Questions? Email{" "}
        <a href="mailto:support@admarkapture.com" className="text-primary font-semibold">
          support@admarkapture.com
        </a>
      </p>
    </div>
  );
}
