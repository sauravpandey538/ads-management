"use client";

import { useState } from "react";
import { CheckCircle2, Circle, Plus, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createLeadAction, type LeadAction } from "@/lib/admin-mock-data";
import { cn } from "@/lib/utils";

type LeadActionsEditorProps = {
  actions: LeadAction[];
  onChange: (actions: LeadAction[]) => void;
  onComplete?: (actionId: string) => void;
  onReopen?: (actionId: string) => void;
  mode: "create" | "edit";
};

/** Multiple follow-up tasks with due dates and completion toggles. */
export function LeadActionsEditor({
  actions,
  onChange,
  onComplete,
  onReopen,
  mode,
}: LeadActionsEditorProps) {
  const [newText, setNewText] = useState("");
  const [newDue, setNewDue] = useState(new Date().toISOString().slice(0, 10));

  const incomplete = actions.filter((a) => !a.completed);
  const completed = actions.filter((a) => a.completed);

  const patchAction = (id: string, patch: Partial<LeadAction>) => {
    onChange(actions.map((a) => (a.id === id ? { ...a, ...patch } : a)));
  };

  const addAction = () => {
    if (!newText.trim()) return;
    onChange([...actions, createLeadAction(newText.trim(), newDue)]);
    setNewText("");
    setNewDue(new Date().toISOString().slice(0, 10));
  };

  const removeAction = (id: string) => {
    onChange(actions.filter((a) => a.id !== id));
  };

  const toggleComplete = (action: LeadAction) => {
    if (action.completed) {
      if (mode === "edit" && onReopen) {
        onReopen(action.id);
      } else {
        patchAction(action.id, { completed: false, completedAt: undefined });
      }
      return;
    }
    if (mode === "edit" && onComplete) {
      onComplete(action.id);
    } else {
      patchAction(action.id, {
        completed: true,
        completedAt: new Date().toISOString(),
      });
    }
  };

  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-foreground">Follow-up actions</h3>
        <Badge variant="secondary">
          {incomplete.length} open · {completed.length} done
        </Badge>
      </div>
      <p className="text-xs text-muted-foreground">
        Add multiple tasks per lead. Mark complete when done — logged to notes automatically.
      </p>

      {incomplete.length > 0 && (
        <ul className="space-y-2">
          {incomplete.map((action) => (
            <li
              key={action.id}
              className="rounded-lg border border-border bg-muted/20 p-3 space-y-2"
            >
              <div className="flex items-start gap-2">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  className="mt-0.5 shrink-0"
                  onClick={() => toggleComplete(action)}
                  aria-label="Mark complete"
                  title="Mark complete"
                >
                  <Circle className="size-4 text-muted-foreground" />
                </Button>
                <Input
                  value={action.text}
                  onChange={(e) => patchAction(action.id, { text: e.target.value })}
                  className="flex-1"
                  placeholder="What needs to happen next?"
                />
                {actions.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-sm"
                    onClick={() => removeAction(action.id)}
                    aria-label="Remove action"
                  >
                    <Trash2 className="size-3.5 text-muted-foreground" />
                  </Button>
                )}
              </div>
              <div className="pl-9">
                <Label className="text-xs text-muted-foreground">Due date</Label>
                <Input
                  type="date"
                  value={action.dueDate}
                  onChange={(e) => patchAction(action.id, { dueDate: e.target.value })}
                  className="mt-1 max-w-[160px]"
                />
              </div>
            </li>
          ))}
        </ul>
      )}

      {completed.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase text-muted-foreground">Completed</p>
          <ul className="space-y-1.5">
            {completed.map((action) => (
              <li
                key={action.id}
                className="flex items-center gap-2 rounded-lg border border-border/60 bg-muted/10 px-3 py-2 text-sm"
              >
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  onClick={() => toggleComplete(action)}
                  aria-label="Mark incomplete"
                  title="Reopen"
                >
                  <CheckCircle2 className="size-4 text-emerald-600" />
                </Button>
                <span className={cn("flex-1 line-through text-muted-foreground")}>
                  {action.text}
                </span>
                <span className="text-xs text-muted-foreground shrink-0">
                  Due {action.dueDate}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="rounded-lg border border-dashed border-border p-3 space-y-2">
        <Label className="text-xs">Add follow-up</Label>
        <Input
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
          placeholder="e.g. Send proposal follow-up email"
        />
        <div className="flex flex-wrap items-end gap-2">
          <div>
            <Label className="text-xs text-muted-foreground">Due</Label>
            <Input
              type="date"
              value={newDue}
              onChange={(e) => setNewDue(e.target.value)}
              className="mt-1 w-[160px]"
            />
          </div>
          <Button type="button" variant="outline" size="sm" onClick={addAction} disabled={!newText.trim()}>
            <Plus className="size-3.5" />
            Add action
          </Button>
        </div>
      </div>
    </section>
  );
}
