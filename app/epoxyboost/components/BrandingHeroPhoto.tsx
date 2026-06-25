import { HERO } from "../data";

export function BrandingHeroPhoto() {
  return (
    <>
      <div className="hero-photo-mobile hero--landing__bg">
        <picture>
          <source
            media="(max-width: 61.999rem)"
            srcSet={HERO.mobileSrcSet}
            sizes="100vw"
            type="image/webp"
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={HERO.lcp}
            width={HERO.width}
            height={HERO.height}
            alt={HERO.alt}
            className="hero-photo-base wp-post-image no-lazy"
            fetchPriority="high"
            loading="eager"
            decoding="sync"
          />
        </picture>
      </div>

      <div className="hero-photo-desktop hero--landing__bg">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={HERO.lcp}
          width={HERO.width}
          height={HERO.height}
          alt={HERO.alt}
          className="hero-photo-base wp-post-image no-lazy"
          fetchPriority="high"
          loading="eager"
          decoding="sync"
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={HERO.hq}
          width={HERO.width}
          height={HERO.height}
          alt=""
          className="hero-photo-overlay"
          fetchPriority="low"
          decoding="async"
          aria-hidden="true"
        />
      </div>
    </>
  );
}
