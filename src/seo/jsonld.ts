import { ORG_ID, PERSON_ID, SITE_NAME, SITE_URL } from "./routes";

/**
 * Site-wide JSON-LD, emitted once from the root route's `meta()`.
 * Page-level graphs (AboutPage, Service, SoftwareApplication, ...) are added
 * by the leaf routes in C2; React Router does not dedupe `script:ld+json`,
 * so the Organization and WebSite nodes must live here and only here.
 */
export function siteGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": ORG_ID,
        name: SITE_NAME,
        url: `${SITE_URL}/`,
        logo: `${SITE_URL}/icon-512.png`,
        founder: { "@id": PERSON_ID },
        sameAs: ["https://www.linkedin.com/in/muqtadaa", "https://muqtadaa.github.io/"],
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "sales",
          url: `${SITE_URL}/contact`,
        },
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        name: SITE_NAME,
        url: `${SITE_URL}/`,
        publisher: { "@id": ORG_ID },
        inLanguage: "en",
      },
    ],
  };
}
