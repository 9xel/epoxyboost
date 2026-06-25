import type { ReactNode } from "react";

import { ClaimSpotFormSection } from "../components/ClaimSpotFormSection";
import { MinimalSiteFooter } from "../components/MinimalSiteFooter";
import { ServicesCarousel } from "../components/ServicesCarousel";
import { ScrollAnchor } from "../components/ScrollAnchor";
import { SiteHeader } from "../components/SiteHeader";

type EpoxyBoostLandingPageProps = {
  showCallTextSplit?: boolean;
  ctaLabel?: string;
  hero: ReactNode;
  showServicesSection?: boolean;
  showClaimFormSection?: boolean;
};

export function EpoxyBoostLandingPage({
  showCallTextSplit = false,
  ctaLabel = "Join Our Waitlist",
  hero,
  showServicesSection = false,
  showClaimFormSection = false,
}: EpoxyBoostLandingPageProps) {
  return (
    <>
      <SiteHeader
        showCallTextSplit={showCallTextSplit}
        ctaLabel={ctaLabel}
        ctaHref="#waitlist"
      />
      <main id="main-content">
        {hero}

        <div className="hc-post-hero">
          {showServicesSection ? (
            <>
              <ScrollAnchor id="services" />
              <div className="hc-band hc-services-section">
                <section className="hc-section hc-container">
                  <header className="hc-section-header hc-section-header--center">
                    <h2 className="hero-headline hc-services-section__title">
                      BOOST YOUR BRAND WITH OUR SERVICES
                    </h2>
                  </header>
                  <ServicesCarousel />
                </section>
              </div>
            </>
          ) : null}

          {showClaimFormSection ? <ClaimSpotFormSection /> : null}
        </div>
      </main>

      <MinimalSiteFooter />
    </>
  );
}
