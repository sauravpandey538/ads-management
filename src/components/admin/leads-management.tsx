"use client";

import { useState } from "react";
import { Plus, StickyNote, Users } from "lucide-react";
import {
  LeadFitBadge,
  LeadPriorityBadge,
  LeadScoreBadge,
  LeadStatusBadge,
} from "@/components/admin/lead-badges";
import { useAdminPermissions, useAdminSession, useScopedLeads } from "@/components/admin/admin-auth-provider";
import { useAdminToast } from "@/components/admin/admin-toast";
import { LeadEditorSheet } from "@/components/admin/lead-editor-sheet";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PlayfulBadge } from "@/components/ui/playful-badge";
import {
  formatNoteEntry,
  getIncompleteActions,
  getNextIncompleteAction,
} from "@/lib/admin-lead-utils";
import type { OutreachLead } from "@/lib/admin-mock-data";
import { cn } from "@/lib/utils";

/** Full CRUD lead management — add, edit all fields, and append notes. */
export function LeadsManagement() {
  const { leads, hydrated, addLead, updateLead, completeAction, reopenAction, addNote, deleteNote, createLead } =
    useScopedLeads();
  const { canCreateLeads, isEmployee } = useAdminPermissions();
  const { currentUser } = useAdminSession();
  const { toast } = useAdminToast();

  const [sheetOpen, setSheetOpen] = useState(false);
  const [sheetMode, setSheetMode] = useState<"create" | "edit">("edit");
  const [activeLead, setActiveLead] = useState<OutreachLead | null>(null);

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

  const handleSave = (lead: OutreachLead) => {
    if (sheetMode === "create") addLead(lead);
    else updateLead(lead.id, lead);
  };

  const handleAddNote = (note: string) => {
    if (!activeLead || sheetMode !== "edit") return;
    addNote(activeLead.id, note);
    setActiveLead((prev) =>
      prev ? { ...prev, notes: [...prev.notes, formatNoteEntry(note)] } : prev,
    );
  };

  const handleDeleteNote = (index: number) => {
    if (!activeLead) return;
    deleteNote(activeLead.id, index);
    setActiveLead((prev) =>
      prev ? { ...prev, notes: prev.notes.filter((_, i) => i !== index) } : prev,
    );
  };

  const handleCompleteAction = (actionId: string) => {
    if (!activeLead) return;
    const action = activeLead.actions.find((a) => a.id === actionId);
    if (!action || action.completed) return;
    completeAction(activeLead.id, actionId);
    toast("Follow-up completed", action.text);
  };

  const handleReopenAction = (actionId: string) => {
    if (!activeLead) return;
    reopenAction(activeLead.id, actionId);
    toast("Follow-up reopened", "Moved back to open actions");
  };

  const syncedActiveLead =
    activeLead && sheetMode === "edit"
      ? (leads.find((l) => l.id === activeLead.id) ?? activeLead)
      : activeLead;

  if (!hydrated) {
    return <p className="text-sm text-muted-foreground">Loading leads…</p>;
  }

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            {isEmployee ? "My assigned leads" : "Lead management"}
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            {isEmployee
              ? `Leads assigned to ${currentUser?.assigneeName ?? "you"} — update checklist, notes, and follow-ups.`
              : "Add leads, update status, and keep notes — hover badges for what each status means."}
          </p>
        </div>
        {canCreateLeads && (
          <Button type="button" onClick={openCreate}>
            <Plus className="size-4" />
            Add lead
          </Button>
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="size-4" />
            {isEmployee ? "Assigned leads" : "All leads"}
          </CardTitle>
          <CardDescription>
            <PlayfulBadge variant="chip" className="mr-2">
              {leads.length} total
            </PlayfulBadge>
            Click a row to edit
          </CardDescription>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <table className="w-full min-w-[960px] text-left text-sm">
            <thead>
              <tr className="border-b border-border text-xs uppercase tracking-wide text-muted-foreground">
                <th className="pb-2 pr-4 font-semibold">Contact</th>
                <th className="pb-2 pr-4 font-semibold">Phone</th>
                <th className="pb-2 pr-4 font-semibold">Score / Fit</th>
                <th className="pb-2 pr-4 font-semibold">Priority</th>
                <th className="pb-2 pr-4 font-semibold">Status</th>
                <th className="pb-2 pr-4 font-semibold">Follow-ups</th>
                <th className="pb-2 pr-4 font-semibold">Notes</th>
                <th className="pb-2 font-semibold">Assigned to</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => {
                const next = getNextIncompleteAction(lead);
                const openCount = getIncompleteActions(lead).length;
                return (
                <tr
                  key={lead.id}
                  className="border-b border-border/60 hover:bg-muted/30 transition-colors cursor-pointer"
                  onClick={() => openEdit(lead)}
                  onKeyDown={(e) => e.key === "Enter" && openEdit(lead)}
                  tabIndex={0}
                  role="button"
                >
                  <td className="py-3 pr-4">
                    <p className="font-semibold text-foreground">{lead.name}</p>
                    <p className="text-xs text-muted-foreground">{lead.email}</p>
                    {lead.company && (
                      <p className="text-xs text-muted-foreground">{lead.company}</p>
                    )}
                  </td>
                  <td className="py-3 pr-4 text-sm">{lead.phone}</td>
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
                  <td className="py-3 pr-4 text-sm">
                    {next ? (
                      <>
                        <p className="text-foreground line-clamp-1">{next.text}</p>
                        <p className="text-xs text-muted-foreground">
                          Due {next.dueDate}
                          {openCount > 1 ? ` · ${openCount} open` : ""}
                        </p>
                      </>
                    ) : (
                      <span className="text-muted-foreground">All complete</span>
                    )}
                  </td>
                  <td className="py-3 pr-4">
                    <PlayfulBadge variant="pin" className="gap-1">
                      <StickyNote className="size-3" />
                      {lead.notes.length}
                    </PlayfulBadge>
                  </td>
                  <td className="py-3 text-sm">{lead.assignedTo ?? "—"}</td>
                </tr>
              );
              })}
              {leads.length === 0 && (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-muted-foreground">
                    No leads yet.{" "}
                    {canCreateLeads && (
                      <button
                        type="button"
                        className={cn("text-primary underline-offset-2 hover:underline")}
                        onClick={openCreate}
                      >
                        Add one
                      </button>
                    )}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </CardContent>
      </Card>

      <LeadEditorSheet
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        lead={syncedActiveLead}
        mode={sheetMode}
        onSave={handleSave}
        onAddNote={sheetMode === "edit" ? handleAddNote : undefined}
        onDeleteNote={sheetMode === "edit" ? handleDeleteNote : undefined}
        onCompleteAction={sheetMode === "edit" ? handleCompleteAction : undefined}
        onReopenAction={sheetMode === "edit" ? handleReopenAction : undefined}
        onLeadPatch={
          sheetMode === "edit" && activeLead
            ? (patch) => updateLead(activeLead.id, patch)
            : undefined
        }
      />
    </div>
  );
}
