import { cn } from "./utils";

/**
 * Wraps the repeated `<section bg> <div max-w-[1280px] mx-auto px-8 py-N>` pattern.
 *
 * Usage:
 *   <PageSection bg="beige" py="lg">…</PageSection>
 *   <PageSection bg="navy" py="xl" narrow>…</PageSection>
 *   <PageSection bg="cream" py="md" borderTop innerClassName="flex flex-col gap-12">…</PageSection>
 */

const BG = {
  beige: "bg-beige",
  cream: "bg-cream",
  navy: "bg-navy",
  "navy-mid": "bg-navy-mid",
  white: "bg-white",
} as const;

const PY = {
  none: "",
  sm: "py-12",
  md: "py-16",
  hero: "py-20",
  lg: "py-24",
  xl: "py-32",
} as const;

interface PageSectionProps {
  bg?: keyof typeof BG;
  py?: keyof typeof PY;
  /** Constrains inner container to 768px instead of 1280px */
  narrow?: boolean;
  /** Adds a subtle top border — `border-t border-[rgba(0,0,0,0.06)]` */
  borderTop?: boolean;
  /** Extra classes on the outer `<section>` */
  className?: string;
  /** Extra classes on the inner container `<div>` */
  innerClassName?: string;
  children: React.ReactNode;
}

export function PageSection({
  bg = "cream",
  py = "md",
  narrow = false,
  borderTop = false,
  className,
  innerClassName,
  children,
}: PageSectionProps) {
  return (
    <section
      className={cn(
        BG[bg],
        borderTop && "border-t border-[rgba(0,0,0,0.06)]",
        className,
      )}
    >
      <div
        className={cn(
          narrow ? "max-w-[768px]" : "max-w-[1280px]",
          "mx-auto px-4 sm:px-6 lg:px-8",
          PY[py],
          innerClassName,
        )}
      >
        {children}
      </div>
    </section>
  );
}
