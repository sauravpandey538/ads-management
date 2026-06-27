/**
 * Employee roster and attendance types for the admin attendance calendar (mock data).
 */

export type AttendanceStatus = "present" | "absent" | "weekday" | "holiday";

export type Employee = {
  id: string;
  name: string;
  role: string;
  department: string;
};

export type AttendanceEntry = {
  employeeId: string;
  /** YYYY-MM-DD */
  date: string;
  status: AttendanceStatus;
  /** Required when status is absent — reason or explanation from the employee. */
  absentReason?: string;
  /** Required when status is present — what the employee accomplished that day. */
  targetsAchieved?: string;
  updatedAt: string;
};

export const ATTENDANCE_STORAGE_KEY = "admarkapture-admin-attendance";

export const ATTENDANCE_STATUS_LABELS: Record<AttendanceStatus, string> = {
  present: "Present",
  absent: "Absent",
  weekday: "Weekday",
  holiday: "Holiday",
};

export const ATTENDANCE_STATUS_SHORT: Record<AttendanceStatus, string> = {
  present: "P",
  absent: "A",
  weekday: "W",
  holiday: "H",
};

/** Seed employees — aligned with internal assignees on the outreach dashboard. */
export const seedEmployees: Employee[] = [
  { id: "emp-jordan", name: "Jordan Lee", role: "Account strategist", department: "Client success" },
  { id: "emp-priya", name: "Priya Sharma", role: "Paid media lead", department: "Performance" },
  { id: "emp-marcus", name: "Marcus Chen", role: "Analytics specialist", department: "Insights" },
  { id: "emp-elena", name: "Elena Rodriguez", role: "Outreach coordinator", department: "Growth" },
  { id: "emp-nabila", name: "Nabila Farzin", role: "Operations manager", department: "Ops" },
];

export function attendanceEntryKey(employeeId: string, date: string): string {
  return `${employeeId}:${date}`;
}

export function normalizeAttendanceEntry(raw: AttendanceEntry): AttendanceEntry {
  const status = raw.status;
  return {
    ...raw,
    status,
    absentReason: status === "absent" ? raw.absentReason?.trim() || undefined : undefined,
    targetsAchieved:
      status === "present" ? raw.targetsAchieved?.trim() || undefined : undefined,
  };
}
