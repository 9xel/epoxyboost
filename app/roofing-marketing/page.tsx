import Image from "next/image";
import { CaseStudiesCarousel } from "./components/CaseStudiesCarousel";
import { FaqAccordion } from "./components/FaqAccordion";
import { FullStrategyBreakdown } from "./components/FullStrategyBreakdown";
import { HeroSection } from "./components/HeroSection";
import { HookImg } from "./components/HookImg";
import { LogoCarousel } from "./components/LogoCarousel";
import { ResourcesCarousel } from "./components/ResourcesCarousel";
import { ServicesCarousel } from "./components/ServicesCarousel";
import { SiteHeader } from "./components/SiteHeader";
import { TestimonialsCarousel } from "./components/TestimonialsCarousel";
import { clientLogos, IMG, partnerLogos, values } from "./data";

export default function RoofingMarketingPage() {
  return (
    <>
      <SiteHeader />
      <HeroSection />
      <FullStrategyBreakdown />

      <section className="bg-[var(--hook-dark)] px-4 py-16 text-white lg:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-center text-3xl font-extrabold md:text-4xl lg:text-5xl">
            Hook Better Leads With Our Services
          </h2>
          <ServicesCarousel />
        </div>
      </section>

      <LogoCarousel logos={clientLogos} />

      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-16 lg:grid-cols-2 lg:items-center lg:px-8 lg:py-24">
        <div>
          <h2 className="text-3xl font-extrabold uppercase tracking-wide md:text-4xl">
            We&apos;re Out Here Learning
          </h2>
          <p className="mt-6 text-base leading-8 text-[var(--hook-muted)]">
            We have a bunch of roofing contractors that trust us to do their digital
            marketing to drive leads, because we&apos;ve demonstrated a commitment to
            this industry.
          </p>
          <p className="mt-4 text-base leading-8 text-[var(--hook-muted)]">
            Watch us roof a house with a client and learn about the biggest mistakes
            along the way
          </p>
          <h3 className="mt-8 text-xl font-extrabold">
            Stop Wasting Money, Start With What Works (Even If You&apos;re Under $1M)
          </h3>
          <p className="mt-4 text-sm leading-7 text-[var(--hook-muted)]">
            The best roofing marketing strategies don&apos;t always start with an
            agency — they start with you. Use low-cost, high-impact tactics like branded
            yard signs, truck wraps, and fully optimized Google Business Profiles.
          </p>
        </div>
        <a
          href="https://www.youtube.com/watch?v=k6KQNJf24jc"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative block overflow-hidden rounded-lg shadow-lg"
        >
          <Image
            src={IMG.youtube}
            alt="YouTube video thumbnail"
            width={640}
            height={360}
            className="w-full object-cover transition-transform group-hover:scale-[1.02]"
          />
          <span className="absolute inset-0 flex items-center justify-center bg-black/20">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--hook-lime)] text-2xl text-black">
              ▶
            </span>
          </span>
        </a>
      </section>

      <section className="bg-[var(--hook-gray)] px-4 py-16 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-3">
          {values.map((value) => (
            <article key={value.title} className="rounded bg-white p-8 text-center">
              <HookImg
                src={value.icon}
                alt=""
                width={48}
                height={48}
                className="mx-auto h-12 w-12"
              />
              <h3 className="mt-6 text-lg font-extrabold">{value.title}</h3>
              <p className="mt-4 text-sm leading-7 text-[var(--hook-muted)]">
                {value.text}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-[var(--hook-lime)] px-4 py-12 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 text-center md:grid-cols-3">
          <div>
            <HookImg
              src="https://hookagency.com/wp-content/uploads/2024/09/Google-Logo-white.svg"
              alt="Google"
              width={80}
              height={28}
              className="mx-auto h-7 w-auto invert"
            />
            <p className="mt-4 text-3xl font-extrabold">170+</p>
            <p className="text-sm font-semibold uppercase">Five-Star Google Reviews</p>
          </div>
          <div>
            <p className="text-3xl font-extrabold">#6</p>
            <p className="text-sm font-semibold uppercase">Best Small Biz to Work For</p>
          </div>
          <div>
            <p className="text-3xl font-extrabold">#2031</p>
            <p className="text-sm font-semibold uppercase">Ranked on the INC. 5000</p>
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-16 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-center text-3xl font-extrabold md:text-4xl">
            150+ 5-Star Google Reviews and Counting
          </h2>
          <TestimonialsCarousel />
        </div>
      </section>

      <section id="contact" className="bg-[var(--hook-gray)] px-4 py-16 lg:px-8 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-extrabold uppercase md:text-4xl">
              Contact Us To Set Up A Brief Intro Call!
            </h2>
            <p className="mt-6 text-base leading-8 text-[var(--hook-muted)]">
              Let&apos;s talk about how using a niched agency will get you more leads.{" "}
              <strong>Just a heads up</strong> – we are usually the best fit for
              growth-mode contractors over 2M+ because of the significant investment
              required.
            </p>
          </div>
          <form className="hook-card-shadow space-y-4 rounded bg-white p-8">
            <div className="grid gap-4 sm:grid-cols-2">
              <input
                placeholder="First Name *"
                className="rounded border border-[#ccc] px-4 py-3 text-sm outline-none focus:border-[var(--hook-green)]"
              />
              <input
                placeholder="Last Name *"
                className="rounded border border-[#ccc] px-4 py-3 text-sm outline-none focus:border-[var(--hook-green)]"
              />
            </div>
            <input
              placeholder="Phone *"
              className="w-full rounded border border-[#ccc] px-4 py-3 text-sm outline-none focus:border-[var(--hook-green)]"
            />
            <input
              placeholder="Email *"
              className="w-full rounded border border-[#ccc] px-4 py-3 text-sm outline-none focus:border-[var(--hook-green)]"
            />
            <input
              placeholder="Business Name *"
              className="w-full rounded border border-[#ccc] px-4 py-3 text-sm outline-none focus:border-[var(--hook-green)]"
            />
            <textarea
              placeholder="Message *"
              rows={4}
              className="w-full rounded border border-[#ccc] px-4 py-3 text-sm outline-none focus:border-[var(--hook-green)]"
            />
            <button type="button" className="hook-btn-primary w-full px-6 py-4 text-sm uppercase">
              Get in Touch
            </button>
          </form>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="text-3xl font-extrabold uppercase">Our Process</h2>
            <ol className="mt-8 space-y-4 text-base font-semibold">
              {[
                "Quick intro call",
                "Strategy Meeting + Proposal",
                "Targeting Kickoff + We start work",
                "1 month – Workshop + Revision",
                "Monthly reporting rhythm",
              ].map((step, i) => (
                <li key={step} className="flex gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--hook-lime)] text-sm font-bold">
                    {i + 1}
                  </span>
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
            className="w-full rounded-lg object-cover shadow-lg"
          />
        </div>
      </section>

      <section className="bg-[var(--hook-gray)] px-4 py-16 lg:px-8">
        <CaseStudiesCarousel />
      </section>

      <section className="bg-[var(--hook-dark)] px-4 py-16 text-white lg:px-8 lg:py-24">
        <div className="mx-auto max-w-4xl">
          <p className="text-center text-sm font-bold uppercase tracking-[0.2em] text-[var(--hook-lime)]">
            FAQs
          </p>
          <h2 className="mt-3 text-center text-3xl font-extrabold md:text-4xl">
            Commonly Asked Questions
          </h2>
          <div className="mt-10">
            <FaqAccordion />
          </div>
        </div>
      </section>

      <section className="px-4 py-16 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-[var(--hook-muted)]">
                Helpful Resources
              </p>
              <h2 className="mt-2 text-3xl font-extrabold">Check Out Our Top Resources</h2>
            </div>
            <span className="hook-btn-outline px-6 py-3 text-sm uppercase">
              View All Articles
            </span>
          </div>
          <ResourcesCarousel />
        </div>
      </section>

      <LogoCarousel logos={partnerLogos} />

      <section className="relative overflow-hidden bg-[var(--hook-dark)] px-4 py-20 text-white lg:px-8">
        <div className="absolute inset-0 opacity-30">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={IMG.skydiver} alt="" className="h-full w-full object-cover" />
        </div>
        <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <h2 className="text-4xl font-extrabold md:text-5xl">
              Ready to take the leap?
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-8 text-white/80">
              &ldquo;We know what it takes to help get home service businesses more
              leads with Google. Even if we&apos;re not the right fit, we&apos;ll get
              you where you need to go.&rdquo;
            </p>
            <div className="mt-8 flex items-center gap-4">
              <Image
                src={IMG.sydnee}
                alt="Sydnee Olsen"
                width={56}
                height={56}
                className="rounded-full"
              />
              <p className="text-sm font-semibold">— Sydnee Olsen, Sales Lead</p>
            </div>
            <a
              href="#contact"
              className="hook-btn-primary mt-8 inline-block px-8 py-4 text-sm uppercase"
            >
              Schedule Intro Call
            </a>
          </div>
          <HookImg
            src={IMG.introCall}
            alt="Schedule a Free 20-Minute Consultation"
            width={280}
            height={200}
            className="hidden w-64 lg:block"
          />
        </div>
      </section>

      <footer className="bg-[var(--hook-dark)] px-4 py-16 text-white lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-2 lg:grid-cols-4">
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
            <p className="flex items-start gap-2 text-sm text-white/70">
              <HookImg src={IMG.pinIcon} alt="" width={20} height={20} className="mt-0.5 h-5 w-5" />
              600 N Washington Ave Suite C203, Minneapolis, MN 55401
            </p>
          </div>
          <div>
            <h3 className="font-extrabold uppercase">Company</h3>
            <ul className="mt-4 space-y-2 text-sm text-white/70">
              <li>Process</li>
              <li>Founder</li>
              <li>About Hook</li>
            </ul>
          </div>
          <div>
            <h3 className="font-extrabold uppercase">Services</h3>
            <ul className="mt-4 space-y-2 text-sm text-white/70">
              <li>Website Design</li>
              <li>Search Engine Optimization</li>
              <li>Paid Ad Management</li>
            </ul>
          </div>
          <div>
            <h3 className="font-extrabold uppercase">Resources</h3>
            <ul className="mt-4 space-y-2 text-sm text-white/70">
              <li>Local Service Ads Course</li>
              <li>Roofing Lead Gen Course</li>
              <li>Lead Gen Audiobook</li>
            </ul>
          </div>
        </div>
        <p className="mx-auto mt-12 max-w-7xl border-t border-white/10 pt-8 text-center text-sm text-white/50">
          © Copyright 2026 Hook Agency. Visual clone for demonstration purposes.
        </p>
      </footer>
    </>
  );
}
