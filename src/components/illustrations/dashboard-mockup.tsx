"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import type { ServiceData } from "@/lib/services-data";

type DashboardMockupProps = {
  service: ServiceData;
  className?: string;
};

type SidebarView = "dashboard" | "campaigns" | "audiences" | "reports";

const sidebarItems: { id: SidebarView; label: string }[] = [
  { id: "dashboard", label: "Dashboard" },
  { id: "campaigns", label: "Campaigns" },
  { id: "audiences", label: "Audiences" },
  { id: "reports", label: "Reports" },
];

/** Playground-style product mockup with interactive sidebar views. */
export function DashboardMockup({ service, className }: DashboardMockupProps) {
  const [view, setView] = useState<SidebarView>("dashboard");
  const bars = [40, 65, 45, 80, 55, 90, 70, 85];

  return (
    <div className={cn("card-2d overflow-hidden bg-white text-left", className)}>
      <div className="flex border-b-2 border-ink/10 min-h-[280px] sm:min-h-[300px]">
        <nav className="w-32 sm:w-36 shrink-0 border-r-2 border-ink/10 bg-muted/40 p-3 hidden sm:block">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setView(item.id)}
              className={cn(
                "w-full rounded-lg px-2 py-1.5 text-[11px] font-medium mb-1 text-left transition-colors",
                view === item.id
                  ? "bg-play-blue/15 text-play-blue-dark border border-play-blue/30"
                  : "text-muted-foreground hover:bg-white/80 hover:text-ink"
              )}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="flex-1 p-4 sm:p-5">
          {/* Mobile view switcher — no scrollbar */}
          <div className="flex flex-wrap gap-1.5 mb-4 sm:hidden">
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setView(item.id)}
                className={cn(
                  "rounded-full px-3 py-1 text-[10px] font-semibold border-2 border-ink/20",
                  view === item.id
                    ? "bg-play-blue text-white border-ink"
                    : "bg-white text-ink/70"
                )}
              >
                {item.label}
              </button>
            ))}
          </div>

          {view === "dashboard" && (
            <>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-ink text-sm sm:text-base">{service.dashboard.title}</h3>
                <span className="text-[10px] font-semibold bg-mint/30 text-ink px-2 py-0.5 rounded-full border border-ink/20">
                  Live
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-5">
                {service.dashboard.kpis.map((kpi) => (
                  <div key={kpi.label} className="card-2d-sm p-2 sm:p-3">
                    <p className="text-[9px] sm:text-[10px] text-muted-foreground truncate">
                      {kpi.label}
                    </p>
                    <p className="text-base sm:text-lg font-bold text-ink">{kpi.value}</p>
                    <p className="text-[9px] sm:text-[10px] text-mint font-semibold">{kpi.change}</p>
                  </div>
                ))}
              </div>
              <p className="text-[10px] font-medium text-muted-foreground mb-2">
                {service.dashboard.chartLabel}
              </p>
              <div className="flex items-end gap-1 h-20 sm:h-24 border-b-2 border-ink/10 pb-1">
                {bars.map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-t-md bg-play-blue/70 border border-ink/10"
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
            </>
          )}

          {view === "campaigns" && (
            <>
              <h3 className="font-bold text-ink text-sm sm:text-base mb-4">Active campaigns</h3>
              <div className="space-y-2">
                {[
                  { name: "Demo — Prospecting", spend: "$4.2K", status: "Scaling", cpa: "$128" },
                  { name: "Retarget — Trial drop-offs", spend: "$1.8K", status: "Optimizing", cpa: "$94" },
                  { name: "Competitor conquest", spend: "$2.1K", status: "Testing", cpa: "$156" },
                ].map((c) => (
                  <div
                    key={c.name}
                    className="flex items-center justify-between gap-2 rounded-lg border-2 border-ink/15 bg-muted/30 px-3 py-2"
                  >
                    <div className="min-w-0">
                      <p className="text-[11px] font-semibold text-ink truncate">{c.name}</p>
                      <p className="text-[10px] text-muted-foreground">{c.spend}/mo · CPA {c.cpa}</p>
                    </div>
                    <span className="shrink-0 text-[9px] font-bold uppercase bg-sun/40 text-ink px-2 py-0.5 rounded-full border border-ink/20">
                      {c.status}
                    </span>
                  </div>
                ))}
              </div>
            </>
          )}

          {view === "audiences" && (
            <>
              <h3 className="font-bold text-ink text-sm sm:text-base mb-4">Audience segments</h3>
              <div className="grid gap-2 sm:grid-cols-2">
                {[
                  { name: "Closed-won lookalike", size: "420K", match: "92%" },
                  { name: "Pricing page 7d", size: "18K", match: "Hot" },
                  { name: "ICP — VP Marketing", size: "240K", match: "86%" },
                  { name: "Trial abandoned 14d", size: "6.2K", match: "Warm" },
                ].map((a) => (
                  <div key={a.name} className="card-2d-sm p-3">
                    <p className="text-[11px] font-semibold text-ink">{a.name}</p>
                    <div className="mt-1 flex justify-between text-[10px] text-muted-foreground">
                      <span>{a.size} reach</span>
                      <span className="font-semibold text-play-blue-dark">{a.match}</span>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {view === "reports" && (
            <>
              <h3 className="font-bold text-ink text-sm sm:text-base mb-4">Pipeline report</h3>
              <div className="rounded-lg border-2 border-ink/15 overflow-hidden">
                <div className="grid grid-cols-3 bg-muted/50 text-[9px] font-bold uppercase text-ink/60 px-3 py-2 border-b border-ink/10">
                  <span>Metric</span>
                  <span className="text-center">This week</span>
                  <span className="text-right">vs last</span>
                </div>
                {[
                  { metric: "Qualified demos", value: "12", delta: "+33%" },
                  { metric: "Cost / demo", value: "$142", delta: "-18%" },
                  { metric: "SQLs", value: "8", delta: "+14%" },
                  { metric: "Pipeline added", value: "$47K", delta: "+28%" },
                ].map((row) => (
                  <div
                    key={row.metric}
                    className="grid grid-cols-3 px-3 py-2 text-[10px] border-b border-ink/5 last:border-0"
                  >
                    <span className="text-ink/80">{row.metric}</span>
                    <span className="text-center font-semibold text-ink">{row.value}</span>
                    <span
                      className={cn(
                        "text-right font-semibold",
                        row.delta.startsWith("+") ? "text-mint" : "text-primary"
                      )}
                    >
                      {row.delta}
                    </span>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
