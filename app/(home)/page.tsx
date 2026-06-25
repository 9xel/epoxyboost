import { BrandingHeroSection } from "../roofing-marketing/components/BrandingHeroSection";
import { EpoxyBoostLandingPage } from "../roofing-marketing/high-contrast/EpoxyBoostLandingPage";

export default function HomePage() {
  return (
    <EpoxyBoostLandingPage
      showPromoBar={false}
      showNavLinks={false}
      showCallTextSplit={false}
      showMiddleSections={false}
      showServicesSection
      showClaimFormSection
      minimalFooter
      ctaLabel="Join Our Waitlist"
      hero={<BrandingHeroSection />}
    />
  );
}
