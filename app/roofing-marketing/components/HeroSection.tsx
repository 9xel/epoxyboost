import { IMG } from "../data";

const trustBullets = [
  {
    lead: "First Page or Free Guarantee:",
    body: "Hit the first page of local Google search results within 6 months or you get a 100% refund. No risks.",
  },
  {
    lead: "14-Day Website Launch:",
    body: "Your premium, high-converting epoxy services site is built, fully optimized, and live within two weeks.",
  },
  {
    lead: "Real Epoxy Experience:",
    body: "We know the difference between polyaspartic and polyurethane. Other agencies don't know your business like we do.",
  },
] as const;

export function HeroSection() {
  return (
    <section className="hero hero--landing" aria-label="Premier epoxy contractor launch offer">
      <picture className="hero--landing__bg">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={IMG.hero}
          width={1514}
          height={1167}
          alt="Epoxy flooring installation showcasing a premium finished surface"
          className="fetch-me wp-post-image no-lazy"
          decoding="async"
          fetchPriority="high"
        />
      </picture>

      <div className="hook-container">
        <div className="hook-row hero-row">
          <div className="hook-col">
            <div className="hero-content">
              <header>
                <p className="hero-eyebrow">WE KNOW EPOXY</p>
                <h1 className="hero-headline">
                  WE ARE ACCEPTING 3 EPOXY CONTRACTORS WHO ARE READY TO OWN THEIR
                  CITY.
                  <br />
                  ZERO RISK. 100% GUARANTEED.
                </h1>
              </header>

              <p className="hero-lead">
                Our branding and business strategy built Vancouver&apos;s
                fastest-growing epoxy flooring business from scratch in just 6
                months. Now, we&apos;re looking for exactly 3 top-tier contractors
                who want to do the same thing and take over their local market.
              </p>

              <ul className="hero-trust-pillars" aria-label="Why contractors trust us">
                {trustBullets.map((item) => (
                  <li key={item.lead} className="hero-trust-pillars__item">
                    <strong className="hero-trust-pillars__lead">{item.lead}</strong>{" "}
                    <span className="hero-trust-pillars__body">{item.body}</span>
                  </li>
                ))}
              </ul>

              <div className="hero-cta-row">
                <a href="#full-strategy-breakdown" className="btn--big solid--lime">
                  Learn More
                </a>
                <a
                  className="btn--popup yt-video hero-cta-row__video"
                  href="https://www.youtube.com/watch?v=vqP0JaNnHLM"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fa fa-play c-wt micro-lg" aria-hidden="true">
                    ▶
                  </i>
                  <span className="btn-text c-wt fw-600 td-u">
                    How we built the #1 epoxy brand in Vancouver in 6 months
                  </span>
                </a>
              </div>
            </div>
          </div>

          <div className="hook-col hero-form-col">
            <aside className="hero-form-card" aria-labelledby="hero-form-heading">
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
        </div>
      </div>
    </section>
  );
}
