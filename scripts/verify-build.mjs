/**
 * Asserts that the static build is crawlable. Runs in CI after `npm run build`
 * and locally via `npm run verify`.
 *
 *   - no prerendered HTML ships content hidden with inline `opacity:0`
 *   - /services has the six service bodies as real, unhidden HTML (>= 7 <h2>)
 *   - every route has its own <title> and canonical
 *   - 404.html, sitemap.xml and robots.txt exist
 */
import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { SERVICES } from "../src/app/data/services.ts";
import { absoluteUrl, getPage, NOT_FOUND, ROUTES } from "../src/seo/routes.ts";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT = path.join(root, "build/client");

const failures = [];
const fail = (msg) => failures.push(msg);

const decode = (text) =>
  text
    .replace(/&amp;/g, "&")
    .replace(/&#x27;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");

function htmlPath(route) {
  return path.join(OUT, route === "/" ? "index.html" : `${route.slice(1)}/index.html`);
}

async function exists(file) {
  try {
    await stat(file);
    return true;
  } catch {
    return false;
  }
}

async function main() {
  const pages = new Map();
  for (const route of [...ROUTES, NOT_FOUND.path]) {
    const file = htmlPath(route);
    if (!(await exists(file))) {
      fail(`${route}: missing ${path.relative(root, file)}`);
      continue;
    }
    pages.set(route, await readFile(file, "utf8"));
  }

  const titles = new Set();
  for (const [route, html] of pages) {
    const page = getPage(route);
    const title = decode(html.match(/<title>([^<]*)<\/title>/)?.[1] ?? "");
    if (title !== page.title) fail(`${route}: <title> is ${JSON.stringify(title)}, expected ${JSON.stringify(page.title)}`);
    if (titles.has(title)) fail(`${route}: duplicate <title> ${JSON.stringify(title)}`);
    titles.add(title);

    if (/opacity:\s*0[;"]/.test(html)) fail(`${route}: inline opacity:0 in prerendered HTML`);
    if (!html.includes('<main id="main"')) fail(`${route}: no <main id="main">`);

    if (route === NOT_FOUND.path) {
      if (!html.includes('name="robots" content="noindex"')) fail(`${route}: missing noindex`);
      continue;
    }
    if (!html.includes(`rel="canonical" href="${absoluteUrl(route)}"`)) fail(`${route}: missing canonical`);
    if (!html.includes('name="description"')) fail(`${route}: missing meta description`);
    if (!/property="og:image" content="https:\/\//.test(html)) fail(`${route}: og:image is not absolute`);
  }

  const services = pages.get("/services") ?? "";
  const h2Count = (services.match(/<h2[\s>]/g) ?? []).length;
  if (h2Count < 7) fail(`/services: expected >= 7 <h2>, found ${h2Count}`);
  if (/<[a-z][^>]*\shidden(?=[\s>=/])/i.test(services)) fail("/services: an element carries the hidden attribute");
  const servicesText = decode(services);
  for (const service of SERVICES) {
    if (!servicesText.includes(service.description)) {
      fail(`/services: description for ${service.title} is not in the HTML`);
    }
    if (!services.includes(`id="${service.slug}"`)) fail(`/services: no element with id="${service.slug}"`);
  }

  const home = pages.get("/") ?? "";
  const ldCount = (home.match(/application\/ld\+json/g) ?? []).length;
  if (ldCount !== 1) fail(`/: expected exactly one JSON-LD script (the root graph), found ${ldCount}`);

  for (const file of ["404.html", "sitemap.xml", "robots.txt"]) {
    if (!(await exists(path.join(OUT, file)))) fail(`missing build/client/${file}`);
  }

  if (failures.length) {
    console.error("verify-build: FAILED");
    for (const f of failures) console.error(`  - ${f}`);
    process.exit(1);
  }
  console.log(`verify-build: ok (${pages.size} pages, ${h2Count} <h2> on /services)`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
