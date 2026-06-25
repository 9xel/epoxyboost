#!/usr/bin/env node

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const SOURCE = path.join(ROOT, "public", "images", "IMG_0745 (2).webp");
const OUTPUT_DIR = path.join(ROOT, "public", "images", "hero");

const WIDTHS = [390, 480, 720, 824, 1040, 1200, 1600];
const HQ_MAX_WIDTH = 2400;
const WEBP_QUALITY = 82;
const HQ_QUALITY = 88;

async function isUpToDate(sourcePath, outputPath) {
  try {
    const [sourceStat, outputStat] = await Promise.all([
      fs.stat(sourcePath),
      fs.stat(outputPath),
    ]);
    return outputStat.mtimeMs >= sourceStat.mtimeMs;
  } catch {
    return false;
  }
}

async function writeVariant(image, width, outputPath, quality) {
  await fs.mkdir(path.dirname(outputPath), { recursive: true });

  if (await isUpToDate(SOURCE, outputPath)) {
    return "skipped";
  }

  await image
    .clone()
    .resize({ width, withoutEnlargement: true })
    .webp({ quality })
    .toFile(outputPath);

  return "written";
}

async function main() {
  try {
    await fs.access(SOURCE);
  } catch {
    console.error(`Missing hero source: ${path.relative(ROOT, SOURCE)}`);
    process.exit(1);
  }

  const image = sharp(SOURCE, { failOn: "none" }).rotate();
  const meta = await image.metadata();
  let written = 0;
  let skipped = 0;

  for (const width of WIDTHS) {
    const outputPath = path.join(OUTPUT_DIR, `eb-hero-${width}.webp`);
    const status = await writeVariant(image, width, outputPath, WEBP_QUALITY);
    if (status === "written") {
      written += 1;
      const stat = await fs.stat(outputPath);
      console.log(`write ${path.relative(ROOT, outputPath)} (${(stat.size / 1024).toFixed(1)} KB)`);
    } else {
      skipped += 1;
      console.log(`skip  ${path.relative(ROOT, outputPath)}`);
    }
  }

  const hqPath = path.join(OUTPUT_DIR, "eb-hero-hq.webp");
  const hqWidth = Math.min(meta.width ?? HQ_MAX_WIDTH, HQ_MAX_WIDTH);
  const hqStatus = await writeVariant(image, hqWidth, hqPath, HQ_QUALITY);
  if (hqStatus === "written") {
    written += 1;
    const stat = await fs.stat(hqPath);
    console.log(`write ${path.relative(ROOT, hqPath)} (${(stat.size / 1024).toFixed(1)} KB)`);
  } else {
    skipped += 1;
    console.log(`skip  ${path.relative(ROOT, hqPath)}`);
  }

  console.log(`\nDone: ${written} written, ${skipped} skipped.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
