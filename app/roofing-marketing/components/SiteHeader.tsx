"use client";

import Link from "next/link";
import { useEffect } from "react";
import { siteContactPhone } from "../../../lib/site";
import { IMG } from "../data";
import { CallTextSplit } from "./CallTextSplit";
import { PillLimeButton } from "./PillLimeButton";
import { PhoneIcon } from "./PhoneIcon";
import { SiteImg } from "./SiteImg";

export function SiteHeader({
  showCallTextSplit = false,
  showCta = true,
  ctaLabel = "Join Our Waitlist",
  ctaHref = "#waitlist",
}: {
  showCallTextSplit?: boolean;
  showCta?: boolean;
  ctaLabel?: string;
  ctaHref?: string;
}) {
  useEffect(() => {
    const header = document.getElementById("eb-site-header");
    if (!header) return;

    const syncHeaderOffset = () => {
      document.documentElement.style.setProperty(
        "--eb-header-offset",
        `${header.getBoundingClientRect().height}px`,
      );
    };

    syncHeaderOffset();

    const observer = new ResizeObserver(syncHeaderOffset);
    observer.observe(header);
    window.addEventListener("resize", syncHeaderOffset);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", syncHeaderOffset);
    };
  }, []);

  return (
    <header id="eb-site-header" className="eb-header">
      <nav id="main-nav" className="eb-main-nav" aria-label="Main Navigation">
        <Link href="/" className="eb-main-nav__logo shrink-0">
          <SiteImg
            src={IMG.logo}
            alt="EpoxyBoost"
            width={156}
            height={34}
            loading="eager"
            decoding="sync"
            fetchPriority="high"
            className="h-auto w-[140px] xl:w-[156px] brightness-0 invert"
          />
        </Link>

        <div className="eb-main-nav__actions">
          {showCallTextSplit ? (
            <a
              href={`tel:${siteContactPhone}`}
              className="flex items-center gap-2 text-sm font-bold text-white lg:hidden"
              aria-label="Give us a call"
            >
              <PhoneIcon />
              <span className="hidden sm:inline">Call</span>
            </a>
          ) : null}
          {showCallTextSplit ? <CallTextSplit className="hidden lg:flex" /> : null}
          {showCta ? (
            <PillLimeButton href={ctaHref} className="inline-flex shrink-0">
              {ctaLabel}
            </PillLimeButton>
          ) : null}
        </div>
      </nav>
    </header>
  );
}
