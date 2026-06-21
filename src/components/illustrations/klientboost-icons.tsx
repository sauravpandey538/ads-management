import { cn } from "@/lib/utils";

type KlientBoostIconsProps = {
  className?: string;
};

function Face({ cx, cy }: { cx: number; cy: number }) {
  return (
    <>
      <circle cx={cx} cy={cy - 2} r="1.2" fill="#1E2A4A" />
      <circle cx={cx + 4} cy={cy - 2} r="1.2" fill="#1E2A4A" />
      <path d={`M${cx - 2} ${cy + 2} Q${cx + 2} ${cy + 5} ${cx + 6} ${cy + 2}`} stroke="#1E2A4A" strokeWidth="1" fill="none" />
    </>
  );
}

/** KlientBoost-style row of happy marketing doodles with faces. */
export function KlientBoostIcons({ className }: KlientBoostIconsProps) {
  return (
    <svg viewBox="0 0 900 100" className={cn("w-full max-w-4xl mx-auto h-20 sm:h-24", className)} aria-hidden>
      {/* Money bag */}
      <ellipse cx="45" cy="75" rx="22" ry="8" fill="#5C6B2D" />
      <path d="M30 75 V45 Q45 30 60 45 V75" fill="#FFD166" stroke="#1E2A4A" strokeWidth="2" />
      <text x="45" y="58" textAnchor="middle" fill="#1E2A4A" fontSize="14" fontWeight="bold">$</text>
      <Face cx={41} cy={52} />
      {/* Magnet */}
      <path d="M95 35 H125 V55 Q110 70 95 55 Z" fill="#FF6B4A" stroke="#1E2A4A" strokeWidth="2" />
      <rect x="95" y="55" width="12" height="20" fill="#888" stroke="#1E2A4A" strokeWidth="1.5" />
      <rect x="113" y="55" width="12" height="20" fill="#888" stroke="#1E2A4A" strokeWidth="1.5" />
      <Face cx={106} cy={48} />
      {/* Speech bubble */}
      <rect x="145" y="30" width="40" height="35" rx="8" fill="#9B6BD4" stroke="#1E2A4A" strokeWidth="2" />
      <path d="M155 65 L150 75 L165 65" fill="#9B6BD4" stroke="#1E2A4A" strokeWidth="2" />
      <Face cx={160} cy={48} />
      {/* Browser */}
      <rect x="205" y="28" width="50" height="40" rx="6" fill="#fff" stroke="#1E2A4A" strokeWidth="2" />
      <rect x="205" y="28" width="50" height="10" fill="#6BA3D6" stroke="#1E2A4A" strokeWidth="2" />
      <Face cx={225} cy={52} />
      {/* Magnifying glass */}
      <circle cx="295" cy="50" r="18" fill="none" stroke="#1E2A4A" strokeWidth="3" />
      <line x1="308" y1="63" x2="322" y2="77" stroke="#1E2A4A" strokeWidth="3" />
      <Face cx={291} cy={48} />
      {/* Keyword block green */}
      <rect x="340" y="32" width="55" height="35" rx="4" fill="#7DD3C0" stroke="#1E2A4A" strokeWidth="2" />
      <text x="367" y="54" textAnchor="middle" fill="#1E2A4A" fontSize="8" fontWeight="bold">KEYWORD</text>
      <Face cx={360} cy={46} />
      {/* Clipboard */}
      <rect x="415" y="30" width="38" height="48" rx="4" fill="#fff" stroke="#1E2A4A" strokeWidth="2" />
      <rect x="425" y="24" width="18" height="8" rx="2" fill="#888" stroke="#1E2A4A" strokeWidth="1.5" />
      <line x1="422" y1="44" x2="446" y2="44" stroke="#1E2A4A" strokeWidth="1" />
      <line x1="422" y1="52" x2="446" y2="52" stroke="#1E2A4A" strokeWidth="1" />
      <Face cx={428} cy={58} />
      {/* Phone */}
      <rect x="475" y="28" width="28" height="48" rx="6" fill="#1E2A4A" stroke="#1E2A4A" strokeWidth="2" />
      <rect x="480" y="36" width="18" height="30" rx="2" fill="#6BA3D6" />
      <Face cx={486} cy={48} />
      {/* Price tag */}
      <path d="M530 35 L560 35 L570 50 L545 70 L520 50 Z" fill="#FFD166" stroke="#1E2A4A" strokeWidth="2" />
      <circle cx="555" cy="42" r="4" fill="#fff" stroke="#1E2A4A" strokeWidth="1" />
      <Face cx={542} cy={52} />
      {/* Keyword orange */}
      <rect x="585" y="32" width="55" height="35" rx="4" fill="#FF6B4A" stroke="#1E2A4A" strokeWidth="2" />
      <text x="612" y="54" textAnchor="middle" fill="#fff" fontSize="8" fontWeight="bold">KEYWORD</text>
      <Face cx={605} cy={46} />
      {/* Coins */}
      <ellipse cx="680" cy="72" rx="18" ry="6" fill="#FFD166" stroke="#1E2A4A" strokeWidth="2" />
      <ellipse cx="680" cy="62" rx="18" ry="6" fill="#FFD166" stroke="#1E2A4A" strokeWidth="2" />
      <Face cx={673} cy={58} />
      {/* Envelope */}
      <rect x="720" y="35" width="45" height="32" rx="4" fill="#fff" stroke="#1E2A4A" strokeWidth="2" />
      <path d="M720 35 L742 52 L765 35" fill="none" stroke="#1E2A4A" strokeWidth="1.5" />
      <Face cx={736} cy={52} />
      {/* Ruler */}
      <rect x="785" y="38" width="55" height="18" rx="2" fill="#FFD166" stroke="#1E2A4A" strokeWidth="2" />
      <Face cx={805} cy={48} />
    </svg>
  );
}
