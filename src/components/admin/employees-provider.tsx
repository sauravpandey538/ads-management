"use client";

import { createContext, useContext, type ReactNode } from "react";
import { useAttendanceStore } from "@/hooks/use-attendance-store";

type AttendanceStore = ReturnType<typeof useAttendanceStore>;

const EmployeesContext = createContext<AttendanceStore | null>(null);

/** Shares employee attendance state across admin pages via localStorage. */
export function EmployeesProvider({ children }: { children: ReactNode }) {
  const store = useAttendanceStore();
  return <EmployeesContext.Provider value={store}>{children}</EmployeesContext.Provider>;
}

export function useEmployees() {
  const ctx = useContext(EmployeesContext);
  if (!ctx) {
    throw new Error("useEmployees must be used within EmployeesProvider");
  }
  return ctx;
}
