import fs from "node:fs";
import path from "node:path";
import { getToolRoot } from "./auth.mjs";

const REQUIRED_FIELDS = ["projectName", "accountId", "containerId", "ga4MeasurementId"];

export function getClientsDir() {
  return path.join(getToolRoot(), "clients");
}

export function listClientSlugs() {
  const dir = getClientsDir();
  if (!fs.existsSync(dir)) {
    return [];
  }

  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".json") && !file.startsWith("_"))
    .map((file) => file.replace(/\.json$/, ""))
    .sort();
}

export function loadClientConfig(slug) {
  const filePath = path.join(getClientsDir(), `${slug}.json`);
  if (!fs.existsSync(filePath)) {
    const available = listClientSlugs();
    throw new Error(
      `Client config not found: ${filePath}\n` +
        (available.length ? `Available clients: ${available.join(", ")}` : "No client configs yet. Copy clients/_template.json"),
    );
  }

  const config = JSON.parse(fs.readFileSync(filePath, "utf8"));
  validateConfig(config, slug);
  return config;
}

function validateConfig(config, slug) {
  for (const field of REQUIRED_FIELDS) {
    if (!config[field]) {
      throw new Error(`clients/${slug}.json is missing required field "${field}"`);
    }
  }

  if (!Array.isArray(config.events) || config.events.length === 0) {
    throw new Error(`clients/${slug}.json must include a non-empty "events" array`);
  }

  for (const [index, event] of config.events.entries()) {
    if (!event?.name) {
      throw new Error(`clients/${slug}.json events[${index}] must include "name"`);
    }
  }
}

export function normalizeEvents(config) {
  return config.events.map((event) => ({
    name: event.name,
    ga4: event.ga4 !== false,
    adsConversionLabel: event.adsConversionLabel ?? null,
  }));
}
