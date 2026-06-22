import type { Metadata } from "next";
import { FadeIn } from "@/components/motion/fade-in";
import { PageShell } from "@/components/layout/page-shell";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${siteConfig.name} collects, uses, and protects your personal information.`,
};

const sections = [
  {
    title: "Information we collect",
    body: `When you submit our free audit form, contact form, or book a strategy call, we may collect your name, work email, company name, monthly ad spend range, channel interests, goals, and any optional message you provide. We also collect standard technical data (IP address, browser type, pages visited) through analytics tools to improve our website.`,
  },
  {
    title: "How we use your information",
    body: `We use your information to deliver your free ads audit, respond to inquiries, schedule strategy calls, and send follow-up communication related to your request. We do not sell your personal data to third parties.`,
  },
  {
    title: "Legal basis & consent",
    body: `By submitting a form on this site, you consent to our collection and use of your information as described in this policy and our Terms of Service. You may withdraw consent or request deletion of your data at any time by emailing ${siteConfig.email}.`,
  },
  {
    title: "Data sharing",
    body: `We may share data with trusted service providers who help us operate our business (e.g. email delivery, CRM, scheduling, analytics). These providers are contractually required to protect your data and use it only for the services they provide to us.`,
  },
  {
    title: "Data retention",
    body: `We retain form submissions and communication records for as long as needed to fulfill your request, maintain business records, and comply with legal obligations. You may request deletion at any time.`,
  },
  {
    title: "Your rights",
    body: `Depending on your location, you may have the right to access, correct, delete, or export your personal data, and to object to or restrict certain processing. Contact us at ${siteConfig.email} to exercise these rights.`,
  },
  {
    title: "Cookies & analytics",
    body: `We may use cookies and similar technologies to understand how visitors use our site. You can control cookies through your browser settings. Disabling cookies may affect some site functionality.`,
  },
  {
    title: "Contact",
    body: `For privacy-related questions or requests, email ${siteConfig.email} or call ${siteConfig.phone}.`,
  },
] as const;

export default function PrivacyPage() {
  return (
    <PageShell>
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <FadeIn>
            <h1 className="text-4xl font-bold text-ink sm:text-5xl">Privacy Policy</h1>
            <p className="mt-4 text-muted-foreground">
              Last updated: June 1, 2025 · {siteConfig.name}
            </p>
            <p className="mt-6 text-lg text-ink/80 leading-relaxed">
              This policy explains how we handle personal information when you use our website and
              submit forms to request an audit or contact us.
            </p>
          </FadeIn>

          <div className="mt-12 space-y-10">
            {sections.map((section, i) => (
              <FadeIn key={section.title} delay={i * 0.04}>
                <h2 className="text-xl font-bold text-ink">{section.title}</h2>
                <p className="mt-3 text-muted-foreground leading-relaxed">{section.body}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
