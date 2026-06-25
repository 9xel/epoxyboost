import type { Metadata } from "next";
import { siteOpenGraph, siteTwitter } from "../../lib/site";
import { MinimalSiteFooter } from "../roofing-marketing/components/MinimalSiteFooter";
import { PrivacyPolicyPageContent } from "../roofing-marketing/components/PrivacyPolicyPageContent";
import { SiteHeader } from "../roofing-marketing/components/SiteHeader";
import { privacyPolicyPage } from "../roofing-marketing/lib/privacy-policy";

const privacyPolicyPath = "/privacy-policy";

export const metadata: Metadata = {
  title: privacyPolicyPage.title,
  description: privacyPolicyPage.metaDescription,
  alternates: {
    canonical: privacyPolicyPath,
  },
  openGraph: siteOpenGraph({
    title: privacyPolicyPage.title,
    description: privacyPolicyPage.metaDescription,
    path: privacyPolicyPath,
  }),
  twitter: siteTwitter({
    title: privacyPolicyPage.title,
    description: privacyPolicyPage.metaDescription,
  }),
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <SiteHeader ctaLabel="Join Our Waitlist" ctaHref="/#waitlist" />
      <main id="main-content" className="minimal-page privacy-policy-page">
        <PrivacyPolicyPageContent />
      </main>
      <MinimalSiteFooter />
    </>
  );
}
