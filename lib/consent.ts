export type CookieConsentChoice = "necessary" | "all";

/**
 * Soft launch: false — GA4 loads for everyone; cookie banner hidden.
 * Hard launch: set to true — show CookieConsent bar (styles in app/globals.css)
 * and only load GA4 after "Accept all".
 */
export const COOKIE_CONSENT_BANNER_ENABLED = false;

export const COOKIE_CONSENT_STORAGE_KEY = "eb_cookie_consent";

export const WAITLIST_CONSENT_TEXT_VERSION = "2026-06-24";

export const WAITLIST_CONTACT_CONSENT_TEXT =
  "I agree to be contacted by EpoxyBoost by phone, text, or email about my waitlist submission, services, updates, offers, and future opportunities. I understand I can opt out at any time. Consent is not a condition of purchase. We will never sell your personal information.";

export function hasAnalyticsConsent(choice: CookieConsentChoice | null): boolean {
  if (!COOKIE_CONSENT_BANNER_ENABLED) {
    return true;
  }

  return choice === "all";
}

export function readCookieConsent(): CookieConsentChoice | null {
  if (typeof window === "undefined") {
    return null;
  }

  const value = window.localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY);
  if (value === "necessary" || value === "all") {
    return value;
  }

  return null;
}

export function writeCookieConsent(choice: CookieConsentChoice) {
  window.localStorage.setItem(COOKIE_CONSENT_STORAGE_KEY, choice);
}
