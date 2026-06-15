export function HeroQuoteFormSection() {
  return (
    <section
      id="claim-spot"
      className="hero-quote-section"
      aria-labelledby="hero-form-heading"
    >
      <div className="hook-container">
        <aside className="hero-form-card">
          <h2 id="hero-form-heading" className="hero-form-card__heading">
            Claim Your Premier Launch Spot
          </h2>
          <p className="hero-form-card__subheading">
            Only 3 spots available. Apply now to secure your city.
          </p>

          <form className="hero-form" action="#contact" method="get">
            <div className="hero-form__field">
              <label htmlFor="hero-name" className="sr-only">
                Full name
              </label>
              <input
                id="hero-name"
                name="name"
                type="text"
                autoComplete="name"
                required
                placeholder="Full Name *"
                className="hero-form__input"
              />
            </div>
            <div className="hero-form__field">
              <label htmlFor="hero-email" className="sr-only">
                Email address
              </label>
              <input
                id="hero-email"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="Email *"
                className="hero-form__input"
              />
            </div>
            <div className="hero-form__field">
              <label htmlFor="hero-phone" className="sr-only">
                Phone number
              </label>
              <input
                id="hero-phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                required
                placeholder="Phone *"
                className="hero-form__input"
              />
            </div>
            <div className="hero-form__field">
              <label htmlFor="hero-city" className="sr-only">
                City you serve
              </label>
              <input
                id="hero-city"
                name="city"
                type="text"
                required
                placeholder="City You Serve *"
                className="hero-form__input"
              />
            </div>
            <div className="hero-form__field">
              <label htmlFor="hero-company" className="sr-only">
                Company name
              </label>
              <input
                id="hero-company"
                name="company"
                type="text"
                autoComplete="organization"
                required
                placeholder="Company Name *"
                className="hero-form__input"
              />
            </div>
            <button type="submit" className="hero-form__submit btn--big solid--lime">
              Claim My Spot
            </button>
          </form>
        </aside>
      </div>
    </section>
  );
}
