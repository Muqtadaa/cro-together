/**
 * Brand typography constants — single source of truth for font families and
 * the most-repeated inline style presets used across page components.
 *
 * Usage:
 *   import { serif, sans, tx } from "../../lib/typography";
 *   <h2 style={{ ...tx.h2Fluid, color: "#060e1a" }}>...</h2>
 */

export const serif = "'Newsreader', serif";
export const sans = "'Manrope', sans-serif";

export const tx = {
  // ── Page headings (Newsreader) ──────────────────────────────────────────
  /** Hero h1, light weight — clamp 48→96px */
  h1: { fontFamily: serif, fontWeight: 200 as const, fontSize: "clamp(48px, 6.5vw, 96px)", lineHeight: 1, letterSpacing: "-2.4px" },
  /** Hero h1, regular weight — clamp 48→96px */
  h1Bold: { fontFamily: serif, fontWeight: 400 as const, fontSize: "clamp(48px, 7vw, 96px)", lineHeight: 1, letterSpacing: "-2.4px" },
  /** Large section h2 — clamp 36→60px */
  h2Fluid: { fontFamily: serif, fontWeight: 400 as const, fontSize: "clamp(36px, 4.5vw, 60px)", lineHeight: "1.05" },
  /** Large section h2, bold variant — clamp 36→72px */
  h2LgFluid: { fontFamily: serif, fontWeight: 400 as const, fontSize: "clamp(36px, 5vw, 72px)", lineHeight: "1.05" },
  /** Fixed 48px heading */
  h2Lg: { fontFamily: serif, fontWeight: 200 as const, fontSize: "48px", lineHeight: "1.1" },
  /** Fixed 36px heading, light */
  h2: { fontFamily: serif, fontWeight: 200 as const, fontSize: "36px", lineHeight: "1.1" },
  /** Medium fluid h2 — clamp 28→44px */
  h2Md: { fontFamily: serif, fontWeight: 200 as const, fontSize: "clamp(28px, 3vw, 40px)", lineHeight: "1.2" },
  /** Serif h3 — 24px */
  h3Serif: { fontFamily: serif, fontWeight: 200 as const, fontSize: "24px", lineHeight: "1.3" },
  /** Serif h3 — 22px */
  h3: { fontFamily: serif, fontWeight: 200 as const, fontSize: "22px", lineHeight: "1.3" },

  // ── Body text (Manrope) ─────────────────────────────────────────────────
  /** 20px body */
  bodyXl: { fontFamily: sans, fontWeight: 200 as const, fontSize: "20px", lineHeight: "1.65" },
  /** 18px body */
  bodyLg: { fontFamily: sans, fontWeight: 200 as const, fontSize: "18px", lineHeight: "1.65" },
  /** 16px body */
  body: { fontFamily: sans, fontWeight: 200 as const, fontSize: "16px", lineHeight: "1.625" },
  /** 15px body */
  bodyMd: { fontFamily: sans, fontWeight: 200 as const, fontSize: "15px", lineHeight: "1.65" },
  /** 14px body */
  bodySm: { fontFamily: sans, fontWeight: 200 as const, fontSize: "14px", lineHeight: "1.5" },
  /** 13px body */
  bodyXs: { fontFamily: sans, fontWeight: 200 as const, fontSize: "13px", lineHeight: "1.5" },

  // ── Labels, eyebrows, micro copy ────────────────────────────────────────
  /** Standard uppercase eyebrow — 10px, 1.5px tracking */
  eyebrow: { fontFamily: sans, fontWeight: 200 as const, fontSize: "10px", letterSpacing: "1.5px" },
  /** Wide uppercase eyebrow — 10px, 2px tracking */
  eyebrowWide: { fontFamily: sans, fontWeight: 200 as const, fontSize: "10px", letterSpacing: "2px" },
  /** Micro uppercase — 11px */
  micro: { fontFamily: sans, fontWeight: 200 as const, fontSize: "11px", letterSpacing: "1.2px" },
  /** Utility label — 12px */
  label: { fontFamily: sans, fontWeight: 200 as const, fontSize: "12px", letterSpacing: "1.2px" },
  /** Nav links */
  navLink: { fontFamily: sans, fontWeight: 300 as const, fontSize: "14px", letterSpacing: "0.01em" },
  /** CTA button / link text */
  ctaLink: { fontFamily: sans, fontWeight: 200 as const, fontSize: "16px", letterSpacing: "0.4px" },

  // ── Metric values (large Newsreader numbers) ────────────────────────────
  /** 64px stat */
  statXl: { fontFamily: serif, fontWeight: 400 as const, fontSize: "64px", lineHeight: 1 },
  /** 48px stat */
  statLg: { fontFamily: serif, fontWeight: 400 as const, fontSize: "48px", lineHeight: 1 },
  /** fluid stat — clamp 32→52px */
  statFluid: { fontFamily: serif, fontWeight: 400 as const, fontSize: "clamp(32px, 3.5vw, 52px)", lineHeight: 1 },
  /** 32px stat */
  statMd: { fontFamily: serif, fontWeight: 400 as const, fontSize: "32px", lineHeight: 1 },
  /** 28px stat */
  statSm: { fontFamily: serif, fontWeight: 400 as const, fontSize: "28px", lineHeight: 1 },
  /** 22px stat / inline metric */
  statXs: { fontFamily: serif, fontWeight: 400 as const, fontSize: "22px", lineHeight: 1 },
} as const;
