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
          width={4284}
          height={5712}
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
                months. Now, we&apos;re looking for 3 more top-tier contractors
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
        </div>
      </div>
    </section>
  );
}
