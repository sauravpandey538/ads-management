"use client";

import { useEffect, useState } from "react";
import { FileText, Sparkles } from "lucide-react";
import { useAdminToast } from "@/components/admin/admin-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import {
  buildAuditReportDraft,
  buildLeadUpdatesOnReportAssign,
  createAuditReportFromDraft,
} from "@/lib/audit-report-utils";
import type { AuditReport, OutreachLead } from "@/lib/admin-mock-data";

type AssignAuditReportSheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  lead: OutreachLead | null;
  onSave: (leadId: string, patch: Partial<OutreachLead>) => void;
};

type ReportDraft = Omit<AuditReport, "assignedAt" | "assignedBy">;

/** Admin assigns the audit report — saved to lead + synced to client portal. */
export function AssignAuditReportSheet({
  open,
  onOpenChange,
  lead,
  onSave,
}: AssignAuditReportSheetProps) {
  const { toast } = useAdminToast();
  const [draft, setDraft] = useState<ReportDraft | null>(null);

  useEffect(() => {
    if (!open || !lead) return;
    if (lead.auditReport) {
      const { assignedAt, assignedBy, ...existing } = lead.auditReport;
      void assignedAt;
      void assignedBy;
      setDraft(existing);
      return;
    }
    setDraft(buildAuditReportDraft(lead));
  }, [open, lead]);

  const patchDraft = (partial: Partial<ReportDraft>) => {
    setDraft((prev) => (prev ? { ...prev, ...partial } : prev));
  };

  const handleRegenerate = () => {
    if (!lead) return;
    setDraft(buildAuditReportDraft(lead));
    toast("Draft refreshed", "Regenerated from lead intake data");
  };

  const handleSave = () => {
    if (!lead || !draft) return;
    if (!draft.title.trim() || !draft.executiveSummary.trim()) {
      toast("Missing fields", "Title and executive summary are required.");
      return;
    }

    const report = createAuditReportFromDraft(draft, lead.assignedTo);
    const patch = buildLeadUpdatesOnReportAssign(lead, report);
    onSave(lead.id, patch);
    toast(
      "Audit report assigned",
      `${lead.company || lead.name} — visible on client portal now`,
    );
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="sm:max-w-lg overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <FileText className="size-4" />
            Assign audit report
          </SheetTitle>
          <SheetDescription>
            {lead
              ? `${lead.company || lead.name} — saved to the lead record and published on their portal.`
              : "Select a lead to assign a report."}
          </SheetDescription>
        </SheetHeader>

        {draft && (
          <div className="flex-1 space-y-4 px-4 pb-4">
            <Button type="button" variant="outline" size="sm" onClick={handleRegenerate}>
              <Sparkles className="size-3.5" />
              Regenerate from lead data
            </Button>

            <div className="space-y-2">
              <Label htmlFor="report-title">Report title</Label>
              <Input
                id="report-title"
                value={draft.title}
                onChange={(e) => patchDraft({ title: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="report-summary">Executive summary</Label>
              <Textarea
                id="report-summary"
                value={draft.executiveSummary}
                onChange={(e) => patchDraft({ executiveSummary: e.target.value })}
                rows={4}
                className="resize-none"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="report-findings">Key findings</Label>
              <Textarea
                id="report-findings"
                value={draft.findings}
                onChange={(e) => patchDraft({ findings: e.target.value })}
                rows={6}
                className="resize-none font-mono text-xs"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="report-recommendations">90-day recommendations</Label>
              <Textarea
                id="report-recommendations"
                value={draft.recommendations}
                onChange={(e) => patchDraft({ recommendations: e.target.value })}
                rows={6}
                className="resize-none font-mono text-xs"
              />
            </div>
          </div>
        )}

        <SheetFooter>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button type="button" onClick={handleSave} disabled={!draft || !lead}>
            Save report to portal
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
