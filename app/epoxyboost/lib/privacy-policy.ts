export type PrivacyPolicySection = {
  heading: string;
  paragraphs?: readonly string[];
  listItems?: readonly string[];
  trailingParagraphs?: readonly string[];
};

export const privacyPolicyPage = {
  title: "Privacy Policy | EpoxyBoost",
  metaDescription:
    "EpoxyBoost Privacy Policy — how we collect, use, store, and protect personal information when you visit our website, join our waitlist, request a brand audit, or contact us.",
  h1: "Privacy Policy",
  lastUpdated: "June 26, 2026",
  intro:
    "EpoxyBoost respects your privacy. This Privacy Policy explains how we collect, use, store, and protect personal information when you visit our website, join our waitlist, request a brand audit, contact us, or use our services.",
  contactEmail: "info@myepoxyboost.com",
  contactMailingAddress: "539 W. Commerce St #2396, Dallas, TX 75208",
  legalEntityName: "UPPERCASE HOLDINGS LLC",
  sections: [
    {
      heading: "1. Information We Collect",
      paragraphs: [
        "We may collect personal information that you choose to provide to us, including:",
      ],
      listItems: [
        "Name",
        "Phone number",
        "Email address",
        "Business name",
        "City, province/state, or service area",
        "Website URL",
        "Social media profiles",
        "Company details",
        "Marketing goals or business challenges",
        "Information about your current branding, website, SEO, or online presence",
        "Any other information you include when contacting us, joining our waitlist, requesting a brand audit, or submitting a form",
      ],
      trailingParagraphs: [
        "We may also review publicly available information about your business, such as your website, Google Business Profile, social media pages, reviews, search results, or other public online listings, in order to prepare a brand audit, evaluate your online presence, or respond to your inquiry.",
        "We may also collect basic website usage information through cookies, analytics tools, tracking pixels, or similar technologies. This may include information such as your device type, browser type, pages visited, referral source, approximate location data, and how visitors interact with our website.",
      ],
    },
    {
      heading: "2. How We Use Your Information",
      paragraphs: ["We use your information for reasonable business purposes, including to:"],
      listItems: [
        "Respond to inquiries, waitlist submissions, and brand audit requests",
        "Review your business, website, branding, SEO, or online presence",
        "Contact you by phone, text message, or email about your inquiry",
        "Provide information about EpoxyBoost services",
        "Schedule calls, consultations, audits, or follow-ups",
        "Prepare brand audits, recommendations, or strategy suggestions",
        "Improve our website, marketing, services, offers, and customer experience",
        "Measure website performance and marketing effectiveness",
        "Send promotional messages only where permitted by law or where you have consented",
        "Maintain business records and comply with legal obligations",
      ],
    },
    {
      heading: "3. SMS, Phone, and Email Communications",
      paragraphs: [
        "By providing your phone number and submitting a form on our website, you agree that EpoxyBoost may contact you by phone, text message, or email regarding your inquiry, waitlist submission, brand audit request, consultation, or service request.",
        "If you separately opt in to receive promotional text messages, marketing emails, or other marketing communications, you may unsubscribe at any time.",
        "To stop receiving text messages, reply STOP. Message and data rates may apply.",
        "Mobile phone numbers and SMS consent information will not be sold, rented, or shared with third parties or affiliates for their own marketing purposes. We may share limited information with service providers who help us operate our business, such as website hosting, CRM, analytics, advertising, email, form, scheduling, or SMS communication tools.",
      ],
    },
    {
      heading: "4. Cookies and Tracking Technologies",
      paragraphs: [
        "Our website may use cookies, analytics tools, advertising pixels, or similar technologies to understand how visitors use our website, improve user experience, measure marketing performance, and improve our services.",
        "These tools may help us understand which pages visitors view, how they arrive on our website, how they interact with our content, and whether our marketing is effective.",
        "You can usually adjust your browser settings to block or delete cookies. Some parts of the website may not function properly if cookies are disabled.",
      ],
      trailingParagraphs: [
        "Our waitlist and contact forms use Cloudflare Turnstile, an invisible security tool that helps distinguish human visitors from bots. Turnstile processes minimal technical signals (such as IP address, browser type, and device information) solely for bot detection and website security. For more information about how Cloudflare processes this data, see https://www.cloudflare.com/turnstile-privacy-policy/.",
      ],
    },
    {
      heading: "5. How We Share Information",
      paragraphs: [
        "We do not sell your personal information.",
        "We may share personal information only when necessary, including with:",
      ],
      listItems: [
        "Service providers who help us operate our website, forms, email, SMS, analytics, advertising, scheduling, CRM, hosting, customer management, or website security systems (including Cloudflare Turnstile)",
        "Team members, contractors, consultants, or business partners involved in responding to your inquiry or providing services",
        "Professional advisors, such as accountants, lawyers, insurers, or business advisors, where reasonably necessary",
        "Legal, regulatory, or government authorities if required by law",
        "Successors or potential successors in connection with a business transaction, such as a merger, acquisition, restructuring, or sale of business assets",
      ],
      trailingParagraphs: [
        "We only share the information needed for the relevant purpose.",
        "Some of the tools and service providers we use may process or store information outside of your province, state, or country. When this happens, your information may be subject to the laws of the jurisdiction where it is processed or stored.",
      ],
    },
    {
      heading: "6. Data Retention",
      paragraphs: [
        "We keep personal information only for as long as reasonably necessary to respond to inquiries, manage waitlist submissions, provide brand audits or services, maintain business records, improve our services, comply with legal obligations, resolve disputes, and operate our business.",
        "When personal information is no longer needed, we will delete it, anonymize it, or securely store it in accordance with our business and legal requirements.",
      ],
    },
    {
      heading: "7. Data Security",
      paragraphs: [
        "We use reasonable administrative, technical, and organizational safeguards to protect personal information against unauthorized access, loss, misuse, disclosure, or alteration.",
        "No website, email system, form, CRM, or online transmission is completely secure. However, we take reasonable steps to protect the information we collect.",
      ],
    },
    {
      heading: "8. Accessing or Correcting Your Information",
      paragraphs: [
        "You may contact us to request access to the personal information we hold about you or to ask that we correct inaccurate information.",
        "You may also contact us to request that we delete certain personal information, subject to any legal, business, or recordkeeping requirements that may apply.",
        "We may need to verify your identity before responding to a request.",
      ],
    },
    {
      heading: "9. Third-Party Links",
      paragraphs: [
        "Our website may contain links to third-party websites or services. We are not responsible for the privacy practices, content, or security of those third-party websites.",
        "This may include links to client websites, case studies, booking tools, social media platforms, payment processors, or other third-party services.",
      ],
    },
    {
      heading: "10. Client Work, Case Studies, and Public Business Information",
      paragraphs: [
        "If you become a client, we may reference your business name, website, logo, project details, or results in our portfolio, marketing materials, or case studies only where permitted by our agreement with you or where you have provided permission.",
        "We may also review and discuss publicly available business information, such as your website, social media profiles, reviews, public listings, or search visibility, as part of a brand audit, consultation, or service recommendation.",
      ],
    },
    {
      heading: "11. Changes to This Privacy Policy",
      paragraphs: [
        'We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated "Last Updated" date.',
        "Your continued use of our website after changes are posted means you accept the updated Privacy Policy.",
      ],
    },
    {
      heading: "12. Contact Us",
      paragraphs: [
        "If you have questions about this Privacy Policy, how your information is handled, or if you would like to access, correct, or delete your personal information, please contact us:",
      ],
    },
  ] satisfies readonly PrivacyPolicySection[],
} as const;
