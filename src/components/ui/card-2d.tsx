import { cn } from "@/lib/utils";

type Card2DProps = React.HTMLAttributes<HTMLDivElement> & {
  size?: "default" | "sm";
  hover?: boolean;
};

/** Flat 2D card with thick border + hard offset shadow — matches KlientBoost doodle aesthetic. */
export function Card2D({
  className,
  size = "default",
  hover = false,
  children,
  ...props
}: Card2DProps) {
  return (
    <div
      className={cn(
        size === "sm" ? "card-2d-sm" : "card-2d",
        hover && "card-2d-hover",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
