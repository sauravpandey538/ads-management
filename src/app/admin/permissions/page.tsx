import type { Metadata } from "next";
import { PermissionsPage } from "@/components/admin/permissions-page";

export const metadata: Metadata = {
  title: "Permissions",
  robots: { index: false, follow: false },
};

export default function AdminPermissionsPage() {
  return <PermissionsPage />;
}
