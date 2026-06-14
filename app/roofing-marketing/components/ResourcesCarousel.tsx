"use client";

import Image from "next/image";
import { resources } from "../data";
import { HookCarousel } from "./HookCarousel";

export function ResourcesCarousel() {
  return (
    <HookCarousel
      ariaLabel="Resources"
      slidesPerView={{ mobile: 1, tablet: 2, desktop: 3 }}
      gap={24}
      className="mt-10 px-2"
    >
      {resources.map((resource) => (
        <article
          key={resource.title}
          className="hook-card-shadow h-full overflow-hidden rounded bg-white"
        >
          <div className="relative h-48 w-full">
            <Image
              src={resource.image}
              alt={resource.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>
          <div className="p-6">
            <span className="text-xs font-bold uppercase text-[var(--hook-green)]">
              {resource.category}
            </span>
            <h3 className="mt-3 text-lg font-extrabold leading-snug">
              {resource.title}
            </h3>
            <span className="mt-4 inline-block text-sm font-bold uppercase text-[var(--hook-blue)]">
              Read More →
            </span>
          </div>
        </article>
      ))}
    </HookCarousel>
  );
}
