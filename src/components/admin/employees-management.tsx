"use client";

import { useEffect, useState } from "react";
import { CalendarDays, Users } from "lucide-react";
import { AttendanceCalendar } from "@/components/admin/attendance-calendar";
import { useEmployees } from "@/components/admin/employees-provider";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PlayfulBadge } from "@/components/ui/playful-badge";
import { cn } from "@/lib/utils";

/** Employee roster + per-person attendance calendar (mock localStorage). */
export function EmployeesManagement() {
  const { employees, hydrated } = useEmployees();
  const [activeEmployeeId, setActiveEmployeeId] = useState("");
  const [calendarReset, setCalendarReset] = useState(0);

  useEffect(() => {
    if (employees.length && !activeEmployeeId) {
      setActiveEmployeeId(employees[0].id);
    }
  }, [employees, activeEmployeeId]);

  const activeEmployee =
    employees.find((e) => e.id === activeEmployeeId) ?? employees[0] ?? null;

  if (!hydrated) {
    return <p className="text-sm text-muted-foreground">Loading employees…</p>;
  }

  if (!activeEmployee) {
    return <p className="text-sm text-muted-foreground">No employees in roster.</p>;
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div>
        <PlayfulBadge variant="stamp" className="mb-3">
          Team attendance
        </PlayfulBadge>
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">Employees</h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Track daily attendance and log today&apos;s priorities. Present days require a short plan
          for the day; absent days require a reason.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-[240px_1fr]">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <Users className="size-4" />
              Team roster
            </CardTitle>
            <CardDescription>Select an employee to view their calendar</CardDescription>
          </CardHeader>
          <CardContent className="space-y-1">
            {employees.map((employee) => {
              const active = employee.id === activeEmployee.id;
              return (
                <button
                  key={employee.id}
                  type="button"
                  onClick={() => setActiveEmployeeId(employee.id)}
                  className={cn(
                    "w-full rounded-lg border px-3 py-2.5 text-left transition-colors",
                    active
                      ? "border-primary bg-primary/10"
                      : "border-transparent hover:bg-muted",
                  )}
                >
                  <p className="font-semibold text-foreground text-sm">{employee.name}</p>
                  <p className="text-xs text-muted-foreground">{employee.role}</p>
                  <p className="text-[11px] text-muted-foreground/80">{employee.department}</p>
                </button>
              );
            })}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <CardTitle className="flex items-center gap-2 text-base">
                  <CalendarDays className="size-4" />
                  {activeEmployee.name}
                </CardTitle>
                <CardDescription>
                  {activeEmployee.role} · {activeEmployee.department}
                </CardDescription>
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setCalendarReset((n) => n + 1)}
              >
                This month
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <AttendanceCalendar
              key={`${activeEmployee.id}-${calendarReset}`}
              employeeId={activeEmployee.id}
              employeeName={activeEmployee.name}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
