import type { Metadata } from "next";

export const siteName = "EpoxyBoost";

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.myepoxyboost.com";

export const siteContactEmail = "info@myepoxyboost.com";

export const homePage = {
  title: "Websites, Branding & Growth for Epoxy Contractors | EpoxyBoost",
  description:
    "Look premium. Charge more. Get better clients. Branding, websites, and growth strategy built for epoxy contractors ready to compete on quality.",
  path: "/",
} as const;

export const openGraphImage = {
  url: "/images/og-image.webp",
  width: 1200,
  height: 630,
  alt: "Epoxy contractor applying a premium decorative floor coating",
} as const;

export const noIndexRobots: Metadata["robots"] = {
  index: false,
  follow: false,
  googleBot: {
    index: false,
    follow: false,
  },
};

export function siteOpenGraph({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): NonNullable<Metadata["openGraph"]> {
  return {
    type: "website",
    locale: "en_US",
    url: path,
    siteName,
    title,
    description,
    images: [openGraphImage],
  };
}

export function siteTwitter({
  title,
  description,
}: {
  title: string;
  description: string;
}): NonNullable<Metadata["twitter"]> {
  return {
    card: "summary_large_image",
    title,
    description,
    images: [openGraphImage.url],
  };
}
