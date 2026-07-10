interface LogoProps {
  className?: string;
  iconSize?: number;
  showWordmark?: boolean;
  wordmarkSize?: "sm" | "md" | "lg";
  /** Deprecated. Tagline is no longer shown per design spec. */
  tagline?: string;
}

export default function Logo({
  className = "",
  iconSize = 28,
  showWordmark = true,
  wordmarkSize = "md",
}: LogoProps) {
  const boxSize = wordmarkSize === "sm" ? 36 : wordmarkSize === "lg" ? 80 : 48;
  const textClass =
    wordmarkSize === "sm" ? "text-lg" : wordmarkSize === "lg" ? "text-3xl" : "text-xl";

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* Premium, ultra-crisp vector logo */}
      <svg
        viewBox="0 0 100 100"
        width={boxSize}
        height={boxSize}
        className="flex-shrink-0 drop-shadow-[0_0_12px_rgba(0,240,255,0.25)]"
        aria-label="CredChain Logo"
      >
        <defs>
          {/* Main cyber brand gradient */}
          <linearGradient id="credchain-logo-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00F0FF" />
            <stop offset="100%" stopColor="#9D00FF" />
          </linearGradient>
          
          {/* Subtle background glow/fill */}
          <radialGradient id="credchain-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#00F0FF" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#9D00FF" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Ambient background radial glow */}
        <circle cx="50" cy="50" r="45" fill="url(#credchain-glow)" />

        {/* Outer sharp technical hexagon */}
        <polygon
          points="50,6 88,28 88,72 50,94 12,72 12,28"
          fill="none"
          stroke="url(#credchain-logo-grad)"
          strokeWidth="5"
          strokeLinejoin="round"
          className="animate-pulse"
          style={{ animationDuration: "3s" }}
        />

        {/* Inner dashed connection line */}
        <polygon
          points="50,16 80,33 80,67 50,84 20,67 20,33"
          fill="rgba(13, 14, 25, 0.5)"
          stroke="url(#credchain-logo-grad)"
          strokeWidth="1.5"
          strokeDasharray="4, 3"
          strokeLinejoin="round"
          opacity="0.75"
        />

        {/* Network node joints at the hexagon vertices */}
        <circle cx="50" cy="6" r="3.5" fill="#00F0FF" />
        <circle cx="88" cy="28" r="3.5" fill="#9D00FF" />
        <circle cx="88" cy="72" r="3.5" fill="#9D00FF" />
        <circle cx="50" cy="94" r="3.5" fill="#00F0FF" />
        <circle cx="12" cy="72" r="3.5" fill="#00F0FF" />
        <circle cx="12" cy="28" r="3.5" fill="#9D00FF" />

        {/* Dynamic credential checkmark/chain symbol */}
        <path
          d="M32,50 L45,63 L68,36"
          fill="none"
          stroke="url(#credchain-logo-grad)"
          strokeWidth="7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      {showWordmark && (
        <span
          className={`font-display font-bold tracking-tight leading-none bg-gradient-to-r from-[#00F0FF] to-[#9D00FF] bg-clip-text text-transparent ${textClass}`}
        >
          CredChain
        </span>
      )}
    </div>
  );
}
