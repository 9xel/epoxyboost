import type { Metadata } from "next";
import { Bebas_Neue, Manrope, Nunito_Sans, Roboto_Slab } from "next/font/google";
import "../../roofing-marketing/site-theme.css";
import "../../roofing-marketing/minimal-page.css";
import "../../roofing-marketing/waitlist-thank-you-page.css";

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

export default function WaitlistThankYouLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className={`${nunitoSans.variable} ${robotoSlab.variable} ${bebasNeue.variable} ${manrope.variable} eb-page eb-page--no-promo-bar eb-page--manrope font-[family-name:var(--font-eb-body)] text-black antialiased`}
    >
      <div className="eb-page--high-contrast">{children}</div>
    </div>
  );
}
