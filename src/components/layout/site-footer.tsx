import Link from "next/link";
import { PlayfulBadge } from "@/components/ui/playful-badge";
import { siteConfig } from "@/lib/site-config";

const footerGroups = [
  {
    title: "Agency",
    links: [
      { href: "/about", label: "About" },
      { href: "/testimonials", label: "Testimonials" },
      { href: "/case-studies/revstack", label: "RevStack Case Study" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    title: "Paid Ads",
    links: [
      { href: "/services/meta", label: "Meta Ads" },
      { href: "/services/instagram", label: "Instagram Ads" },
      { href: "/services/youtube", label: "YouTube Ads" },
      { href: "/services/linkedin", label: "LinkedIn Ads" },
      { href: "/services/google", label: "Google Ads" },
    ],
  },
  {
    title: "Resources",
    links: [
      { href: "/free-audit", label: "Free Ads Audit" },
      { href: "/privacy", label: "Privacy Policy" },
      { href: "/terms", label: "Terms of Service" },
      { href: "/#faq", label: "FAQ" },
    ],
  },
] as const;

export function SiteFooter() {
  return (
    <footer className="mt-auto bg-cream pt-12 pb-8">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="inline-flex items-center gap-2 group">
              <span className="flex size-10 items-center justify-center rounded-xl bg-sun/60 text-lg font-bold text-ink border-2 border-ink shadow-[3px_3px_0_0_var(--ink)] transition-transform group-hover:-rotate-3">
                A
              </span>
              <span className="font-bold text-ink text-lg">{siteConfig.name}</span>
            </Link>
            <p className="mt-4 text-sm text-ink/65 leading-relaxed max-w-xs">
              Paid ads for B2B SaaS. Meta, LinkedIn, YouTube & Google — optimized for pipeline, not
              clicks.
            </p>
            <PlayfulBadge variant="chip" className="mt-4">
              Pipeline obsessed
            </PlayfulBadge>
          </div>
          {footerGroups.map((group) => (
            <div key={group.title}>
              <h3 className="font-bold text-ink text-sm uppercase tracking-wide">{group.title}</h3>
              <ul className="mt-4 space-y-2.5">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-ink/65 hover:text-primary font-medium transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <h3 className="font-bold text-ink text-sm uppercase tracking-wide">Get in touch</h3>
            <ul className="mt-4 space-y-2 text-sm text-ink/65">
              <li>
                <a href={`mailto:${siteConfig.email}`} className="hover:text-primary font-medium">
                  {siteConfig.email}
                </a>
              </li>
              <li className="font-medium leading-relaxed">{siteConfig.calendarResponse}</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-ink/10 flex flex-col gap-3 text-sm text-ink/55 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            <Link href="/privacy" className="hover:text-primary font-medium transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-primary font-medium transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
