import { BrandingHeroSection } from "../epoxyboost/components/BrandingHeroSection";
import { HeroCheckedSubheadline } from "../epoxyboost/components/HeroCheckedSubheadline";
import { EpoxyBoostLandingPage } from "../epoxyboost/high-contrast/EpoxyBoostLandingPage";

const HERO_BENEFITS = ["Look premium", "Charge more", "Get better clients"];

export default function HomePage() {
  return (
    <EpoxyBoostLandingPage
      showServicesSection
      showClaimFormSection
      hero={
        <BrandingHeroSection
          className="hero--branding-benefits"
          eyebrowClassName="hero-eyebrow--lime"
          subheadline={
            <HeroCheckedSubheadline
              items={HERO_BENEFITS}
              style="straight-check-md"
              textColor="white"
            />
          }
        />
      }
    />
  );
}
