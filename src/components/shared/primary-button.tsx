import Link from "next/link";
import { cn } from "@/lib/utils";

type PrimaryButtonProps = {
  href?: string;
  children: React.ReactNode;
  className?: string;
  size?: "default" | "lg";
  onClick?: () => void;
  type?: "button" | "submit";
};

/**
 * Flat 2D CTA — thick ink border, hard offset shadow, coral fill.
 * Matches KlientBoost sticker-button feel (no pill shape, no decorative clutter).
 */
export function PrimaryButton({
  href,
  children,
  className,
  size = "default",
  onClick,
  type = "button",
}: PrimaryButtonProps) {
  const classes = cn(
    "group relative inline-flex items-center justify-center",
    "font-bold text-white uppercase tracking-[0.06em]",
    "bg-primary border-[2.5px] border-ink",
    "rounded-lg",
    "shadow-[4px_4px_0_0_var(--ink)]",
    "transition-[transform,box-shadow] duration-100 ease-out",
    "hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_0_var(--ink)]",
    "active:translate-x-[4px] active:translate-y-[4px] active:shadow-none",
    size === "lg" ? "px-7 py-3.5 text-sm sm:text-[15px]" : "px-5 py-2.5 text-sm",
    className
  );

  const inner = (
    <span className="flex items-center gap-2.5">
      {children}
      <span
        aria-hidden
        className="inline-block size-2 border-r-2 border-t-2 border-white rotate-45 translate-x-[-2px] group-hover:translate-x-0 transition-transform"
      />
    </span>
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {inner}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {inner}
    </button>
  );
}
