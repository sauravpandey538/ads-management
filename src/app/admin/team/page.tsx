import type { Metadata } from "next";
import { TeamAccessManagement } from "@/components/admin/team-access-management";

export const metadata: Metadata = {
  title: "Team Access",
  robots: { index: false, follow: false },
};

export default function AdminTeamPage() {
  return <TeamAccessManagement />;
}
