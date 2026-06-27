import type { Metadata } from "next";
import { TemplatesManagement } from "@/components/admin/templates-management";

export const metadata: Metadata = {
  title: "Templates",
  robots: { index: false, follow: false },
};

export default function AdminTemplatesPage() {
  return <TemplatesManagement />;
}
