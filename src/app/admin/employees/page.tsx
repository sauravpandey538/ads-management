import type { Metadata } from "next";
import { EmployeesManagement } from "@/components/admin/employees-management";

export const metadata: Metadata = {
  title: "Employees",
  robots: { index: false, follow: false },
};

export default function AdminEmployeesPage() {
  return <EmployeesManagement />;
}
