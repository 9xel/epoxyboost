import { PillDarkOutlineButton } from "./PillDarkOutlineButton";

const cardClassName =
  "hero-form-card hero-form-card--premium hero-form-card--premium-tight hero-form-card--premium-tight-fit hero-form-card--premium-tight-compact waitlist-thank-you__card";

export function WaitlistThankYouPageContent() {
  return (
    <>
      <div className="minimal-page__hero-bg">
        <section className="minimal-page__hero waitlist-thank-you__hero">
          <div className="hc-container minimal-page__hero-inner">
            <p className="hero-form-card__badge">WAITLIST</p>
            <h1 className="minimal-page__hero-title">You&apos;re on the list.</h1>
            <p className="waitlist-thank-you__hero-lead">
              Thanks for joining. We&apos;ll reach out if your company looks like a fit.
            </p>
          </div>
        </section>
      </div>

      <section className="waitlist-thank-you__content" aria-label="Waitlist confirmation">
        <div className="hc-container waitlist-thank-you__inner">
          <aside className={cardClassName}>
            <h2 className="hero-form-card__heading">What happens next?</h2>
            <p className="hero-form-card__subheading">
              Our team reviews every waitlist submission. If your epoxy business looks like a strong
              fit, we&apos;ll contact you by phone, text, or email to talk through next steps.
            </p>
            <ul className="waitlist-thank-you__steps">
              <li>We review your company, service area, and goals.</li>
              <li>If there&apos;s a fit, we&apos;ll reach out to schedule a brief intro.</li>
              <li>No payment is required to stay on the waitlist.</li>
            </ul>
            <div className="waitlist-thank-you__actions">
              <PillDarkOutlineButton href="/">Back to Home</PillDarkOutlineButton>
            </div>
          </aside>
          <p className="hero-form__trust-line waitlist-thank-you__trust-line">
            Joining the waitlist does not guarantee acceptance or availability in your area.
          </p>
        </div>
      </section>
    </>
  );
}
