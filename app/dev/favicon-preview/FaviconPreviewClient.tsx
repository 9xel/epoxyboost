"use client";

import { useState } from "react";

const TAB_SIZES = [16, 20, 24, 32] as const;

function ReferenceIcon({
  variant,
  size,
}: {
  variant: "filled" | "inset" | "black";
  size: number;
}) {
  const inset = variant === "inset" ? Math.round(size * 0.15) : 0;
  const fill =
    variant === "black" ? "#000" : variant === "filled" ? "#2563eb" : "#2563eb";
  const radius = Math.max(1, size * 0.125);

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      aria-hidden="true"
      className="favicon-preview__reference"
    >
      <rect width={size} height={size} rx={radius} fill={fill} />
      {inset > 0 ? (
        <rect
          x={inset}
          y={inset}
          width={size - inset * 2}
          height={size - inset * 2}
          rx={Math.max(1, size * 0.08)}
          fill="#fff"
        />
      ) : null}
    </svg>
  );
}

function TabMock({
  theme,
  iconSrc,
  size,
}: {
  theme: "light" | "dark";
  iconSrc: string;
  size: number;
}) {
  const tabbarClass =
    theme === "dark"
      ? "favicon-preview__tabbar favicon-preview__tabbar--dark"
      : "favicon-preview__tabbar";

  return (
    <section className="favicon-preview__panel">
      <h2 className="favicon-preview__panel-title">
        {theme === "light" ? "Light browser tab" : "Dark browser tab"} ({size}px icon)
      </h2>
      <div className={tabbarClass}>
        <div className="favicon-preview__tab favicon-preview__tab--active">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={iconSrc}
            alt=""
            width={size}
            height={size}
            className="favicon-preview__tab-icon"
          />
          <span className="favicon-preview__tab-label">EpoxyBoost — localhost</span>
        </div>
        <div className="favicon-preview__tab">
          <ReferenceIcon variant="filled" size={size} />
          <span className="favicon-preview__tab-label">Reference site</span>
        </div>
      </div>
      <div className="favicon-preview__tab-content">
        Tab bar mockup for side-by-side size comparison. Icons render at the same pixel
        size browsers use in tabs.
      </div>
    </section>
  );
}

export function FaviconPreviewClient() {
  const [cacheKey, setCacheKey] = useState(() => Date.now());
  const iconSrc = `/icon.svg?v=${cacheKey}`;

  return (
    <main className="favicon-preview">
      <header className="favicon-preview__header">
        <p className="favicon-preview__eyebrow">Dev only</p>
        <h1 className="favicon-preview__title">Favicon tab preview</h1>
        <p className="favicon-preview__lede">
          Mock browser tabs that load your live <code>/icon.svg</code>. Use this inside
          Cursor when the built-in browser tab still shows the globe icon. Corner radius
          is hard to see at 16px — use the corner detail panel below.
        </p>
        <div className="favicon-preview__actions">
          <button
            type="button"
            className="favicon-preview__button"
            onClick={() => setCacheKey(Date.now())}
          >
            Reload favicon
          </button>
          <a href={iconSrc} className="favicon-preview__link">
            Open icon.svg
          </a>
          <a href="/" className="favicon-preview__link">
            Back to site
          </a>
        </div>
      </header>

      <div className="favicon-preview__grid">
        <TabMock theme="light" iconSrc={iconSrc} size={16} />
        <TabMock theme="dark" iconSrc={iconSrc} size={16} />

        <section className="favicon-preview__panel">
          <h2 className="favicon-preview__panel-title">Icon sizes</h2>
          <div className="favicon-preview__sizes">
            {TAB_SIZES.map((size) => (
              <div key={size} className="favicon-preview__size-card">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={iconSrc}
                  alt={`Favicon at ${size}px`}
                  width={size}
                  height={size}
                  className="favicon-preview__tab-icon"
                />
                <p className="favicon-preview__size-label">{size}px</p>
                <p className="favicon-preview__size-note">
                  {size === 16 ? "Typical tab size" : "Larger preview"}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="favicon-preview__panel">
          <h2 className="favicon-preview__panel-title">Corner detail (top-left at 128px)</h2>
          <p className="favicon-preview__panel-note">
            Tab icons are only 16px tall, so border-radius changes are often just 1–2
            pixels and easy to miss. This crops the top-left corner at 128px so radius
            and zoom changes are visible.
          </p>
          <div className="favicon-preview__corner-row">
            <div className="favicon-preview__corner-card">
              <div className="favicon-preview__corner-crop">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={iconSrc} alt="Favicon corner detail" width={128} height={128} />
              </div>
              <p className="favicon-preview__compare-caption">Your favicon</p>
            </div>
            <div className="favicon-preview__corner-card">
              <div className="favicon-preview__corner-crop">
                <ReferenceIcon variant="black" size={128} />
              </div>
              <p className="favicon-preview__compare-caption">rx=4 reference (no zoom)</p>
            </div>
          </div>
        </section>

        <section className="favicon-preview__panel">
          <h2 className="favicon-preview__panel-title">
            Size vs reference icons (16px)
          </h2>
          <div className="favicon-preview__compare-row">
            <div className="favicon-preview__compare-item">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={iconSrc} alt="Your favicon" width={16} height={16} />
              <p className="favicon-preview__compare-caption">Your favicon</p>
            </div>
            <div className="favicon-preview__compare-item">
              <ReferenceIcon variant="black" size={16} />
              <p className="favicon-preview__compare-caption">Black square</p>
            </div>
            <div className="favicon-preview__compare-item">
              <ReferenceIcon variant="filled" size={16} />
              <p className="favicon-preview__compare-caption">Solid color</p>
            </div>
            <div className="favicon-preview__compare-item">
              <ReferenceIcon variant="inset" size={16} />
              <p className="favicon-preview__compare-caption">With padding</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
