const eyebrowVersions = [
  {
    id: "original",
    label: "Original (first push)",
    note: "Current live style",
    specs: "Nunito Sans · 13px · weight 800 · 0.14em tracking",
    className: "eyebrow-comparison__sample eyebrow-comparison__sample--original",
  },
  {
    id: "bebas",
    label: "Bebas Neue (post hero-img)",
    note: "16px mobile · 14px at 992px+",
    specs: "Bebas Neue · 16px · weight 400 · 0.1em tracking",
    className: "eyebrow-comparison__sample eyebrow-comparison__sample--bebas",
  },
  {
    id: "aktiv",
    label: "Aktiv Grotesk (go2epoxy ref)",
    note: "Reference site match",
    specs: "Aktiv Grotesk Bold · 11px · 1.05px tracking · line-height 1.5",
    className: "eyebrow-comparison__sample eyebrow-comparison__sample--aktiv",
  },
] as const;

const eyebrowText = "WE KNOW EPOXY";

export function EyebrowComparisonSection() {
  return (
    <section
      className="eyebrow-comparison"
      aria-labelledby="eyebrow-comparison-heading"
    >
      <div className="hook-container">
        <header className="eyebrow-comparison__header">
          <h2 id="eyebrow-comparison-heading" className="eyebrow-comparison__title">
            Hero Eyebrow Style Comparison
          </h2>
          <p className="eyebrow-comparison__intro">
            All versions use the same copy — compare typography from our edit history.
          </p>
        </header>

        <ul className="eyebrow-comparison__grid">
          {eyebrowVersions.map((version) => (
            <li key={version.id} className="eyebrow-comparison__card">
              <div className="eyebrow-comparison__preview">
                <p className={version.className}>{eyebrowText}</p>
              </div>
              <div className="eyebrow-comparison__meta">
                <h3 className="eyebrow-comparison__label">{version.label}</h3>
                <p className="eyebrow-comparison__note">{version.note}</p>
                <p className="eyebrow-comparison__specs">{version.specs}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
