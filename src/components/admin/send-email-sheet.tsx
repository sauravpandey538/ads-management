"use client";

import { useEffect, useMemo, useState } from "react";
import { Mail, Send } from "lucide-react";
import { useAdminToast } from "@/components/admin/admin-toast";
import { useTemplates } from "@/components/admin/templates-provider";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { applyTemplatePlaceholders, type EmailTemplate } from "@/lib/admin-template-data";
import type { OutreachLead } from "@/lib/admin-mock-data";

const selectClass =
  "h-8 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 dark:bg-input/30";

type SendEmailSheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  lead: OutreachLead | null;
  onMockSend?: (payload: { templateName: string; subject: string }) => void;
};

/** Pick a template and mock-send to the lead (toast only for now). */
export function SendEmailSheet({ open, onOpenChange, lead, onMockSend }: SendEmailSheetProps) {
  const { templates, hydrated } = useTemplates();
  const { toast } = useAdminToast();
  const [selectedId, setSelectedId] = useState<string>("");

  useEffect(() => {
    if (open && templates.length > 0) {
      setSelectedId(templates[0].id);
    }
  }, [open, lead?.id, templates]);

  const selected = useMemo(
    () => templates.find((t) => t.id === selectedId) ?? null,
    [templates, selectedId],
  );

  const vars = {
    name: lead?.name ?? "",
    company: lead?.company || lead?.name || "",
    email: lead?.email ?? "",
  };

  const preview = selected
    ? {
        subject: applyTemplatePlaceholders(selected.subject, vars),
        body: applyTemplatePlaceholders(selected.body, vars),
      }
    : null;

  const handleSend = () => {
    if (!lead || !selected || !preview) return;
    onMockSend?.({ templateName: selected.name, subject: preview.subject });
    toast(
      "Email sent",
      `Logged to ${lead.email} · visible on client portal`,
    );
    onOpenChange(false);
  };

  if (!lead) return null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full overflow-y-auto sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <Mail className="size-4" />
            Send email
          </SheetTitle>
          <SheetDescription>
            To {lead.name} ({lead.email})
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-4 px-4 pb-4">
          {!hydrated ? (
            <p className="text-sm text-muted-foreground">Loading templates…</p>
          ) : templates.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No templates yet. Add templates under Admin → Templates.
            </p>
          ) : (
            <>
              <div className="space-y-1.5">
                <Label>Template</Label>
                <select
                  className={selectClass}
                  value={selectedId}
                  onChange={(e) => setSelectedId(e.target.value)}
                >
                  {templates.map((tpl: EmailTemplate) => (
                    <option key={tpl.id} value={tpl.id}>
                      {tpl.name}
                    </option>
                  ))}
                </select>
              </div>

              {preview && (
                <div className="space-y-3 rounded-lg border border-border bg-muted/20 p-3">
                  <div>
                    <p className="text-xs font-semibold uppercase text-muted-foreground">
                      Subject
                    </p>
                    <p className="mt-1 text-sm">{preview.subject}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase text-muted-foreground">Body</p>
                    <pre className="mt-1 whitespace-pre-wrap font-sans text-sm text-foreground">
                      {preview.body}
                    </pre>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        <SheetFooter className="border-t border-border">
          <Button
            type="button"
            onClick={handleSend}
            disabled={!selected || templates.length === 0}
          >
            <Send className="size-3.5" />
            Send email
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
