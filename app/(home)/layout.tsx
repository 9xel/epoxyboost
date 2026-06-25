import type { Metadata } from "next";
import { Bebas_Neue, Manrope, Nunito_Sans, Roboto_Slab } from "next/font/google";
import {
  homePage,
  siteOpenGraph,
  siteTwitter,
} from "../../lib/site";
import { HERO } from "../epoxyboost/data";
import "../epoxyboost/site-theme.css";

const AKTIV_GROTESK_WOFF2 = "/fonts/AktivGroteskEx_Trial_Bd.woff2";

const nunitoSans = Nunito_Sans({
  variable: "--font-eb-body",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
});

const robotoSlab = Roboto_Slab({
  variable: "--font-eb-heading",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

const bebasNeue = Bebas_Neue({
  variable: "--font-eb-display",
  subsets: ["latin"],
  weight: "400",
});

const manrope = Manrope({
  variable: "--font-eb-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: homePage.title,
  description: homePage.description,
  alternates: {
    canonical: homePage.path,
  },
  openGraph: siteOpenGraph({
    title: homePage.title,
    description: homePage.description,
    path: homePage.path,
  }),
  twitter: siteTwitter({
    title: homePage.title,
    description: homePage.description,
  }),
};

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <link
        rel="preload"
        as="font"
        href={AKTIV_GROTESK_WOFF2}
        type="font/woff2"
        crossOrigin="anonymous"
      />
      <link
        rel="preload"
        as="image"
        href={HERO.lcp}
        media="(max-width: 61.999rem)"
        type="image/webp"
        fetchPriority="high"
      />
      <link
        rel="preload"
        as="image"
        href={HERO.lcp}
        media="(min-width: 62rem)"
        type="image/webp"
        fetchPriority="high"
      />
      <div
        className={`${nunitoSans.variable} ${robotoSlab.variable} ${bebasNeue.variable} ${manrope.variable} eb-page eb-page--no-promo-bar eb-page--manrope font-[family-name:var(--font-eb-body)] text-black antialiased`}
      >
        <div className="eb-page--high-contrast">{children}</div>
      </div>
    </>
  );
}
