import { cn } from "@/lib/utils";

export type PlayfulBadgeVariant = "ticket" | "stamp" | "pin" | "flag" | "chip";

type PlayfulBadgeProps = {
  children: React.ReactNode;
  variant?: PlayfulBadgeVariant;
  className?: string;
};

const variantStyles: Record<PlayfulBadgeVariant, string> = {
  /* Perforated ticket notch on the sides */
  ticket:
    "bg-sun/50 text-ink border-2 border-ink/80 rounded-md px-3 py-1 [clip-path:polygon(0%_0%,100%_0%,100%_100%,0%_100%,0%_75%,4%_70%,0%_65%,0%_35%,4%_30%,0%_25%)]",
  /* Rotated stamp look */
  stamp:
    "bg-mint/40 text-ink border-2 border-dashed border-ink/60 rounded-sm px-3 py-1 -rotate-2 font-semibold uppercase tracking-wide text-[11px]",
  /* Push-pin note */
  pin: "relative bg-white text-ink border-2 border-ink/70 rounded-sm px-3 py-1.5 pt-3 shadow-[2px_2px_0_0_rgba(30,42,74,0.2)] before:absolute before:top-0 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:size-2.5 before:rounded-full before:bg-primary before:border before:border-ink/70",
  /* Wavy flag banner */
  flag:
    "bg-sky/40 text-ink border-2 border-ink/70 rounded-l-md rounded-r-sm px-3 py-1 font-medium [clip-path:polygon(0%_0%,calc(100%-8px)_0%,100%_50%,calc(100%-8px)_100%,0%_100%)]",
  /* Simple rounded chip — default fallback */
  chip: "bg-primary/15 text-ink border-2 border-ink/20 rounded-full px-3 py-0.5 text-xs font-semibold",
};

/** Unique badge shapes so labels don't feel like generic AI pills. */
export function PlayfulBadge({
  children,
  variant = "chip",
  className,
}: PlayfulBadgeProps) {
  return (
    <span className={cn("inline-flex items-center text-xs", variantStyles[variant], className)}>
      {children}
    </span>
  );
}
