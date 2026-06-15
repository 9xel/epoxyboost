import Image from "next/image";
import { CaseStudiesCarousel } from "../components/CaseStudiesCarousel";
import { FaqAccordion } from "../components/FaqAccordion";
import { FullStrategyBreakdown } from "../components/FullStrategyBreakdown";
import { HeroQuoteFormSection } from "../components/HeroQuoteFormSection";
import { HeroSection } from "../components/HeroSection";
import { HookImg } from "../components/HookImg";
import { LogoCarousel } from "../components/LogoCarousel";
import { ResourcesCarousel } from "../components/ResourcesCarousel";
import { ServicesCarousel } from "../components/ServicesCarousel";
import { SiteHeader } from "../components/SiteHeader";
import { TestimonialsCarousel } from "../components/TestimonialsCarousel";
import { clientLogos, IMG, partnerLogos, values } from "../data";

export default function RoofingMarketingHighContrastPage() {
  return (
    <>
      <SiteHeader />
      <HeroSection />
      <HeroQuoteFormSection />

      <div className="hc-post-hero">
        <FullStrategyBreakdown />

        <div className="hc-band">
          <section className="hc-section hc-container">
            <header className="hc-section-header hc-section-header--center">
              <h2 className="hc-title hc-title--center">
                Hook Better Leads With Our Services
              </h2>
            </header>
            <ServicesCarousel />
          </section>
        </div>

        <div className="hc-band hc-band--solid">
          <div className="hc-logo-band">
            <LogoCarousel logos={clientLogos} />
          </div>
        </div>

        <div className="hc-band">
          <section className="hc-section hc-container">
            <div className="hc-split">
              <div>
                <h2 className="hc-title">We&apos;re Out Here Learning</h2>
                <p className="hc-body hc-body--bright hc-body--lead">
                  We have a bunch of roofing contractors that trust us to do their digital
                  marketing to drive leads, because we&apos;ve demonstrated a commitment to
                  this industry.
                </p>
                <p className="hc-body">
                  Watch us roof a house with a client and learn about the biggest mistakes
                  along the way
                </p>
                <h3 className="hc-subtitle hc-subtitle--lead">
                  Stop Wasting Money, Start With What Works (Even If You&apos;re Under $1M)
                </h3>
                <p className="hc-body">
                  The best roofing marketing strategies don&apos;t always start with an
                  agency — they start with you. Use low-cost, high-impact tactics like branded
                  yard signs, truck wraps, and fully optimized Google Business Profiles.
                </p>
              </div>
              <a
                href="https://www.youtube.com/watch?v=k6KQNJf24jc"
                target="_blank"
                rel="noopener noreferrer"
                className="hc-media-link"
              >
                <Image
                  src={IMG.youtube}
                  alt="YouTube video thumbnail"
                  width={640}
                  height={360}
                />
                <span className="hc-media-link__play">
                  <span>▶</span>
                </span>
              </a>
            </div>
          </section>
        </div>

        <div className="hc-band hc-band--solid">
          <section className="hc-section hc-container">
            <div className="hc-grid-3">
              {values.map((value) => (
                <article key={value.title} className="hc-value-card">
                  <HookImg
                    src={value.icon}
                    alt=""
                    width={48}
                    height={48}
                    className="mx-auto h-12 w-12"
                  />
                  <h3>{value.title}</h3>
                  <p>{value.text}</p>
                </article>
              ))}
            </div>
          </section>
        </div>

        <div className="hc-band">
          <section className="hc-section hc-section--compact hc-container">
            <div className="hc-stats-grid">
              <div>
                <HookImg
                  src="https://hookagency.com/wp-content/uploads/2024/09/Google-Logo-white.svg"
                  alt="Google"
                  width={80}
                  height={28}
                  className="mx-auto h-7 w-auto brightness-0 invert"
                />
                <p className="hc-stat hc-stat--logo">
                  170+
                </p>
                <p className="hc-stat-label">Five-Star Google Reviews</p>
              </div>
              <div>
                <p className="hc-stat">#6</p>
                <p className="hc-stat-label">Best Small Biz to Work For</p>
              </div>
              <div>
                <p className="hc-stat">#2031</p>
                <p className="hc-stat-label">Ranked on the INC. 5000</p>
              </div>
            </div>
          </section>
        </div>

        <div className="hc-band hc-band--solid">
          <section className="hc-section hc-container">
            <header className="hc-section-header hc-section-header--center">
              <h2 className="hc-title hc-title--center">
                150+ 5-Star Google Reviews and Counting
              </h2>
            </header>
            <TestimonialsCarousel />
          </section>
        </div>

        <div className="hc-band">
          <section id="contact" className="hc-section hc-container">
            <div className="hc-split">
              <div>
                <h2 className="hc-title">Contact Us To Set Up A Brief Intro Call!</h2>
                <p className="hc-body hc-body--bright hc-body--lead">
                  Let&apos;s talk about how using a niched agency will get you more leads.{" "}
                  <strong>Just a heads up</strong> – we are usually the best fit for
                  growth-mode contractors over 2M+ because of the significant investment
                  required.
                </p>
              </div>
              <form className="hc-form-card hc-form-grid">
                <div className="hc-form-grid hc-form-grid--2">
                  <input placeholder="First Name *" />
                  <input placeholder="Last Name *" />
                </div>
                <input placeholder="Phone *" />
                <input placeholder="Email *" />
                <input placeholder="Business Name *" />
                <textarea placeholder="Message *" rows={4} />
                <button type="button" className="hook-btn-primary w-full px-6 py-4 text-sm uppercase">
                  Get in Touch
                </button>
              </form>
            </div>
          </section>
        </div>

        <div className="hc-band hc-band--solid">
          <section className="hc-section hc-container">
            <div className="hc-split">
              <div>
                <h2 className="hc-title">Our Process</h2>
                <ol className="hc-process-list">
                  {[
                    "Quick intro call",
                    "Strategy Meeting + Proposal",
                    "Targeting Kickoff + We start work",
                    "1 month – Workshop + Revision",
                    "Monthly reporting rhythm",
                  ].map((step, i) => (
                    <li key={step}>
                      <span className="hc-process-list__num">{i + 1}</span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
              <Image
                src={IMG.process}
                alt="Roofing team on site"
                width={768}
                height={763}
                className="hc-process-image w-full object-cover"
              />
            </div>
          </section>
        </div>

        <div className="hc-band">
          <section className="hc-section hc-container">
            <CaseStudiesCarousel />
          </section>
        </div>

        <div className="hc-band hc-band--ruled hc-band--solid">
          <section className="hc-section hc-section--faq hc-container hc-faq">
            <div className="hc-faq-heading">
              <p className="hc-eyebrow">FAQs</p>
              <h2 className="hc-title hc-title--center">Commonly Asked Questions</h2>
            </div>
            <FaqAccordion />
          </section>
        </div>

        <div className="hc-band">
          <section className="hc-section hc-container">
            <header className="hc-section-header hc-section-header--split">
              <div>
                <p className="hc-eyebrow">Helpful Resources</p>
                <h2 className="hc-title">Check Out Our Top Resources</h2>
              </div>
              <span className="hc-btn-outline">View All Articles</span>
            </header>
            <ResourcesCarousel />
          </section>
        </div>

        <div className="hc-band hc-band--solid hc-band--no-rule">
          <div className="hc-logo-band">
            <LogoCarousel logos={partnerLogos} />
          </div>
        </div>

        <div className="hc-cta">
          <div className="hc-container">
            <div className="hc-cta__wrap">
              <div className="hc-cta__media">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={IMG.skydiver} alt="" />
              </div>
              <div className="hc-cta__overlay" />
              <div className="hc-cta__content">
                <h2 className="hc-title">Ready to take the leap?</h2>
                <p className="hc-cta__quote">
                  &ldquo;We know what it takes to help get home service businesses more
                  leads with Google. Even if we&apos;re not the right fit, we&apos;ll get
                  you where you need to go.&rdquo;
                </p>
                <div className="hc-cta__author">
                  <Image
                    src={IMG.sydnee}
                    alt="Sydnee Olsen"
                    width={56}
                    height={56}
                    className="rounded-full"
                  />
                  <p>— Sydnee Olsen, Sales Lead</p>
                </div>
                <a
                  href="#contact"
                  className="hook-btn-primary mt-8 inline-block px-8 py-4 text-sm uppercase"
                >
                  Schedule Intro Call
                </a>
              </div>
            </div>
          </div>
        </div>

        <footer className="hc-footer">
          <div className="hc-container hc-footer__grid">
            <div className="space-y-6">
              <HookImg
                src={IMG.logo}
                alt="Hook Agency"
                width={180}
                height={40}
                className="h-10 w-auto brightness-0 invert"
              />
              <a href="tel:612-772-9555" className="flex items-center gap-2 text-sm font-bold">
                <HookImg src={IMG.callIcon} alt="" width={20} height={20} className="h-5 w-5" />
                Give Us a Call: 612-772-9555
              </a>
              <p className="flex items-start gap-2 text-sm">
                <HookImg src={IMG.pinIcon} alt="" width={20} height={20} className="mt-0.5 h-5 w-5" />
                600 N Washington Ave Suite C203, Minneapolis, MN 55401
              </p>
            </div>
            <div>
              <h3>Company</h3>
              <ul>
                <li>Process</li>
                <li>Founder</li>
                <li>About Hook</li>
              </ul>
            </div>
            <div>
              <h3>Services</h3>
              <ul>
                <li>Website Design</li>
                <li>Search Engine Optimization</li>
                <li>Paid Ad Management</li>
              </ul>
            </div>
            <div>
              <h3>Resources</h3>
              <ul>
                <li>Local Service Ads Course</li>
                <li>Roofing Lead Gen Course</li>
                <li>Lead Gen Audiobook</li>
              </ul>
            </div>
          </div>
          <p className="hc-container hc-footer__copy">
            © Copyright 2026 Hook Agency. Visual clone for demonstration purposes.
          </p>
        </footer>
      </div>
    </>
  );
}
