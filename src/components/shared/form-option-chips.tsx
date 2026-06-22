import { cn } from "@/lib/utils";

/** Single-select chip grid — shared by audit and strategy call forms */
export function FormOptionChips<T extends string>({
  options,
  value,
  onChange,
  columns = 2,
}: {
  options: readonly { id: T; label: string }[];
  value: T | "";
  onChange: (id: T) => void;
  columns?: 1 | 2 | 3;
}) {
  return (
    <div
      className={cn(
        "grid gap-2",
        columns === 1 && "grid-cols-1",
        columns === 2 && "grid-cols-1 sm:grid-cols-2",
        columns === 3 && "grid-cols-2 sm:grid-cols-3",
      )}
    >
      {options.map((opt) => (
        <button
          key={opt.id}
          type="button"
          aria-pressed={value === opt.id}
          onClick={() => onChange(opt.id)}
          className={cn(
            "rounded-lg px-3 py-2.5 text-left text-sm font-semibold border-2 transition-all",
            value === opt.id
              ? "bg-primary text-white border-ink shadow-[2px_2px_0_0_var(--ink)]"
              : "bg-white border-ink/25 hover:border-ink/50 shadow-[2px_2px_0_0_var(--ink)]",
          )}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
