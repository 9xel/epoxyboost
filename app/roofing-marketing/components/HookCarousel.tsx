"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

type SlidesPerView = {
  mobile: number;
  tablet?: number;
  desktop: number;
};

type HookCarouselProps = {
  children: ReactNode[];
  slidesPerView?: SlidesPerView;
  gap?: number;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showArrows?: boolean;
  showDots?: boolean;
  loop?: boolean;
  className?: string;
  ariaLabel?: string;
};

function useSlidesPerView(config: SlidesPerView) {
  const [count, setCount] = useState(config.desktop);

  useEffect(() => {
    const update = () => {
      if (window.matchMedia("(min-width: 1024px)").matches) {
        setCount(config.desktop);
      } else if (
        config.tablet &&
        window.matchMedia("(min-width: 768px)").matches
      ) {
        setCount(config.tablet);
      } else {
        setCount(config.mobile);
      }
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [config.desktop, config.mobile, config.tablet]);

  return count;
}

export function HookCarousel({
  children,
  slidesPerView = { mobile: 1, tablet: 2, desktop: 3 },
  gap = 24,
  autoPlay = false,
  autoPlayInterval = 5000,
  showArrows = true,
  showDots = true,
  loop = true,
  className = "",
  ariaLabel = "Carousel",
}: HookCarouselProps) {
  const perView = useSlidesPerView(slidesPerView);
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const itemCount = children.length;
  const maxIndex = Math.max(0, itemCount - perView);

  const goTo = useCallback(
    (next: number) => {
      if (loop) {
        if (next < 0) {
          setIndex(maxIndex);
          return;
        }
        if (next > maxIndex) {
          setIndex(0);
          return;
        }
      }
      setIndex(Math.min(Math.max(next, 0), maxIndex));
    },
    [loop, maxIndex],
  );

  useEffect(() => {
    setIndex((current) => Math.min(current, maxIndex));
  }, [maxIndex]);

  useEffect(() => {
    if (!autoPlay || isPaused || itemCount <= perView) return;

    const timer = window.setInterval(() => {
      setIndex((current) => {
        if (current >= maxIndex) return loop ? 0 : current;
        return current + 1;
      });
    }, autoPlayInterval);

    return () => window.clearInterval(timer);
  }, [autoPlay, autoPlayInterval, isPaused, itemCount, loop, maxIndex, perView]);

  const slideWidth = `calc((100% - ${gap * (perView - 1)}px) / ${perView})`;
  const offset = `calc(-${index} * (${slideWidth} + ${gap}px))`;

  return (
    <div
      className={`relative ${className}`}
      role="region"
      aria-roledescription="carousel"
      aria-label={ariaLabel}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{
            gap: `${gap}px`,
            transform: `translateX(${offset})`,
          }}
          onTouchStart={(e) => {
            touchStartX.current = e.touches[0].clientX;
          }}
          onTouchEnd={(e) => {
            if (touchStartX.current === null) return;
            const delta = e.changedTouches[0].clientX - touchStartX.current;
            if (Math.abs(delta) > 40) {
              goTo(delta > 0 ? index - 1 : index + 1);
            }
            touchStartX.current = null;
          }}
        >
          {children.map((child, i) => (
            <div
              key={i}
              className="shrink-0"
              style={{ width: slideWidth }}
              aria-hidden={i < index || i >= index + perView}
            >
              {child}
            </div>
          ))}
        </div>
      </div>

      {showArrows && itemCount > perView && (
        <>
          <button
            type="button"
            onClick={() => goTo(index - 1)}
            className="absolute left-0 top-1/2 z-10 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-lg font-bold shadow-md transition hover:bg-[var(--hook-lime)]"
            aria-label="Previous slide"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={() => goTo(index + 1)}
            className="absolute right-0 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full bg-white text-lg font-bold shadow-md transition hover:bg-[var(--hook-lime)]"
            aria-label="Next slide"
          >
            ›
          </button>
        </>
      )}

      {showDots && maxIndex > 0 && (
        <div className="mt-6 flex justify-center gap-2">
          {Array.from({ length: maxIndex + 1 }).map((_, dotIndex) => (
            <button
              key={dotIndex}
              type="button"
              onClick={() => setIndex(dotIndex)}
              className={`h-2.5 rounded-full transition-all ${
                dotIndex === index
                  ? "w-8 bg-[var(--hook-lime)]"
                  : "w-2.5 bg-black/20"
              }`}
              aria-label={`Go to slide ${dotIndex + 1}`}
              aria-current={dotIndex === index}
            />
          ))}
        </div>
      )}
    </div>
  );
}
