/**
 * Post-build step for the static output in build/client.
 *
 *   1. Copies the prerendered 404 page (build/client/404/index.html) to
 *      build/client/404.html, which Vercel serves with a real 404 status for
 *      every unknown URL.
 *   2. Writes build/client/sitemap.xml from the route registry.
 *   3. Writes a Markdown twin next to every prerendered page
 *      (build/client/<route>.md, index.md for "/"): YAML front matter, the
 *      page's <main> converted with turndown, and the page's JSON-LD as a
 *      fenced json block. Each page links to its twin with
 *      rel="alternate" type="text/markdown" (src/seo/meta.ts).
 *   4. Writes build/client/llms.txt (the site map for agents, llmstxt.org
 *      format) and llms-full.txt (every twin concatenated).
 *   5. Deletes build/client/__spa-fallback.html: every route is prerendered
 *      and 404.html covers the rest, so nothing serves or references it.
 *
 * Runs under Node 22 with type stripping, so it imports the TypeScript
 * registry directly (keep src/seo/routes.ts free of TS-only runtime syntax).
 */
import { copyFile, mkdir, readdir, readFile, rm, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { parse } from "node-html-parser";
import TurndownService from "turndown";
import {
  absoluteUrl,
  getPage,
  markdownPath,
  NOT_FOUND,
  PAGES,
  PERSON_NAME,
  PORTFOLIO_URL,
  ROUTES,
  SITE_NAME,
  SITE_URL,
} from "../src/seo/routes.ts";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT = path.join(root, "build/client");

async function exists(file) {
  try {
    await stat(file);
    return true;
  } catch {
    return false;
  }
}

function htmlPath(route) {
  return path.join(OUT, route === "/" ? "index.html" : `${route.slice(1)}/index.html`);
}

async function copyNotFound() {
  const source = path.join(OUT, NOT_FOUND.path.slice(1), "index.html");
  if (!(await exists(source))) {
    throw new Error(`Expected the prerendered 404 page at ${source}. Is "${NOT_FOUND.path}" in the prerender list?`);
  }
  await copyFile(source, path.join(OUT, "404.html"));
  console.log("postbuild: wrote 404.html");
}

async function writeSitemap() {
  const missing = [];
  for (const route of ROUTES) {
    if (!(await exists(htmlPath(route)))) missing.push(route);
  }
  if (missing.length) {
    throw new Error(`Routes registered but not prerendered: ${missing.join(", ")}`);
  }

  const urls = ROUTES.map((route) => `  <url>\n    <loc>${absoluteUrl(route)}</loc>\n  </url>`).join("\n");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
  await writeFile(path.join(OUT, "sitemap.xml"), xml);
  console.log(`postbuild: wrote sitemap.xml (${ROUTES.length} urls)`);
}

/* ── Markdown twins ─────────────────────────────────────────────────────── */

/** Elements that carry no prose for a reader of the Markdown version. */
const DROP_SELECTOR = "script, style, noscript, svg, button, input, textarea, select, template, [aria-hidden='true']";

const turndown = new TurndownService({
  headingStyle: "atx",
  bulletListMarker: "-",
  codeBlockStyle: "fenced",
  emDelimiter: "*",
});
// Line breaks inside headings and paragraphs are layout, not content.
turndown.addRule("softBreak", { filter: "br", replacement: () => " " });

const yamlString = (value) => JSON.stringify(String(value));

/**
 * Inline elements laid out with flex/grid gaps have no whitespace between
 * them in the HTML, so their text would run together in Markdown
 * ("01Conversion Diagnostic"). Separate adjacent inline siblings with a
 * middle dot when nothing (not even a space) sits between them.
 */
const INLINE_TAGS = new Set(["SPAN", "A", "EM", "STRONG", "I", "B", "SMALL", "TIME", "ABBR", "LABEL", "IMG"]);
function separateInlineSiblings(container) {
  for (const el of container.querySelectorAll("*")) {
    if (!INLINE_TAGS.has(el.tagName)) continue;
    const prev = el.previousSibling;
    if (prev && prev.nodeType === 1 && INLINE_TAGS.has(prev.tagName)) {
      el.insertAdjacentHTML("beforebegin", " \u00b7 ");
    }
  }
}

/** Every JSON-LD node on the page, merged into one @graph. */
function collectJsonLd(document, route) {
  const nodes = [];
  for (const script of document.querySelectorAll('script[type="application/ld+json"]')) {
    let data;
    try {
      data = JSON.parse(script.rawText);
    } catch (err) {
      throw new Error(`${route}: JSON-LD block does not parse: ${err.message}`);
    }
    if (Array.isArray(data["@graph"])) nodes.push(...data["@graph"]);
    else nodes.push(data);
  }
  return { "@context": "https://schema.org", "@graph": nodes };
}

/** Converts one prerendered page to Markdown; returns { frontMatter, body, markdown }. */
function toMarkdown(html, route) {
  const page = getPage(route);
  const canonical = absoluteUrl(route);
  const document = parse(html);
  const main = document.querySelector("main#main");
  if (!main) throw new Error(`${route}: no <main id="main"> in the prerendered HTML`);

  const removedForms = main.querySelectorAll("form").length;
  for (const el of main.querySelectorAll(`${DROP_SELECTOR}, form`)) el.remove();
  // Decorative images (alt="") say nothing in Markdown; keep the ones with a description.
  for (const img of main.querySelectorAll("img")) {
    if (!img.getAttribute("alt")) img.remove();
    else img.setAttribute("src", new URL(img.getAttribute("src"), canonical).href);
  }
  separateInlineSiblings(main);
  // Absolute links, so the twin reads the same wherever it is quoted from.
  for (const a of main.querySelectorAll("a[href]")) {
    const href = a.getAttribute("href");
    if (!/^[a-z][a-z0-9+.-]*:/i.test(href)) a.setAttribute("href", new URL(href, canonical).href);
  }

  let body = turndown.turndown(main.innerHTML).replace(/\n{3,}/g, "\n\n").trim();
  if (removedForms) {
    body += `\n\nThe form on this page is only available in the HTML version: ${canonical}`;
  }

  const frontMatter = [
    "---",
    `title: ${yamlString(page.title)}`,
    `description: ${yamlString(page.description)}`,
    `canonical: ${canonical}`,
    "---",
  ].join("\n");

  const jsonLd = JSON.stringify(collectJsonLd(document, route), null, 2);
  const markdown = `${frontMatter}\n\n${body}\n\n## Structured data\n\n\`\`\`json\n${jsonLd}\n\`\`\`\n`;
  return { frontMatter, body, markdown, jsonLd };
}

async function writeMarkdownTwins() {
  const twins = new Map();
  for (const route of ROUTES) {
    const html = await readFile(htmlPath(route), "utf8");
    const twin = toMarkdown(html, route);
    await writeFile(path.join(OUT, markdownPath(route).slice(1)), twin.markdown);
    twins.set(route, twin);
  }
  console.log(`postbuild: wrote ${twins.size} Markdown twins`);
  return twins;
}

/* ── llms.txt ───────────────────────────────────────────────────────────── */

function llmsHeader() {
  const home = getPage("/");
  return [
    `# ${SITE_NAME}`,
    "",
    `> ${home.description}`,
    "",
    `${SITE_NAME} is the consultancy of ${PERSON_NAME}, its founder and chief strategist. Contact is form-only (there is no email address): people use the form at ${SITE_URL}/contact. In browsers that support WebMCP, AI assistants can fill that form in for the person, either through the form's own declarative \`submit_inquiry\` tool (the browser hands the submit button to the person) or by calling the page's \`draft_inquiry\` tool, which writes the inquiry into the form and stops. Neither sends anything: the person reviews the form and presses Submit.`,
    "",
    `Every page below has a Markdown twin at the same URL with \`.md\` appended (the home page is \`/index.md\`), and each HTML page links to its twin with \`rel="alternate" type="text/markdown"\`.`,
  ].join("\n");
}

function llmsTxt() {
  const link = (page) => `- [${page.title}](${SITE_URL}${markdownPath(page.path)}): ${page.description}`;
  const main = PAGES.filter((page) => page.path !== "/privacy");
  const privacy = PAGES.find((page) => page.path === "/privacy");
  return [
    llmsHeader(),
    "",
    "## Pages",
    "",
    ...main.map(link),
    "",
    "## Optional",
    "",
    link(privacy),
    `- [${PERSON_NAME}](${PORTFOLIO_URL}): personal site: digital art, design, D&D`,
    "",
  ].join("\n");
}

function llmsFullTxt(twins) {
  const parts = [llmsHeader()];
  for (const route of ROUTES) {
    const twin = twins.get(route);
    parts.push("", "---", "", `Source: ${absoluteUrl(route)}`, "", twin.body, "", "```json", twin.jsonLd, "```");
  }
  return `${parts.join("\n")}\n`;
}

async function writeLlms(twins) {
  await writeFile(path.join(OUT, "llms.txt"), llmsTxt());
  await writeFile(path.join(OUT, "llms-full.txt"), llmsFullTxt(twins));
  console.log("postbuild: wrote llms.txt and llms-full.txt");
}

/**
 * React Router writes __spa-fallback.html for routes it did not prerender.
 * Every route here is prerendered and unknown URLs get 404.html, so the file
 * is dead weight that would otherwise be deployed as a reachable page.
 */
async function removeSpaFallback() {
  const file = path.join(OUT, "__spa-fallback.html");
  if (!(await exists(file))) return;
  await rm(file);
  console.log("postbuild: removed __spa-fallback.html");
}

async function main() {
  if (!(await exists(OUT))) {
    throw new Error(`Build output not found at ${OUT}. Run "react-router build" first.`);
  }
  await mkdir(OUT, { recursive: true });
  await copyNotFound();
  await writeSitemap();
  const twins = await writeMarkdownTwins();
  await writeLlms(twins);
  await removeSpaFallback();

  const entries = await readdir(OUT);
  console.log(`postbuild: build/client contains ${entries.length} top-level entries`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
