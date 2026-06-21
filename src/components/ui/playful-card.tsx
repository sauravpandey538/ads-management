import { cn } from "@/lib/utils";

export type PlayfulCardVariant = "ticket" | "stamp" | "pin" | "flag";

type PlayfulCardProps = {
  children: React.ReactNode;
  variant?: PlayfulCardVariant;
  tone?: "neutral" | "mint" | "rose" | "sky" | "sun";
  className?: string;
  hover?: boolean;
};

const toneBg: Record<NonNullable<PlayfulCardProps["tone"]>, string> = {
  neutral: "bg-white",
  mint: "bg-mint/25",
  rose: "bg-[#FFE8E8]",
  sky: "bg-sky/20",
  sun: "bg-sun/30",
};

const variantShell: Record<PlayfulCardVariant, string> = {
  /* Perforated ticket — side notches */
  ticket: cn(
    "border-[2.5px] border-ink rounded-xl",
    "shadow-[5px_5px_0_0_var(--ink)]",
    "[clip-path:polygon(0%_0%,100%_0%,100%_100%,0%_100%,0%_92%,2.5%_88%,0%_84%,0%_16%,2.5%_12%,0%_8%)]"
  ),
  /* Rotated stamp — dashed frame */
  stamp: cn(
    "border-2 border-dashed border-ink rounded-lg",
    "shadow-[4px_4px_0_0_var(--ink)]",
    "-rotate-1"
  ),
  /* Pinned note — push pin + tight shadow */
  pin: cn(
    "relative border-[2.5px] border-ink rounded-lg",
    "shadow-[3px_3px_0_0_var(--ink)]",
    "before:absolute before:top-0 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2",
    "before:size-4 before:rounded-full before:bg-primary before:border-2 before:border-ink",
    "after:absolute after:top-0 after:left-1/2 after:-translate-x-1/2 after:-translate-y-[30%]",
    "after:size-1.5 after:rounded-full after:bg-ink/20"
  ),
  /* Flag banner — chevron tail */
  flag: cn(
    "border-[2.5px] border-ink rounded-l-xl rounded-r-md",
    "shadow-[5px_4px_0_0_var(--ink)]",
    "[clip-path:polygon(0%_0%,calc(100%-14px)_0%,100%_50%,calc(100%-14px)_100%,0%_100%)]"
  ),
};

/** Content cards in 4 badge-inspired shapes — ticket, stamp, pin, flag. */
export function PlayfulCard({
  children,
  variant = "ticket",
  tone = "neutral",
  className,
  hover = true,
}: PlayfulCardProps) {
  return (
    <div
      className={cn(
        variantShell[variant],
        toneBg[tone],
        hover && "transition-[transform,box-shadow] duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[7px_7px_0_0_var(--ink)]",
        className
      )}
    >
      {children}
    </div>
  );
}

/** Small label inside a PlayfulCard — reuses the same variant family at chip scale. */
export function PlayfulCardLabel({
  children,
  variant = "chip" as "ticket" | "stamp" | "pin" | "flag" | "chip",
  className,
}: {
  children: React.ReactNode;
  variant?: PlayfulCardVariant | "chip";
  className?: string;
}) {
  const chipStyles: Record<PlayfulCardVariant | "chip", string> = {
    ticket:
      "bg-sun/60 border-2 border-ink text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 [clip-path:polygon(0%_0%,100%_0%,100%_100%,0%_100%,0%_70%,6%_65%,0%_60%,0%_40%,6%_35%,0%_30%)]",
    stamp:
      "bg-white border-2 border-dashed border-ink text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 -rotate-2",
    pin: "bg-white border-2 border-ink text-[10px] font-bold px-2 py-1 shadow-[1px_1px_0_0_var(--ink)]",
    flag: "bg-sky/50 border-2 border-ink text-[10px] font-bold px-2 py-0.5 [clip-path:polygon(0%_0%,calc(100%-6px)_0%,100%_50%,calc(100%-6px)_100%,0%_100%)]",
    chip: "bg-primary/20 border-2 border-ink/30 rounded-full text-[10px] font-bold px-2 py-0.5",
  };

  return (
    <span className={cn("inline-flex shrink-0 items-center text-ink", chipStyles[variant], className)}>
      {children}
    </span>
  );
}
