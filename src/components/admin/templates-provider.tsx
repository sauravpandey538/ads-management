"use client";

import { createContext, useContext, type ReactNode } from "react";
import { useTemplatesStore } from "@/hooks/use-templates-store";

type TemplatesStore = ReturnType<typeof useTemplatesStore>;

const TemplatesContext = createContext<TemplatesStore | null>(null);

export function TemplatesProvider({ children }: { children: ReactNode }) {
  const store = useTemplatesStore();
  return <TemplatesContext.Provider value={store}>{children}</TemplatesContext.Provider>;
}

export function useTemplates() {
  const ctx = useContext(TemplatesContext);
  if (!ctx) {
    throw new Error("useTemplates must be used within TemplatesProvider");
  }
  return ctx;
}
