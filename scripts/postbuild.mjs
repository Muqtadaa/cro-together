/**
 * Post-build step for the static output in build/client.
 *
 *   1. Copies the prerendered 404 page (build/client/404/index.html) to
 *      build/client/404.html, which Vercel serves with a real 404 status for
 *      every unknown URL.
 *   2. Writes build/client/sitemap.xml from the route registry.
 *
 * Runs under Node 22 with type stripping, so it imports the TypeScript
 * registry directly (keep src/seo/routes.ts free of TS-only runtime syntax).
 */
import { copyFile, mkdir, readdir, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { absoluteUrl, NOT_FOUND, ROUTES } from "../src/seo/routes.ts";

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
    const file = path.join(OUT, route === "/" ? "index.html" : `${route.slice(1)}/index.html`);
    if (!(await exists(file))) missing.push(route);
  }
  if (missing.length) {
    throw new Error(`Routes registered but not prerendered: ${missing.join(", ")}`);
  }

  const urls = ROUTES.map((route) => `  <url>\n    <loc>${absoluteUrl(route)}</loc>\n  </url>`).join("\n");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
  await writeFile(path.join(OUT, "sitemap.xml"), xml);
  console.log(`postbuild: wrote sitemap.xml (${ROUTES.length} urls)`);
}

async function main() {
  if (!(await exists(OUT))) {
    throw new Error(`Build output not found at ${OUT}. Run "react-router build" first.`);
  }
  await mkdir(OUT, { recursive: true });
  await copyNotFound();
  await writeSitemap();

  const entries = await readdir(OUT);
  console.log(`postbuild: build/client contains ${entries.length} top-level entries`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
