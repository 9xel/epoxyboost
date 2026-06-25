export const IMG = {
  logo: "/epoxyboost-logo.svg",
  hero: "/images/IMG_0745 (2).webp",
  websitesIcon: "/icons/service-websites-seo.svg",
  brandingIcon: "/images/go2epoxy-logo.webp",
  growthIcon: "/icons/service-growth-trend.svg",
} as const;

/** Responsive hero assets — run `npm run images:hero` to regenerate. */
export const HERO = {
  lcp: "/images/hero/eb-hero-480.webp",
  hq: "/images/hero/eb-hero-hq.webp",
  width: 1200,
  height: 1600,
  mobileSrcSet: [
    "/images/hero/eb-hero-390.webp 390w",
    "/images/hero/eb-hero-480.webp 480w",
    "/images/hero/eb-hero-720.webp 720w",
    "/images/hero/eb-hero-1040.webp 1040w",
    "/images/hero/eb-hero-1200.webp 1200w",
    "/images/hero/eb-hero-1600.webp 1600w",
  ].join(", "),
  alt: "Epoxy flooring installation showcasing a premium finished surface",
} as const;

export const services = [
  {
    icon: IMG.websitesIcon,
    iconWidth: 72,
    iconHeight: 72,
    iconClassName: "h-[4.5rem] w-[4.5rem] shrink-0 object-contain",
    title: "Websites + SEO",
    paragraphs: [
      "Our sites are built to turn clicks into calls, form submissions, and paying customers.",
      "We show off your best work, reviews, and services and set up the SEO foundation local customers need to find you online.",
    ],
  },
  {
    icon: IMG.brandingIcon,
    iconWidth: 160,
    iconHeight: 80,
    iconClassName: "h-20 w-auto",
    title: "Branding",
    paragraphs: [
      "Make it clear that the difference between you and the cheaper guy is more than just price.",
      "We upgrade your brand's image and highlight the quality of your work, so customers will know why you're the premium choice in your region.",
    ],
  },
  {
    icon: IMG.growthIcon,
    iconWidth: 72,
    iconHeight: 72,
    iconClassName: "h-[4.5rem] w-[4.5rem] shrink-0 object-contain",
    title: "Growth Strategy",
    paragraphs: [
      "More leads only matter if your business is ready to handle them.",
      "We build the systems you need to scale your business — from lead intake, follow-up, and tracking, to improving margins and deciding which roles to hire next.",
    ],
  },
];
