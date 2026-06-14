"use client";

import Image from "next/image";
import { testimonials } from "../data";
import { HookCarousel } from "./HookCarousel";

export function TestimonialsCarousel() {
  return (
    <HookCarousel
      ariaLabel="Customer testimonials"
      slidesPerView={{ mobile: 1, tablet: 2, desktop: 3 }}
      gap={24}
      autoPlay
      autoPlayInterval={6000}
      className="mt-12 px-2"
    >
      {testimonials.map((item) => (
        <article
          key={item.name}
          className="hook-card-shadow h-full rounded border border-black/5 p-6"
        >
          <div className="flex items-center gap-4">
            <Image
              src={item.image}
              alt={item.name}
              width={64}
              height={64}
              className="h-16 w-16 rounded-full object-cover"
            />
            <div>
              <h3 className="font-extrabold">{item.name}</h3>
              <p className="text-sm text-[var(--hook-muted)]">{item.company}</p>
            </div>
          </div>
          <p className="mt-4 text-sm leading-7 text-[var(--hook-muted)]">
            &ldquo;{item.quote}&rdquo;
          </p>
          <div className="mt-4 text-[var(--hook-lime)]">★★★★★</div>
        </article>
      ))}
    </HookCarousel>
  );
}
