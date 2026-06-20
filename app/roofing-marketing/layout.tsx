import type { Metadata } from "next";
import { Bebas_Neue, Nunito_Sans, Roboto_Slab } from "next/font/google";
import "./site-theme.css";

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

export const metadata: Metadata = {
  title: "Roofing Marketing Services | Know How To Drive Leads For You",
  description:
    "Get specialized roofing marketing services: SEO, PPC, custom websites, and content strategies built for roofing companies.",
};

export default function RoofingMarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className={`${nunitoSans.variable} ${robotoSlab.variable} ${bebasNeue.variable} eb-page font-[family-name:var(--font-eb-body)] text-black antialiased`}
    >
      {children}
    </div>
  );
}
