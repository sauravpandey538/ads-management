import type { Metadata } from "next";
import { OutreachDashboard } from "@/components/admin/outreach-dashboard";

export const metadata: Metadata = {
  title: "Outreach Dashboard",
  robots: { index: false, follow: false },
};

export default function AdminDashboardPage() {
  return <OutreachDashboard />;
}
