"use client";

import { Carousel } from "./Carousel";
import { SiteImg } from "./SiteImg";

export function LogoCarousel({ logos }: { logos: string[] }) {
  return (
    <section className="bg-[var(--eb-gray)] px-4 py-10 lg:px-12">
      <Carousel
        ariaLabel="Client logos"
        slidesPerView={{ mobile: 2, tablet: 4, desktop: 6 }}
        gap={32}
        autoPlay
        autoPlayInterval={3500}
        showDots={false}
        className="mx-auto max-w-7xl"
      >
        {logos.map((logo) => (
          <div
            key={logo}
            className="flex h-16 items-center justify-center rounded bg-white/60 px-4"
          >
            <SiteImg
              src={logo}
              alt="Client logo"
              width={160}
              height={60}
              className="h-10 w-auto max-w-[140px] object-contain opacity-80 grayscale"
            />
          </div>
        ))}
      </Carousel>
    </section>
  );
}
