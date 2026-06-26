"use client";

import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
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
import { gaMeasurementId, gtmId, isAnalyticsConfigured } from "../lib/site";

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

function ConsentDefaultsScript() {
  return (
    <Script id="analytics-consent-defaults" strategy="beforeInteractive">
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
  );
}

function GtmNoScript({ containerId }: { containerId: string }) {
  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${containerId}`}
        height="0"
        width="0"
        style={{ display: "none", visibility: "hidden" }}
        title="Google Tag Manager"
      />
    </noscript>
  );
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
  const trackingActive = analyticsEnabled && isAnalyticsConfigured();

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
      {trackingActive ? <ConsentDefaultsScript /> : null}
      {trackingActive && gtmId ? (
        <>
          <GtmNoScript containerId={gtmId} />
          <GoogleTagManager gtmId={gtmId} />
        </>
      ) : null}
      {trackingActive && !gtmId && gaMeasurementId ? (
        <GoogleAnalytics gaId={gaMeasurementId} />
      ) : null}
      {children}
      {trackingActive ? <AnalyticsClickTracker /> : null}
      {COOKIE_CONSENT_BANNER_ENABLED ? <CookieConsent onConsentChange={setConsent} /> : null}
    </AnalyticsContext.Provider>
  );
}
