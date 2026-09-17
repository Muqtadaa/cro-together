/**
 * Asserts that the static build is crawlable and that the SEO surfaces are
 * intact. Runs in CI after `npm run build` and locally via `npm run verify`.
 *
 *   - no prerendered HTML ships content hidden with inline `opacity:0`
 *   - /services has the six service bodies as real, unhidden HTML (>= 7 <h2>)
 *   - every route has its own <title>, canonical and Markdown twin link
 *   - 404.html, sitemap.xml, robots.txt, llms.txt and llms-full.txt exist
 *   - every JSON-LD block parses; the root graph appears once per page, the
 *     Person node only on /about, every leaf carries a BreadcrumbList, and the
 *     unsourced "142%" stat is not in structured data
 *   - every Markdown twin has front matter and ends with a json fence
 *   - llms.txt has an H1, a blockquote and links
 *   - fonts are self-hosted (no fonts.googleapis.com anywhere) and only the
 *     Manrope latin woff2 is preloaded
 *   - every 1600w WebP is under 250 KB and only the home hero is fetchPriority=high
 *   - the privacy page names Formspree and both forms; the footer links the
 *     portfolio and LinkedIn with rel="me"
 */
import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { parse } from "node-html-parser";
import { SERVICES } from "../src/app/data/services.ts";
import { absoluteUrl, getPage, LINKEDIN_URL, markdownPath, NOT_FOUND, ORG_ID, PERSON_ID, PORTFOLIO_URL, ROUTES, SITE_URL } from "../src/seo/routes.ts";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT = path.join(root, "build/client");
const WEBP_1600_BUDGET = 250 * 1024;

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

async function walk(dir) {
  const files = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(full)));
    else files.push(full);
  }
  return files;
}

/** Every JSON-LD node on a page, flattened out of their @graph arrays. */
function jsonLdNodes(html, route) {
  const nodes = [];
  const scripts = parse(html).querySelectorAll('script[type="application/ld+json"]');
  for (const script of scripts) {
    try {
      const data = JSON.parse(script.rawText);
      nodes.push(...(Array.isArray(data["@graph"]) ? data["@graph"] : [data]));
    } catch (err) {
      fail(`${route}: JSON-LD does not parse (${err.message})`);
    }
  }
  return { count: scripts.length, nodes };
}

async function checkPages(pages) {
  const titles = new Set();
  const orgIds = new Set();
  const personIds = new Set();

  for (const [route, html] of pages) {
    const page = getPage(route);
    const title = decode(html.match(/<title>([^<]*)<\/title>/)?.[1] ?? "");
    if (title !== page.title) fail(`${route}: <title> is ${JSON.stringify(title)}, expected ${JSON.stringify(page.title)}`);
    if (titles.has(title)) fail(`${route}: duplicate <title> ${JSON.stringify(title)}`);
    titles.add(title);

    if (/opacity:\s*0[;"]/.test(html)) fail(`${route}: inline opacity:0 in prerendered HTML`);
    if (!html.includes('<main id="main"')) fail(`${route}: no <main id="main">`);
    if (html.includes("fonts.googleapis.com") || html.includes("fonts.gstatic.com")) fail(`${route}: references Google Fonts`);

    const preloads = html.match(/<link rel="preload"[^>]*as="font"[^>]*>/g) ?? [];
    if (preloads.length !== 1 || !/manrope-latin-wght-normal[^"]*\.woff2/.test(preloads[0])) {
      fail(`${route}: expected exactly one font preload (the Manrope latin woff2), found ${preloads.length}`);
    }

    const highPriority = (html.match(/fetchpriority="high"/gi) ?? []).length;
    if (highPriority !== (route === "/" ? 1 : 0)) fail(`${route}: ${highPriority} fetchPriority="high" images (only the home hero may have one)`);

    if (!html.includes(`href="${PORTFOLIO_URL}"`) || !/rel="me[^"]*"/.test(html)) fail(`${route}: footer is missing the rel="me" portfolio link`);
    if (!html.includes(`href="${LINKEDIN_URL}"`)) fail(`${route}: footer is missing the LinkedIn link`);

    const { count, nodes } = jsonLdNodes(html, route);
    const orgs = nodes.filter((n) => n["@type"] === "Organization");
    const people = nodes.filter((n) => n["@type"] === "Person");
    if (orgs.length !== 1) fail(`${route}: expected one Organization node, found ${orgs.length}`);
    for (const org of orgs) orgIds.add(org["@id"]);
    for (const person of people) personIds.add(person["@id"]);
    if (route === "/about" ? people.length !== 1 : people.length !== 0) {
      fail(`${route}: expected ${route === "/about" ? "one" : "no"} Person node, found ${people.length}`);
    }
    if (JSON.stringify(nodes).includes("142%")) fail(`${route}: the unsourced 142% stat is in structured data`);
    if (/@[a-z0-9._-]+\.[a-z]{2,}|mailto:/i.test(JSON.stringify(nodes))) fail(`${route}: an email address is in structured data`);

    if (route === NOT_FOUND.path) {
      if (!html.includes('name="robots" content="noindex"')) fail(`${route}: missing noindex`);
      continue;
    }
    if (!html.includes(`rel="canonical" href="${absoluteUrl(route)}"`)) fail(`${route}: missing canonical`);
    if (!html.includes('name="description"')) fail(`${route}: missing meta description`);
    if (!/property="og:image" content="https:\/\//.test(html)) fail(`${route}: og:image is not absolute`);
    if (!html.includes(`rel="alternate" type="text/markdown" href="${markdownPath(route)}"`)) fail(`${route}: missing rel=alternate Markdown link`);
    if (!html.includes('rel="describedby"') || !html.includes('href="/llms.txt"')) fail(`${route}: missing rel=describedby llms.txt link`);

    if (route === "/") {
      if (count !== 1) fail(`/: expected exactly one JSON-LD script (the root graph), found ${count}`);
    } else {
      if (count !== 2) fail(`${route}: expected two JSON-LD scripts (root graph + page graph), found ${count}`);
      if (!nodes.some((n) => n["@type"] === "BreadcrumbList")) fail(`${route}: no BreadcrumbList`);
    }
  }

  if (orgIds.size !== 1 || !orgIds.has(ORG_ID)) fail(`expected one Organization @id (${ORG_ID}) across the build, found ${[...orgIds].join(", ")}`);
  if (personIds.size !== 1 || !personIds.has(PERSON_ID)) fail(`expected one Person @id (${PERSON_ID}) across the build, found ${[...personIds].join(", ")}`);
}

function checkServices(pages) {
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
  return h2Count;
}

function checkPageContent(pages) {
  const about = decode(pages.get("/about") ?? "");
  const tools = jsonLdNodes(pages.get("/tools") ?? "", "/tools").nodes;
  if (tools.filter((n) => n["@type"] === "SoftwareApplication").length !== 2) fail("/tools: expected two SoftwareApplication nodes");
  if (!about.includes(`href="${PORTFOLIO_URL}"`)) fail("/about: bio does not link to the portfolio");

  const privacy = decode(pages.get("/privacy") ?? "");
  for (const phrase of ["Formspree", "contact form", "feedback form", "WebMCP", "Vercel"]) {
    if (!privacy.includes(phrase)) fail(`/privacy: does not mention ${JSON.stringify(phrase)}`);
  }
  if (/discovery call/i.test(privacy)) fail("/privacy: still mentions a discovery call");
}

async function checkMarkdownTwins() {
  for (const route of ROUTES) {
    const file = path.join(OUT, markdownPath(route).slice(1));
    if (!(await exists(file))) {
      fail(`missing Markdown twin ${path.relative(root, file)}`);
      continue;
    }
    const md = await readFile(file, "utf8");
    const page = getPage(route);
    if (!md.startsWith(`---\ntitle: ${JSON.stringify(page.title)}\n`)) fail(`${markdownPath(route)}: front matter does not start with the title`);
    if (!md.includes(`\ncanonical: ${absoluteUrl(route)}\n---\n`)) fail(`${markdownPath(route)}: front matter is missing the canonical`);
    if (!md.includes("\n# ")) fail(`${markdownPath(route)}: no H1 in the body`);
    const fence = md.lastIndexOf("```json\n");
    if (fence < 0 || !md.endsWith("\n```\n")) fail(`${markdownPath(route)}: does not end with a json fence`);
    else {
      try {
        JSON.parse(md.slice(fence + 8, md.length - 4));
      } catch (err) {
        fail(`${markdownPath(route)}: json fence does not parse (${err.message})`);
      }
    }
    if (md.includes("](/")) fail(`${markdownPath(route)}: contains a relative link`);
  }
}

async function checkLlms() {
  const file = path.join(OUT, "llms.txt");
  if (!(await exists(file))) return fail("missing build/client/llms.txt");
  const text = await readFile(file, "utf8");
  const lines = text.split("\n").filter(Boolean);
  if (!lines[0]?.startsWith("# ")) fail("llms.txt: first line is not an H1");
  if (!lines.some((line) => line.startsWith("> "))) fail("llms.txt: no blockquote summary");
  const links = text.match(/\]\(https?:\/\/[^)]+\)/g) ?? [];
  if (links.length < ROUTES.length + 1) fail(`llms.txt: expected at least ${ROUTES.length + 1} links, found ${links.length}`);
  for (const route of ROUTES) {
    if (!text.includes(`](${SITE_URL}${markdownPath(route)})`)) fail(`llms.txt: no link to ${markdownPath(route)}`);
  }
  if (!text.includes("## Optional")) fail("llms.txt: no Optional section");
  if (!text.includes(PORTFOLIO_URL)) fail("llms.txt: does not link the portfolio");
  if (!(await exists(path.join(OUT, "llms-full.txt")))) fail("missing build/client/llms-full.txt");
}

async function checkAssets() {
  const files = await walk(OUT);
  for (const file of files) {
    const name = path.basename(file);
    if (/-1600-[\w-]+\.webp$/.test(name)) {
      const { size } = await stat(file);
      if (size > WEBP_1600_BUDGET) fail(`${name} is ${(size / 1024).toFixed(0)} KB; the 1600w budget is 250 KB`);
    }
    if (/\.(css|js|html)$/.test(name)) {
      const text = await readFile(file, "utf8");
      if (text.includes("fonts.googleapis.com") || text.includes("fonts.gstatic.com")) fail(`${path.relative(OUT, file)} references Google Fonts`);
    }
  }
  const fonts = files.filter((file) => file.endsWith(".woff2")).map((file) => path.basename(file));
  if (!fonts.some((name) => name.startsWith("manrope-latin-wght-normal"))) fail("build/client/assets has no Manrope latin woff2");
  if (!fonts.some((name) => name.startsWith("newsreader-latin-wght-normal"))) fail("build/client/assets has no Newsreader latin woff2");
  if (!fonts.some((name) => name.startsWith("newsreader-latin-wght-italic"))) fail("build/client/assets has no Newsreader italic woff2");
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

  await checkPages(pages);
  const h2Count = checkServices(pages);
  checkPageContent(pages);
  await checkMarkdownTwins();
  await checkLlms();
  await checkAssets();

  for (const file of ["404.html", "sitemap.xml", "robots.txt"]) {
    if (!(await exists(path.join(OUT, file)))) fail(`missing build/client/${file}`);
  }

  if (failures.length) {
    console.error("verify-build: FAILED");
    for (const f of failures) console.error(`  - ${f}`);
    process.exit(1);
  }
  console.log(`verify-build: ok (${pages.size} pages, ${h2Count} <h2> on /services, ${ROUTES.length} Markdown twins)`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
