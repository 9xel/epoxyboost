type HeroCheckedSubheadlineStyle =
  | "text-check"
  | "straight-check"
  | "straight-check-md"
  | "straight-check-lg"
  | "straight-check-obtuse"
  | "circle-svg"
  | "large-svg"
  | "pill"
  | "pill-dark"
  | "ring-check"
  | "square-check"
  | "dot-separated"
  | "underline"
  | "border-left";

type HeroCheckedSubheadlineProps = {
  items: string[];
  className?: string;
  style?: HeroCheckedSubheadlineStyle;
  checkColor?: "lime" | "muted" | "white";
  textColor?: "white" | "muted" | "muted-dim" | "muted-soft";
};

export function HeroCheckedSubheadline({
  items,
  className,
  style = "text-check",
  checkColor = "lime",
  textColor = "white",
}: HeroCheckedSubheadlineProps) {
  return (
    <h2
      className={`hero-checked-subheadline hero-checked-subheadline--${style} hero-checked-subheadline--check-${checkColor} hero-checked-subheadline--text-${textColor}${className ? ` ${className}` : ""}`}
    >
      {items.map((item) => (
        <span key={item} className="hero-checked-subheadline__item">
          {item}
        </span>
      ))}
    </h2>
  );
}

export type { HeroCheckedSubheadlineStyle };
