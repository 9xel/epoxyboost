import { BrandingHeroSection } from "../epoxyboost/components/BrandingHeroSection";
import { EpoxyBoostLandingPage } from "../epoxyboost/high-contrast/EpoxyBoostLandingPage";

export default function HomePage() {
  return (
    <EpoxyBoostLandingPage
      showServicesSection
      showClaimFormSection
      hero={<BrandingHeroSection />}
    />
  );
}
