export function SiteImg({
  src,
  alt,
  className,
  width,
  height,
  loading = "lazy",
  fetchPriority,
  decoding = "async",
}: {
  src: string;
  alt: string;
  className?: string;
  width: number;
  height: number;
  loading?: "lazy" | "eager";
  fetchPriority?: "high" | "low" | "auto";
  decoding?: "async" | "sync" | "auto";
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      className={className}
      width={width}
      height={height}
      loading={loading}
      fetchPriority={fetchPriority}
      decoding={decoding}
    />
  );
}
