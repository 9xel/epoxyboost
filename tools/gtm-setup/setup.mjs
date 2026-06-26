#!/usr/bin/env node

import { authorize, createTagManagerClient } from "./lib/auth.mjs";
import { listClientSlugs, loadClientConfig } from "./lib/config.mjs";
import { listAccountsAndContainers, setupContainer } from "./lib/gtm.mjs";

const [command, ...args] = process.argv.slice(2);

async function runAuth() {
  await authorize({ force: true });
}

async function runList() {
  const auth = await authorize();
  const tagmanager = createTagManagerClient(auth);
  const rows = await listAccountsAndContainers(tagmanager);

  if (!rows.length) {
    console.log("No GTM accounts/containers found for this Google account.");
    return;
  }

  console.log("\nGTM accounts and containers:\n");
  for (const row of rows) {
    console.log(
      `  ${row.accountName} (${row.accountId}) / ${row.containerName} (${row.publicId}) → containerId: ${row.containerId}`,
    );
  }

  const clients = listClientSlugs();
  if (clients.length) {
    console.log(`\nLocal client configs: ${clients.join(", ")}`);
  }
}

async function runSetup() {
  const slug = args[0];
  if (!slug) {
    const available = listClientSlugs();
    console.error("Usage: npm run setup -- <client-slug>");
    if (available.length) {
      console.error(`Available: ${available.join(", ")}`);
    }
    process.exit(1);
  }

  const config = loadClientConfig(slug);
  const auth = await authorize();
  const tagmanager = createTagManagerClient(auth);
  await setupContainer(tagmanager, config);
}

async function main() {
  switch (command) {
    case "auth":
      await runAuth();
      break;
    case "list":
      await runList();
      break;
    case "setup":
      await runSetup();
      break;
    default:
      console.log(`gtm-setup — reusable Google Tag Manager API tool

Commands:
  npm run auth              Re-authorize Google OAuth
  npm run list              List GTM account/container IDs
  npm run setup -- <slug>   Create tags/triggers from clients/<slug>.json

Copy tools/gtm-setup/ to any project. See README.md for setup.
`);
      process.exit(command ? 1 : 0);
  }
}

main().catch((error) => {
  console.error(error.message ?? error);
  process.exit(1);
});
