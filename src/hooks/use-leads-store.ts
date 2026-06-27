"use client";

import { useCallback, useEffect, useState } from "react";
import {
  createEmptyLead,
  normalizeLead,
  seedLeads,
  type EmailLogEntry,
  type LeadAction,
  type LeadSource,
  type OutreachLead,
} from "@/lib/admin-mock-data";
import {
  formatActionCompletedNote,
  formatNoteEntry,
  validateLead,
} from "@/lib/admin-lead-utils";
import { loadLeads, saveLeads } from "@/lib/leads-persistence";

export function useLeadsStore() {
  const [leads, setLeads] = useState<OutreachLead[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setLeads(loadLeads());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    saveLeads(leads);
  }, [leads, hydrated]);

  const refreshFromStorage = useCallback(() => {
    setLeads(loadLeads());
  }, []);

  const addLead = useCallback((lead: OutreachLead) => {
    const error = validateLead(lead);
    if (error) throw new Error(error);
    setLeads((prev) => [
      { ...lead, updatedAt: new Date().toISOString() },
      ...prev,
    ]);
  }, []);

  const updateLead = useCallback((id: string, patch: Partial<OutreachLead>) => {
    setLeads((prev) =>
      prev.map((lead) => {
        if (lead.id !== id) return lead;
        const updated = normalizeLead({
          ...lead,
          ...patch,
          id: lead.id,
          updatedAt: new Date().toISOString(),
        });
        const error = validateLead(updated);
        if (error) throw new Error(error);
        return updated;
      }),
    );
  }, []);

  const completeAction = useCallback((leadId: string, actionId: string) => {
    setLeads((prev) =>
      prev.map((lead) => {
        if (lead.id !== leadId) return lead;
        const action = lead.actions.find((a) => a.id === actionId);
        if (!action || action.completed) return lead;
        const completedAction: LeadAction = {
          ...action,
          completed: true,
          completedAt: new Date().toISOString(),
        };
        return normalizeLead({
          ...lead,
          actions: lead.actions.map((a) =>
            a.id === actionId ? completedAction : a,
          ),
          notes: [...lead.notes, formatActionCompletedNote(action)],
          updatedAt: new Date().toISOString(),
        });
      }),
    );
  }, []);

  const reopenAction = useCallback((leadId: string, actionId: string) => {
    setLeads((prev) =>
      prev.map((lead) => {
        if (lead.id !== leadId) return lead;
        const action = lead.actions.find((a) => a.id === actionId);
        if (!action || !action.completed) return lead;
        return normalizeLead({
          ...lead,
          actions: lead.actions.map((a) =>
            a.id === actionId
              ? { ...a, completed: false, completedAt: undefined }
              : a,
          ),
          updatedAt: new Date().toISOString(),
        });
      }),
    );
  }, []);

  const logMockEmail = useCallback(
    (leadId: string, entry: Omit<EmailLogEntry, "id" | "sentAt">) => {
      const log: EmailLogEntry = {
        ...entry,
        id: `email-${Date.now()}`,
        sentAt: new Date().toISOString(),
      };
      setLeads((prev) =>
        prev.map((lead) =>
          lead.id === leadId
            ? normalizeLead({
                ...lead,
                emailLog: [...lead.emailLog, log],
                updatedAt: new Date().toISOString(),
              })
            : lead,
        ),
      );
    },
    [],
  );

  const addNote = useCallback((id: string, noteText: string) => {
    if (!noteText.trim()) return;
    const entry = formatNoteEntry(noteText);
    setLeads((prev) =>
      prev.map((lead) =>
        lead.id === id
          ? {
              ...lead,
              notes: [...lead.notes, entry],
              updatedAt: new Date().toISOString(),
            }
          : lead,
      ),
    );
  }, []);

  const deleteNote = useCallback((id: string, noteIndex: number) => {
    setLeads((prev) =>
      prev.map((lead) =>
        lead.id === id
          ? {
              ...lead,
              notes: lead.notes.filter((_, i) => i !== noteIndex),
              updatedAt: new Date().toISOString(),
            }
          : lead,
      ),
    );
  }, []);

  const createLead = useCallback(
    (source: LeadSource = "audit") => createEmptyLead(source),
    [],
  );

  const resetToSeed = useCallback(() => {
    setLeads(seedLeads);
    saveLeads(seedLeads);
  }, []);

  return {
    leads,
    hydrated,
    addLead,
    updateLead,
    completeAction,
    reopenAction,
    logMockEmail,
    addNote,
    deleteNote,
    createLead,
    resetToSeed,
    refreshFromStorage,
  };
}
