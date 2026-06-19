/**
 * <CountUp> — animates a numeric stat string from 0 to its value when it
 * enters the viewport for the first time.
 *
 * Handles prefixes (+, −, $) and suffixes (%, M, K).
 * Falls back to plain display for non-numeric values like "2 LOBs".
 * Respects prefers-reduced-motion — skips animation when enabled.
 */
import { useEffect, useRef } from "react";
import { animate } from "motion";
import { useInView } from "motion/react";

interface ParsedValue {
  prefix: string;
  num: number;
  decimals: number;
  suffix: string;
}

/**
 * Parse a stat string into animatable parts.
 * Returns null if the value isn't suitable for count-up animation.
 */
function parseStatValue(value: string): ParsedValue | null {
  // Match: optional prefix chars, a number (int or decimal), optional short suffix
  const match = value.match(/^([+\-−$]?)(\d+\.?\d*)([%MKk]?)$/);
  if (!match) return null;
  const num = parseFloat(match[2]);
  if (isNaN(num)) return null;
  return {
    prefix: match[1],
    num,
    decimals: match[2].includes(".") ? 1 : 0,
    suffix: match[3],
  };
}

function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

interface CountUpProps extends React.HTMLAttributes<HTMLSpanElement> {
  value: string;
}

export function CountUp({ value, ...spanProps }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref as React.RefObject<Element>, { once: true });
  const hasAnimated = useRef(false);
  const parsed = parseStatValue(value);

  useEffect(() => {
    if (!isInView || !parsed || !ref.current || hasAnimated.current) return;
    if (prefersReducedMotion()) return;
    hasAnimated.current = true;

    const el = ref.current;
    // Start from ~40% of the value so large numbers don't start at zero (looks better)
    const startFrom = parsed.num > 50 ? parsed.num * 0.35 : 0;

    const stop = animate(startFrom, parsed.num, {
      duration: 1.5,
      ease: [0.25, 1, 0.5, 1],
      onUpdate(latest) {
        el.textContent = `${parsed.prefix}${latest.toFixed(parsed.decimals)}${parsed.suffix}`;
      },
      onComplete() {
        // Restore exact original string at end to avoid floating-point artifacts
        el.textContent = value;
      },
    });

    return () => stop.stop();
  }, [isInView]);

  return (
    <span ref={ref} {...spanProps}>
      {value}
    </span>
  );
}
