"use client";

import { useLayoutEffect, useRef } from "react";

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
  fitOneLine?: boolean;
  minFontSize?: number;
};

function fitCheckedSubheadline(el: HTMLElement, minFontSize: number) {
  el.style.flexWrap = "nowrap";
  el.style.fontSize = "";

  const maxFontSize = parseFloat(getComputedStyle(el).fontSize) || 17;

  let low = minFontSize;
  let high = maxFontSize;
  let best = minFontSize;

  while (low <= high) {
    const mid = (low + high) / 2;
    el.style.fontSize = `${mid}px`;

    if (el.scrollWidth <= el.clientWidth) {
      best = mid;
      low = mid + 0.25;
    } else {
      high = mid - 0.25;
    }
  }

  el.style.fontSize = `${best}px`;
}

export function HeroCheckedSubheadline({
  items,
  className,
  style = "text-check",
  checkColor = "lime",
  textColor = "white",
  fitOneLine = false,
  minFontSize = 12,
}: HeroCheckedSubheadlineProps) {
  const ref = useRef<HTMLHeadingElement>(null);

  useLayoutEffect(() => {
    if (!fitOneLine) return;

    const el = ref.current;
    if (!el) return;

    const applyFit = () => {
      fitCheckedSubheadline(el, minFontSize);
    };

    applyFit();

    const resizeObserver = new ResizeObserver(applyFit);
    resizeObserver.observe(el);

    void document.fonts?.ready.then(applyFit);

    return () => {
      resizeObserver.disconnect();
    };
  }, [items, fitOneLine, minFontSize]);

  return (
    <h2
      ref={ref}
      className={`hero-checked-subheadline hero-checked-subheadline--${style} hero-checked-subheadline--check-${checkColor} hero-checked-subheadline--text-${textColor}${fitOneLine ? " hero-checked-subheadline--fit-one-line" : ""}${className ? ` ${className}` : ""}`}
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
