# EpoxyBoost GTM — finish setup

Container: **GTM-P7GQVNMF** (`www.myepoxyboost.com`)  
GA4: **G-9FJJ11P5SM**  
Google tag: **GT-NB9ZD367** (optional; use GA4 ID in GTM tags)

## 1. Vercel (do this now)

In **Project → Settings → Environment Variables**:

| Action | Variable | Value |
|--------|----------|-------|
| **Add** | `NEXT_PUBLIC_GTM_ID` | `GTM-P7GQVNMF` |
| **Delete** | `NEXT_PUBLIC_GA_MEASUREMENT_ID` | — |

Redeploy production after saving.

Local dev is already set in `.env.local`.

## 2. Tags inside GTM (manual — ~5 min)

Open [tagmanager.google.com](https://tagmanager.google.com) → **www.myepoxyboost.com** → **Tags**.

### Tag 1 — Google tag (config)

- **Tag type:** Google tag  
- **Tag ID:** `G-9FJJ11P5SM`  
- **Trigger:** All Pages  

### Triggers (3×) — Custom Event

| Name | Event name |
|------|------------|
| CE - waitlist_form_submit | `waitlist_form_submit` |
| CE - phone_click | `phone_click` |
| CE - email_click | `email_click` |

### Tags (3×) — Google Analytics: GA4 Event

| Name | Event name | Trigger |
|------|------------|---------|
| GA4 Event - waitlist_form_submit | `waitlist_form_submit` | CE - waitlist_form_submit |
| GA4 Event - phone_click | `phone_click` | CE - phone_click |
| GA4 Event - email_click | `email_click` | CE - email_click |

Use measurement ID `G-9FJJ11P5SM` if the tag asks for it.

## 3. Test & publish

1. **Preview** → open `https://www.myepoxyboost.com`  
2. Confirm **Google tag** fires on page load  
3. Click a `tel:` / `mailto:` link → `phone_click` / `email_click`  
4. Submit waitlist form → `waitlist_form_submit`  
5. **Submit** → **Publish**

## 4. UTM watermark test

Visit:

```text
https://www.myepoxyboost.com/?utm_source=test&utm_medium=watermark&utm_campaign=client_referral
```

In GA4 → **Realtime** → session should show `test / watermark`.

On client sites, use `buildWatermarkUrl("go2epoxy")` from `lib/utm.ts`.

## 5. Automate later (optional)

To create tags via API instead of clicking:

1. Save OAuth JSON → `tools/gtm-setup/oauth/client_secret.json`  
2. `npm run gtm:auth`  
3. `npm run gtm:list` → copy numeric `accountId` + `containerId` into `clients/epoxyboost.json`  
4. `npm run gtm:setup -- epoxyboost`
