import type { Metadata } from "next";
import { FadeIn } from "@/components/motion/fade-in";
import { PageShell } from "@/components/layout/page-shell";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `Terms governing use of the ${siteConfig.name} website and free audit services.`,
};

const sections = [
  {
    title: "Agreement",
    body: `By accessing ${siteConfig.name}'s website or submitting any form, you agree to these Terms of Service and our Privacy Policy. If you do not agree, please do not use our site or submit your information.`,
  },
  {
    title: "Services",
    body: `${siteConfig.name} provides B2B SaaS paid advertising management and related consulting services. Information on this website is for general marketing purposes and does not constitute a binding offer until a separate agreement is signed.`,
  },
  {
    title: "Free ads audit",
    body: `Our free audit is provided at no cost and with no obligation to purchase services. Audit deliverables, timelines, and scope may vary based on the information you provide. We reserve the right to decline requests that fall outside our service area or capacity.`,
  },
  {
    title: "Accuracy of information",
    body: `You agree to provide accurate and complete information in any form you submit. We rely on this information to prepare your audit and communicate with you.`,
  },
  {
    title: "Intellectual property",
    body: `All content on this website — including text, graphics, logos, and design — is owned by ${siteConfig.name} or its licensors and is protected by applicable intellectual property laws. You may not copy, reproduce, or distribute our content without written permission.`,
  },
  {
    title: "Testimonials & results",
    body: `Case studies, testimonials, and performance metrics on this site represent past client experiences. Results vary by industry, budget, funnel, and market conditions. Past performance does not guarantee future results.`,
  },
  {
    title: "Limitation of liability",
    body: `To the fullest extent permitted by law, ${siteConfig.name} is not liable for any indirect, incidental, or consequential damages arising from your use of this website or reliance on its content. Our total liability for any claim related to the website shall not exceed the amount you paid us in the twelve months preceding the claim, or $100 if no payment was made.`,
  },
  {
    title: "Changes",
    body: `We may update these terms from time to time. Continued use of the site after changes are posted constitutes acceptance of the revised terms.`,
  },
  {
    title: "Contact",
    body: `Questions about these terms? Email ${siteConfig.email}.`,
  },
] as const;

export default function TermsPage() {
  return (
    <PageShell>
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <FadeIn>
            <h1 className="text-4xl font-bold text-ink sm:text-5xl">Terms of Service</h1>
            <p className="mt-4 text-muted-foreground">
              Last updated: June 1, 2025 · {siteConfig.name}
            </p>
            <p className="mt-6 text-lg text-ink/80 leading-relaxed">
              These terms govern your use of our website and any forms or inquiries you submit.
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
