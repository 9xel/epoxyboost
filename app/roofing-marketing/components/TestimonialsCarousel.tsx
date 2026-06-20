"use client";

import Image from "next/image";
import { testimonials } from "../data";
import { Carousel } from "./Carousel";

export function TestimonialsCarousel() {
  return (
    <Carousel
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
          className="eb-card-shadow h-full rounded border border-black/5 p-6"
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
              <p className="text-sm text-[var(--eb-muted)]">{item.company}</p>
            </div>
          </div>
          <p className="mt-4 text-sm leading-7 text-[var(--eb-muted)]">
            &ldquo;{item.quote}&rdquo;
          </p>
          <div className="mt-4 text-[var(--eb-lime)]">★★★★★</div>
        </article>
      ))}
    </Carousel>
  );
}
