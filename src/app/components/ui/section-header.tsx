import { cn } from "./utils";
import { serif, sans } from "../../../lib/typography";

/**
 * Eyebrow label + section heading + optional description.
 * Handles the most repeated structural pattern across all page sections.
 *
 * Usage:
 *   <SectionHeader eyebrow="Core Competencies" title="A clinical breakdown of skills." />
 *   <SectionHeader eyebrow="Strategic Methodology" eyebrowBadge title={<>Drive Real <em>Outcomes.</em></>} as="h1" size="xl" />
 *   <SectionHeader title="Boutique Services" description="I don't offer cookie-cutter packages." variant="dark" />
 */

const TITLE_SIZE = {
  /** clamp 36→60px — large section h2s */
  xl: { fontSize: "clamp(36px, 4.5vw, 60px)", lineHeight: "1.05" },
  /** clamp 32→48px — mid-page h2s */
  lg: { fontSize: "clamp(32px, 4vw, 48px)", lineHeight: "1.1" },
  /** clamp 28→44px — supporting section h2s */
  md: { fontSize: "clamp(28px, 3.5vw, 44px)", lineHeight: "1.1" },
  /** 36px fixed — smaller h2s */
  sm: { fontSize: "36px", lineHeight: "1.1" },
} as const;

interface SectionHeaderProps {
  eyebrow?: string;
  /** Render eyebrow as a blue pill badge (bg-badge-blue / text-slate-dark) instead of plain text */
  eyebrowBadge?: boolean;
  title: React.ReactNode;
  titleWeight?: 200 | 400;
  size?: keyof typeof TITLE_SIZE;
  description?: React.ReactNode;
  /** "dark" = white heading, gold eyebrow (for navy section backgrounds) */
  variant?: "light" | "dark";
  as?: "h1" | "h2";
  className?: string;
}

export function SectionHeader({
  eyebrow,
  eyebrowBadge = false,
  title,
  titleWeight = 200,
  size = "lg",
  description,
  variant = "light",
  as: Tag = "h2",
  className,
}: SectionHeaderProps) {
  const isDark = variant === "dark";

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      {eyebrow && (
        eyebrowBadge ? (
          <span
            className="inline-flex items-center bg-badge-blue text-slate-dark uppercase px-3 py-1 rounded-sm self-start"
            style={{ fontFamily: sans, fontWeight: 200, fontSize: "10px", letterSpacing: "2px" }}
          >
            {eyebrow}
          </span>
        ) : (
          <span
            className={cn("uppercase", isDark ? "text-gold" : "text-slate")}
            style={{ fontFamily: sans, fontWeight: 200, fontSize: "10px", letterSpacing: "2px" }}
          >
            {eyebrow}
          </span>
        )
      )}

      <Tag
        className={isDark ? "text-white" : "text-navy"}
        style={{
          fontFamily: serif,
          fontWeight: titleWeight,
          ...TITLE_SIZE[size],
        }}
      >
        {title}
      </Tag>

      {description && (
        <p
          className={isDark ? "text-[rgba(255,255,255,0.75)]" : "text-text-body"}
          style={{ fontFamily: sans, fontWeight: 200, fontSize: "18px", lineHeight: "1.65" }}
        >
          {description}
        </p>
      )}
    </div>
  );
}
