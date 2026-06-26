import fs from "node:fs";
import path from "node:path";
import readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { fileURLToPath } from "node:url";
import { google } from "googleapis";

const TOOL_ROOT = path.dirname(fileURLToPath(import.meta.url));
const OAUTH_DIR = path.join(TOOL_ROOT, "oauth");
const TOKEN_PATH = path.join(OAUTH_DIR, "token.json");
const CREDS_PATH = path.join(OAUTH_DIR, "client_secret.json");

export const SCOPES = [
  "https://www.googleapis.com/auth/tagmanager.edit.containers",
  "https://www.googleapis.com/auth/tagmanager.publish",
];

export function getToolRoot() {
  return TOOL_ROOT;
}

export function getOAuthPaths() {
  return { oauthDir: OAUTH_DIR, tokenPath: TOKEN_PATH, credsPath: CREDS_PATH };
}

export async function authorize({ force = false } = {}) {
  if (!fs.existsSync(CREDS_PATH)) {
    throw new Error(
      [
        `Missing OAuth credentials at ${CREDS_PATH}`,
        "",
        "1. Go to https://console.cloud.google.com/",
        "2. Enable the Tag Manager API",
        "3. Create an OAuth client (Desktop app)",
        "4. Download JSON and save it as tools/gtm-setup/oauth/client_secret.json",
      ].join("\n"),
    );
  }

  const creds = JSON.parse(fs.readFileSync(CREDS_PATH, "utf8"));
  const installed = creds.installed ?? creds.web;
  const { client_secret, client_id, redirect_uris } = installed;
  const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

  if (!force && fs.existsSync(TOKEN_PATH)) {
    oAuth2Client.setCredentials(JSON.parse(fs.readFileSync(TOKEN_PATH, "utf8")));
    return oAuth2Client;
  }

  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
    prompt: "consent",
  });

  console.log("Open this URL in your browser:\n");
  console.log(authUrl);
  console.log("");

  const rl = readline.createInterface({ input, output });
  const code = await rl.question("Paste the authorization code: ");
  rl.close();

  const { tokens } = await oAuth2Client.getToken(code.trim());
  oAuth2Client.setCredentials(tokens);
  fs.mkdirSync(OAUTH_DIR, { recursive: true });
  fs.writeFileSync(TOKEN_PATH, JSON.stringify(tokens, null, 2));
  console.log(`Saved token to ${TOKEN_PATH}`);

  return oAuth2Client;
}

export function createTagManagerClient(auth) {
  return google.tagmanager({ version: "v2", auth });
}
