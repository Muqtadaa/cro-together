/**
 * Scroll-triggered reveal components, CSS-first.
 *
 * <Reveal> wraps any block element with a fade-up entrance when it enters
 * the viewport. <RevealItem> is the same but accepts an `index` for staggered
 * grids / lists.
 *
 * The HTML always ships visible: these components only render a
 * `.reveal` div with a `data-inview` flag and a `--reveal-delay` custom
 * property. The fade lives in delight.css and applies only when the document
 * has the `html.js` class (set inline in src/root.tsx before first paint) and
 * the user has not asked for reduced motion. Prerendered pages therefore stay
 * fully readable for crawlers, agents and browsers without JavaScript.
 */
import { useEffect, useRef, useState } from "react";

/** One IntersectionObserver shared by every reveal on the page. */
let observer: IntersectionObserver | null = null;
const callbacks = new WeakMap<Element, () => void>();

function observe(el: Element, onEnter: () => void) {
  if (typeof IntersectionObserver === "undefined") {
    onEnter();
    return () => {};
  }
  observer ??= new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        callbacks.get(entry.target)?.();
        callbacks.delete(entry.target);
        observer?.unobserve(entry.target);
      }
    },
    { rootMargin: "-60px 0px" },
  );
  callbacks.set(el, onEnter);
  observer.observe(el);
  return () => {
    callbacks.delete(el);
    observer?.unobserve(el);
  };
}

/** True once the element has entered the viewport (never flips back). */
function useInViewOnce(ref: React.RefObject<Element | null>) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    return observe(el, () => setInView(true));
  }, [ref]);
  return inView;
}

interface RevealProps {
  children: React.ReactNode;
  /** Seconds before the fade starts once in view */
  delay?: number;
  className?: string;
}

function RevealBox({ children, delay = 0, className }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInViewOnce(ref);

  return (
    <div
      ref={ref}
      className={className ? `reveal ${className}` : "reveal"}
      data-inview={inView ? "true" : "false"}
      style={delay ? ({ "--reveal-delay": `${delay}s` } as React.CSSProperties) : undefined}
    >
      {children}
    </div>
  );
}

export function Reveal({ children, delay = 0, className }: RevealProps) {
  return (
    <RevealBox delay={delay} className={className}>
      {children}
    </RevealBox>
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
  return (
    <RevealBox delay={baseDelay + index * 0.07} className={className}>
      {children}
    </RevealBox>
  );
}
