import Link from "next/link";
import { cn } from "@/lib/utils";

type PrimaryButtonProps = {
  href?: string;
  children: React.ReactNode;
  className?: string;
  size?: "default" | "lg";
  /** Offer sticker — e.g. "Free" on the top-right corner */
  badge?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
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
  badge,
  onClick,
  type = "button",
  disabled = false,
}: PrimaryButtonProps) {
  const classes = cn(
    "group relative inline-flex items-center justify-center overflow-visible",
    "font-bold text-white uppercase tracking-[0.06em]",
    "bg-primary border-[2.5px] border-ink",
    "rounded-lg",
    "shadow-[4px_4px_0_0_var(--ink)]",
    "transition-[transform,box-shadow] duration-100 ease-out",
    !disabled &&
      "hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_0_var(--ink)]",
    !disabled && "active:translate-x-[4px] active:translate-y-[4px] active:shadow-none",
    disabled && "opacity-50 cursor-not-allowed pointer-events-none",
    size === "lg" ? "px-6 py-3.5 text-sm sm:text-[15px]" : "px-5 py-2.5 text-sm",
    className
  );

  const inner = (
    <>
      {badge && (
        <span
          className="absolute -top-2.5 -right-2 z-10 rotate-6 rounded-md border-2 border-ink bg-sun px-1.5 py-0.5 text-[10px] font-black uppercase tracking-wider text-ink shadow-[2px_2px_0_0_var(--ink)] pointer-events-none"
          aria-hidden
        >
          {badge}
        </span>
      )}
      <span className="flex items-center gap-2">
        {children}
        <span
          aria-hidden
          className="inline-block size-2 border-r-2 border-t-2 border-white rotate-45 translate-x-[-2px] group-hover:translate-x-0 transition-transform"
        />
      </span>
    </>
  );

  const offerLabel =
    badge && typeof children === "string" ? `${badge} ${children}` : undefined;

  if (href) {
    return (
      <Link href={href} className={classes} aria-label={offerLabel} onClick={onClick}>
        {inner}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={classes}
      aria-label={offerLabel}
      disabled={disabled}
    >
      {inner}
    </button>
  );
}
