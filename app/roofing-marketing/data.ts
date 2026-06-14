export const IMG = {
  logo: "https://hookagency.com/wp-content/uploads/2024/10/hook-agency-logo-thick.svg",
  hero: "https://hookagency.com/wp-content/uploads/2024/10/hook-better-leads-roofing-marketing-hook-agency-e1728525938371.jpg",
  websitesIcon:
    "https://hookagency.com/wp-content/uploads/2024/09/websites-icon-large-green.svg",
  seoIcon:
    "https://hookagency.com/wp-content/uploads/2024/09/seo-icon-large-green.svg",
  ppcIcon:
    "https://hookagency.com/wp-content/uploads/2024/09/ppc-icon-large-green.svg",
  process:
    "https://hookagency.com/wp-content/uploads/2024/10/roofing-marketing-in-the-trenches-768x763.png",
  youtube: "https://i.ytimg.com/vi/k6KQNJf24jc/hqdefault.jpg",
  skydiver:
    "https://hookagency.com/wp-content/uploads/2024/09/dude-skydiving.gif",
  callIcon:
    "https://hookagency.com/wp-content/uploads/2024/09/iphone-call-green.svg",
  pinIcon:
    "https://hookagency.com/wp-content/uploads/2024/09/location-pin-icon-green.svg",
  introCall:
    "https://hookagency.com/wp-content/uploads/2024/10/intro-call-chalk-callout.png",
  sydnee:
    "https://hookagency.com/wp-content/uploads/2024/09/sydnee-hook-agency-150x150.webp",
};

export const clientLogos = [
  "https://hookagency.com/wp-content/uploads/2025/12/bears-plumbing-services-logo-plumbing-hvac-home-services-marketing-lead-generation.svg",
  "https://hookagency.com/wp-content/uploads/2025/12/panther-hvac-heating-cooling-geothermal-home-services-hvac-marketing-lead-generation.svg",
  "https://hookagency.com/wp-content/uploads/2024/08/Genz-Ryan-Logo.svg",
  "https://hookagency.com/wp-content/uploads/2025/12/Badgerland-Roofing-Solar-Logo-1.svg",
  "https://hookagency.com/wp-content/uploads/2025/12/smock-heating-air-home-services-marketing-lead-generation.svg",
  "https://hookagency.com/wp-content/uploads/2026/03/TC-Backer-construction.png",
];

export const partnerLogos = [
  "https://hookagency.com/wp-content/uploads/2024/08/roofcon-logo-gray.svg",
  "https://hookagency.com/wp-content/uploads/2025/06/proline-crm-logo-gray.svg",
  "https://hookagency.com/wp-content/uploads/2024/08/rilla-logo-gray.svg",
  "https://hookagency.com/wp-content/uploads/2024/08/aeroseal-logo-gray.svg",
  "https://hookagency.com/wp-content/uploads/2024/08/roofing-academy-logo-gray.svg",
  "https://hookagency.com/wp-content/uploads/2024/10/dope-gray.svg",
];

export type NavLink = {
  label: string;
  href?: string;
  children?: { label: string; href: string }[];
};

export const navLinks: NavLink[] = [
  { label: "Pricing", href: "#" },
  { label: "Website Results", href: "#" },
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
    icon: "https://hookagency.com/wp-content/uploads/2024/09/diamond-icon-black.svg",
    title: "Extreme Ownership",
    text: "We take more accountability & responsibility than is necessary or comfortable. We act like we own the company when we make decisions.",
  },
  {
    icon: "https://hookagency.com/wp-content/uploads/2024/09/paper-icon-black-1.svg",
    title: "Fun Under Pressure",
    text: "When challenges come up, we not only maintain a positive attitude, but have fun and use it as an opportunity to improve.",
  },
  {
    icon: "https://hookagency.com/wp-content/uploads/2024/09/brain-icon-black.svg",
    title: "Scrappy",
    text: "We're always looking for more efficient and productive ways to do things. We're able to do more with less & we turn constraints into inspiration.",
  },
];

export const testimonials = [
  {
    name: "Chris Owens",
    company: "Frontline Adjusters",
    quote:
      "Hook redesigned my companies website, they are consummate pros and it came out fantastic. With Hook, they knew the language and the industry like the back of their hand.",
    image:
      "https://hookagency.com/wp-content/uploads/2024/10/chris-owens-frontline--150x150.png",
  },
  {
    name: "Karly Rolls",
    company: "Rolls Mechanical",
    quote:
      "I simply could not be happier. The work they did for me was professional, timely and true to my organization! They turned our website into something I am so proud of.",
    image:
      "https://hookagency.com/wp-content/uploads/2025/12/karly-rolls-headshot-150x150.png",
  },
  {
    name: "Kristin Sullivan",
    company: "Bob's AC",
    quote:
      "Hook Agency has been an incredible partner for our digital marketing growth. Their team is sharp, responsive, and truly understands how to drive high-quality leads.",
    image:
      "https://hookagency.com/wp-content/uploads/2025/12/kristin-sullivan-150x150.jpeg",
  },
  {
    name: "Courtney White",
    company: "Greentek Roofing & Solar",
    quote:
      "Hook has been an absolute game-changer for our business! Their marketing team combines creativity with strategic thinking, resulting in campaigns that truly resonate with our audience.",
    image:
      "https://hookagency.com/wp-content/uploads/2024/10/Screenshot-2025-05-10-at-5.54.10-PM-150x150.png",
  },
  {
    name: "Robin Scherer",
    company: "Trust Roofing",
    quote:
      "Hook Agency is the epitome of professionalism in a marketing agency. They built me a 5 star website that converts and manage all my google ads with an insanely good ROI.",
    image:
      "https://hookagency.com/wp-content/uploads/2024/10/chris-owens-frontline--150x150.png",
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
    logo: "https://hookagency.com/wp-content/uploads/2024/10/northface-logo-color.svg",
  },
  {
    label: "Roofing",
    stat: "92.98%",
    headline: "Increase in Qualified Organic Leads YoY",
    bullets: [
      "351.32% Increase In Total Keywords",
      "300% Increase In Engaged Traffic YoY",
    ],
    logo: "https://hookagency.com/wp-content/uploads/2024/10/monarch-roofing-logo.png",
  },
  {
    label: "Roofing",
    stat: "3.5M+",
    headline: "Views on Google for roofing terms",
    bullets: [
      "1,200 monthly website visitors",
      "1,400% growth in first-time users",
    ],
    logo: "https://hookagency.com/wp-content/uploads/2024/10/johnson-restoration.svg",
  },
];

export const resources = [
  {
    title: "Unlock The Power of Social Media as a Search Engine",
    category: "Social Media",
    image:
      "https://hookagency.com/wp-content/uploads/2026/04/social-search-optimization-home-services-hook-agency-355x768.jpeg",
  },
  {
    title: "What is a Missed Call Worth?",
    category: "call tracking",
    image:
      "https://hookagency.com/wp-content/uploads/2026/04/what-is-a-missed-call-worth-hook-agency-768x512.png",
  },
  {
    title: "PPC for Home Services: Turn Ad Spend Into Booked Jobs",
    category: "paid advertising",
    image:
      "https://hookagency.com/wp-content/uploads/2026/04/ppc-campaigns-hook-agency-handbook-768x430.webp",
  },
];
