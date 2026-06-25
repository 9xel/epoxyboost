"use client";

import { GoogleAnalytics } from "@next/third-parties/google";
import Script from "next/script";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

import { AnalyticsClickTracker } from "./AnalyticsClickTracker";
import { CookieConsent } from "./CookieConsent";
import {
  COOKIE_CONSENT_BANNER_ENABLED,
  hasAnalyticsConsent,
  readCookieConsent,
  type CookieConsentChoice,
} from "../lib/consent";
import { gaMeasurementId } from "../lib/site";

type AnalyticsContextValue = {
  consent: CookieConsentChoice | null;
  analyticsEnabled: boolean;
  setConsent: (choice: CookieConsentChoice) => void;
};

const AnalyticsContext = createContext<AnalyticsContextValue | null>(null);

export function useAnalyticsConsent() {
  const context = useContext(AnalyticsContext);
  if (!context) {
    throw new Error("useAnalyticsConsent must be used within AnalyticsProvider");
  }
  return context;
}

export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  const [consent, setConsentState] = useState<CookieConsentChoice | null>(
    COOKIE_CONSENT_BANNER_ENABLED ? null : "all",
  );

  useEffect(() => {
    if (COOKIE_CONSENT_BANNER_ENABLED) {
      setConsentState(readCookieConsent());
    }
  }, []);

  const setConsent = useCallback((choice: CookieConsentChoice) => {
    setConsentState(choice);
  }, []);

  const analyticsEnabled = hasAnalyticsConsent(consent);

  const value = useMemo(
    () => ({
      consent,
      analyticsEnabled,
      setConsent,
    }),
    [analyticsEnabled, consent, setConsent],
  );

  return (
    <AnalyticsContext.Provider value={value}>
      {children}
      {analyticsEnabled && gaMeasurementId ? (
        <>
          <Script id="ga-consent" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('consent', 'default', {
                analytics_storage: 'granted',
                ad_storage: 'denied',
                ad_user_data: 'denied',
                ad_personalization: 'denied'
              });
            `}
          </Script>
          <GoogleAnalytics gaId={gaMeasurementId} />
        </>
      ) : null}
      {analyticsEnabled && gaMeasurementId ? <AnalyticsClickTracker /> : null}
      {COOKIE_CONSENT_BANNER_ENABLED ? <CookieConsent onConsentChange={setConsent} /> : null}
    </AnalyticsContext.Provider>
  );
}
