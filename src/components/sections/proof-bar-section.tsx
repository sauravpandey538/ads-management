import { Star } from "lucide-react";
import { proofBar } from "@/lib/site-config";
import { cn } from "@/lib/utils";

/** Social proof strip directly below hero CTAs. */
export function ProofBar({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "border-y-2 border-ink/10 bg-white/80 backdrop-blur-sm",
        className
      )}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-3">
        <ul className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-xs sm:text-sm font-semibold text-ink/75">
          {proofBar.map((item, i) => (
            <li key={item.label} className="flex items-center gap-3">
              {i > 0 && (
                <span className="hidden sm:inline text-ink/25" aria-hidden>
                  |
                </span>
              )}
              <span className="inline-flex items-center gap-1.5">
                {item.icon === "stars" && (
                  <span className="flex" aria-hidden>
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star key={j} className="size-3 fill-sun text-sun" />
                    ))}
                  </span>
                )}
                {item.label}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
