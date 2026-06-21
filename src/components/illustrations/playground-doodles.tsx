import { cn } from "@/lib/utils";

type DoodleSideProps = {
  side: "left" | "right";
  className?: string;
};

/** Hand-drawn style side doodles flanking the dashboard — Playground reference. */
export function PlaygroundDoodle({ side, className }: DoodleSideProps) {
  const flip = side === "right";

  return (
    <svg
      viewBox="0 0 160 220"
      className={cn("w-24 sm:w-32 lg:w-36 shrink-0 opacity-90", flip && "scale-x-[-1]", className)}
      aria-hidden
    >
      {/* Bookshelf */}
      <rect x="20" y="40" width="100" height="140" rx="4" fill="#F5E6D3" stroke="#1E2A4A" strokeWidth="2" />
      <rect x="28" y="52" width="84" height="8" fill="#6BA3D6" stroke="#1E2A4A" strokeWidth="1.5" />
      <rect x="28" y="68" width="36" height="28" fill="#FF6B4A" stroke="#1E2A4A" strokeWidth="1.5" />
      <rect x="70" y="68" width="42" height="28" fill="#FFD166" stroke="#1E2A4A" strokeWidth="1.5" />
      <rect x="28" y="104" width="50" height="24" fill="#7DD3C0" stroke="#1E2A4A" strokeWidth="1.5" />
      <rect x="84" y="104" width="28" height="24" fill="#6BA3D6" stroke="#1E2A4A" strokeWidth="1.5" />
      {/* Globe / mug on top */}
      <circle cx="70" cy="28" r="14" fill="#7DD3C0" stroke="#1E2A4A" strokeWidth="2" />
      <ellipse cx="70" cy="28" rx="14" ry="5" fill="none" stroke="#1E2A4A" strokeWidth="1" />
      {/* Small character */}
      <circle cx="130" cy="180" r="10" fill="#FFD166" stroke="#1E2A4A" strokeWidth="2" />
      <rect x="122" y="190" width="16" height="22" rx="4" fill="#6BA3D6" stroke="#1E2A4A" strokeWidth="2" />
      {/* Slide */}
      <path d="M115 160 L145 120 L155 160 Z" fill="#6BA3D6" stroke="#1E2A4A" strokeWidth="2" />
      {/* Teddy */}
      <circle cx="45" cy="175" r="8" fill="#D4A574" stroke="#1E2A4A" strokeWidth="1.5" />
      <circle cx="38" cy="168" r="4" fill="#D4A574" stroke="#1E2A4A" strokeWidth="1" />
      <circle cx="52" cy="168" r="4" fill="#D4A574" stroke="#1E2A4A" strokeWidth="1" />
    </svg>
  );
}
