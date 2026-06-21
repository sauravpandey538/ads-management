import { cn } from "@/lib/utils";

type IllustrationProps = {
  className?: string;
};

/** Simple 2D ad dashboard doodle — lightweight inline SVG, no external assets. */
export function AdDashboardIllustration({ className }: IllustrationProps) {
  return (
    <svg
      viewBox="0 0 400 320"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("w-full max-w-md", className)}
      aria-hidden
    >
      <rect x="20" y="30" width="360" height="240" rx="20" fill="#E8F4FD" stroke="#1E2A4A" strokeWidth="2.5" />
      <rect x="40" y="50" width="120" height="60" rx="12" fill="#FFD166" stroke="#1E2A4A" strokeWidth="2" />
      <rect x="180" y="50" width="180" height="60" rx="12" fill="#fff" stroke="#1E2A4A" strokeWidth="2" />
      <path d="M200 90 L230 70 L260 85 L310 55 L340 75" stroke="#FF6B4A" strokeWidth="3" strokeLinecap="round" />
      <circle cx="340" cy="75" r="5" fill="#FF6B4A" />
      <rect x="40" y="130" width="320" height="120" rx="12" fill="#fff" stroke="#1E2A4A" strokeWidth="2" />
      <rect x="60" y="200" width="40" height="30" rx="6" fill="#7DD3C0" stroke="#1E2A4A" strokeWidth="1.5" />
      <rect x="110" y="180" width="40" height="50" rx="6" fill="#FF6B4A" stroke="#1E2A4A" strokeWidth="1.5" />
      <rect x="160" y="160" width="40" height="70" rx="6" fill="#6BA3D6" stroke="#1E2A4A" strokeWidth="1.5" />
      <rect x="210" y="170" width="40" height="60" rx="6" fill="#FFD166" stroke="#1E2A4A" strokeWidth="1.5" />
      <rect x="260" y="150" width="40" height="80" rx="6" fill="#7DD3C0" stroke="#1E2A4A" strokeWidth="1.5" />
      <circle cx="350" cy="40" r="18" fill="#FF6B4A" stroke="#1E2A4A" strokeWidth="2" />
      <path d="M343 40 L348 45 L358 33" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M30 280 Q80 260 130 280 T230 280 T330 280" stroke="#FFD166" strokeWidth="3" fill="none" strokeLinecap="round" />
    </svg>
  );
}

export function MoneyShieldIllustration({ className }: IllustrationProps) {
  return (
    <svg viewBox="0 0 320 280" fill="none" className={cn("w-full max-w-xs", className)} aria-hidden>
      <path d="M160 20 L280 70 V140 C280 200 160 260 160 260 C160 260 40 200 40 140 V70 Z" fill="#E8F4FD" stroke="#1E2A4A" strokeWidth="2.5" />
      <circle cx="160" cy="120" r="50" fill="#FFD166" stroke="#1E2A4A" strokeWidth="2" />
      <text x="160" y="130" textAnchor="middle" fill="#1E2A4A" fontSize="28" fontWeight="bold">$</text>
      <path d="M130 150 L150 170 L195 115" stroke="#FF6B4A" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function FunnelIllustration({ className }: IllustrationProps) {
  return (
    <svg viewBox="0 0 360 300" fill="none" className={cn("w-full max-w-sm", className)} aria-hidden>
      <path d="M60 40 H300 L240 130 H120 Z" fill="#FFD166" stroke="#1E2A4A" strokeWidth="2.5" />
      <path d="M120 130 H240 L200 210 H160 Z" fill="#FF6B4A" stroke="#1E2A4A" strokeWidth="2.5" />
      <path d="M160 210 H200 L180 260 H180 Z" fill="#7DD3C0" stroke="#1E2A4A" strokeWidth="2.5" />
      <circle cx="180" cy="250" r="12" fill="#6BA3D6" stroke="#1E2A4A" strokeWidth="2" />
      <text x="180" y="255" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">SQL</text>
    </svg>
  );
}

export function TrustHandshakeIllustration({ className }: IllustrationProps) {
  return (
    <svg viewBox="0 0 320 240" fill="none" className={cn("w-full max-w-xs", className)} aria-hidden>
      <circle cx="90" cy="100" r="40" fill="#FFD166" stroke="#1E2A4A" strokeWidth="2" />
      <circle cx="230" cy="100" r="40" fill="#6BA3D6" stroke="#1E2A4A" strokeWidth="2" />
      <path d="M110 120 L160 150 L210 120" stroke="#1E2A4A" strokeWidth="2.5" strokeLinecap="round" />
      <rect x="130" y="140" width="60" height="30" rx="8" fill="#7DD3C0" stroke="#1E2A4A" strokeWidth="2" />
      <path d="M145 155 H175" stroke="#1E2A4A" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function PlatformIconsIllustration({ className }: IllustrationProps) {
  return (
    <svg viewBox="0 0 400 120" fill="none" className={cn("w-full", className)} aria-hidden>
      {[
        { x: 20, color: "#6BA3D6", label: "Meta" },
        { x: 110, color: "#FF6B4A", label: "LI" },
        { x: 200, color: "#FF0000", label: "YT" },
        { x: 290, color: "#7DD3C0", label: "Go" },
      ].map((item) => (
        <g key={item.label}>
          <rect x={item.x} y="20" width="70" height="70" rx="16" fill={item.color} fillOpacity="0.25" stroke="#1E2A4A" strokeWidth="2" />
          <text x={item.x + 35} y="62" textAnchor="middle" fill="#1E2A4A" fontSize="14" fontWeight="bold">
            {item.label}
          </text>
        </g>
      ))}
    </svg>
  );
}

export function FooterDoodleIllustration({ className }: IllustrationProps) {
  return (
    <svg viewBox="0 0 600 80" fill="none" className={cn("w-full opacity-60", className)} aria-hidden>
      <circle cx="50" cy="40" r="20" fill="#FFD166" stroke="#1E2A4A" strokeWidth="2" />
      <rect x="100" y="25" width="40" height="30" rx="6" fill="#6BA3D6" stroke="#1E2A4A" strokeWidth="2" />
      <path d="M180 50 L200 20 L220 50 Z" fill="#FF6B4A" stroke="#1E2A4A" strokeWidth="2" />
      <rect x="250" y="30" width="50" height="20" rx="4" fill="#7DD3C0" stroke="#1E2A4A" strokeWidth="2" />
      <circle cx="350" cy="40" r="15" fill="#FFD166" stroke="#1E2A4A" strokeWidth="2" />
      <rect x="390" y="20" width="30" height="40" rx="8" fill="#6BA3D6" stroke="#1E2A4A" strokeWidth="2" />
      <path d="M460 40 H520" stroke="#FF6B4A" strokeWidth="3" strokeLinecap="round" strokeDasharray="8 6" />
    </svg>
  );
}
