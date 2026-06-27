"use client";

import { useCallback, useEffect, useState } from "react";
import {
  createEmptyTemplate,
  normalizeTemplate,
  seedTemplates,
  TEMPLATES_STORAGE_KEY,
  validateTemplate,
  type EmailTemplate,
} from "@/lib/admin-template-data";

export function useTemplatesStore() {
  const [templates, setTemplates] = useState<EmailTemplate[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(TEMPLATES_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as EmailTemplate[];
        setTemplates(parsed.map(normalizeTemplate));
      } else {
        setTemplates(seedTemplates);
      }
    } catch {
      setTemplates(seedTemplates);
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(TEMPLATES_STORAGE_KEY, JSON.stringify(templates));
  }, [templates, hydrated]);

  const addTemplate = useCallback((tpl: EmailTemplate) => {
    const error = validateTemplate(tpl);
    if (error) throw new Error(error);
    setTemplates((prev) => [{ ...tpl, updatedAt: new Date().toISOString() }, ...prev]);
  }, []);

  const updateTemplate = useCallback((id: string, patch: Partial<EmailTemplate>) => {
    setTemplates((prev) =>
      prev.map((tpl) => {
        if (tpl.id !== id) return tpl;
        const updated = normalizeTemplate({
          ...tpl,
          ...patch,
          id: tpl.id,
          updatedAt: new Date().toISOString(),
        });
        const error = validateTemplate(updated);
        if (error) throw new Error(error);
        return updated;
      }),
    );
  }, []);

  const deleteTemplate = useCallback((id: string) => {
    setTemplates((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const createTemplate = useCallback(() => createEmptyTemplate(), []);

  return {
    templates,
    hydrated,
    addTemplate,
    updateTemplate,
    deleteTemplate,
    createTemplate,
  };
}
