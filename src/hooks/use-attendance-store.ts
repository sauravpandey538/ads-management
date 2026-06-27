"use client";

import { useCallback, useEffect, useState } from "react";
import { loadAttendanceStore, saveAttendanceStore } from "@/lib/attendance-persistence";
import {
  attendanceEntryKey,
  normalizeAttendanceEntry,
  type AttendanceEntry,
  type AttendanceStatus,
  type Employee,
} from "@/lib/employee-mock-data";

export function useAttendanceStore() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [entries, setEntries] = useState<AttendanceEntry[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const store = loadAttendanceStore();
    setEmployees(store.employees);
    setEntries(store.entries);
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    saveAttendanceStore({ employees, entries });
  }, [employees, entries, hydrated]);

  const getEntry = useCallback(
    (employeeId: string, date: string): AttendanceEntry | undefined => {
      const key = attendanceEntryKey(employeeId, date);
      return entries.find((e) => attendanceEntryKey(e.employeeId, e.date) === key);
    },
    [entries],
  );

  const setAttendance = useCallback(
    (
      employeeId: string,
      date: string,
      status: AttendanceStatus,
      options?: { absentReason?: string; targetsAchieved?: string },
    ) => {
      if (status === "absent" && !options?.absentReason?.trim()) {
        throw new Error("Absent days require a reason.");
      }
      if (status === "present" && !options?.targetsAchieved?.trim()) {
        throw new Error("Present days require targets achieved.");
      }

      const entry = normalizeAttendanceEntry({
        employeeId,
        date,
        status,
        absentReason: status === "absent" ? options?.absentReason?.trim() : undefined,
        targetsAchieved: status === "present" ? options?.targetsAchieved?.trim() : undefined,
        updatedAt: new Date().toISOString(),
      });

      const key = attendanceEntryKey(employeeId, date);
      setEntries((prev) => {
        const without = prev.filter((e) => attendanceEntryKey(e.employeeId, e.date) !== key);
        return [...without, entry];
      });
    },
    [],
  );

  const clearAttendance = useCallback((employeeId: string, date: string) => {
    const key = attendanceEntryKey(employeeId, date);
    setEntries((prev) => prev.filter((e) => attendanceEntryKey(e.employeeId, e.date) !== key));
  }, []);

  const addRosterEmployee = useCallback((employee: Employee) => {
    setEmployees((prev) => {
      if (prev.some((e) => e.name.toLowerCase() === employee.name.toLowerCase())) {
        return prev;
      }
      return [...prev, employee];
    });
  }, []);

  return {
    employees,
    entries,
    hydrated,
    getEntry,
    setAttendance,
    clearAttendance,
    addRosterEmployee,
  };
}
