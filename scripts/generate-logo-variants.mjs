#!/usr/bin/env node

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const SOURCE = path.join(ROOT, "public", "images", "go2epoxy-logo.webp");
const OUTPUT_DIR = path.join(ROOT, "public", "images");

const DISPLAY_WIDTH = 160;
const LCP_QUALITY = 72;
const HQ_QUALITY = 82;

async function main() {
  const image = sharp(SOURCE, { failOn: "none" }).rotate();
  const meta = await image.metadata();
  const aspect = (meta.height ?? 80) / (meta.width ?? 160);

  const lcpPath = path.join(OUTPUT_DIR, "go2epoxy-logo-160.webp");
  const hqPath = path.join(OUTPUT_DIR, "go2epoxy-logo.webp");

  await image
    .clone()
    .resize({ width: DISPLAY_WIDTH, withoutEnlargement: true })
    .webp({ quality: LCP_QUALITY })
    .toFile(lcpPath);

  if (!(await fileExists(hqPath))) {
    await image.clone().webp({ quality: HQ_QUALITY }).toFile(hqPath);
  }

  const lcpStat = await fs.stat(lcpPath);
  const hqStat = await fs.stat(hqPath);

  console.log(`write ${path.relative(ROOT, lcpPath)} (${(lcpStat.size / 1024).toFixed(1)} KB, ${DISPLAY_WIDTH}x${Math.round(DISPLAY_WIDTH * aspect)})`);
  console.log(`keep  ${path.relative(ROOT, hqPath)} (${(hqStat.size / 1024).toFixed(1)} KB)`);
}

async function fileExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
