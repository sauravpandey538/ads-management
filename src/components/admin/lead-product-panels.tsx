"use client";

import { CheckCircle2, Circle, Copy, ExternalLink, FileText, Pencil } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { PlayfulBadge } from "@/components/ui/playful-badge";
import { AuditReportView } from "@/components/shared/audit-report-view";
import type { AuditChecklistItem, EmailLogEntry, OutreachLead } from "@/lib/admin-mock-data";
import { auditProgress } from "@/lib/product-mock-utils";
import { cn } from "@/lib/utils";

type LeadProductPanelsProps = {
  lead: OutreachLead;
  onChecklistChange: (checklist: AuditChecklistItem[]) => void;
  onAssignReport?: () => void;
};

/** Audit SLA checklist, portal link, report, and email activity on a lead. */
export function LeadProductPanels({ lead, onChecklistChange, onAssignReport }: LeadProductPanelsProps) {
  const portalUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/portal/audit/${lead.portalToken}`
      : `/portal/audit/${lead.portalToken}`;

  const toggleCheck = (id: string) => {
    onChecklistChange(
      lead.auditChecklist.map((c) => (c.id === id ? { ...c, done: !c.done } : c)),
    );
  };

  const copyPortal = async () => {
    await navigator.clipboard.writeText(portalUrl);
  };

  return (
    <div className="space-y-6">
      {/* Client portal link */}
      <section className="space-y-2 rounded-lg border border-dashed border-primary/30 bg-primary/5 p-4">
        <Label className="text-sm font-semibold">Client portal</Label>
        <p className="text-xs text-muted-foreground">
          Share this link so clients track audit status, checklist progress, and their final report.
        </p>
        <div className="flex flex-wrap gap-2">
          <code className="flex-1 min-w-0 truncate rounded-md border border-border bg-card px-2 py-1.5 text-xs">
            {portalUrl}
          </code>
          <Button type="button" variant="outline" size="sm" onClick={copyPortal}>
            <Copy className="size-3.5" />
            Copy
          </Button>
          <a
            href={portalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonVariants({ variant: "outline", size: "sm" })}
          >
            <ExternalLink className="size-3.5" />
            Preview
          </a>
        </div>
        {lead.auditSlaDue && (
          <p className="text-xs text-muted-foreground">Audit SLA due: {lead.auditSlaDue}</p>
        )}
      </section>

      {lead.source === "audit" && (
        <section className="space-y-3 rounded-lg border border-dashed border-mint/40 bg-mint/5 p-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <Label className="text-sm font-semibold flex items-center gap-2">
              <FileText className="size-4" />
              Audit report
            </Label>
            {lead.auditReport ? (
              <PlayfulBadge variant="stamp">Published on portal</PlayfulBadge>
            ) : (
              <PlayfulBadge variant="flag">Pending delivery</PlayfulBadge>
            )}
          </div>
          {lead.auditReport ? (
            <>
              <AuditReportView
                report={lead.auditReport}
                companyName={lead.company || lead.name}
                className="p-4 sm:p-5"
              />
              {onAssignReport && (
                <Button type="button" variant="outline" size="sm" onClick={onAssignReport}>
                  <Pencil className="size-3.5" />
                  Edit report
                </Button>
              )}
            </>
          ) : (
            <>
              <p className="text-xs text-muted-foreground">
                Assign the report from the dashboard — it will appear on the client portal link above.
              </p>
              {onAssignReport && (
                <Button type="button" size="sm" onClick={onAssignReport}>
                  <FileText className="size-3.5" />
                  Assign report
                </Button>
              )}
              {!onAssignReport && !lead.auditReport && (
                <p className="text-xs text-muted-foreground">
                  Final audit reports are published by admin or super admin only.
                </p>
              )}
            </>
          )}
        </section>
      )}

      {/* Audit checklist */}
      {lead.source === "audit" && lead.auditChecklist.length > 0 && (
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-foreground">Audit checklist</h3>
            <span className="text-xs font-medium text-muted-foreground">
              {auditProgress(lead.auditChecklist)}% complete
            </span>
          </div>
          <ul className="space-y-2">
            {lead.auditChecklist.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => toggleCheck(item.id)}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-lg border border-border px-3 py-2 text-left text-sm transition-colors hover:bg-muted/40",
                    item.done && "bg-muted/20",
                  )}
                >
                  {item.done ? (
                    <CheckCircle2 className="size-4 shrink-0 text-emerald-600" />
                  ) : (
                    <Circle className="size-4 shrink-0 text-muted-foreground" />
                  )}
                  <span className={cn(item.done && "line-through text-muted-foreground")}>
                    {item.label}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Email activity log */}
      {lead.emailLog.length > 0 && (
        <section className="space-y-2">
          <h3 className="text-sm font-semibold text-foreground">Email activity</h3>
          <ul className="space-y-2">
            {lead.emailLog.map((entry: EmailLogEntry) => (
              <li
                key={entry.id}
                className="rounded-lg border border-border bg-muted/20 px-3 py-2 text-sm"
              >
                <p className="font-medium">{entry.templateName}</p>
                <p className="text-xs text-muted-foreground">{entry.subject}</p>
                <p className="text-xs text-muted-foreground/70 mt-0.5">
                  {new Date(entry.sentAt).toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
