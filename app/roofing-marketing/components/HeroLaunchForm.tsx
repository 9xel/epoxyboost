"use client";

import { HeroFormServicesField } from "./HeroFormServicesField";

const formFields = [
  {
    name: "name",
    type: "text",
    autoComplete: "name" as const,
    label: "Name",
    placeholder: "Name *",
  },
  {
    name: "email",
    type: "email",
    autoComplete: "email" as const,
    label: "Email address",
    placeholder: "Email *",
  },
  {
    name: "phone",
    type: "tel",
    autoComplete: "tel" as const,
    label: "Phone number",
    placeholder: "Phone *",
  },
  {
    name: "company",
    type: "text",
    autoComplete: "organization" as const,
    label: "Company name",
    placeholder: "Company Name *",
  },
  {
    name: "city",
    type: "text",
    autoComplete: undefined,
    label: "Main service area",
    placeholder: "Main Service Area *",
  },
] as const;

const inputClassName =
  "hero-form__input hero-form__input--premium hero-form__input--premium-tight hero-form__input--premium-tight-compact";

export function HeroLaunchForm() {
  return (
    <aside className="hero-form-card hero-form-card--premium hero-form-card--premium-tight hero-form-card--premium-tight-fit hero-form-card--premium-tight-compact">
      <p className="hero-form-card__badge">WAITLIST</p>
      <h2 id="hero-form-heading" className="hero-form-card__heading">
        Be the first to get EpoxyBoost in your area.
      </h2>
      <p className="hero-form-card__subheading">
        We&apos;re currently reviewing epoxy contractors by referral and waitlist only.
        We&apos;ll reach out if your company looks like a fit.
      </p>

      <form
        className="hero-form hero-form--premium hero-form--premium-tight hero-form--premium-tight-compact"
        action="#contact"
        method="get"
      >
        <p className="hero-form__helper-line">Join in 30 seconds. No payment required.</p>
        {formFields.map((field) => {
          const inputId = `hero-${field.name}`;

          return (
            <div key={field.name} className="hero-form__field">
              <label htmlFor={inputId} className="sr-only">
                {field.label}
              </label>
              <input
                id={inputId}
                name={field.name}
                type={field.type}
                autoComplete={field.autoComplete}
                required
                placeholder={field.placeholder}
                className={inputClassName}
              />
            </div>
          );
        })}
        <HeroFormServicesField />
        <div className="hero-form__field hero-form__consent">
          <label className="hero-form__consent-label">
            <input
              id="hero-contact-consent"
              name="contact_consent"
              type="checkbox"
              value="yes"
              required
              className="hero-form__consent-checkbox"
            />
            <span className="hero-form__consent-text">
              I agree to be contacted by EpoxyBoost by phone, text, or email about my waitlist
              submission, services, updates, offers, and future opportunities. I understand I can opt
              out at any time. Consent is not a condition of purchase. We will never sell your
              personal information. See{" "}
              <a
                href="/privacy-policy"
                className="hero-form__consent-link"
                onClick={(event) => event.stopPropagation()}
                onMouseDown={(event) => event.stopPropagation()}
              >
                Privacy Policy
              </a>
            </span>
          </label>
        </div>
        <button
          type="submit"
          className="hero-form__submit hero-form__submit--premium hero-form__submit--premium-tight hero-form__submit--premium-tight-compact btn--big solid--lime btn--pill"
        >
          Join the Waitlist
        </button>
        <p className="hero-form__trust-line">
          Joining the waitlist does not guarantee acceptance or availability in your area.
        </p>
      </form>
    </aside>
  );
}
