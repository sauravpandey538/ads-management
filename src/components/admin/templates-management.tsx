"use client";

import { useState } from "react";
import { Mail, Pencil, Plus } from "lucide-react";
import { TemplateCategoryBadge } from "@/components/admin/lead-badges";
import { TemplateEditorSheet } from "@/components/admin/template-editor-sheet";
import { useTemplates } from "@/components/admin/templates-provider";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PlayfulBadge } from "@/components/ui/playful-badge";
import type { EmailTemplate } from "@/lib/admin-template-data";

function formatUpdated(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function bodyPreview(body: string, maxLines = 4) {
  return body.split("\n").slice(0, maxLines).join("\n");
}

/** Admin CRUD for outreach email templates — one card per template. */
export function TemplatesManagement() {
  const { templates, hydrated, addTemplate, updateTemplate, deleteTemplate, createTemplate } =
    useTemplates();

  const [sheetOpen, setSheetOpen] = useState(false);
  const [sheetMode, setSheetMode] = useState<"create" | "edit">("edit");
  const [activeTemplate, setActiveTemplate] = useState<EmailTemplate | null>(null);

  const openCreate = () => {
    setActiveTemplate(createTemplate());
    setSheetMode("create");
    setSheetOpen(true);
  };

  const openEdit = (tpl: EmailTemplate) => {
    setActiveTemplate(tpl);
    setSheetMode("edit");
    setSheetOpen(true);
  };

  if (!hydrated) {
    return <p className="text-sm text-muted-foreground">Loading templates…</p>;
  }

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Email templates</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Each template lives in its own card — edit copy used in the dashboard send flow.
          </p>
        </div>
        <Button type="button" onClick={openCreate}>
          <Plus className="size-4" />
          Add template
        </Button>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <PlayfulBadge variant="ticket">{templates.length} templates</PlayfulBadge>
        <PlayfulBadge variant="chip">Placeholders: {"{{name}}"} · {"{{company}}"} · {"{{email}}"}</PlayfulBadge>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {templates.map((tpl) => (
          <Card
            key={tpl.id}
            className="flex flex-col overflow-hidden transition-shadow hover:shadow-md"
          >
            <CardHeader className="border-b border-border/60 bg-muted/20">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0 space-y-2">
                  <TemplateCategoryBadge category={tpl.category} />
                  <CardTitle className="text-base leading-snug">{tpl.name}</CardTitle>
                </div>
                <Mail className="size-4 shrink-0 text-muted-foreground" aria-hidden />
              </div>
              <CardDescription className="text-xs">
                Updated {formatUpdated(tpl.updatedAt)}
              </CardDescription>
            </CardHeader>

            <CardContent className="flex-1 space-y-3 pt-4">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                  Subject
                </p>
                <p className="mt-1 text-sm font-medium text-foreground leading-snug">
                  {tpl.subject}
                </p>
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                  Body preview
                </p>
                <pre className="mt-1 max-h-36 overflow-hidden whitespace-pre-wrap rounded-lg border border-border/60 bg-muted/30 p-3 font-sans text-xs leading-relaxed text-foreground">
                  {bodyPreview(tpl.body)}
                  {tpl.body.split("\n").length > 4 ? "\n…" : ""}
                </pre>
              </div>
            </CardContent>

            <CardFooter className="border-t border-border/60 bg-muted/10 pt-4">
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="w-full"
                onClick={() => openEdit(tpl)}
              >
                <Pencil className="size-3.5" />
                Edit template
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <TemplateEditorSheet
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        template={activeTemplate}
        mode={sheetMode}
        onSave={(tpl) => {
          if (sheetMode === "create") addTemplate(tpl);
          else updateTemplate(tpl.id, tpl);
        }}
        onDelete={
          sheetMode === "edit" && activeTemplate
            ? () => {
                deleteTemplate(activeTemplate.id);
                setSheetOpen(false);
              }
            : undefined
        }
      />
    </div>
  );
}
