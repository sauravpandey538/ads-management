import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

type StarRatingProps = {
  /** Rating value (e.g. 4.9). */
  value: number;
  max?: number;
  size?: "sm" | "md";
  className?: string;
  /** Expose rating to search engines via microdata when true. */
  itemProp?: boolean;
};

/** Accessible star display — used in hero, testimonials, and review schema markup. */
export function StarRating({
  value,
  max = 5,
  size = "sm",
  className,
  itemProp = false,
}: StarRatingProps) {
  const starSize = size === "sm" ? "size-4" : "size-5";
  const rounded = Math.round(value * 2) / 2;

  return (
    <div
      className={cn("flex items-center", className)}
      role="img"
      aria-label={`${value} out of ${max} stars`}
      {...(itemProp
        ? {
            itemProp: "reviewRating",
            itemScope: true,
            itemType: "https://schema.org/Rating",
          }
        : {})}
    >
      {itemProp && (
        <>
          <meta itemProp="ratingValue" content={String(value)} />
          <meta itemProp="bestRating" content={String(max)} />
        </>
      )}
      <div className="flex">
        {Array.from({ length: max }, (_, i) => {
          const filled = rounded >= i + 1;
          const half = !filled && rounded >= i + 0.5;
          return (
            <Star
              key={i}
              className={cn(
                starSize,
                filled || half ? "fill-sun text-sun" : "fill-muted text-muted-foreground/30",
                half && "opacity-80"
              )}
              aria-hidden
            />
          );
        })}
      </div>
    </div>
  );
}
