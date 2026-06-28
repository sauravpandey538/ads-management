"use client";

import { useMemo, useState } from "react";
import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isSameMonth,
  startOfMonth,
  startOfWeek,
  subMonths,
} from "date-fns";
import { ChevronLeft, ChevronRight, Target, UserCircle2 } from "lucide-react";
import { useAdminToast } from "@/components/admin/admin-toast";
import { useEmployees } from "@/components/admin/employees-provider";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { PlayfulBadge } from "@/components/ui/playful-badge";
import { PlayfulCard } from "@/components/ui/playful-card";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import {
  ATTENDANCE_STATUS_LABELS,
  ATTENDANCE_STATUS_SHORT,
  type AttendanceEntry,
  type AttendanceStatus,
} from "@/lib/employee-mock-data";
import { cn } from "@/lib/utils";

const WEEKDAY_HEADERS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] as const;

const STATUS_OPTIONS: AttendanceStatus[] = ["present", "absent", "weekday", "holiday"];

/** Visual styling per attendance status on the calendar grid. */
const statusCellStyles: Record<AttendanceStatus, string> = {
  present: "bg-mint/50 border-mint text-ink",
  absent: "bg-red-100 border-red-400 text-red-950",
  weekday: "bg-sky/40 border-sky text-ink",
  holiday: "bg-sun/50 border-sun text-ink",
};

const statusBadgeVariant: Record<
  AttendanceStatus,
  "ticket" | "stamp" | "pin" | "flag" | "chip"
> = {
  present: "stamp",
  absent: "flag",
  weekday: "ticket",
  holiday: "pin",
};

function dayTooltip(entry: AttendanceEntry): string {
  if (entry.status === "absent" && entry.absentReason) {
    return `Absent: ${entry.absentReason}`;
  }
  if (entry.status === "present" && entry.todayPriorities) {
    return `Priorities: ${entry.todayPriorities}`;
  }
  return ATTENDANCE_STATUS_LABELS[entry.status];
}

type AttendanceCalendarProps = {
  employeeId: string;
  employeeName: string;
};

/** Month grid — present days require today's priorities; absent days require a reason. */
export function AttendanceCalendar({ employeeId, employeeName }: AttendanceCalendarProps) {
  const { getEntry, setAttendance, clearAttendance } = useEmployees();
  const { toast } = useAdminToast();

  const [month, setMonth] = useState(() => startOfMonth(new Date()));
  const [sheetOpen, setSheetOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [pendingStatus, setPendingStatus] = useState<AttendanceStatus | null>(null);
  const [absentReason, setAbsentReason] = useState("");
  const [todayPriorities, setTodayPriorities] = useState("");

  const monthDays = useMemo(() => {
    const start = startOfWeek(startOfMonth(month), { weekStartsOn: 1 });
    const end = endOfWeek(endOfMonth(month), { weekStartsOn: 1 });
    return eachDayOfInterval({ start, end });
  }, [month]);

  const monthStats = useMemo(() => {
    const counts: Record<AttendanceStatus, number> = {
      present: 0,
      absent: 0,
      weekday: 0,
      holiday: 0,
    };
    for (const day of monthDays) {
      if (!isSameMonth(day, month)) continue;
      const key = format(day, "yyyy-MM-dd");
      const entry = getEntry(employeeId, key);
      if (entry) counts[entry.status] += 1;
    }
    return counts;
  }, [employeeId, getEntry, month, monthDays]);

  /** Present-day logs for the selected month — shown below the calendar. */
  const monthPriorityLogs = useMemo(() => {
    return monthDays
      .filter((day) => isSameMonth(day, month))
      .map((day) => format(day, "yyyy-MM-dd"))
      .map((dateKey) => getEntry(employeeId, dateKey))
      .filter(
        (entry): entry is AttendanceEntry =>
          Boolean(entry?.status === "present" && entry.todayPriorities),
      )
      .sort((a, b) => b.date.localeCompare(a.date));
  }, [employeeId, getEntry, month, monthDays]);

  const openDay = (dateKey: string) => {
    const existing = getEntry(employeeId, dateKey);
    setSelectedDate(dateKey);
    setPendingStatus(existing?.status ?? null);
    setAbsentReason(existing?.absentReason ?? "");
    setTodayPriorities(existing?.todayPriorities ?? "");
    setSheetOpen(true);
  };

  const closeSheet = () => {
    setSheetOpen(false);
    setSelectedDate(null);
    setPendingStatus(null);
    setAbsentReason("");
    setTodayPriorities("");
  };

  const handleSave = () => {
    if (!selectedDate || !pendingStatus) return;
    if (pendingStatus === "absent" && !absentReason.trim()) {
      toast("Reason required", "Please explain why you were absent.");
      return;
    }
    if (pendingStatus === "present" && !todayPriorities.trim()) {
      toast("Priorities required", "List what you plan to focus on today.");
      return;
    }
    try {
      setAttendance(employeeId, selectedDate, pendingStatus, {
        absentReason: pendingStatus === "absent" ? absentReason : undefined,
        todayPriorities: pendingStatus === "present" ? todayPriorities : undefined,
      });
      toast(
        "Attendance saved",
        `${format(new Date(selectedDate), "MMM d")} — ${ATTENDANCE_STATUS_LABELS[pendingStatus]}`,
      );
      closeSheet();
    } catch (err) {
      toast("Could not save", err instanceof Error ? err.message : "Unknown error");
    }
  };

  const handleClear = () => {
    if (!selectedDate) return;
    clearAttendance(employeeId, selectedDate);
    toast("Cleared", format(new Date(selectedDate), "MMM d, yyyy"));
    closeSheet();
  };

  const selectedLabel = selectedDate
    ? format(new Date(selectedDate), "EEEE, MMMM d, yyyy")
    : "";

  const saveDisabled =
    !pendingStatus ||
    (pendingStatus === "absent" && !absentReason.trim()) ||
    (pendingStatus === "present" && !todayPriorities.trim());

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="icon-sm"
            onClick={() => setMonth((m) => subMonths(m, 1))}
            aria-label="Previous month"
          >
            <ChevronLeft className="size-4" />
          </Button>
          <h2 className="min-w-40 text-center text-lg font-bold text-foreground">
            {format(month, "MMMM yyyy")}
          </h2>
          <Button
            type="button"
            variant="outline"
            size="icon-sm"
            onClick={() => setMonth((m) => addMonths(m, 1))}
            aria-label="Next month"
          >
            <ChevronRight className="size-4" />
          </Button>
        </div>

        <div className="flex flex-wrap gap-2">
          {STATUS_OPTIONS.map((status) => (
            <PlayfulBadge key={status} variant={statusBadgeVariant[status]}>
              {ATTENDANCE_STATUS_SHORT[status]} · {ATTENDANCE_STATUS_LABELS[status]}
            </PlayfulBadge>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {(["present", "absent", "weekday", "holiday"] as AttendanceStatus[]).map((status) => (
          <PlayfulCard key={status} variant="ticket" tone="neutral" className="p-3 text-center">
            <p className="text-2xl font-bold text-foreground">{monthStats[status]}</p>
            <p className="text-xs text-muted-foreground">{ATTENDANCE_STATUS_LABELS[status]}</p>
          </PlayfulCard>
        ))}
      </div>

      <PlayfulCard variant="stamp" tone="neutral" className="overflow-hidden p-3 sm:p-4">
        <div className="mb-2 grid grid-cols-7 gap-1">
          {WEEKDAY_HEADERS.map((label) => (
            <div
              key={label}
              className="py-1 text-center text-xs font-bold uppercase tracking-wide text-muted-foreground"
            >
              {label}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {monthDays.map((day) => {
            const dateKey = format(day, "yyyy-MM-dd");
            const inMonth = isSameMonth(day, month);
            const entry = inMonth ? getEntry(employeeId, dateKey) : undefined;

            return (
              <button
                key={dateKey}
                type="button"
                disabled={!inMonth}
                onClick={() => inMonth && openDay(dateKey)}
                title={entry ? dayTooltip(entry) : "Mark attendance"}
                className={cn(
                  "relative flex min-h-13 flex-col items-center justify-center rounded-lg border-2 text-sm font-semibold transition-all sm:min-h-16",
                  !inMonth && "invisible pointer-events-none",
                  inMonth && !entry && "border-border/60 bg-card hover:border-primary/40 hover:bg-muted/50",
                  inMonth &&
                    entry &&
                    cn("border-2 shadow-[2px_2px_0_0_var(--ink)]", statusCellStyles[entry.status]),
                )}
              >
                <span className="text-xs sm:text-sm">{format(day, "d")}</span>
                {entry && (
                  <span className="mt-0.5 text-[10px] font-bold uppercase tracking-wider opacity-80">
                    {ATTENDANCE_STATUS_SHORT[entry.status]}
                  </span>
                )}
                {entry?.status === "present" && entry.todayPriorities && (
                  <span
                    className="absolute top-1 right-1 size-1.5 rounded-full bg-primary"
                    aria-label="Priorities logged"
                  />
                )}
              </button>
            );
          })}
        </div>
      </PlayfulCard>

      {monthPriorityLogs.length > 0 && (
        <PlayfulCard variant="ticket" tone="neutral" className="p-4 sm:p-5">
          <div className="flex items-center gap-2 mb-3">
            <Target className="size-4 text-primary" />
            <h3 className="text-sm font-bold text-foreground">Today&apos;s priorities this month</h3>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2">
            {monthPriorityLogs.map((entry) => (
              <li
                key={entry.date}
                className="rounded-lg border border-border bg-card/80 p-3 text-left"
              >
                <button
                  type="button"
                  onClick={() => openDay(entry.date)}
                  className="w-full text-left"
                >
                  <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
                    {format(new Date(entry.date), "EEE, MMM d")}
                  </p>
                  <p className="mt-1.5 text-sm text-foreground leading-relaxed whitespace-pre-line">
                    {entry.todayPriorities}
                  </p>
                </button>
              </li>
            ))}
          </ul>
        </PlayfulCard>
      )}

      <p className="text-xs text-muted-foreground flex items-center gap-1.5">
        <UserCircle2 className="size-3.5" />
        Click a day to mark attendance for {employeeName}. Present days require today&apos;s
        priorities; absent days require a reason.
      </p>

      <Sheet open={sheetOpen} onOpenChange={(open) => !open && closeSheet()}>
        <SheetContent side="right" className="sm:max-w-md overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Mark attendance</SheetTitle>
            <SheetDescription>{selectedLabel}</SheetDescription>
          </SheetHeader>

          <div className="flex-1 space-y-4 px-4">
            <div className="space-y-2">
              <Label>Status</Label>
              <div className="grid grid-cols-2 gap-2">
                {STATUS_OPTIONS.map((status) => (
                  <Button
                    key={status}
                    type="button"
                    variant={pendingStatus === status ? "default" : "outline"}
                    className={cn(
                      "justify-start gap-2",
                      pendingStatus === status && statusCellStyles[status],
                    )}
                    onClick={() => setPendingStatus(status)}
                  >
                    <span className="font-bold">{ATTENDANCE_STATUS_SHORT[status]}</span>
                    {ATTENDANCE_STATUS_LABELS[status]}
                  </Button>
                ))}
              </div>
            </div>

            {pendingStatus === "present" && (
              <div className="space-y-2">
                <Label htmlFor="today-priorities">
                  Today&apos;s priorities <span className="text-destructive">*</span>
                </Label>
                <Textarea
                  id="today-priorities"
                  value={todayPriorities}
                  onChange={(e) => setTodayPriorities(e.target.value)}
                  placeholder="What will you focus on today? e.g. Finish RevStack audit section, follow up with 3 leads, update Meta campaign structure…"
                  rows={5}
                  className="resize-none"
                />
                <p className="text-xs text-muted-foreground">
                  Required on present days — list your main priorities for the day, not a full
                  retrospective.
                </p>
              </div>
            )}

            {pendingStatus === "absent" && (
              <div className="space-y-2">
                <Label htmlFor="absent-reason">
                  Why were you absent? <span className="text-destructive">*</span>
                </Label>
                <Textarea
                  id="absent-reason"
                  value={absentReason}
                  onChange={(e) => setAbsentReason(e.target.value)}
                  placeholder="e.g. Doctor appointment, personal emergency, approved leave…"
                  rows={4}
                  className="resize-none"
                />
                <p className="text-xs text-muted-foreground">
                  Required for absent days — visible to managers reviewing the calendar.
                </p>
              </div>
            )}
          </div>

          <SheetFooter className="flex-row gap-2 sm:justify-between">
            <Button type="button" variant="ghost" onClick={handleClear} disabled={!selectedDate}>
              Clear mark
            </Button>
            <Button type="button" onClick={handleSave} disabled={saveDisabled}>
              Save attendance
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}
