import { HeroLaunchForm } from "./HeroLaunchForm";
import { ScrollAnchor } from "./ScrollAnchor";

export function ClaimSpotFormSection() {
  return (
    <>
      <ScrollAnchor id="waitlist" />
      <section className="claim-spot-section" aria-labelledby="hero-form-heading">
      <div className="eb-container">
        <div className="claim-spot-section__inner">
          <HeroLaunchForm />
        </div>
      </div>
      </section>
    </>
  );
}
