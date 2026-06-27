import Link from "next/link";
import { FileText } from "lucide-react";
import { PlayfulBadge } from "@/components/ui/playful-badge";
import { PlayfulCard } from "@/components/ui/playful-card";
import type { AuditReport } from "@/lib/admin-mock-data";
import { cn } from "@/lib/utils";

type AuditReportViewProps = {
  report: AuditReport;
  companyName: string;
  className?: string;
  /** Compact 2-column body — used on client portal to reduce scroll height. */
  compact?: boolean;
};

/** Renders the assigned audit report — shared by admin preview and client portal. */
export function AuditReportView({
  report,
  companyName,
  className,
  compact = false,
}: AuditReportViewProps) {
  return (
    <PlayfulCard
      variant="stamp"
      tone="mint"
      className={cn(compact ? "p-5 sm:p-6 space-y-4" : "p-6 sm:p-8 space-y-6", className)}
    >
      <div className="space-y-2">
        <PlayfulBadge variant="ticket">Audit report</PlayfulBadge>
        <h2 className={cn("font-bold text-ink", compact ? "text-lg sm:text-xl" : "text-xl sm:text-2xl")}>
          {report.title}
        </h2>
        <p className="text-xs text-ink/55">
          Delivered{" "}
          {new Date(report.assignedAt).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
          {report.assignedBy ? ` · ${report.assignedBy}` : ""}
        </p>
      </div>

      <section className="space-y-2">
        <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-ink/70">
          <FileText className="size-4" />
          Executive summary
        </h3>
        <p className="text-sm leading-relaxed text-ink/85">{report.executiveSummary}</p>
      </section>

      <div className={cn(compact && "grid gap-4 md:grid-cols-2", !compact && "space-y-6")}>
        <section className="space-y-2">
          <h3 className="text-sm font-bold uppercase tracking-wide text-ink/70">Key findings</h3>
          <div className="rounded-xl border border-ink/15 bg-white/90 p-4 text-sm leading-relaxed text-ink/85 whitespace-pre-line">
            {report.findings}
          </div>
        </section>

        <section className="space-y-2">
          <h3 className="text-sm font-bold uppercase tracking-wide text-ink/70">
            90-day recommendations
          </h3>
          <div className="rounded-xl border border-ink/15 bg-white/90 p-4 text-sm leading-relaxed text-ink/85 whitespace-pre-line">
            {report.recommendations}
          </div>
        </section>
      </div>

      <div className="rounded-xl border-2 border-dashed border-primary/30 bg-primary/5 p-4 text-center">
        <p className="text-sm font-semibold text-ink">Want help implementing this roadmap?</p>
        <p className="mt-1 text-xs text-ink/65">
          Book a strategy call to walk through priorities with {companyName}&apos;s team.
        </p>
        <Link
          href="/contact"
          className="mt-3 inline-flex text-sm font-bold text-primary hover:underline"
        >
          Book a strategy call →
        </Link>
      </div>
    </PlayfulCard>
  );
}
