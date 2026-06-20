import { HeroLaunchForm } from "./HeroLaunchForm";
import { LaunchPackageValueStack } from "./LaunchPackageValueStack";

export function HeroQuoteFormSection() {
  return (
    <section
      id="claim-spot"
      className="hero-quote-section"
      aria-labelledby="launch-package-heading hero-form-heading"
    >
      <div className="eb-container">
        <div className="hero-quote-section__grid">
          <LaunchPackageValueStack />
          <div className="hero-quote-section__form">
            <HeroLaunchForm />
          </div>
        </div>
      </div>
    </section>
  );
}
