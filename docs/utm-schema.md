# UTM naming schema — EpoxyBoost

Use this for every client site footer credit ("Site design & logo by EpoxyBoost").

## Client site footer (only `utm_source` changes)

| Parameter | Value | Notes |
|-----------|-------|-------|
| `utm_source` | **`{client_slug}`** | e.g. `go2epoxy` — **only thing you swap per client** |
| `utm_medium` | `site_credit` | Fixed — footer stamp / design credit |
| `utm_campaign` | `client_sites` | Fixed — all client-built sites |
| `utm_content` | `footer` | Fixed — bottom-right placement |

### Client slug rules

- Lowercase
- No `.com`
- No spaces or punctuation  
- Examples: `Go2Epoxy` → `go2epoxy`, `Acme Epoxy LLC` → `acmeepoxyllc`

## Go2Epoxy (use this in their footer link)

```text
https://www.myepoxyboost.com/?utm_source=go2epoxy&utm_medium=site_credit&utm_campaign=client_sites&utm_content=footer
```

## Instagram bio (separate channel)

| Parameter | Value |
|-----------|-------|
| `utm_source` | `instagram` |
| `utm_medium` | `social` |
| `utm_campaign` | `bio_link` |
| `utm_content` | `bio` |

```text
https://www.myepoxyboost.com/?utm_source=instagram&utm_medium=social&utm_campaign=bio_link&utm_content=bio
```

## GA4 — where to read results

**Reports → Acquisition → Traffic acquisition**

- All client footer credits: filter **Session medium** = `site_credit`
- One client: filter **Session source** = `go2epoxy`
- Instagram: **Session source** = `instagram`, **Session medium** = `social`

## Code helpers (`lib/utm.ts`)

```ts
buildClientSiteCreditUrl("go2epoxy")
CLIENT_SITE_CREDIT_URLS.go2epoxy
buildInstagramBioUrl()
```
