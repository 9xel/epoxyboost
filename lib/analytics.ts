import { hasAnalyticsConsent, readCookieConsent, type CookieConsentChoice } from "./consent";
import { gaMeasurementId, gtmId, isAnalyticsConfigured } from "./site";

export type AnalyticsEvent = "waitlist_form_submit" | "email_click" | "phone_click";

const FORM_SUBMIT_EVENT_TIMEOUT_MS = 2000;

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    gtag?: (...args: unknown[]) => void;
  }
}

function canTrackAnalytics(choice: CookieConsentChoice | null = readCookieConsent()) {
  return isAnalyticsConfigured() && hasAnalyticsConsent(choice);
}

export function pushWaitlistFormSubmitEvent() {
  return pushAnalyticsEvent("waitlist_form_submit");
}

export function pushAnalyticsEvent(
  event: AnalyticsEvent,
  data?: Record<string, unknown>,
): Promise<void> {
  return new Promise((resolve) => {
    if (typeof window === "undefined" || !canTrackAnalytics()) {
      resolve();
      return;
    }

  // GTM custom-event triggers listen to dataLayer pushes.
  if (!gtmId && typeof window.gtag === "function") {
      window.gtag("event", event, data);
      resolve();
      return;
    }

    let settled = false;
    const finish = () => {
      if (settled) {
        return;
      }
      settled = true;
      resolve();
    };

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event,
      ...data,
      eventCallback: finish,
      eventTimeout: FORM_SUBMIT_EVENT_TIMEOUT_MS,
    });

    window.setTimeout(finish, FORM_SUBMIT_EVENT_TIMEOUT_MS);
  });
}
