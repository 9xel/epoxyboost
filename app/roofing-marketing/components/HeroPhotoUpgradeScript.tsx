"use client";

import Script from "next/script";

export function HeroPhotoUpgradeScript() {
  return (
    <Script id="hero-photo-upgrade" strategy="afterInteractive">
      {`
        (function () {
          var overlays = document.querySelectorAll(".hero-photo-overlay");
          overlays.forEach(function (img) {
            function reveal() {
              img.classList.add("is-loaded");
            }
            if (img.complete) {
              reveal();
            } else {
              img.addEventListener("load", reveal, { once: true });
            }
          });
        })();
      `}
    </Script>
  );
}
