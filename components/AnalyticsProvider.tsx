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

function GtmBootstrap({ containerId }: { containerId: string }) {
  return (
    <>
      <Script id="analytics-bootstrap" strategy="beforeInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('consent', 'default', {
            analytics_storage: 'granted',
            ad_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied'
          });
          try {
            var params = new URLSearchParams(window.location.search);
            var utmSource = params.get('utm_source');
            var utmMedium = params.get('utm_medium');
            var bootstrap = {
              'gtm.start': new Date().getTime(),
              event: 'gtm.js',
              page_location: window.location.href
            };
            if (utmSource) {
              bootstrap.campaign_source = utmSource;
              bootstrap.campaign_medium = utmMedium || '(not set)';
            }
            window.dataLayer.push(bootstrap);
          } catch (e) {
            window.dataLayer.push({'gtm.start': new Date().getTime(), event: 'gtm.js'});
          }
        `}
      </Script>
      <Script
        id="gtm-loader"
        strategy="beforeInteractive"
        src={`https://www.googletagmanager.com/gtm.js?id=${containerId}`}
      />
    </>
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
      {trackingActive && gtmId ? (
        <>
          <GtmBootstrap containerId={gtmId} />
          <GtmNoScript containerId={gtmId} />
        </>
      ) : null}
      {trackingActive && !gtmId && gaMeasurementId ? (
        <>
          <ConsentDefaultsScript />
          <GoogleAnalytics gaId={gaMeasurementId} />
        </>
      ) : null}
      {children}
      {trackingActive ? <AnalyticsClickTracker /> : null}
      {COOKIE_CONSENT_BANNER_ENABLED ? <CookieConsent onConsentChange={setConsent} /> : null}
    </AnalyticsContext.Provider>
  );
}
