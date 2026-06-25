import type { Metadata } from "next";
import { siteOpenGraph, siteTwitter } from "../../../lib/site";
import { MinimalSiteFooter } from "../../roofing-marketing/components/MinimalSiteFooter";
import { SiteHeader } from "../../roofing-marketing/components/SiteHeader";
import { WaitlistThankYouPageContent } from "../../roofing-marketing/components/WaitlistThankYouPageContent";

const waitlistThankYouPath = "/waitlist/thank-you";

const pageMeta = {
  title: "You're on the Waitlist | EpoxyBoost",
  description:
    "Thanks for joining the EpoxyBoost waitlist. We'll reach out if your epoxy contracting business looks like a fit.",
} as const;

export const metadata: Metadata = {
  title: pageMeta.title,
  description: pageMeta.description,
  alternates: {
    canonical: waitlistThankYouPath,
  },
  openGraph: siteOpenGraph({
    title: pageMeta.title,
    description: pageMeta.description,
    path: waitlistThankYouPath,
  }),
  twitter: siteTwitter({
    title: pageMeta.title,
    description: pageMeta.description,
  }),
};

export default function WaitlistThankYouPage() {
  return (
    <>
      <SiteHeader showCta={false} />
      <main id="main-content" className="minimal-page waitlist-thank-you-page">
        <WaitlistThankYouPageContent />
      </main>
      <MinimalSiteFooter />
    </>
  );
}
