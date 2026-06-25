import { BrandingHeroPhoto } from "./BrandingHeroPhoto";
import { FitHeroSubheadline } from "./FitHeroSubheadline";
import { FitOneLineText } from "./FitOneLineText";
import { PillDarkOutlineButton } from "./PillDarkOutlineButton";
import { PillLimeButton } from "./PillLimeButton";

type BrandingHeroSectionProps = {
  id?: string;
  variant?: "primary" | "classic";
};

export function BrandingHeroSection({ id, variant = "primary" }: BrandingHeroSectionProps = {}) {
  const isClassic = variant === "classic";

  return (
    <section
      id={id}
      className={`hero hero--landing hero--branding${isClassic ? "" : " hero--branding-primary"}`}
      aria-label="Epoxy contractor branding and growth"
    >
      <BrandingHeroPhoto />

      <div className="eb-container">
        <div className="eb-row hero-row">
          <div className="eb-col">
            <div className="hero-content">
              <header>
                <FitOneLineText className="hero-eyebrow" minFontSize={10}>
                  WE KNOW EPOXY + HOW TO GROW YOUR BRAND
                </FitOneLineText>
                <h1 className="hero-headline hero-headline--sentence">
                  Websites, Branding & Growth Strategy for Epoxy Contractors
                </h1>
                <FitHeroSubheadline
                  line1="Look premium. Charge more."
                  line2="Get better clients."
                />
              </header>

              <div className="hero-copy">
                {isClassic ? (
                  <>
                    <p className="hero-lead">Want to get paid more for the work you&apos;re already doing?</p>
                    <p className="hero-lead">
                      Tired of hearing, &ldquo;I know a guy who can do it for cheaper&rdquo;?
                    </p>
                    <p className="hero-lead">
                      Want clients who care more about quality than saving a few dollars?
                    </p>
                    <p className="hero-lead hero-lead--emphasis">
                      Stop trying to compete with the cheapest guy in town.
                    </p>
                    <p className="hero-lead">
                      EpoxyBoost is built for epoxy contractors who already do great work, but want to
                      upgrade their clientele, raise their prices, and become a premium service
                      customers expect to pay more for.
                    </p>
                    <p className="hero-lead">
                      We have the proof. Using our branding and launch strategy, we took Go2Epoxy from
                      a brand-new company to Vancouver&apos;s fastest-growing epoxy brand in just 6
                      short months.
                    </p>
                    <p className="hero-lead">
                      When your brand, website, and online presence are dialed in, people can tell
                      you&apos;re not in the same category as the Facebook Marketplace lowballers. They
                      see a real, premium company. They trust you more. And they&apos;re prepared for a
                      higher price tag.
                    </p>
                    <p className="hero-lead hero-lead--emphasis">
                      Stop competing on price. Start competing on quality.
                    </p>
                  </>
                ) : (
                  <>
                    <p className="hero-lead">
                      Tired of hearing, &ldquo;I know a guy who can do it for cheaper&rdquo;?
                    </p>
                    <p className="hero-lead">
                      If you already do great epoxy work, EpoxyBoost is built to help you stand out as
                      the premium option in your city.
                    </p>
                    <p className="hero-lead hero-lead--emphasis">
                      Stop competing on price. Start competing on quality.
                    </p>
                  </>
                )}
              </div>

              <div className={`hero-cta-row${isClassic ? "" : " hero-cta-row--paired"}`}>
                {!isClassic ? <PillDarkOutlineButton href="#services">Learn More</PillDarkOutlineButton> : null}
                <PillLimeButton href="#waitlist">Join Our Waitlist</PillLimeButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
