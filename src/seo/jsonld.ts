import { EXTENSIONS } from "../app/data/extensions";
import { SERVICES } from "../app/data/services";
import {
  absoluteUrl,
  getPage,
  LINKEDIN_URL,
  ORG_ID,
  PERSON_ID,
  PERSON_JOB_TITLE,
  PERSON_NAME,
  PORTFOLIO_URL,
  SITE_NAME,
  SITE_URL,
} from "./routes";

/**
 * JSON-LD for crotogether.com.
 *
 * The Organization + WebSite graph is emitted once, from the root route's
 * `meta()`. Leaf routes add their own graph (a WebPage subtype, the page's
 * main entity and a BreadcrumbList) through buildMeta(). React Router does
 * not dedupe `script:ld+json`, so the site graph must never be repeated by a
 * leaf, and the Person node lives on /about only; everywhere else the founder
 * is referenced by `@id`.
 *
 * Deliberately absent: LocalBusiness/ProfessionalService, FAQPage, prices,
 * ratings, an email address, and the unsourced "142%" service stat.
 */

const WEBSITE_ID = `${SITE_URL}/#website`;
const ORG_REF = { "@id": ORG_ID };
const PERSON_REF = { "@id": PERSON_ID };
const WEBSITE_REF = { "@id": WEBSITE_ID };

const KNOWS_ABOUT = [
  "Conversion rate optimization",
  "A/B testing",
  "Experimentation programs",
  "Personalization",
  "UX research",
  "Web analytics",
  "Optimizely",
  "VWO",
];

/* Mirrors React Router's (unexported) LdJson types for `script:ld+json`. */
type JsonLdPrimitive = string | number | boolean | null;
type JsonLdValue = JsonLdPrimitive | JsonLdNode | JsonLdValue[];
interface JsonLdNode {
  [key: string]: JsonLdValue;
}

export interface JsonLdGraph extends JsonLdNode {
  "@context": "https://schema.org";
  "@graph": JsonLdNode[];
}

const graph = (nodes: JsonLdNode[]): JsonLdGraph => ({ "@context": "https://schema.org", "@graph": nodes });

/** Site-wide graph: Organization + WebSite. Root route only. */
export function siteGraph(): JsonLdGraph {
  return graph([
    {
      "@type": "Organization",
      "@id": ORG_ID,
      name: SITE_NAME,
      url: `${SITE_URL}/`,
      logo: `${SITE_URL}/icon-512.png`,
      description: "A boutique CRO and experimentation consultancy: conversion diagnostics, experimentation roadmaps, A/B testing and personalisation, UX research and fractional CRO leadership.",
      founder: PERSON_REF,
      knowsAbout: KNOWS_ABOUT,
      sameAs: [LINKEDIN_URL, PORTFOLIO_URL],
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "sales",
        url: `${SITE_URL}/contact`,
      },
    },
    {
      "@type": "WebSite",
      "@id": WEBSITE_ID,
      name: SITE_NAME,
      url: `${SITE_URL}/`,
      publisher: ORG_REF,
      inLanguage: "en",
    },
  ]);
}

function breadcrumbId(path: string) {
  return `${absoluteUrl(path)}#breadcrumb`;
}

function webPageId(path: string) {
  return `${absoluteUrl(path)}#webpage`;
}

/** Home > <page>. Every leaf route carries one. */
function breadcrumbList(path: string): JsonLdNode {
  const page = getPage(path);
  return {
    "@type": "BreadcrumbList",
    "@id": breadcrumbId(path),
    itemListElement: [
      { "@type": "ListItem", position: 1, name: getPage("/").label, item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: page.label, item: absoluteUrl(path) },
    ],
  };
}

/** The WebPage node (or a subtype) for a leaf route, wired to the site graph and its breadcrumb. */
function webPage(path: string, type: string, extra: JsonLdNode = {}): JsonLdNode {
  const page = getPage(path);
  return {
    "@type": type,
    "@id": webPageId(path),
    url: absoluteUrl(path),
    name: page.title,
    description: page.description,
    isPartOf: WEBSITE_REF,
    breadcrumb: { "@id": breadcrumbId(path) },
    inLanguage: "en",
    ...extra,
  };
}

/** A plain leaf (WebPage + BreadcrumbList). Used by /proof and /privacy. */
export function pageGraph(path: string): JsonLdGraph {
  return graph([webPage(path, "WebPage"), breadcrumbList(path)]);
}

/** /about: AboutPage + the single Person node. */
export function aboutGraph(): JsonLdGraph {
  const path = "/about";
  return graph([
    webPage(path, "AboutPage", { about: PERSON_REF, mainEntity: PERSON_REF }),
    {
      "@type": "Person",
      "@id": PERSON_ID,
      name: PERSON_NAME,
      jobTitle: PERSON_JOB_TITLE,
      worksFor: ORG_REF,
      url: PORTFOLIO_URL,
      sameAs: [LINKEDIN_URL, `${SITE_URL}/about`],
      knowsAbout: KNOWS_ABOUT,
    },
    breadcrumbList(path),
  ]);
}

/** /services: one Service per entry, collected in an OfferCatalog. No prices, no stats. */
export function servicesGraph(): JsonLdGraph {
  const path = "/services";
  const services = SERVICES.map((service) => ({
    "@type": "Service",
    "@id": `${absoluteUrl(path)}#${service.slug}`,
    name: service.title,
    description: service.description,
    serviceType: service.title,
    audience: { "@type": "BusinessAudience", description: service.whoFor },
    provider: ORG_REF,
    url: `${absoluteUrl(path)}#${service.slug}`,
  }));

  return graph([
    webPage(path, "CollectionPage", { about: ORG_REF, mainEntity: { "@id": `${absoluteUrl(path)}#catalog` } }),
    {
      "@type": "OfferCatalog",
      "@id": `${absoluteUrl(path)}#catalog`,
      name: "CRO Together services",
      url: absoluteUrl(path),
      itemListElement: services.map((service) => ({
        "@type": "Offer",
        itemOffered: { "@id": service["@id"] },
        url: service.url,
      })),
    },
    ...services,
    breadcrumbList(path),
  ]);
}

/** /tools: the two Chrome extensions as free SoftwareApplication nodes. */
export function toolsGraph(): JsonLdGraph {
  const path = "/tools";
  const apps = EXTENSIONS.map((ext) => ({
    "@type": "SoftwareApplication",
    "@id": `${absoluteUrl(path)}#extension-${ext.number}`,
    name: ext.name,
    description: ext.description,
    applicationCategory: "BrowserApplication",
    applicationSubCategory: "Chrome extension",
    operatingSystem: "Chrome",
    downloadUrl: ext.storeUrl,
    installUrl: ext.storeUrl,
    isAccessibleForFree: true,
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    featureList: ext.features.map((feature) => feature.title),
    author: PERSON_REF,
    publisher: ORG_REF,
  }));

  return graph([
    webPage(path, "CollectionPage", {
      mainEntity: { "@type": "ItemList", itemListElement: apps.map((app) => ({ "@id": app["@id"] })) },
    }),
    ...apps,
    breadcrumbList(path),
  ]);
}

/** /contact: ContactPage. Form-only; no email address anywhere. */
export function contactGraph(): JsonLdGraph {
  const path = "/contact";
  return graph([webPage(path, "ContactPage", { about: ORG_REF }), breadcrumbList(path)]);
}
