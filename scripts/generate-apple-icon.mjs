#!/usr/bin/env node

import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const SOURCE = path.join(ROOT, "app", "icon.svg");
const OUTPUT = path.join(ROOT, "app", "apple-icon.png");
const SIZE = 180;

async function main() {
  await sharp(SOURCE)
    .resize(SIZE, SIZE)
    .png()
    .toFile(OUTPUT);

  console.log(`write ${path.relative(ROOT, OUTPUT)} (${SIZE}x${SIZE})`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
