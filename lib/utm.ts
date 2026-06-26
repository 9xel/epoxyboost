import { siteUrl } from "./site";

export type UtmParams = {
  source: string;
  medium: string;
};

/**
 * Standard UTM schema — only `source` changes per client/channel.
 *
 * | Channel              | source       | medium        |
 * |----------------------|--------------|---------------|
 * | Client footer credit | {client}     | site_credit   |
 * | Profile bio links    | {platform}   | bio           |
 */
export function buildTrackedUrl({ source, medium }: UtmParams) {
  const params = new URLSearchParams({
    utm_source: source,
    utm_medium: medium,
  });

  const base = siteUrl.replace(/\/$/, "");
  return `${base}/?${params.toString()}`;
}

/** Footer site credit on a client website — replace slug per client. */
export function buildClientSiteCreditUrl(clientSlug: string) {
  return buildTrackedUrl({ source: clientSlug, medium: "site_credit" });
}

/** @deprecated Use buildClientSiteCreditUrl */
export function buildWatermarkUrl(clientSlug: string) {
  return buildClientSiteCreditUrl(clientSlug);
}

/** Profile bio link (Instagram, LinkedIn, etc.) */
export function buildBioUrl(platform: string) {
  return buildTrackedUrl({ source: platform, medium: "bio" });
}

export function buildInstagramBioUrl() {
  return buildBioUrl("instagram");
}

export const CLIENT_SITE_CREDIT_URLS = {
  go2epoxy: buildClientSiteCreditUrl("go2epoxy"),
} as const;
