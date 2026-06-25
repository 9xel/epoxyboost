import { ServicesCarousel } from "./ServicesCarousel";

export function ServicesBandSection() {
  return (
    <div className="hc-band">
      <section className="hc-section hc-container">
        <header className="hc-section-header hc-section-header--center">
          <h2 className="hc-title hc-title--center">
            EpoxyBoost Better Leads With Our Services
          </h2>
        </header>
        <ServicesCarousel />
      </section>
    </div>
  );
}
