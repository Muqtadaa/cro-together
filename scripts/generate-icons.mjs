/**
 * Generates the static icons and Open Graph image in public/ from the brand
 * logo (src/assets/logo.png, a black raven silhouette on transparent).
 *
 * Run once, commit the output:  npm run icons
 *
 * Outputs (public/):
 *   favicon.ico          16 + 32 + 48 px PNG-in-ICO, raven tinted navy
 *   favicon.svg          scalable wrapper around a 256 px raster of the mark
 *   apple-touch-icon.png 180 px, cream background (iOS ignores alpha)
 *   icon-192.png         192 px, cream background (web manifest)
 *   icon-512.png         512 px, cream background (web manifest)
 *   og-image.png         1200 x 630, cream background, mark centred
 *
 * Uses sharp only (no ImageMagick / ffmpeg on the build machine).
 */
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const LOGO = path.join(root, "src/assets/logo.png");
const OUT = path.join(root, "public");

// Brand tokens (mirror src/styles/theme.css)
const NAVY = { r: 6, g: 14, b: 26 };
const CREAM = { r: 245, g: 240, b: 232 };

/** The logo recoloured to navy, as an RGBA PNG buffer of the given size. */
async function mark(size) {
  const alpha = await sharp(LOGO)
    .resize(size, size, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .extractChannel("alpha")
    .toBuffer();
  return sharp({
    create: { width: size, height: size, channels: 3, background: NAVY },
  })
    .joinChannel(alpha)
    .png()
    .toBuffer();
}

/** Square icon: cream background, navy mark inset by `pad` px on each side. */
async function tile(size, pad) {
  const inner = await mark(size - pad * 2);
  return sharp({
    create: { width: size, height: size, channels: 4, background: { ...CREAM, alpha: 1 } },
  })
    .composite([{ input: inner, left: pad, top: pad }])
    .png()
    .toBuffer();
}

/**
 * Wraps PNG images in an ICO container. Every modern browser reads
 * PNG-compressed ICO entries (Windows Vista+ format), and sharp cannot
 * write ICO natively.
 */
function ico(entries) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(entries.length, 4);

  const dir = Buffer.alloc(16 * entries.length);
  let offset = 6 + dir.length;
  entries.forEach(({ size, png }, i) => {
    const o = i * 16;
    dir.writeUInt8(size >= 256 ? 0 : size, o); // width (0 = 256)
    dir.writeUInt8(size >= 256 ? 0 : size, o + 1); // height
    dir.writeUInt8(0, o + 2); // palette
    dir.writeUInt8(0, o + 3); // reserved
    dir.writeUInt16LE(1, o + 4); // colour planes
    dir.writeUInt16LE(32, o + 6); // bits per pixel
    dir.writeUInt32LE(png.length, o + 8);
    dir.writeUInt32LE(offset, o + 12);
    offset += png.length;
  });

  return Buffer.concat([header, dir, ...entries.map((e) => e.png)]);
}

async function main() {
  await mkdir(OUT, { recursive: true });

  // favicon.ico — transparent background so it sits on any tab colour
  const icoSizes = [16, 32, 48];
  const icoEntries = [];
  for (const size of icoSizes) {
    icoEntries.push({ size, png: await mark(size) });
  }
  await writeFile(path.join(OUT, "favicon.ico"), ico(icoEntries));

  // favicon.svg — the only vector source is the PNG, so embed a crisp
  // 256 px raster; browsers still get a single scalable file to request.
  const svgRaster = (await mark(256)).toString("base64");
  const svg = [
    '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 256 256" width="256" height="256">',
    "<title>CRO Together</title>",
    `<image width="256" height="256" xlink:href="data:image/png;base64,${svgRaster}"/>`,
    "</svg>",
    "",
  ].join("\n");
  await writeFile(path.join(OUT, "favicon.svg"), svg);

  // Opaque tiles for iOS and the web manifest
  await writeFile(path.join(OUT, "apple-touch-icon.png"), await tile(180, 18));
  await writeFile(path.join(OUT, "icon-192.png"), await tile(192, 20));
  await writeFile(path.join(OUT, "icon-512.png"), await tile(512, 56));

  // Open Graph image: 1200 x 630 cream canvas, navy mark centred
  const ogMark = await mark(440);
  const og = await sharp({
    create: { width: 1200, height: 630, channels: 4, background: { ...CREAM, alpha: 1 } },
  })
    .composite([{ input: ogMark, left: Math.round((1200 - 440) / 2), top: Math.round((630 - 440) / 2) }])
    .png({ compressionLevel: 9, palette: true })
    .toBuffer();
  await writeFile(path.join(OUT, "og-image.png"), og);

  console.log("Icons written to public/");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
