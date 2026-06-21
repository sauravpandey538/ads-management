import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";
import { PrimaryButton } from "@/components/shared/primary-button";

type CtaButtonProps = {
  href?: string;
  variant?: "primary" | "secondary" | "outline";
  size?: "default" | "lg";
  className?: string;
  children?: React.ReactNode;
};

export function CtaButton({
  href = "/free-audit",
  variant = "primary",
  size = "default",
  className,
  children,
}: CtaButtonProps) {
  const label = children ?? siteConfig.ctaPrimary;

  if (variant === "primary") {
    return (
      <PrimaryButton href={href} size={size} className={className}>
        {label}
      </PrimaryButton>
    );
  }

  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-transform",
        variant === "secondary" && "bg-sky/30 text-ink card-2d-sm px-6 py-3 card-2d-hover",
        variant === "outline" && "bg-white text-ink card-2d-sm px-6 py-3 card-2d-hover",
        size === "lg" && "px-8 py-4 text-base",
        className
      )}
    >
      {label}
    </Link>
  );
}
