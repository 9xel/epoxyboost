import { services } from "../data";
import { SiteImg } from "./SiteImg";

export function ServicesCarousel() {
  return (
    <div className="relative mt-12 px-2">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {services.map((service) => (
          <article
            key={service.title}
            className="service-card eb-card-shadow flex h-full min-h-0 flex-col rounded bg-white p-8 text-black"
          >
            <div className="service-card__icon mb-6 flex h-20 shrink-0 items-center">
              <SiteImg
                src={service.icon}
                alt=""
                width={service.iconWidth ?? 72}
                height={service.iconHeight ?? 72}
                className={service.iconClassName ?? "h-[4.5rem] w-[4.5rem] shrink-0 object-contain"}
              />
            </div>
            <h3 className="service-card__title shrink-0 text-xl font-extrabold">{service.title}</h3>
            <div className="service-card__body mt-2 min-h-0 flex-1 space-y-4">
              {service.paragraphs.map((paragraph) => (
                <p key={paragraph} className="text-sm leading-7 text-[var(--eb-muted)]">
                  {paragraph}
                </p>
              ))}
            </div>
            <a
              href="#waitlist"
              className="service-card__cta mt-6 inline-flex shrink-0 items-center gap-2 text-sm font-bold uppercase text-[var(--eb-blue)]"
            >
              Learn More →
            </a>
          </article>
        ))}
      </div>
    </div>
  );
}
