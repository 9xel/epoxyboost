const launchPackageItems = [
  {
    title: "Premium Website",
    description:
      "A clean, high-converting website built to make your company look established and turn clicks into paying customers.",
  },
  {
    title: "Local SEO + Google Maps Setup",
    description:
      "Your site and Google presence set up to help you show up for epoxy flooring searches in your target city.",
  },
  {
    title: "6-Month Growth Plan",
    description:
      "A clear plan for getting more leads, building trust, collecting reviews, and becoming the go-to epoxy company in your area.",
  },
  {
    title: "1-on-1 Strategy Onboarding",
    description:
      "We’ll review your market, offer, pricing, and online presence so your launch is built around your business.",
  },
  {
    title: "1-Month + 3-Month Reviews",
    description:
      "We’ll check what’s working, what needs to improve, and what to focus on next.",
  },
] as const;

export function LaunchPackageValueStack() {
  return (
    <div className="launch-value-stack">
      <p className="launch-value-stack__badge">LIMITED LAUNCH PACKAGE</p>
      <h2 id="launch-package-heading" className="launch-value-stack__heading">
        What&apos;s Included in Your Launch Slot
      </h2>
      <p className="launch-value-stack__intro">
        If your city is accepted, we&apos;ll help you launch with the website, local SEO,
        and growth strategy we used to help build Go2Epoxy from the ground up.
      </p>

      <ul className="launch-value-stack__list" aria-label="Launch package includes">
        {launchPackageItems.map((item) => (
          <li key={item.title} className="launch-value-stack__item">
            <strong className="launch-value-stack__item-title">{item.title}</strong>
            <p className="launch-value-stack__item-desc">{item.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
