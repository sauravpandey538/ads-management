"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  AlertCircle,
  ArrowUpRight,
  Calendar,
  CheckCircle2,
  FileText,
  Mail,
  Plus,
  UsersRound,
} from "lucide-react";
import { AssignAuditReportSheet } from "@/components/admin/assign-audit-report-sheet";
import { useAdminPermissions, useScopedLeads } from "@/components/admin/admin-auth-provider";
import { useAdminToast } from "@/components/admin/admin-toast";
import {
  LeadFitBadge,
  LeadPriorityBadge,
  LeadScoreBadge,
  LeadStatusBadge,
} from "@/components/admin/lead-badges";
import { LeadEditorSheet } from "@/components/admin/lead-editor-sheet";
import { ProductFlowBanner } from "@/components/admin/product-flow-banner";
import { SendEmailSheet } from "@/components/admin/send-email-sheet";
import { PlayfulBadge } from "@/components/ui/playful-badge";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  computeChannelBreakdown,
  computeKpis,
  computeOutreachQueue,
  computeSpendBreakdown,
  computeTeamWorkload,
  getIncompleteActions,
  getNextIncompleteAction,
} from "@/lib/admin-lead-utils";
import { recentActivity, type OutreachLead } from "@/lib/admin-mock-data";
import { cn } from "@/lib/utils";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function LeadRow({ lead, onClick }: { lead: OutreachLead; onClick: () => void }) {
  const next = getNextIncompleteAction(lead);
  const openCount = getIncompleteActions(lead).length;

  return (
    <tr
      className="border-b border-border/60 hover:bg-muted/30 transition-colors cursor-pointer"
      onClick={onClick}
      onKeyDown={(e) => e.key === "Enter" && onClick()}
      tabIndex={0}
      role="button"
    >
      <td className="py-3 pr-4">
        <p className="font-semibold text-foreground">{lead.company || lead.name}</p>
        <p className="text-xs text-muted-foreground">{lead.name}</p>
      </td>
      <td className="py-3 pr-4 text-sm">{lead.monthlySpend || "—"}</td>
      <td className="py-3 pr-4">
        <div className="flex flex-wrap items-center gap-1.5">
          <LeadScoreBadge score={lead.score} />
          <LeadFitBadge fitLabel={lead.fitLabel} />
        </div>
      </td>
      <td className="py-3 pr-4">
        <LeadPriorityBadge priority={lead.priority} />
      </td>
      <td className="py-3 pr-4">
        <LeadStatusBadge status={lead.status} />
      </td>
      <td className="py-3 pr-4 text-sm">{lead.assignedTo ?? "—"}</td>
      <td className="py-3 text-sm">
        {next ? (
          <>
            <p className="text-foreground">{next.text}</p>
            <p className="text-xs text-muted-foreground mt-0.5">
              Due {next.dueDate}
              {openCount > 1 ? ` · ${openCount} open` : ""}
            </p>
          </>
        ) : (
          <p className="text-muted-foreground">All complete</p>
        )}
      </td>
    </tr>
  );
}

/** Outreach command center — leads-only, no audit/call split. */
export function OutreachDashboard() {
  const { leads, hydrated, addLead, updateLead, completeAction, reopenAction, logMockEmail, addNote, deleteNote, createLead } =
    useScopedLeads();
  const { canAssignAuditReport, canCreateLeads } = useAdminPermissions();
  const { toast } = useAdminToast();
  const [sheetOpen, setSheetOpen] = useState(false);
  const [sheetMode, setSheetMode] = useState<"create" | "edit">("edit");
  const [activeLead, setActiveLead] = useState<OutreachLead | null>(null);
  const [emailSheetOpen, setEmailSheetOpen] = useState(false);
  const [emailLead, setEmailLead] = useState<OutreachLead | null>(null);
  const [reportSheetOpen, setReportSheetOpen] = useState(false);
  const [reportLead, setReportLead] = useState<OutreachLead | null>(null);

  const auditDeliveryLeads = useMemo(
    () =>
      leads.filter(
        (lead) => lead.source === "audit" && !lead.auditReport?.title,
      ),
    [leads],
  );

  const dashboardKpis = useMemo(() => computeKpis(leads), [leads]);
  const outreachQueue = useMemo(() => computeOutreachQueue(leads), [leads]);
  const channelBreakdown = useMemo(() => computeChannelBreakdown(leads), [leads]);
  const spendBreakdown = useMemo(() => computeSpendBreakdown(leads), [leads]);
  const teamWorkload = useMemo(() => computeTeamWorkload(leads), [leads]);

  const openCreate = () => {
    setActiveLead(createLead("audit"));
    setSheetMode("create");
    setSheetOpen(true);
  };

  const openEdit = (lead: OutreachLead) => {
    setActiveLead(lead);
    setSheetMode("edit");
    setSheetOpen(true);
  };

  const openSendEmail = (lead: OutreachLead) => {
    setEmailLead(lead);
    setEmailSheetOpen(true);
  };

  const openAssignReport = (lead: OutreachLead) => {
    setReportLead(lead);
    setReportSheetOpen(true);
  };

  const handleAssignReport = (leadId: string, patch: Partial<OutreachLead>) => {
    updateLead(leadId, patch);
    setReportLead((prev) => (prev?.id === leadId ? { ...prev, ...patch } : prev));
    setActiveLead((prev) => (prev?.id === leadId ? { ...prev, ...patch } : prev));
  };

  const handleCompleteAction = (leadId: string, actionId: string, actionText: string) => {
    completeAction(leadId, actionId);
    toast("Follow-up completed", actionText);
  };

  const handleReopenAction = (leadId: string, actionId: string) => {
    reopenAction(leadId, actionId);
    toast("Follow-up reopened", "Moved back to open actions");
  };

  const syncedActiveLead =
    activeLead && sheetMode === "edit"
      ? (leads.find((l) => l.id === activeLead.id) ?? activeLead)
      : activeLead;

  if (!hydrated) {
    return <p className="text-sm text-muted-foreground">Loading dashboard…</p>;
  }

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Outreach dashboard</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Prioritize follow-ups, send templated emails, and track pipeline status.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link href="/admin/leads" className={buttonVariants({ variant: "outline" })}>
            Manage leads
          </Link>
          {canCreateLeads && (
            <Button type="button" onClick={openCreate}>
              <Plus className="size-4" />
              Add lead
            </Button>
          )}
        </div>
      </div>

      <ProductFlowBanner />

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {dashboardKpis.map((kpi) => (
          <Card key={kpi.id} size="sm">
            <CardHeader className="pb-0">
              <CardDescription>{kpi.label}</CardDescription>
              <CardTitle className="text-2xl tabular-nums">{kpi.value}</CardTitle>
            </CardHeader>
            <CardContent>
              <p
                className={cn(
                  "text-xs",
                  kpi.trend === "up" && "text-emerald-600",
                  kpi.trend === "neutral" && "text-muted-foreground",
                )}
              >
                {kpi.change}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="size-4 text-primary" />
              Audit report delivery
            </CardTitle>
            <CardDescription>
              Assign the audit report — it is published to the client portal immediately
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {auditDeliveryLeads.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                All audit leads have reports assigned.
              </p>
            ) : (
              auditDeliveryLeads.slice(0, 5).map((lead) => (
                <div
                  key={lead.id}
                  className="flex flex-col gap-3 rounded-xl border border-border bg-card p-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <button
                    type="button"
                    className="min-w-0 text-left"
                    onClick={() => openEdit(lead)}
                  >
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-semibold">{lead.company || lead.name}</p>
                      <LeadStatusBadge status={lead.status} />
                      <PlayfulBadge variant="chip">
                        {lead.auditChecklist.filter((c) => c.done).length}/
                        {lead.auditChecklist.length} checklist
                      </PlayfulBadge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {lead.assignedTo ?? "Unassigned"} · SLA {lead.auditSlaDue ?? "—"}
                    </p>
                  </button>
                  {canAssignAuditReport && (
                    <Button type="button" size="sm" onClick={() => openAssignReport(lead)}>
                      <FileText className="size-3.5" />
                      Assign report
                    </Button>
                  )}
                </div>
              ))
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent activity</CardTitle>
            <CardDescription>Latest lead updates</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivity.map((item) => (
              <div key={item.id} className="border-l-2 border-primary/30 pl-3">
                <p className="text-sm font-medium">{item.company}</p>
                <p className="text-xs text-muted-foreground">{item.action}</p>
                <p className="text-xs text-muted-foreground/70 mt-0.5">
                  {formatDate(item.timestamp)}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="size-4 text-primary" />
            Outreach queue
          </CardTitle>
          <CardDescription>
            Incomplete actions due today or overdue — mark complete when done
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {outreachQueue.length === 0 ? (
            <p className="text-sm text-muted-foreground">No overdue follow-ups.</p>
          ) : (
            outreachQueue.slice(0, 5).map(({ lead, action }) => (
              <div
                key={`${lead.id}-${action.id}`}
                className="flex flex-col gap-3 rounded-xl border border-border bg-card p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <button
                  type="button"
                  className="min-w-0 text-left"
                  onClick={() => openEdit(lead)}
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-semibold">{lead.company || lead.name}</p>
                    <LeadPriorityBadge priority={lead.priority} />
                    <LeadScoreBadge score={lead.score} />
                    <LeadStatusBadge status={lead.status} />
                  </div>
                  <p className="text-sm text-foreground mt-1.5">{action.text}</p>
                  <p className="text-xs text-muted-foreground">Due {action.dueDate}</p>
                </button>
                <div className="flex shrink-0 flex-wrap gap-2">
                  <Button
                    type="button"
                    size="sm"
                    variant="default"
                    onClick={() => handleCompleteAction(lead.id, action.id, action.text)}
                  >
                    <CheckCircle2 className="size-3.5" />
                    Complete
                  </Button>
                  {lead.source === "audit" && canAssignAuditReport && (
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      onClick={() => openAssignReport(lead)}
                    >
                      <FileText className="size-3.5" />
                      {lead.auditReport ? "Edit report" : "Assign report"}
                    </Button>
                  )}
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={() => openSendEmail(lead)}
                  >
                    <Mail className="size-3.5" />
                    Send email
                  </Button>
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Channel interest</CardTitle>
            <CardDescription>Ad platforms leads care about</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {channelBreakdown.map((row) => (
              <div key={row.channel}>
                <div className="flex justify-between text-sm mb-1">
                  <span>{row.channel}</span>
                  <PlayfulBadge variant="chip">{row.leads} leads</PlayfulBadge>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full rounded-full bg-primary"
                    style={{ width: `${row.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Spend tiers</CardTitle>
            <CardDescription>Monthly ad budget breakdown</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {spendBreakdown.map((row) => (
              <div
                key={row.tier}
                className="flex items-center justify-between rounded-lg border border-border px-3 py-2 text-sm"
              >
                <span>{row.tier}</span>
                <PlayfulBadge variant="ticket">{row.count}</PlayfulBadge>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UsersRound className="size-4 text-primary" />
              Internal assignees
            </CardTitle>
            <CardDescription>
              Your adMarkapture teammates who own leads — not client contacts. Counts show
              assigned prospects per person.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {teamWorkload.length === 0 ? (
              <p className="text-sm text-muted-foreground">No leads assigned to teammates yet.</p>
            ) : (
              teamWorkload.map((member) => (
                <div key={member.assignee} className="rounded-lg border border-border p-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-semibold text-sm">{member.assignee}</p>
                    <PlayfulBadge variant="chip">Internal</PlayfulBadge>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">{member.role}</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <PlayfulBadge variant="flag">{member.activeLeads} leads assigned</PlayfulBadge>
                    <PlayfulBadge variant="pin">
                      {member.dueThisWeek} open actions this week
                    </PlayfulBadge>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lead pipeline</CardTitle>
          <CardDescription>
            Click a row to edit — hover status badges for explanations
          </CardDescription>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left text-sm">
            <thead>
              <tr className="border-b border-border text-xs uppercase tracking-wide text-muted-foreground">
                <th className="pb-2 pr-4 font-semibold">Company</th>
                <th className="pb-2 pr-4 font-semibold">Spend</th>
                <th className="pb-2 pr-4 font-semibold">Score / Fit</th>
                <th className="pb-2 pr-4 font-semibold">Priority</th>
                <th className="pb-2 pr-4 font-semibold">Status</th>
                <th className="pb-2 pr-4 font-semibold">Assigned to</th>
                <th className="pb-2 font-semibold">Follow-ups</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <LeadRow key={lead.id} lead={lead} onClick={() => openEdit(lead)} />
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      <p className="text-xs text-muted-foreground flex items-center gap-1 pb-4">
        <Calendar className="size-3.5" />
        Outreach admin · leads sync from website intake forms
        <ArrowUpRight className="size-3.5" />
      </p>

      <LeadEditorSheet
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        lead={syncedActiveLead}
        mode={sheetMode}
        onSave={(lead) => {
          if (sheetMode === "create") addLead(lead);
          else updateLead(lead.id, lead);
        }}
        onAddNote={
          sheetMode === "edit" && activeLead
            ? (note) => {
                addNote(activeLead.id, note);
                setActiveLead((prev) =>
                  prev ? { ...prev, notes: [...prev.notes, note] } : prev,
                );
              }
            : undefined
        }
        onDeleteNote={
          sheetMode === "edit" && activeLead
            ? (index) => {
                deleteNote(activeLead.id, index);
                setActiveLead((prev) =>
                  prev ? { ...prev, notes: prev.notes.filter((_, i) => i !== index) } : prev,
                );
              }
            : undefined
        }
        onCompleteAction={
          sheetMode === "edit" && activeLead
            ? (actionId) => {
                const lead = leads.find((l) => l.id === activeLead.id) ?? activeLead;
                const action = lead.actions.find((a) => a.id === actionId);
                if (action && !action.completed) {
                  handleCompleteAction(activeLead.id, actionId, action.text);
                }
              }
            : undefined
        }
        onReopenAction={
          sheetMode === "edit" && activeLead
            ? (actionId) => handleReopenAction(activeLead.id, actionId)
            : undefined
        }
        onLeadPatch={
          sheetMode === "edit" && activeLead
            ? (patch) => updateLead(activeLead.id, patch)
            : undefined
        }
        onAssignReport={
          sheetMode === "edit" && activeLead && canAssignAuditReport
            ? () => {
                const lead = syncedActiveLead ?? activeLead;
                setReportLead(lead);
                setReportSheetOpen(true);
              }
            : undefined
        }
      />

      <SendEmailSheet
        open={emailSheetOpen}
        onOpenChange={setEmailSheetOpen}
        lead={emailLead}
        onMockSend={
          emailLead
            ? (payload) => logMockEmail(emailLead.id, payload)
            : undefined
        }
      />

      <AssignAuditReportSheet
        open={reportSheetOpen}
        onOpenChange={setReportSheetOpen}
        lead={reportLead}
        onSave={handleAssignReport}
      />
    </div>
  );
}
