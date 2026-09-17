# cro-together

Source for [crotogether.com](https://crotogether.com): React 18 + React Router 7 (framework mode, prerendered to static HTML), Tailwind CSS 4, Vite 6, deployed on Vercel as a static site.

## Scripts

- `npm run dev` – local dev server (`react-router dev`)
- `npm run typecheck` – `react-router typegen` then `tsc --noEmit`
- `npm run build` – typecheck, `react-router build` (prerenders every route into `build/client/`), then `scripts/postbuild.mjs` (`404.html`, `sitemap.xml`, a Markdown twin per page, `llms.txt`, `llms-full.txt`)
- `npm run verify` – asserts the build is crawlable and the SEO surfaces are intact (no hidden content, per-route titles, the six service bodies on `/services`, `404.html`, `sitemap.xml`, JSON-LD that parses with one Organization and one Person, Markdown twins, `llms.txt`, self-hosted fonts, image budgets); CI runs it after the build
- `npm run preview` – serve `build/client/` locally with sirv
- `npm run icons` – regenerate `public/` icons and the Open Graph image from `src/assets/logo.png` (sharp)
- `node scripts/optimise-images.mjs <dir-with-originals>` – regenerate the 800/1600 WebP stock photos in `src/assets/` (sharp); only needed when a photograph is replaced

## How the site is put together

- `react-router.config.ts` – `ssr: false` + `prerender`: every route in the registry is rendered to `build/client/<route>/index.html` at build time, so crawlers and AI agents that do not run JavaScript receive the full page. The browser then hydrates and navigates client-side.
- `src/seo/routes.ts` – the single route registry (path, label, title, description, site URL, JSON-LD ids, portfolio and LinkedIn URLs). It feeds route `meta()` (`src/seo/meta.ts`), the prerender list and the post-build sitemap, Markdown twins and `llms.txt`. Add a page here first.
- `src/seo/jsonld.ts` – the JSON-LD entity graph. The root route emits Organization + WebSite once; each leaf adds its own graph (AboutPage + Person on `/about`, Service + OfferCatalog on `/services`, two SoftwareApplication on `/tools`, ContactPage on `/contact`, a BreadcrumbList everywhere). The Person node exists only on `/about`; elsewhere the founder is an `@id` reference shared with the portfolio site.
- Markdown twins – every page is also served as Markdown at the same path with `.md` appended (`/services.md`, `/index.md`): front matter, the page's `<main>` converted with turndown, and its JSON-LD as a fenced `json` block. `/llms.txt` lists them for agents; `/llms-full.txt` concatenates them. Pages point at both with `rel="alternate" type="text/markdown"` and `rel="describedby"`.
- `src/styles/fonts.css` – fonts are self-hosted from `@fontsource-variable` (Newsreader with `font-display: swap`, Manrope with `optional` and a preload of its latin file from `src/root.tsx`), with metric-matched Georgia/Arial fallbacks so nothing shifts at swap time. No request goes to Google Fonts.
- Stock photos are committed as 800/1600 WebP pairs with `srcset`/`sizes`/`width`/`height` and `alt=""` (they are decorative); only the home hero has `fetchPriority="high"`.
- `src/routes.ts` – the route tree. Leaves in `src/routes/` are thin modules that re-export a page from `src/app/pages/` and add `meta()`; the `*` route is the branded 404.
- `src/root.tsx` – the HTML document (`Layout`), site-wide `links()`/`meta()` and the client error boundary. `src/app/Root.tsx` is the layout route (nav, `<main id="main">`, footer).
- `src/lib/reveal.tsx` – scroll reveals are CSS-first: HTML ships visible, and the fade only runs when `html.js` is set and motion is allowed.
- `src/app/pages/Services.tsx` – the services accordion is native `<details name="services">`, so all six bodies are real HTML; `/services#<slug>` deep-links to an open item.
- `vercel.json` – no SPA rewrite: the filesystem wins, `404.html` returns a real 404, `trailingSlash: false` redirects `/services/` to `/services`, plus cache and security headers.

## Dependency notes

- `react-router` and `@react-router/dev` are pinned to **7.18.4** exactly, with a matching `overrides` block, so that no transitive update can pull in React Router 8 (which requires React 19 and Vite 7). Bump both together, deliberately.
- Node 22 (`engines` in `package.json`, `node-version` in CI). `scripts/postbuild.mjs` and `scripts/verify-build.mjs` import the TypeScript registry directly via Node's built-in type stripping (22.18+), so keep `src/seo/routes.ts` free of TypeScript-only runtime syntax (enums, parameter properties).
