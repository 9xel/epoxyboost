"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import {
  COOKIE_CONSENT_STORAGE_KEY,
  type CookieConsentChoice,
  readCookieConsent,
  writeCookieConsent,
} from "../lib/consent";

type CookieConsentProps = {
  onConsentChange: (choice: CookieConsentChoice) => void;
};

export function CookieConsent({ onConsentChange }: CookieConsentProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(readCookieConsent() === null);
  }, []);

  function choose(choice: CookieConsentChoice) {
    writeCookieConsent(choice);
    onConsentChange(choice);
    setVisible(false);
  }

  if (!visible) {
    return null;
  }

  return (
    <div className="cookie-consent" role="dialog" aria-label="Cookie preferences">
      <div className="cookie-consent__inner">
        <p className="cookie-consent__text">
          We use cookies to understand how visitors use our site.{" "}
          <Link href="/privacy-policy" className="cookie-consent__link">
            Privacy Policy
          </Link>
        </p>
        <div className="cookie-consent__actions">
          <button
            type="button"
            className="cookie-consent__button cookie-consent__button--secondary"
            onClick={() => choose("necessary")}
          >
            Necessary only
          </button>
          <button
            type="button"
            className="cookie-consent__button cookie-consent__button--primary"
            onClick={() => choose("all")}
          >
            Accept all
          </button>
        </div>
      </div>
    </div>
  );
}

export { COOKIE_CONSENT_STORAGE_KEY };
