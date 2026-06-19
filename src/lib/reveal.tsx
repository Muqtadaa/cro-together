/**
 * Scroll-triggered reveal components.
 *
 * <Reveal> wraps any block element with a fade-up entrance when it enters
 * the viewport. <RevealItem> is the same but accepts an `index` for staggered
 * grids / lists.
 *
 * Both respect prefers-reduced-motion — motion reduces to a simple opacity
 * fade (no y-axis movement) when the user has reduced motion enabled.
 */
import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef } from "react";

const EASE = [0.25, 1, 0.5, 1] as const;

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export function Reveal({ children, delay = 0, className }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px 0px" });
  const reduced = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: reduced ? 0 : 18 }}
      animate={isInView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: reduced ? 0.2 : 0.55, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** Like Reveal but `index` drives the stagger delay automatically. */
export function RevealItem({
  children,
  index = 0,
  baseDelay = 0,
  className,
}: {
  children: React.ReactNode;
  index?: number;
  /** Extra delay before the stagger starts */
  baseDelay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px 0px" });
  const reduced = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: reduced ? 0 : 18 }}
      animate={isInView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: reduced ? 0.2 : 0.55, delay: reduced ? 0 : baseDelay + index * 0.07, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
