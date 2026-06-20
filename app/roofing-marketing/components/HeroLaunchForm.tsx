const formFields = [
  {
    name: "name",
    type: "text",
    autoComplete: "name" as const,
    label: "Full name",
    placeholder: "Full Name *",
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
    name: "city",
    type: "text",
    autoComplete: undefined,
    label: "City you serve",
    placeholder: "City You Serve *",
  },
  {
    name: "company",
    type: "text",
    autoComplete: "organization" as const,
    label: "Company name",
    placeholder: "Company Name *",
  },
] as const;

export function HeroLaunchForm() {
  return (
    <aside className="hero-form-card hero-form-card--premium hero-form-card--premium-tight hero-form-card--premium-tight-fit hero-form-card--premium-tight-compact">
      <p className="hero-form-card__badge">LIMITED — 3 SPOTS AVAILABLE</p>
      <h2 id="hero-form-heading" className="hero-form-card__heading">
        Claim Your City Before It’s Taken
      </h2>
      <p className="hero-form-card__subheading">
        Only 3 regional spots are available. Apply now and we’ll confirm if your area is
        still open.
      </p>

      <form
        className="hero-form hero-form--premium hero-form--premium-tight hero-form--premium-tight-compact"
        action="#contact"
        method="get"
      >
        <p className="hero-form__helper-line">Apply in 30 seconds. No payment required.</p>
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
                className="hero-form__input hero-form__input--premium hero-form__input--premium-tight hero-form__input--premium-tight-compact"
              />
            </div>
          );
        })}
        <button
          type="submit"
          className="hero-form__submit hero-form__submit--premium hero-form__submit--premium-tight hero-form__submit--premium-tight-compact btn--big solid--lime"
        >
          Claim My City
        </button>
        <p className="hero-form__trust-line">
          We’ll review your area and follow up if your city is still available.
        </p>
      </form>
    </aside>
  );
}
