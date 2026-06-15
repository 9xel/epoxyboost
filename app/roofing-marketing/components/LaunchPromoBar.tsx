export function LaunchPromoBar() {
  return (
    <div className="launch-promo-bar">
      <a href="#contact" className="launch-promo-bar__link">
        <span className="launch-promo-bar__badge-wrap">
          <span className="launch-promo-bar__badge">
            <span className="launch-promo-bar__badge-label">Limited</span>
          </span>
        </span>
        <span className="launch-promo-bar__message">
          <strong>Premier Launch</strong>
          <span className="launch-promo-bar__details">
            <strong> — </strong>
            3 exclusive regional slots available.{" "}
            <strong>Lock in your city now</strong>
          </span>
        </span>
        <span className="launch-promo-bar__arrow" aria-hidden="true">
          →
        </span>
      </a>
    </div>
  );
}
