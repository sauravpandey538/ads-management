import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import { MarketingChrome } from "@/components/layout/marketing-chrome";
import { MarketingFooter } from "@/components/layout/marketing-footer";
import { MarketingMain } from "@/components/layout/marketing-main";
import { siteConfig } from "@/lib/site-config";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} | ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} h-full scroll-smooth`}>
      <body className="min-h-full flex flex-col antialiased">
        <MarketingChrome />
        <MarketingMain>{children}</MarketingMain>
        <MarketingFooter />
      </body>
    </html>
  );
}
