"use client";

import { useLayoutEffect, useRef } from "react";

type FitHeroSubheadlineProps = {
  line1: string;
  line2: string;
  className?: string;
  maxFontSize?: number;
  minFontSize?: number;
  mobileMaxWidth?: number;
};

function fitLargestFontSize(
  container: HTMLElement,
  line: HTMLElement,
  max: number,
  min: number,
) {
  line.style.whiteSpace = "nowrap";
  line.style.display = "block";

  let low = min;
  let high = max;
  let best = min;

  while (low <= high) {
    const mid = (low + high) / 2;
    container.style.fontSize = `${mid}px`;

    if (line.scrollWidth <= container.clientWidth) {
      best = mid;
      low = mid + 0.25;
    } else {
      high = mid - 0.25;
    }
  }

  container.style.fontSize = `${best}px`;
}

export function FitHeroSubheadline({
  line1,
  line2,
  className,
  maxFontSize = 24,
  minFontSize = 16,
  mobileMaxWidth = 991,
}: FitHeroSubheadlineProps) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const heading = headingRef.current;
    const firstLine = line1Ref.current;
    if (!heading || !firstLine) return;

    const mediaQuery = window.matchMedia(`(max-width: ${mobileMaxWidth}px)`);

    const applyFit = () => {
      if (mediaQuery.matches) {
        fitLargestFontSize(heading, firstLine, maxFontSize, minFontSize);
      } else {
        heading.style.fontSize = "";
        firstLine.style.whiteSpace = "";
        firstLine.style.display = "";
      }
    };

    applyFit();

    const resizeObserver = new ResizeObserver(applyFit);
    resizeObserver.observe(heading);

    mediaQuery.addEventListener("change", applyFit);
    void document.fonts?.ready.then(applyFit);

    return () => {
      resizeObserver.disconnect();
      mediaQuery.removeEventListener("change", applyFit);
    };
  }, [line1, line2, maxFontSize, minFontSize, mobileMaxWidth]);

  return (
    <h2
      ref={headingRef}
      className={`hero-subheadline hero-subheadline--fit-lines${className ? ` ${className}` : ""}`}
    >
      <span ref={line1Ref} className="hero-subheadline__line">
        {line1}
      </span>
      <span className="hero-subheadline__line">{line2}</span>
    </h2>
  );
}
