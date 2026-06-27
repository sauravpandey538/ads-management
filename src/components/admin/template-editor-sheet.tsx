"use client";

import { useEffect, useState } from "react";
import { Trash2, X } from "lucide-react";
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
  TEMPLATE_CATEGORIES,
  categoryLabels,
  type EmailTemplate,
} from "@/lib/admin-template-data";

const selectClass =
  "h-8 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 dark:bg-input/30";

type TemplateEditorSheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  template: EmailTemplate | null;
  mode: "create" | "edit";
  onSave: (template: EmailTemplate) => void;
  onDelete?: () => void;
};

/** Create or edit an outreach email template. */
export function TemplateEditorSheet({
  open,
  onOpenChange,
  template,
  mode,
  onSave,
  onDelete,
}: TemplateEditorSheetProps) {
  const [draft, setDraft] = useState<EmailTemplate | null>(template);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (open && template) {
      setDraft({ ...template });
      setError(null);
    }
  }, [open, template]);

  if (!draft) return null;

  const patch = (partial: Partial<EmailTemplate>) => {
    setDraft((prev) => (prev ? { ...prev, ...partial } : prev));
  };

  const handleSave = () => {
    try {
      onSave(draft);
      onOpenChange(false);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not save template");
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full overflow-y-auto sm:max-w-xl">
        <SheetHeader>
          <SheetTitle>{mode === "create" ? "Add template" : "Edit template"}</SheetTitle>
          <SheetDescription>
            Use {"{{name}}"}, {"{{company}}"}, and {"{{email}}"} as placeholders.
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-4 px-4 pb-4">
          {error && (
            <p className="rounded-lg border border-destructive/50 bg-destructive/10 px-3 py-2 text-sm text-destructive">
              {error}
            </p>
          )}

          <div className="space-y-1.5">
            <Label>
              Name <span className="text-destructive">*</span>
            </Label>
            <Input
              value={draft.name}
              onChange={(e) => patch({ name: e.target.value })}
              placeholder="e.g. Thank you / Introduce company"
            />
          </div>

          <div className="space-y-1.5">
            <Label>Category</Label>
            <select
              className={selectClass}
              value={draft.category}
              onChange={(e) =>
                patch({ category: e.target.value as EmailTemplate["category"] })
              }
            >
              {TEMPLATE_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {categoryLabels[cat]}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <Label>
              Subject <span className="text-destructive">*</span>
            </Label>
            <Input
              value={draft.subject}
              onChange={(e) => patch({ subject: e.target.value })}
              placeholder="Email subject line"
            />
          </div>

          <div className="space-y-1.5">
            <Label>
              Body <span className="text-destructive">*</span>
            </Label>
            <Textarea
              value={draft.body}
              onChange={(e) => patch({ body: e.target.value })}
              rows={14}
              className="font-mono text-xs"
            />
          </div>

          <Badge variant="outline" className="text-xs">
            Placeholders: {"{{name}}"} · {"{{company}}"} · {"{{email}}"}
          </Badge>
        </div>

        <SheetFooter className="flex-row justify-between gap-2 border-t border-border">
          {mode === "edit" && onDelete ? (
            <Button type="button" variant="destructive" onClick={onDelete}>
              <Trash2 className="size-3.5" />
              Delete
            </Button>
          ) : (
            <span />
          )}
          <div className="flex gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              <X className="size-3.5" />
              Cancel
            </Button>
            <Button type="button" onClick={handleSave}>
              {mode === "create" ? "Create template" : "Save changes"}
            </Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
