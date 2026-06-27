"use client";

import { statusLabels, type FitLabel, type LeadPriority, type LeadStatus } from "@/lib/admin-mock-data";
import { categoryLabels, type TemplateCategory } from "@/lib/admin-template-data";
import {
  fitMeta,
  priorityMeta,
  statusMeta,
  templateCategoryMeta,
} from "@/lib/admin-status-meta";
import { PlayfulBadge } from "@/components/ui/playful-badge";
import { cn } from "@/lib/utils";

type HoverTipProps = {
  description: string;
  children: React.ReactNode;
  className?: string;
};

/** Accessible hover tooltip — explains badge meaning on mouse over. */
function HoverTip({ description, children, className }: HoverTipProps) {
  return (
    <span className={cn("relative inline-flex group/tip", className)}>
      {children}
      <span
        role="tooltip"
        className={cn(
          "pointer-events-none absolute bottom-[calc(100%+6px)] left-1/2 z-50 hidden w-56 -translate-x-1/2",
          "rounded-lg border border-border bg-card px-3 py-2 text-xs leading-relaxed text-foreground shadow-lg",
          "group-hover/tip:block group-focus-within/tip:block",
        )}
      >
        {description}
        <span className="absolute -bottom-1 left-1/2 size-2 -translate-x-1/2 rotate-45 border-b border-r border-border bg-card" />
      </span>
    </span>
  );
}

export function LeadStatusBadge({ status }: { status: LeadStatus }) {
  const meta = statusMeta[status];
  const Icon = meta.icon;
  return (
    <HoverTip description={meta.description}>
      <PlayfulBadge variant={meta.badgeVariant} className="gap-1.5 cursor-help">
        <Icon className="size-3 shrink-0" aria-hidden />
        {statusLabels[status]}
      </PlayfulBadge>
    </HoverTip>
  );
}

export function LeadPriorityBadge({ priority }: { priority: LeadPriority }) {
  const meta = priorityMeta[priority];
  return (
    <HoverTip description={meta.description}>
      <PlayfulBadge variant={meta.badgeVariant} className="capitalize cursor-help">
        {priority}
      </PlayfulBadge>
    </HoverTip>
  );
}

export function LeadFitBadge({ fitLabel }: { fitLabel: FitLabel }) {
  const meta = fitMeta[fitLabel];
  return (
    <HoverTip description={meta.description}>
      <PlayfulBadge variant={meta.badgeVariant} className="capitalize cursor-help">
        {fitLabel.replace("-", " ")}
      </PlayfulBadge>
    </HoverTip>
  );
}

export function LeadScoreBadge({ score }: { score: number }) {
  return (
    <HoverTip description="ICP score from 0–100 — combines spend tier, fit, timeline, and engagement.">
      <PlayfulBadge variant="ticket" className="tabular-nums cursor-help">
        Score {score}
      </PlayfulBadge>
    </HoverTip>
  );
}

export function TemplateCategoryBadge({ category }: { category: TemplateCategory }) {
  const meta = templateCategoryMeta[category];
  return (
    <PlayfulBadge variant={meta.badgeVariant}>{categoryLabels[category]}</PlayfulBadge>
  );
}
