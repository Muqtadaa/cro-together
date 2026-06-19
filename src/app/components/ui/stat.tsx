import { cn } from "./utils";
import { serif, sans } from "../../../lib/typography";
import { CountUp } from "../../../lib/count-up";

/**
 * A metric/stat display: large Newsreader value + small Manrope label.
 * Used for proof stats, annual snapshots, and case study metrics.
 *
 * Usage:
 *   <Stat value="$15.1M" label="Incremental revenue in 2025" variant="dark" />
 *   <Stat value="+291%" label="Panel Click-Through" variant="light" size="sm" borderTop />
 *   <Stat value="$15.1M" label="..." animated />  ← counts up on scroll into view
 */

const VALUE_SIZE = {
  xl: "64px",
  lg: "48px",
  fluid: "clamp(32px, 3.5vw, 52px)",
  md: "32px",
  sm: "22px",
} as const;

interface StatProps {
  value: string;
  label: string;
  /**
   * "dark"  — gold value, muted label (for navy section backgrounds)
   * "light" — navy value, body-gray label (for light section backgrounds)
   */
  variant?: "dark" | "light";
  size?: keyof typeof VALUE_SIZE;
  /** Adds `border-t` separator above — styled for current variant */
  borderTop?: boolean;
  /** Count the number up from zero when it scrolls into view */
  animated?: boolean;
  className?: string;
}

export function Stat({
  value,
  label,
  variant = "dark",
  size = "lg",
  borderTop = false,
  animated = false,
  className,
}: StatProps) {
  const isDark = variant === "dark";
  const valueStyle = {
    fontFamily: serif,
    fontWeight: 400,
    fontSize: VALUE_SIZE[size],
    lineHeight: 1,
  };

  return (
    <div
      className={cn(
        "flex flex-col gap-2",
        borderTop && (isDark
          ? "py-6 border-t border-[rgba(255,255,255,0.1)]"
          : "py-6 border-t border-[rgba(0,0,0,0.06)]"),
        className,
      )}
    >
      {animated ? (
        <CountUp
          value={value}
          className={isDark ? "text-gold" : "text-navy"}
          style={valueStyle}
        />
      ) : (
        <span
          className={isDark ? "text-gold" : "text-navy"}
          style={valueStyle}
        >
          {value}
        </span>
      )}
      <p
        className={isDark ? "text-text-muted-invert" : "text-text-body"}
        style={{ fontFamily: sans, fontWeight: 200, fontSize: "14px", lineHeight: "1.5" }}
      >
        {label}
      </p>
    </div>
  );
}
