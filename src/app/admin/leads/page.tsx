import type { Metadata } from "next";
import { LeadsManagement } from "@/components/admin/leads-management";

export const metadata: Metadata = {
  title: "Leads",
  robots: { index: false, follow: false },
};

export default function AdminLeadsPage() {
  return <LeadsManagement />;
}
