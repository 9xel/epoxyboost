"use client";

import Script from "next/script";

export function ImageUpgradeScript() {
  return (
    <Script id="image-upgrade" strategy="afterInteractive">
      {`
        (function () {
          var overlays = document.querySelectorAll(".img-upgrade-overlay, .hero-photo-overlay");
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
