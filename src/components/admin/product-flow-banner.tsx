"use client";

import Link from "next/link";
import { ArrowRight, Workflow } from "lucide-react";
import { PlayfulBadge } from "@/components/ui/playful-badge";
import { PlayfulCard } from "@/components/ui/playful-card";
import { PRODUCT_FLOW_STEPS } from "@/lib/product-mock-utils";

/** Pipeline overview on the admin dashboard. */
export function ProductFlowBanner() {
  return (
    <PlayfulCard variant="flag" tone="sky" className="p-5 sm:p-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Workflow className="size-4 text-primary" />
            <p className="text-sm font-bold text-foreground">Audit pipeline</p>
          </div>
          <p className="text-sm text-muted-foreground max-w-xl">
            Website intake → qualification &amp; assign → audit checklist &amp; SLA → report
            delivery to client portal → follow-up outreach.
          </p>
        </div>
        <Link
          href="/admin/how-it-works"
          className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 text-sm font-semibold hover:bg-muted/50 shrink-0"
        >
          See how audits work
          <ArrowRight className="size-4" />
        </Link>
      </div>
      <div className="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
        {PRODUCT_FLOW_STEPS.map((step, i) => (
          <div
            key={step.id}
            className="rounded-lg border border-border/80 bg-card/80 px-3 py-2.5"
          >
            <PlayfulBadge variant="chip" className="mb-1.5">
              {i + 1}
            </PlayfulBadge>
            <p className="text-sm font-semibold text-foreground">{step.title}</p>
            <p className="text-xs text-muted-foreground mt-0.5 leading-snug">{step.description}</p>
          </div>
        ))}
      </div>
    </PlayfulCard>
  );
}
