const packageItems = [
  {
    label: "Premium Conversion-Optimized Website Framework:",
    value: "$9,500 value",
  },
  {
    label: "Local SEO & Google Maps Boost Launch Setup:",
    value: "$2,500 value",
  },
  {
    label: "6-Month Scale Strategy Playbook & Video Guides:",
    value: "$4,850 value",
  },
  {
    label: "1-on-1 Onboarding Strategy Call + 1 & 3-Month Reviews:",
    value: "$1,500 value",
  },
] as const;

export function FullStrategyBreakdown() {
  return (
    <section
      id="full-strategy-breakdown"
      className="scroll-mt-24 bg-[var(--eb-gray)] px-4 py-16 lg:px-8 lg:py-20"
      aria-labelledby="full-strategy-heading"
    >
      <div className="mx-auto max-w-3xl">
        <h2
          id="full-strategy-heading"
          className="text-2xl font-extrabold uppercase tracking-wide md:text-3xl"
        >
          The Full Scale Strategy &amp; Breakdown
        </h2>

        <p className="mt-6 text-base leading-7 text-[var(--eb-muted)]">
          We are recruiting 3 top-tier epoxy contractors who already do flawless
          work, have great reviews, and want to completely dominate their local market
          to join our Premier Launch. We will deploy a fully loaded, high-converting
          website framework within 14 days, handle your entire local SEO setup, and
          hand you our 6-month operational scale playbook for free. If you don&apos;t
          rank on the first page of Google in your city within 6 months, you get a
          100% refund—no questions asked.
        </p>

        <ul className="strategy-value-stack mt-8" aria-label="Included package value">
          {packageItems.map((item) => (
            <li key={item.label} className="strategy-value-stack__item">
              <span>{item.label}</span>{" "}
              <strong className="strategy-value-stack__value">{item.value}</strong>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
