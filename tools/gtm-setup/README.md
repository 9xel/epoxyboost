# GTM Setup Tool

Portable Google Tag Manager API automation. Copy the entire `tools/gtm-setup/` folder to any project.

## What it creates

For each client config, the script idempotently creates (or skips if already present):

- **All Pages** trigger
- **Google tag - GA4 Config** (`googtag`) with your measurement ID
- **Custom event triggers** for each event in config
- **GA4 Event** tags (`gaawe`) for each event
- Optional **Google Ads conversion** tags when `adsConversionLabel` + `googleAds.conversionId` are set

Safe to re-run: existing tags/triggers with the same name are reused.

## One-time setup

### 1. Google Cloud OAuth

1. Open [Google Cloud Console](https://console.cloud.google.com/)
2. Create or select a project
3. Enable **Tag Manager API**
4. **Credentials → Create OAuth client ID → Desktop app**
5. Download JSON → save as `oauth/client_secret.json`

### 2. Install dependencies

```bash
cd tools/gtm-setup
npm install
```

### 3. Authorize

```bash
npm run auth
```

Opens a browser URL; paste the auth code. Token is saved to `oauth/token.json` (gitignored).

### 4. Find account/container IDs

```bash
npm run list
```

Copy `accountId` and `containerId` (numeric IDs, not `GTM-XXXX`) into your client config.

> **Note:** `containerId` in the API is the numeric ID shown by `npm run list`, not the public `GTM-XXXXXX` string.

## Per-project client config

Copy `clients/_template.json` → `clients/<slug>.json` and fill in:

| Field | Description |
|-------|-------------|
| `projectName` | Display name |
| `accountId` | GTM account ID (numeric) |
| `containerId` | GTM container ID (numeric) |
| `ga4MeasurementId` | `G-XXXXXXXXXX` |
| `events` | Array of `{ name, ga4?, adsConversionLabel? }` |
| `googleAds.conversionId` | Optional `AW-...` for Ads tags |
| `publish` | `false` (recommended) — preview first, publish manually |

Event `name` must match what your site pushes to `dataLayer`, e.g.:

```js
dataLayer.push({ event: "phone_click" });
```

## Run setup

```bash
npm run setup -- epoxyboost
```

Set `"publish": true` in the client JSON only after Tag Assistant preview looks correct.

## Use in another repo

1. Copy `tools/gtm-setup/` to the other project
2. `cd tools/gtm-setup && npm install`
3. Add `oauth/client_secret.json` (or reuse token if same Google account)
4. Create `clients/<project>.json`
5. `npm run setup -- <project>`

OAuth credentials and tokens stay in `oauth/` and are not committed.

## Site integration

After GTM is set up, your site needs:

1. `NEXT_PUBLIC_GTM_ID=GTM-XXXXXX` in `.env.local` / Vercel env
2. `dataLayer.push({ event: "..." })` for custom events (handled in `lib/analytics.ts`)
3. Do **not** set `NEXT_PUBLIC_GA_MEASUREMENT_ID` when using GTM (avoids double pageviews)

Run from repo root:

```bash
npm run gtm:auth
npm run gtm:list
npm run gtm:setup -- epoxyboost
```

## Commands

| Command | Description |
|---------|-------------|
| `npm run auth` | Re-run OAuth flow |
| `npm run list` | List GTM accounts/containers |
| `npm run setup -- <slug>` | Apply `clients/<slug>.json` to GTM |
