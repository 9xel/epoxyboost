#!/usr/bin/env node

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const ORIGINALS_DIR = path.join(ROOT, "assets", "originals");
const OUTPUT_DIR = path.join(ROOT, "public", "images");

const RASTER_EXTENSIONS = new Set([
  ".jpg",
  ".jpeg",
  ".png",
  ".gif",
  ".tif",
  ".tiff",
  ".avif",
  ".heic",
  ".heif",
  ".webp",
]);

const WEBP_QUALITY = 82;
const THUMB_MAX_WIDTH = 600;

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    if (entry.name.startsWith(".")) continue;

    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walk(fullPath)));
      continue;
    }

    const ext = path.extname(entry.name).toLowerCase();
    if (RASTER_EXTENSIONS.has(ext)) {
      files.push(fullPath);
    }
  }

  return files;
}

function toWebpPath(sourcePath) {
  const relative = path.relative(ORIGINALS_DIR, sourcePath);
  const parsed = path.parse(relative);
  return path.join(OUTPUT_DIR, parsed.dir, `${parsed.name}.webp`);
}

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

async function convertFile(sourcePath, { thumbs }) {
  const outputPath = toWebpPath(sourcePath);
  await fs.mkdir(path.dirname(outputPath), { recursive: true });

  const image = sharp(sourcePath, { failOn: "none" }).rotate();
  let status = "skipped";

  if (!(await isUpToDate(sourcePath, outputPath))) {
    await image.clone().webp({ quality: WEBP_QUALITY }).toFile(outputPath);
    status = "converted";
  }

  if (thumbs) {
    const thumbPath = outputPath.replace(/\.webp$/, "-thumb.webp");
    if (!(await isUpToDate(sourcePath, thumbPath))) {
      await image
        .clone()
        .resize({ width: THUMB_MAX_WIDTH, withoutEnlargement: true })
        .webp({ quality: WEBP_QUALITY })
        .toFile(thumbPath);
      status = "converted";
    }
  }

  return { sourcePath, outputPath, status };
}

async function main() {
  const thumbs = process.argv.includes("--thumb");

  try {
    await fs.access(ORIGINALS_DIR);
  } catch {
    console.error(`Missing folder: ${path.relative(ROOT, ORIGINALS_DIR)}`);
    process.exit(1);
  }

  const sources = await walk(ORIGINALS_DIR);
  if (sources.length === 0) {
    console.log("No raster images found in assets/originals/");
    return;
  }

  let converted = 0;
  let skipped = 0;

  for (const sourcePath of sources) {
    try {
      const result = await convertFile(sourcePath, { thumbs });
      const relativeSource = path.relative(ROOT, sourcePath);
      const relativeOutput = path.relative(ROOT, result.outputPath);

      if (result.status === "skipped") {
        skipped += 1;
        console.log(`skip  ${relativeSource}`);
      } else {
        converted += 1;
        console.log(`write ${relativeOutput} <- ${relativeSource}`);
      }
    } catch (error) {
      const relativeSource = path.relative(ROOT, sourcePath);
      console.warn(`fail  ${relativeSource}: ${error.message}`);
    }
  }

  console.log(`\nDone: ${converted} converted, ${skipped} skipped.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
