import type { LinksFunction, MetaFunction } from "react-router";
import { Links, Meta, Outlet, Scripts, ScrollRestoration, isRouteErrorResponse, useRouteError } from "react-router";
import { Nav } from "./app/components/Nav";
import { Footer } from "./app/components/Footer";
import { NotFound } from "./app/pages/NotFound";
import { PageSection } from "./app/components/ui/page-section";
import { SectionHeader } from "./app/components/ui/section-header";
import { siteGraph } from "./seo/jsonld";
import { SITE_NAME } from "./seo/routes";
import "./styles/index.css";

export const links: LinksFunction = () => [
  { rel: "icon", href: "/favicon.ico", sizes: "32x32" },
  { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
  { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
  { rel: "manifest", href: "/site.webmanifest" },
];

/**
 * Site-wide head tags. Leaf routes inherit these through buildMeta()
 * (src/seo/meta.ts) and add their own title, description, canonical and
 * Open Graph tags. The Organization + WebSite graph is emitted here only.
 */
export const meta: MetaFunction = () => [
  { property: "og:site_name", content: SITE_NAME },
  { property: "og:type", content: "website" },
  { name: "twitter:card", content: "summary_large_image" },
  { "script:ld+json": siteGraph() },
];

/**
 * The HTML document. Rendered once at build time for every prerendered route
 * and reused on the client. The inline script flags `html.js` before first
 * paint so CSS-only progressive enhancements (the scroll reveal in
 * delight.css) can tell a JS-capable browser from a plain fetch.
 */
export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#060e1a" />
        <Meta />
        <Links />
        <script dangerouslySetInnerHTML={{ __html: 'document.documentElement.classList.add("js")' }} />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:bg-navy focus:px-4 focus:py-2 focus:text-white focus:outline-2 focus:outline-offset-2 focus:outline-slate"
        >
          Skip to content
        </a>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

/**
 * Client-side error boundary. A thrown 404 response renders the branded
 * not-found page; anything else gets a short, styled message instead of the
 * router's unbranded default. Prerendered pages never reach this.
 */
export function ErrorBoundary() {
  const error = useRouteError();
  const notFound = isRouteErrorResponse(error) && error.status === 404;

  return (
    <div className="min-h-screen flex flex-col">
      <Nav />
      <main id="main" className="flex-1">
        {notFound ? (
          <NotFound />
        ) : (
          <PageSection bg="cream" py="xl" narrow innerClassName="flex flex-col gap-8">
            <SectionHeader
              eyebrow="Something went wrong"
              title="This page hit an unexpected error."
              titleWeight={200}
              size="lg"
              as="h1"
              description="Reloading usually clears it. If it keeps happening, the contact page still works and I would like to know."
            />
          </PageSection>
        )}
      </main>
      <Footer />
    </div>
  );
}
