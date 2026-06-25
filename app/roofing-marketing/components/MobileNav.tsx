"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { IMG, navLinks } from "../data";
import { PhoneIcon } from "./PhoneIcon";
import { NavCaret } from "./NavCaret";
import { SiteImg } from "./SiteImg";

export function MobileNav({
  ctaLabel = "Claim My City",
  ctaHref = "#contact",
}: {
  ctaLabel?: string;
  ctaHref?: string;
}) {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const close = () => {
    setOpen(false);
    setExpanded(null);
  };

  return (
    <div className="lg:hidden">
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded border border-white/20 lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav-panel"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          <span
            className={`block h-0.5 w-5 bg-white transition-transform ${open ? "translate-y-2 rotate-45" : ""}`}
          />
          <span
            className={`block h-0.5 w-5 bg-white transition-opacity ${open ? "opacity-0" : ""}`}
          />
          <span
            className={`block h-0.5 w-5 bg-white transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`}
          />
        </button>

      {open && (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-black/40"
          aria-label="Close menu overlay"
          onClick={close}
        />
      )}

      <div
        id="mobile-nav-panel"
        className={`fixed right-0 top-0 z-50 flex h-full w-[min(100%,320px)] flex-col bg-white shadow-2xl transition-transform duration-300 ${
          open ? "translate-x-0" : "pointer-events-none translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-black/10 px-4 py-4">
          <Link href="/" onClick={close}>
            <SiteImg
              src={IMG.logo}
              alt="EpoxyBoost"
              width={140}
              height={32}
              className="h-8 w-auto"
            />
          </Link>
          <button
            type="button"
            onClick={close}
            className="flex h-9 w-9 items-center justify-center rounded border border-black/10 text-xl"
            aria-label="Close menu"
          >
            ×
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-4 py-4">
          <ul className="space-y-1">
            {navLinks.map((link) => {
              const hasChildren = Boolean(link.children?.length);

              if (!hasChildren) {
                return (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      onClick={close}
                      className="block rounded px-3 py-3 text-sm font-bold uppercase tracking-wide hover:bg-[var(--eb-gray)]"
                    >
                      {link.label}
                    </a>
                  </li>
                );
              }

              const isExpanded = expanded === link.label;

              return (
                <li key={link.label}>
                  <button
                    type="button"
                    onClick={() =>
                      setExpanded(isExpanded ? null : link.label)
                    }
                    className="flex w-full items-center justify-between rounded px-3 py-3 text-left text-sm font-bold uppercase tracking-wide hover:bg-[var(--eb-gray)]"
                    aria-expanded={isExpanded}
                  >
                    {link.label}
                    <NavCaret
                      className={`eb-nav-dropdown__caret eb-nav-dropdown__caret--mobile ${isExpanded ? "eb-nav-dropdown__caret--open" : ""}`}
                    />
                  </button>
                  {isExpanded && (
                    <ul className="mb-2 ml-3 border-l-2 border-[var(--eb-lime)] pl-3">
                      {link.children!.map((child) => (
                        <li key={child.label}>
                          <a
                            href={child.href}
                            onClick={close}
                            className="block rounded px-2 py-2 text-sm font-semibold text-[var(--eb-muted)] hover:text-black"
                          >
                            {child.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="space-y-3 border-t border-black/10 p-4">
          <a
            href="tel:612-772-9555"
            className="flex items-center justify-center gap-2 text-sm font-bold"
          >
            <PhoneIcon />
            612-772-9555
          </a>
          <a
            href={ctaHref}
            onClick={close}
            className="eb-btn-big eb-btn-lime block text-center"
          >
            {ctaLabel}
          </a>
        </div>
      </div>
    </div>
  );
}
