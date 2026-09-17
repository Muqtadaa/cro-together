/**
 * One-off image optimisation for the four stock photographs (sharp).
 *
 *   node scripts/optimise-images.mjs [source-dir]
 *
 * Reads <name>.jpg from the source directory (default src/assets) and writes
 * src/assets/<name>-800.webp and <name>-1600.webp. The outputs are committed
 * and the multi-megabyte originals are deleted, so this only needs to run
 * again if a photograph is replaced. Every 1600w output must stay under
 * 250 KB (the LCP budget); the script fails if one does not.
 */
import { stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SOURCE = path.resolve(root, process.argv[2] ?? "src/assets");
const OUT = path.join(root, "src/assets");
const NAMES = ["hero", "workspace", "analytics-tablet", "lightbulb"];
const WIDTHS = [800, 1600];
const MAX_BYTES = 250 * 1024;

for (const name of NAMES) {
  const source = path.join(SOURCE, `${name}.jpg`);
  for (const width of WIDTHS) {
    const target = path.join(OUT, `${name}-${width}.webp`);
    const info = await sharp(source)
      .rotate()
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 80, effort: 6 })
      .toFile(target);
    const { size } = await stat(target);
    console.log(`${path.relative(root, target)}: ${info.width}x${info.height}, ${(size / 1024).toFixed(0)} KB`);
    if (width === 1600 && size > MAX_BYTES) {
      throw new Error(`${target} is ${size} bytes; the 1600w budget is ${MAX_BYTES}`);
    }
  }
}
