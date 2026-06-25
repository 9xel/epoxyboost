"use client";

import Link from "next/link";
import { useEffect } from "react";
import { IMG, navLinks, type NavLink } from "../data";
import { LaunchPromoBar } from "./LaunchPromoBar";
import { MobileNav } from "./MobileNav";
import { NavCaret } from "./NavCaret";
import { CallTextSplit } from "./CallTextSplit";
import { PillLimeButton } from "./PillLimeButton";
import { PhoneIcon } from "./PhoneIcon";
import { SiteImg } from "./SiteImg";

function NavItem({ link }: { link: NavLink }) {
  if (!link.children?.length) {
    return (
      <a href={link.href} className="eb-nav-link">
        {link.label}
      </a>
    );
  }

  return (
    <div className="eb-nav-dropdown">
      <a href={link.href ?? "#"} className="eb-nav-link eb-nav-dropdown__trigger">
        {link.label}
        <NavCaret />
      </a>
      <ul className="eb-nav-dropdown__panel">
        {link.children.map((child) => (
          <li key={child.label}>
            <a href={child.href}>{child.label}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SiteHeader({
  showPromoBar = true,
  showNavLinks = true,
  showCallTextSplit = true,
  ctaLabel = "Claim My City",
  ctaHref = "#contact",
}: {
  showPromoBar?: boolean;
  showNavLinks?: boolean;
  showCallTextSplit?: boolean;
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
  }, [showPromoBar]);

  return (
    <header id="eb-site-header" className="eb-header">
      {showPromoBar ? <LaunchPromoBar /> : null}
      <nav id="main-nav" className="eb-main-nav" aria-label="Main Navigation">
        <Link href="/" className="eb-main-nav__logo shrink-0">
          <SiteImg
            src={IMG.logo}
            alt="EpoxyBoost"
            width={156}
            height={34}
            className="h-auto w-[140px] xl:w-[156px] brightness-0 invert"
          />
        </Link>

        {showNavLinks ? (
          <div className="eb-site-nav hidden lg:flex">
            {navLinks.map((link) => (
              <NavItem key={link.label} link={link} />
            ))}
          </div>
        ) : null}

        <div className="eb-main-nav__actions">
          {showCallTextSplit ? (
            <a
              href="tel:6127729555"
              className="flex items-center gap-2 text-sm font-bold text-white lg:hidden"
              aria-label="Give us a call"
            >
              <PhoneIcon />
              <span className="hidden sm:inline">Call</span>
            </a>
          ) : null}
          {showCallTextSplit ? <CallTextSplit className="hidden lg:flex" /> : null}
          <PillLimeButton
            href={ctaHref}
            className={showNavLinks ? "hidden sm:inline-flex" : "inline-flex shrink-0"}
          >
            {ctaLabel}
          </PillLimeButton>
          {showNavLinks ? <MobileNav ctaLabel={ctaLabel} ctaHref={ctaHref} /> : null}
        </div>
      </nav>
    </header>
  );
}
