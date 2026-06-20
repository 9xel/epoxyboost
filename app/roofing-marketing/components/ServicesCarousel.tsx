"use client";

import { services } from "../data";
import { Carousel } from "./Carousel";
import { SiteImg } from "./SiteImg";

export function ServicesCarousel() {
  return (
    <Carousel
      ariaLabel="Services"
      slidesPerView={{ mobile: 1, tablet: 2, desktop: 3 }}
      gap={24}
      showArrows
      showDots
      className="mt-12 px-2"
    >
      {services.map((service) => (
        <article
          key={service.title}
          className="eb-card-shadow flex h-full flex-col rounded bg-white p-8 text-black"
        >
          <SiteImg
            src={service.icon}
            alt=""
            width={64}
            height={64}
            className="mb-6 h-16 w-16"
          />
          <h3 className="text-xl font-extrabold">{service.title}</h3>
          <p className="mt-4 flex-1 text-sm leading-7 text-[var(--eb-muted)]">
            {service.description}
          </p>
          <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold uppercase text-[var(--eb-blue)]">
            Learn More →
          </span>
        </article>
      ))}
    </Carousel>
  );
}
