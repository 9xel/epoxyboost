"use client";

import { useEffect } from "react";

import { pushAnalyticsEvent } from "../lib/analytics";
import { useAnalyticsConsent } from "./AnalyticsProvider";

function getClickTarget(event: MouseEvent) {
  return (event.target as Element | null)?.closest("a, button");
}

export function AnalyticsClickTracker() {
  const { analyticsEnabled } = useAnalyticsConsent();

  useEffect(() => {
    if (!analyticsEnabled) {
      return;
    }

    function handleClick(event: MouseEvent) {
      const target = getClickTarget(event);
      if (!target) {
        return;
      }

      if (target.matches('a[href^="mailto:"]')) {
        pushAnalyticsEvent("email_click");
        return;
      }

      if (target.matches('a[href^="tel:"]')) {
        pushAnalyticsEvent("phone_click");
      }
    }

    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, [analyticsEnabled]);

  return null;
}
