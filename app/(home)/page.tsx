import { BrandingHeroSection } from "../roofing-marketing/components/BrandingHeroSection";
import { EpoxyBoostLandingPage } from "../roofing-marketing/high-contrast/EpoxyBoostLandingPage";

export default function HomePage() {
  return (
    <EpoxyBoostLandingPage
      showServicesSection
      showClaimFormSection
      hero={<BrandingHeroSection />}
    />
  );
}
