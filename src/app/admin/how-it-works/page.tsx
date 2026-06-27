import type { Metadata } from "next";
import { HowItWorksPage } from "@/components/admin/how-it-works-page";

export const metadata: Metadata = {
  title: "Audit Process",
  robots: { index: false, follow: false },
};

export default function AdminHowItWorksPage() {
  return <HowItWorksPage />;
}
