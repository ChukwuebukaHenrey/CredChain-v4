import logoImg from "../assets/logo.png";

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
  const boxSize = wordmarkSize === "sm" ? 46 : wordmarkSize === "lg" ? 96 : 72;
  const textClass =
    wordmarkSize === "sm" ? "text-[20px]" : wordmarkSize === "lg" ? "text-[36px]" : "text-[28px]";

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      <img
        src={logoImg}
        alt="CredChain Logo"
        width={boxSize}
        height={boxSize}
        referrerPolicy="no-referrer"
        className="object-contain flex-shrink-0"
      />
      {showWordmark && (
        <span
          className={`font-display font-semibold tracking-tight leading-none text-txt-primary ${textClass}`}
        >
          CredChain
        </span>
      )}
    </div>
  );
}
