const pic = (seed: string, w: number, h: number) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}`;

export const IMG = {
  logo: "/epoxyboost-logo.svg",
  hero: "/images/IMG_0745 (2).webp",
  websitesIcon: pic("eb-websites-icon", 64, 64),
  seoIcon: pic("eb-seo-icon", 64, 64),
  ppcIcon: pic("eb-ppc-icon", 64, 64),
  process: pic("eb-process", 768, 763),
  youtube: pic("eb-youtube", 640, 360),
  skydiver: pic("eb-skydiver", 1200, 800),
  callIcon: pic("eb-call-icon", 20, 20),
  pinIcon: pic("eb-pin-icon", 20, 20),
  introCall: pic("eb-intro-call", 280, 200),
  sydnee: pic("eb-sydnee", 56, 56),
  googleLogo: pic("eb-google-logo", 80, 28),
};

export const clientLogos = [
  pic("eb-client-1", 160, 48),
  pic("eb-client-2", 160, 48),
  pic("eb-client-3", 160, 48),
  pic("eb-client-4", 160, 48),
  pic("eb-client-5", 160, 48),
  pic("eb-client-6", 160, 48),
];

export const partnerLogos = [
  pic("eb-partner-1", 140, 40),
  pic("eb-partner-2", 140, 40),
  pic("eb-partner-3", 140, 40),
  pic("eb-partner-4", 140, 40),
  pic("eb-partner-5", 140, 40),
  pic("eb-partner-6", 140, 40),
];

export type NavLink = {
  label: string;
  href?: string;
  children?: { label: string; href: string }[];
};

export const navLinks: NavLink[] = [
  { label: "Pricing", href: "#" },
  { label: "Results", href: "#" },
  {
    label: "About",
    href: "#",
    children: [
      { label: "About Us", href: "#" },
      { label: "Our Process", href: "#" },
      { label: "Demo of Our Services", href: "#" },
      { label: "Founder", href: "#" },
      { label: "Career Opportunities", href: "#" },
    ],
  },
  {
    label: "Services",
    children: [
      { label: "Website Design", href: "#" },
      { label: "Paid Ads Management", href: "#" },
      { label: "Search Engine Optimization", href: "#" },
      { label: "Google Maps SEO", href: "#" },
      { label: "Google Local Service Ads", href: "#" },
    ],
  },
  {
    label: "Resources",
    children: [
      { label: "Contractor Marketing Blog", href: "#" },
      { label: "Free Mini Courses & Resources", href: "#" },
      { label: "Weekly Video Content", href: "#" },
      { label: "Home Services Podcasts", href: "#" },
    ],
  },
  { label: "Reviews", href: "#" },
  { label: "Contact Us", href: "#contact" },
];

export const services = [
  {
    icon: IMG.websitesIcon,
    title: "Custom Websites",
    description:
      "We take pride in our design process because we know it works. You won't just have a site that looks good, but one that works to give you more leads.",
  },
  {
    icon: IMG.seoIcon,
    title: "Search Engine Optimization",
    description:
      "Drive more serious leads and traffic to your site with search engine optimization that helps you rank higher on search engines like Google.",
  },
  {
    icon: IMG.ppcIcon,
    title: "Paid Ad Management",
    description:
      "Get fast results with our PPC services. We use methods that get results and don't waste your hard-earned dollar on things that won't work.",
  },
];

export const values = [
  {
    icon: pic("eb-value-diamond", 48, 48),
    title: "Extreme Ownership",
    text: "We take more accountability & responsibility than is necessary or comfortable. We act like we own the company when we make decisions.",
  },
  {
    icon: pic("eb-value-paper", 48, 48),
    title: "Fun Under Pressure",
    text: "When challenges come up, we not only maintain a positive attitude, but have fun and use it as an opportunity to improve.",
  },
  {
    icon: pic("eb-value-brain", 48, 48),
    title: "Scrappy",
    text: "We're always looking for more efficient and productive ways to do things. We're able to do more with less & we turn constraints into inspiration.",
  },
];

export const testimonials = [
  {
    name: "Chris Owens",
    company: "Frontline Adjusters",
    quote:
      "EpoxyBoost redesigned my companies website, they are consummate pros and it came out fantastic. With EpoxyBoost, they knew the language and the industry like the back of their hand.",
    image: pic("eb-testimonial-chris", 150, 150),
  },
  {
    name: "Karly Rolls",
    company: "Rolls Mechanical",
    quote:
      "I simply could not be happier. The work they did for me was professional, timely and true to my organization! They turned our website into something I am so proud of.",
    image: pic("eb-testimonial-karly", 150, 150),
  },
  {
    name: "Kristin Sullivan",
    company: "Bob's AC",
    quote:
      "EpoxyBoost has been an incredible partner for our digital marketing growth. Their team is sharp, responsive, and truly understands how to drive high-quality leads.",
    image: pic("eb-testimonial-kristin", 150, 150),
  },
  {
    name: "Courtney White",
    company: "Greentek Roofing & Solar",
    quote:
      "EpoxyBoost has been an absolute game-changer for our business! Their marketing team combines creativity with strategic thinking, resulting in campaigns that truly resonate with our audience.",
    image: pic("eb-testimonial-courtney", 150, 150),
  },
  {
    name: "Robin Scherer",
    company: "Trust Roofing",
    quote:
      "EpoxyBoost is the epitome of professionalism in a marketing agency. They built me a 5 star website that converts and manage all my google ads with an insanely good ROI.",
    image: pic("eb-testimonial-robin", 150, 150),
  },
];

export const caseStudies = [
  {
    label: "Roofing",
    stat: "65%",
    headline: "Increase in monthly qualified organic leads",
    bullets: [
      "$30K in organic traffic revenue every month",
      "83.33% increase in first page rank YoY",
    ],
    logo: pic("eb-case-northface", 120, 40),
  },
  {
    label: "Roofing",
    stat: "92.98%",
    headline: "Increase in Qualified Organic Leads YoY",
    bullets: [
      "351.32% Increase In Total Keywords",
      "300% Increase In Engaged Traffic YoY",
    ],
    logo: pic("eb-case-monarch", 120, 40),
  },
  {
    label: "Roofing",
    stat: "3.5M+",
    headline: "Views on Google for roofing terms",
    bullets: [
      "1,200 monthly website visitors",
      "1,400% growth in first-time users",
    ],
    logo: pic("eb-case-johnson", 120, 40),
  },
];

export const resources = [
  {
    title: "Unlock The Power of Social Media as a Search Engine",
    category: "Social Media",
    image: pic("eb-resource-social", 355, 768),
  },
  {
    title: "What is a Missed Call Worth?",
    category: "call tracking",
    image: pic("eb-resource-missed-call", 768, 512),
  },
  {
    title: "PPC for Home Services: Turn Ad Spend Into Booked Jobs",
    category: "paid advertising",
    image: pic("eb-resource-ppc", 768, 430),
  },
];
