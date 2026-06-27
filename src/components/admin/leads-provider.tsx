"use client";

import { createContext, useContext, type ReactNode } from "react";
import { useLeadsStore } from "@/hooks/use-leads-store";

type LeadsStore = ReturnType<typeof useLeadsStore>;

const LeadsContext = createContext<LeadsStore | null>(null);

/** Shares lead state across admin pages via localStorage-backed store. */
export function LeadsProvider({ children }: { children: ReactNode }) {
  const store = useLeadsStore();
  return <LeadsContext.Provider value={store}>{children}</LeadsContext.Provider>;
}

export function useLeads() {
  const ctx = useContext(LeadsContext);
  if (!ctx) {
    throw new Error("useLeads must be used within LeadsProvider");
  }
  return ctx;
}
