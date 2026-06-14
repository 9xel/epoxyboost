"use client";

import { caseStudies } from "../data";
import { HookCarousel } from "./HookCarousel";
import { HookImg } from "./HookImg";

export function CaseStudiesCarousel() {
  return (
    <HookCarousel
      ariaLabel="Case studies"
      slidesPerView={{ mobile: 1, tablet: 2, desktop: 3 }}
      gap={24}
      className="mx-auto max-w-7xl px-2"
    >
      {caseStudies.map((study) => (
        <article key={study.headline} className="h-full rounded bg-white p-8 shadow-sm">
          <span className="text-xs font-bold uppercase tracking-widest text-[var(--hook-green)]">
            {study.label}
          </span>
          <p className="mt-4 text-4xl font-extrabold text-[var(--hook-green)]">
            {study.stat}
          </p>
          <h3 className="mt-2 text-lg font-extrabold">{study.headline}</h3>
          <ul className="mt-4 space-y-2 text-sm text-[var(--hook-muted)]">
            {study.bullets.map((bullet) => (
              <li key={bullet}>• {bullet}</li>
            ))}
          </ul>
          <HookImg
            src={study.logo}
            alt=""
            width={120}
            height={40}
            className="mt-6 h-10 w-auto"
          />
        </article>
      ))}
    </HookCarousel>
  );
}
