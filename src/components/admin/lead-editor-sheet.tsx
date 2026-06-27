"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
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
  FIT_LABELS,
  LEAD_PRIORITIES,
  LEAD_SOURCES,
  LEAD_STATUSES,
  sourceLabels,
  statusLabels,
  type OutreachLead,
} from "@/lib/admin-mock-data";
import {
  auditAdManagers,
  auditChannelOptions,
  auditCrmOptions,
  auditLeadGoals,
  auditSpendOptions,
  auditTrackingOptions,
  strategyCallTimelines,
  strategyCallTopics,
} from "@/lib/site-config";
import { LeadActionsEditor } from "@/components/admin/lead-actions-editor";
import { LeadProductPanels } from "@/components/admin/lead-product-panels";
import { useAdminPermissions, useAdminSession } from "@/components/admin/admin-auth-provider";
import { formatNoteEntry } from "@/lib/admin-lead-utils";
import { getAssigneeOptions } from "@/lib/admin-auth-persistence";
import { cn } from "@/lib/utils";

const selectClass =
  "h-8 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 dark:bg-input/30";

type LeadEditorSheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  lead: OutreachLead | null;
  mode: "create" | "edit";
  onSave: (lead: OutreachLead) => void;
  onAddNote?: (note: string) => void;
  onDeleteNote?: (index: number) => void;
  onCompleteAction?: (actionId: string) => void;
  onReopenAction?: (actionId: string) => void;
  /** Persist product demo fields immediately (checklist, etc.) */
  onLeadPatch?: (patch: Partial<OutreachLead>) => void;
  /** Open audit report assignment sheet (dashboard only) */
  onAssignReport?: () => void;
};

function FieldGroup({
  label,
  required,
  children,
  className,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("space-y-1.5", className)}>
      <Label>
        {label}
        {required && <span className="text-destructive"> *</span>}
      </Label>
      {children}
    </div>
  );
}

/** Full lead create/edit form with notes for audits and strategy calls. */
export function LeadEditorSheet({
  open,
  onOpenChange,
  lead,
  mode,
  onSave,
  onAddNote,
  onDeleteNote,
  onCompleteAction,
  onReopenAction,
  onLeadPatch,
  onAssignReport,
}: LeadEditorSheetProps) {
  const { canReassignLeadOwner } = useAdminPermissions();
  const { users } = useAdminSession();
  const assigneeOptions = getAssigneeOptions(users);
  const [draft, setDraft] = useState<OutreachLead | null>(lead);
  const [error, setError] = useState<string | null>(null);
  const [newNote, setNewNote] = useState("");

  useEffect(() => {
    if (open && lead) {
      setDraft({ ...lead });
      setError(null);
      setNewNote("");
    }
  }, [open, lead?.id, lead?.updatedAt]);

  if (!draft) return null;

  const patch = (partial: Partial<OutreachLead>) => {
    setDraft((prev) => (prev ? { ...prev, ...partial } : prev));
  };

  const toggleChannel = (label: string) => {
    const channels = draft.channels.includes(label)
      ? draft.channels.filter((c) => c !== label)
      : [...draft.channels, label];
    patch({ channels });
  };

  const handleSave = () => {
    try {
      onSave(draft);
      onOpenChange(false);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not save lead");
    }
  };

  const handleAddNote = () => {
    if (!newNote.trim()) return;
    const entry = formatNoteEntry(newNote);
    if (mode === "edit" && onAddNote) {
      onAddNote(newNote);
    }
    patch({ notes: [...draft.notes, entry] });
    setNewNote("");
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full overflow-y-auto sm:max-w-2xl">
        <SheetHeader>
          <SheetTitle>{mode === "create" ? "Add lead" : "Edit lead"}</SheetTitle>
          <SheetDescription>
            Name, email, and phone are required. Notes support multiple entries per lead.
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-6 px-4 pb-4">
          {error && (
            <p className="rounded-lg border border-destructive/50 bg-destructive/10 px-3 py-2 text-sm text-destructive">
              {error}
            </p>
          )}

          {/* Classification */}
          <section className="space-y-3">
            <h3 className="text-sm font-semibold text-foreground">Classification</h3>
            <div className="grid gap-3 sm:grid-cols-2">
              <FieldGroup label="Source" required>
                <select
                  className={selectClass}
                  value={draft.source}
                  onChange={(e) => patch({ source: e.target.value as OutreachLead["source"] })}
                >
                  {LEAD_SOURCES.map((s) => (
                    <option key={s} value={s}>
                      {sourceLabels[s]}
                    </option>
                  ))}
                </select>
              </FieldGroup>
              <FieldGroup label="Status" required>
                <select
                  className={selectClass}
                  value={draft.status}
                  onChange={(e) => patch({ status: e.target.value as OutreachLead["status"] })}
                >
                  {LEAD_STATUSES.map((s) => (
                    <option key={s} value={s}>
                      {statusLabels[s]}
                    </option>
                  ))}
                </select>
              </FieldGroup>
              <FieldGroup label="Priority" required>
                <select
                  className={selectClass}
                  value={draft.priority}
                  onChange={(e) => patch({ priority: e.target.value as OutreachLead["priority"] })}
                >
                  {LEAD_PRIORITIES.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </FieldGroup>
              <FieldGroup label="Fit label" required>
                <select
                  className={selectClass}
                  value={draft.fitLabel}
                  onChange={(e) => patch({ fitLabel: e.target.value as OutreachLead["fitLabel"] })}
                >
                  {FIT_LABELS.map((f) => (
                    <option key={f} value={f}>
                      {f.replace("-", " ")}
                    </option>
                  ))}
                </select>
              </FieldGroup>
              <FieldGroup label="Score (0–100)" required>
                <Input
                  type="number"
                  min={0}
                  max={100}
                  value={draft.score}
                  onChange={(e) => patch({ score: Number(e.target.value) })}
                />
              </FieldGroup>
              <FieldGroup label="Assigned to">
                <select
                  className={selectClass}
                  value={draft.assignedTo ?? ""}
                  onChange={(e) => patch({ assignedTo: e.target.value || undefined })}
                  disabled={!canReassignLeadOwner}
                >
                  <option value="">Unassigned</option>
                  {assigneeOptions.map((name) => (
                    <option key={name} value={name}>
                      {name}
                    </option>
                  ))}
                </select>
              </FieldGroup>
            </div>
          </section>

          {/* Contact — required name, email, phone */}
          <section className="space-y-3">
            <h3 className="text-sm font-semibold text-foreground">Contact</h3>
            <div className="grid gap-3 sm:grid-cols-2">
              <FieldGroup label="Name" required className="sm:col-span-2">
                <Input
                  value={draft.name}
                  onChange={(e) => patch({ name: e.target.value })}
                  placeholder="Full name"
                  required
                />
              </FieldGroup>
              <FieldGroup label="Email" required>
                <Input
                  type="email"
                  value={draft.email}
                  onChange={(e) => patch({ email: e.target.value })}
                  placeholder="work@company.com"
                  required
                />
              </FieldGroup>
              <FieldGroup label="Secondary email">
                <Input
                  type="email"
                  value={draft.secondaryEmail ?? ""}
                  onChange={(e) => patch({ secondaryEmail: e.target.value })}
                  placeholder="Optional"
                />
              </FieldGroup>
              <FieldGroup label="Phone" required>
                <Input
                  type="tel"
                  value={draft.phone}
                  onChange={(e) => patch({ phone: e.target.value })}
                  placeholder="+1 (555) 000-0000"
                  required
                />
              </FieldGroup>
              <FieldGroup label="Secondary phone">
                <Input
                  type="tel"
                  value={draft.secondaryPhone ?? ""}
                  onChange={(e) => patch({ secondaryPhone: e.target.value })}
                  placeholder="Optional"
                />
              </FieldGroup>
              <FieldGroup label="Company">
                <Input
                  value={draft.company}
                  onChange={(e) => patch({ company: e.target.value })}
                />
              </FieldGroup>
              <FieldGroup label="Website">
                <Input
                  value={draft.website}
                  onChange={(e) => patch({ website: e.target.value })}
                  placeholder="https://"
                />
              </FieldGroup>
            </div>
          </section>

          {/* Business details */}
          <section className="space-y-3">
            <h3 className="text-sm font-semibold text-foreground">Business details</h3>
            <div className="grid gap-3 sm:grid-cols-2">
              <FieldGroup label="Monthly spend">
                <select
                  className={selectClass}
                  value={draft.monthlySpend}
                  onChange={(e) => patch({ monthlySpend: e.target.value })}
                >
                  <option value="">Select…</option>
                  {auditSpendOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </FieldGroup>
              <FieldGroup label="Lead goal">
                <select
                  className={selectClass}
                  value={draft.leadGoal}
                  onChange={(e) => patch({ leadGoal: e.target.value })}
                >
                  <option value="">Select…</option>
                  {auditLeadGoals.map((g) => (
                    <option key={g.id} value={g.label}>
                      {g.label}
                    </option>
                  ))}
                </select>
              </FieldGroup>
              <FieldGroup label="Ad manager">
                <select
                  className={selectClass}
                  value={draft.adManager}
                  onChange={(e) => patch({ adManager: e.target.value })}
                >
                  <option value="">Select…</option>
                  {auditAdManagers.map((m) => (
                    <option key={m.id} value={m.label}>
                      {m.label}
                    </option>
                  ))}
                </select>
              </FieldGroup>
            </div>

            <FieldGroup label="Channels">
              <div className="flex flex-wrap gap-2">
                {auditChannelOptions.map((ch) => (
                  <button
                    key={ch.id}
                    type="button"
                    onClick={() => toggleChannel(ch.label)}
                    className={cn(
                      "rounded-full border px-3 py-1 text-xs font-medium transition-colors",
                      draft.channels.includes(ch.label)
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border text-muted-foreground hover:border-primary/50",
                    )}
                  >
                    {ch.label}
                  </button>
                ))}
              </div>
            </FieldGroup>
          </section>

          {/* Audit-specific */}
          {draft.source === "audit" && (
            <section className="space-y-3">
              <h3 className="text-sm font-semibold text-foreground">Free audit intake</h3>
              <div className="grid gap-3 sm:grid-cols-2">
                <FieldGroup label="CRM">
                  <select
                    className={selectClass}
                    value={draft.crm ?? ""}
                    onChange={(e) => patch({ crm: e.target.value || undefined })}
                  >
                    <option value="">Select…</option>
                    {auditCrmOptions.map((c) => (
                      <option key={c.id} value={c.label}>
                        {c.label}
                      </option>
                    ))}
                  </select>
                </FieldGroup>
                <FieldGroup label="Tracking maturity">
                  <select
                    className={selectClass}
                    value={draft.tracking ?? ""}
                    onChange={(e) => patch({ tracking: e.target.value || undefined })}
                  >
                    <option value="">Select…</option>
                    {auditTrackingOptions.map((t) => (
                      <option key={t.id} value={t.label}>
                        {t.label}
                      </option>
                    ))}
                  </select>
                </FieldGroup>
                <FieldGroup label="Challenge" className="sm:col-span-2">
                  <Textarea
                    value={draft.challenge ?? ""}
                    onChange={(e) => patch({ challenge: e.target.value })}
                    rows={3}
                  />
                </FieldGroup>
              </div>
            </section>
          )}

          {/* Strategy call-specific */}
          {draft.source === "strategy-call" && (
            <section className="space-y-3">
              <h3 className="text-sm font-semibold text-foreground">Strategy call intake</h3>
              <div className="grid gap-3 sm:grid-cols-2">
                <FieldGroup label="Call topic">
                  <select
                    className={selectClass}
                    value={draft.callTopic ?? ""}
                    onChange={(e) => patch({ callTopic: e.target.value || undefined })}
                  >
                    <option value="">Select…</option>
                    {strategyCallTopics.map((t) => (
                      <option key={t.id} value={t.label}>
                        {t.label}
                      </option>
                    ))}
                  </select>
                </FieldGroup>
                <FieldGroup label="Timeline">
                  <select
                    className={selectClass}
                    value={draft.timeline ?? ""}
                    onChange={(e) => patch({ timeline: e.target.value || undefined })}
                  >
                    <option value="">Select…</option>
                    {strategyCallTimelines.map((t) => (
                      <option key={t.id} value={t.label}>
                        {t.label}
                      </option>
                    ))}
                  </select>
                </FieldGroup>
                <FieldGroup label="Preferred slot" className="sm:col-span-2">
                  <Input
                    value={draft.preferredSlot ?? ""}
                    onChange={(e) => patch({ preferredSlot: e.target.value })}
                  />
                </FieldGroup>
              </div>
            </section>
          )}

          <LeadActionsEditor
            actions={draft.actions}
            onChange={(actions) => patch({ actions })}
            onComplete={mode === "edit" ? onCompleteAction : undefined}
            onReopen={mode === "edit" ? onReopenAction : undefined}
            mode={mode}
          />

          {mode === "edit" && (
            <LeadProductPanels
              lead={draft}
              onChecklistChange={(auditChecklist) => {
                const allDone = auditChecklist.every((c) => c.done);
                const anyDone = auditChecklist.some((c) => c.done);
                const status = allDone
                  ? ("audit-delivered" as const)
                  : anyDone
                    ? ("audit-in-progress" as const)
                    : draft.status === "audit-delivered" ||
                        draft.status === "audit-in-progress"
                      ? ("new" as const)
                      : draft.status;
                patch({ auditChecklist, status });
                onLeadPatch?.({ auditChecklist, status });
              }}
              onAssignReport={onAssignReport}
            />
          )}

          {/* Notes — string[] with add/remove */}
          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-foreground">Notes</h3>
              <Badge variant="secondary">{draft.notes.length} note(s)</Badge>
            </div>
            {draft.notes.length > 0 ? (
              <ul className="space-y-2">
                {draft.notes.map((note, index) => (
                  <li
                    key={`${index}-${note.slice(0, 20)}`}
                    className="flex items-start gap-2 rounded-lg border border-border bg-muted/30 p-3 text-sm"
                  >
                    <p className="flex-1 whitespace-pre-wrap">{note}</p>
                    {onDeleteNote || mode === "create" ? (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon-sm"
                        onClick={() => {
                          if (mode === "edit" && onDeleteNote) {
                            onDeleteNote(index);
                          } else {
                            patch({ notes: draft.notes.filter((_, i) => i !== index) });
                          }
                        }}
                        aria-label="Delete note"
                      >
                        <Trash2 className="size-3.5 text-muted-foreground" />
                      </Button>
                    ) : null}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground">No notes yet.</p>
            )}
            <div className="flex gap-2">
              <Textarea
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder="Add a note…"
                rows={2}
                className="flex-1"
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="shrink-0 self-end"
                onClick={handleAddNote}
                disabled={!newNote.trim()}
              >
                <Plus className="size-3.5" />
                Add
              </Button>
            </div>
          </section>
        </div>

        <SheetFooter className="flex-row justify-end gap-2 border-t border-border">
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            <X className="size-3.5" />
            Cancel
          </Button>
          <Button type="button" onClick={handleSave}>
            {mode === "create" ? "Create lead" : "Save changes"}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
