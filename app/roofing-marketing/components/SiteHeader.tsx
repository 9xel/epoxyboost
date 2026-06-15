"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { IMG, navLinks, type NavLink } from "../data";
import { HookImg } from "./HookImg";
import { LaunchPromoBar } from "./LaunchPromoBar";
import { MobileNav } from "./MobileNav";

function MegaDropdown({ link }: { link: NavLink }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLLIElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!link.children?.length) {
    return (
      <li className="nav-item">
        <a href={link.href} className="hook-nav-link">
          {link.label}
        </a>
      </li>
    );
  }

  return (
    <li
      ref={ref}
      className="nav-item relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        className="hook-nav-link flex items-center gap-1"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        {link.label}
        <span className={`text-[10px] transition-transform ${open ? "rotate-180" : ""}`}>
          ▼
        </span>
      </button>

      {open && (
        <div className="hook-mega-menu absolute left-1/2 top-full z-50 mt-2 w-[min(720px,calc(100vw-2rem))] -translate-x-1/2 rounded-lg border border-white/10 bg-[#1a1a1a] p-4 shadow-2xl">
          <ul className="grid gap-2 sm:grid-cols-2">
            {link.children.map((child) => (
              <li key={child.label}>
                <a
                  href={child.href}
                  className="block rounded px-3 py-2 text-sm font-semibold text-white/90 transition hover:bg-white/10 hover:text-[var(--hook-lime)]"
                  onClick={() => setOpen(false)}
                >
                  {child.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </li>
  );
}

export function SiteHeader() {
  return (
    <header id="wrapper-navbar" className="hook-header">
      <LaunchPromoBar />
      <nav
        id="main-nav"
        className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-4 py-3 lg:px-8 lg:py-4"
        aria-label="Main Navigation"
      >
        <Link href="/roofing-marketing" className="shrink-0">
          <HookImg
            src={IMG.logo}
            alt="Hook Agency"
            width={156}
            height={34}
            className="h-auto w-[140px] xl:w-[156px]"
          />
        </Link>

        <ul className="hidden items-center gap-4 lg:flex xl:gap-6">
          {navLinks.map((link) => (
            <MegaDropdown key={link.label} link={link} />
          ))}
        </ul>

        <div className="flex items-center gap-3 lg:gap-4">
          <a
            href="tel:6127729555"
            className="flex items-center gap-2 text-sm font-bold text-white lg:hidden"
            aria-label="Give us a call"
          >
            <HookImg
              src={IMG.callIcon}
              alt=""
              width={20}
              height={20}
              className="h-5 w-5"
            />
            <span className="hidden sm:inline">Call</span>
          </a>
          <a
            href="tel:612-772-9555"
            className="phone-link hidden items-center gap-2 text-sm font-bold text-white lg:flex"
          >
            <HookImg
              src={IMG.callIcon}
              alt=""
              width={20}
              height={20}
              className="h-5 w-5"
            />
            612-772-9555
          </a>
          <a href="#contact" className="btn--big solid--lime hidden shrink-0 sm:inline-flex">
            Schedule Intro Call
          </a>
          <MobileNav />
        </div>
      </nav>
    </header>
  );
}
