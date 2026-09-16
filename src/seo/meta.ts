import type { MetaDescriptor } from "react-router";
import { absoluteUrl, getPage, markdownPath, OG_IMAGE, SITE_URL } from "./routes";

type LdJson = Extract<MetaDescriptor, { "script:ld+json": unknown }>["script:ld+json"];

interface BuildMetaOptions {
  /** Registered path from src/seo/routes.ts (e.g. "/services"). */
  path: string;
  /**
   * `matches` from the route's MetaArgs. The deepest route's meta replaces its
   * parents' by default, so the root's site-wide tags are carried over here.
   */
  matches: ReadonlyArray<{ meta?: MetaDescriptor[] } | undefined>;
  /** Page-level JSON-LD (never the Organization/WebSite graph; the root owns that). */
  jsonLd?: LdJson;
  /** Omit canonical/OG/alternates and mark the page noindex (the 404 page). */
  noindex?: boolean;
}

/**
 * Builds the full `<head>` descriptor list for a page from the route registry:
 * the root's site-wide tags, then title, description, canonical, absolute
 * Open Graph and Twitter tags, the Markdown twin and llms.txt links, and any
 * page-level JSON-LD.
 */
export function buildMeta({ path, matches, jsonLd, noindex = false }: BuildMetaOptions): MetaDescriptor[] {
  const page = getPage(path);
  // Routes without a meta export (the layout route) inherit a copy of their
  // parent's tags, so the root's site-wide tags appear once per ancestor here.
  // Keep the first occurrence of each descriptor.
  const seen = new Set<string>();
  const inherited = matches
    .flatMap((match) => match?.meta ?? [])
    .filter((descriptor) => {
      const key = JSON.stringify(descriptor);
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });

  const own: MetaDescriptor[] = [
    { title: page.title },
    { name: "description", content: page.description },
  ];

  if (noindex) {
    own.push({ name: "robots", content: "noindex" });
  } else {
    const url = absoluteUrl(path);
    own.push(
      { tagName: "link", rel: "canonical", href: url },
      { property: "og:title", content: page.title },
      { property: "og:description", content: page.description },
      { property: "og:url", content: url },
      { property: "og:image", content: `${SITE_URL}${OG_IMAGE.path}` },
      { property: "og:image:width", content: String(OG_IMAGE.width) },
      { property: "og:image:height", content: String(OG_IMAGE.height) },
      { property: "og:image:alt", content: OG_IMAGE.alt },
      { name: "twitter:title", content: page.title },
      { name: "twitter:description", content: page.description },
      { name: "twitter:image", content: `${SITE_URL}${OG_IMAGE.path}` },
      { tagName: "link", rel: "alternate", type: "text/markdown", href: markdownPath(path) },
      { tagName: "link", rel: "describedby", type: "text/plain", href: "/llms.txt" },
    );
  }

  if (jsonLd) own.push({ "script:ld+json": jsonLd });

  return [...inherited, ...own];
}
