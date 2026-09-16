/**
 * The single route registry for crotogether.com.
 *
 * Feeds route `meta()` (src/seo/meta.ts), the prerender list
 * (react-router.config.ts) and scripts/postbuild.mjs (sitemap.xml, and from
 * C2 onwards the Markdown twins and llms.txt). Add a page here first; the
 * route module in src/routes/ then just points at it.
 *
 * Keep this file free of TypeScript-only runtime syntax (enums, parameter
 * properties, namespaces): scripts/postbuild.mjs imports it directly under
 * Node's type stripping.
 */

export const SITE_URL = "https://crotogether.com";
export const SITE_NAME = "CRO Together";

/** Stable JSON-LD ids shared with the portfolio site (muqtadaa.github.io). */
export const ORG_ID = `${SITE_URL}/#organization`;
export const PERSON_ID = "https://muqtadaa.github.io/#person";

export const OG_IMAGE = {
  path: "/og-image.png",
  width: 1200,
  height: 630,
  alt: "CRO Together raven mark on a cream background",
} as const;

export interface PageEntry {
  /** Root-relative path with no trailing slash (`/` for the home page). */
  path: string;
  /** Document title; the site name is not appended. */
  title: string;
  /** Meta description, also reused for Open Graph and the sitemap twins. */
  description: string;
}

export const PAGES: readonly PageEntry[] = [
  {
    path: "/",
    title: "CRO Together: Boutique CRO & Experimentation Consultancy",
    description:
      "Conversion diagnostics, experimentation roadmaps, A/B testing and personalisation, UX research and fractional CRO leadership by Muqtadaa Miandara. $15.1M incremental revenue in 2025.",
  },
  {
    path: "/services",
    title: "CRO Services: Diagnostic, Roadmap, Testing, Research, Implementation, Advisory",
    description:
      "Six services for growth teams, from a Conversion Diagnostic to Fractional CRO Advisory.",
  },
  {
    path: "/about",
    title: "About Muqtadaa Miandara and the Method",
    description:
      "Experimentation, UX research, analytics and hands-on implementation on Optimizely and VWO, prioritised with RICE.",
  },
  {
    path: "/proof",
    title: "Results: $15.1M Incremental Revenue in One Year",
    description:
      "+45% YoY, 31% win rate across 145 tests, and the individual wins behind the number.",
  },
  {
    path: "/tools",
    title: "Free Chrome Extensions for Optimizely",
    description:
      "Optimizely Web QA Helper and Optimizely Power Tools. Local only, no telemetry.",
  },
  {
    path: "/contact",
    title: "Contact CRO Together",
    description:
      "Tell me about your growth challenge; every inquiry is answered within 24 hours. AI assistants can fill this form via WebMCP; you confirm before it sends.",
  },
  {
    path: "/privacy",
    title: "Privacy Policy",
    description:
      "What this site collects (nothing passively), how Formspree processes form submissions, which third parties are involved.",
  },
];

/** The branded 404 page. Prerendered to /404/index.html and copied to /404.html; never indexed, never in the sitemap. */
export const NOT_FOUND: PageEntry = {
  path: "/404",
  title: "Page not found",
  description: "That address does not exist on crotogether.com.",
};

/** Every indexable route path, in sitemap order. */
export const ROUTES: readonly string[] = PAGES.map((page) => page.path);

export function getPage(path: string): PageEntry {
  if (path === NOT_FOUND.path) return NOT_FOUND;
  const page = PAGES.find((entry) => entry.path === path);
  if (!page) throw new Error(`No page registered for ${path} in src/seo/routes.ts`);
  return page;
}

/** Absolute URL for a registered path. */
export function absoluteUrl(path: string): string {
  return path === "/" ? `${SITE_URL}/` : `${SITE_URL}${path}`;
}

/** Path of the Markdown twin generated next to each prerendered page. */
export function markdownPath(path: string): string {
  return path === "/" ? "/index.md" : `${path}.md`;
}
