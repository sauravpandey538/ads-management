import {
  ATTENDANCE_STORAGE_KEY,
  normalizeAttendanceEntry,
  seedEmployees,
  type AttendanceEntry,
  type Employee,
} from "@/lib/employee-mock-data";

type AttendanceStore = {
  employees: Employee[];
  entries: AttendanceEntry[];
};

function defaultStore(): AttendanceStore {
  return { employees: seedEmployees, entries: [] };
}

/** Load attendance records from localStorage — mock persistence only. */
export function loadAttendanceStore(): AttendanceStore {
  if (typeof window === "undefined") return defaultStore();
  try {
    const raw = localStorage.getItem(ATTENDANCE_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as AttendanceStore;
      return {
        employees: parsed.employees?.length ? parsed.employees : seedEmployees,
        entries: (parsed.entries ?? []).map(normalizeAttendanceEntry),
      };
    }
  } catch {
    /* fall through */
  }
  return defaultStore();
}

export function saveAttendanceStore(store: AttendanceStore): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(ATTENDANCE_STORAGE_KEY, JSON.stringify(store));
}
