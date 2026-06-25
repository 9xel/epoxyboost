type UpgradeablePhotoProps = {
  lcp: string;
  hq: string;
  width: number;
  height: number;
  alt: string;
  className?: string;
  loading?: "lazy" | "eager";
  fetchPriority?: "high" | "low" | "auto";
  decoding?: "async" | "sync" | "auto";
};

export function UpgradeablePhoto({
  lcp,
  hq,
  width,
  height,
  alt,
  className,
  loading = "lazy",
  fetchPriority = "low",
  decoding = "async",
}: UpgradeablePhotoProps) {
  return (
    <span className="upgradeable-photo">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={lcp}
        width={width}
        height={height}
        alt={alt}
        className={["upgradeable-photo__base", className].filter(Boolean).join(" ")}
        loading={loading}
        fetchPriority={fetchPriority}
        decoding={decoding}
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={hq}
        width={width}
        height={height}
        alt=""
        className={["upgradeable-photo__overlay", "img-upgrade-overlay", className]
          .filter(Boolean)
          .join(" ")}
        loading="lazy"
        fetchPriority="low"
        decoding="async"
        aria-hidden="true"
      />
    </span>
  );
}
