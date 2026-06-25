import { IMG } from "../data";
import { PillLimeButton } from "./PillLimeButton";

const trustBullets = [
  {
    lead: "First Page or Free Guarantee:",
    body: "Hit the first page of local Google search results within 3 months or we work for free.",
    footnoteMark: true,
  },
  {
    lead: "14-Day Website Launch:",
    body: "Your premium, conversion-focused epoxy services site is built, SEO-ready, and live within two weeks.",
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

      <div className="eb-container">
        <div className="eb-row hero-row">
          <div className="eb-col">
            <div className="hero-content">
              <header>
                <p className="hero-eyebrow">WE KNOW EPOXY + HOW TO GROW YOUR BRAND</p>
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
                    <span className="hero-trust-pillars__body">
                      {item.body}
                      {"footnoteMark" in item && item.footnoteMark ? (
                        <span className="hero-guarantee-mark">*</span>
                      ) : null}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="hero-cta-row">
                <PillLimeButton href="#full-strategy-breakdown">See if I Qualify</PillLimeButton>
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

              <p className="hero-guarantee-caveat">
                *Rank on the first page of Google search results for &quot;epoxy flooring [your
                city]&quot; within 3 months, or we keep working until you get there. Free of
                charge.{" "}
                <a href="#">Conditions apply.</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
