"use client";

import { useLayoutEffect, useRef } from "react";

type FitOneLineTextProps = {
  children: string;
  className?: string;
  maxFontSize?: number;
  minFontSize?: number;
  mobileMaxWidth?: number;
};

function fitText(el: HTMLElement, max: number, min: number) {
  el.style.whiteSpace = "nowrap";

  let low = min;
  let high = max;
  let best = min;

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

export function FitOneLineText({
  children,
  className,
  maxFontSize = 13,
  minFontSize = 10,
  mobileMaxWidth = 991,
}: FitOneLineTextProps) {
  const ref = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const mediaQuery = window.matchMedia(`(max-width: ${mobileMaxWidth}px)`);

    const applyFit = () => {
      if (mediaQuery.matches) {
        fitText(el, maxFontSize, minFontSize);
      } else {
        el.style.fontSize = "";
        el.style.whiteSpace = "";
      }
    };

    applyFit();

    const resizeObserver = new ResizeObserver(applyFit);
    resizeObserver.observe(el);

    mediaQuery.addEventListener("change", applyFit);
    void document.fonts?.ready.then(applyFit);

    return () => {
      resizeObserver.disconnect();
      mediaQuery.removeEventListener("change", applyFit);
    };
  }, [children, maxFontSize, minFontSize, mobileMaxWidth]);

  return (
    <p ref={ref} className={className}>
      {children}
    </p>
  );
}
