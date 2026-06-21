"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronDown, Menu } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { CtaButton } from "@/components/shared/cta-button";
import { navLinks, siteConfig } from "@/lib/site-config";
import { serviceSlugs, services } from "@/lib/services-data";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="flex size-9 items-center justify-center rounded-xl bg-sun/50 text-lg font-bold text-ink playful-shadow transition-transform group-hover:-rotate-3">
            A
          </span>
          <div className="leading-tight">
            <span className="block font-bold text-ink">{siteConfig.name}</span>
            <span className="hidden text-xs text-muted-foreground sm:block">
              {siteConfig.tagline}
            </span>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          <div className="relative group">
            <Link
              href="/services"
              className="flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Services
              <ChevronDown className="size-3.5" />
            </Link>
            <div className="invisible absolute left-0 top-full z-50 pt-2 opacity-0 transition-all group-hover:visible group-hover:opacity-100">
              <div className="card-2d-sm min-w-[200px] p-2 bg-white">
                {serviceSlugs.map((slug) => (
                  <Link
                    key={slug}
                    href={`/services/${slug}`}
                    className="block rounded-lg px-3 py-2 text-sm font-medium hover:bg-muted"
                  >
                    {services[slug].name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          {navLinks.filter((l) => l.href !== "/services").map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/contact"
            className={cn(buttonVariants({ variant: "ghost" }), "rounded-full")}
          >
            {siteConfig.ctaSecondary}
          </Link>
          <CtaButton size="lg" />
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger
            className={cn(
              buttonVariants({ variant: "outline", size: "icon" }),
              "rounded-full md:hidden"
            )}
          >
            <Menu className="size-5" />
            <span className="sr-only">Open menu</span>
          </SheetTrigger>
          <SheetContent side="right" className="w-80">
            <SheetHeader>
              <SheetTitle>{siteConfig.name}</SheetTitle>
            </SheetHeader>
            <nav className="mt-8 flex flex-col gap-2">
              <p className="px-3 text-xs font-semibold uppercase text-muted-foreground">Services</p>
              {serviceSlugs.map((slug) => (
                <Link
                  key={slug}
                  href={`/services/${slug}`}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-2 text-base font-medium hover:bg-muted"
                >
                  {services[slug].name}
                </Link>
              ))}
              <div className="my-2 border-t border-border" />
              {navLinks.filter((l) => l.href !== "/services").map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "rounded-lg px-3 py-2 text-lg font-medium hover:bg-muted"
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2 text-lg font-medium hover:bg-muted"
              >
                Contact
              </Link>
              <div className="pt-4">
                <CtaButton className="w-full justify-center" />
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
