import type { Metadata } from "next";
import { AuditPortalView } from "@/components/portal/audit-portal-view";
import { PageShell } from "@/components/layout/page-shell";

export const metadata: Metadata = {
  title: "Audit Status",
  robots: { index: false, follow: false },
};

export default function AuditPortalPage() {
  return (
    <PageShell>
      <section className="py-8 sm:py-10 px-4 sm:px-6">
        <AuditPortalView />
      </section>
    </PageShell>
  );
}
