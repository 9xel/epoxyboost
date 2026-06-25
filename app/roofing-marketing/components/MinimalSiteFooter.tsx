import { IMG } from "../data";
import { EmailIcon } from "./EmailIcon";
import { SiteImg } from "./SiteImg";

export function MinimalSiteFooter() {
  return (
    <footer className="hc-footer hc-footer--minimal">
      <div className="hc-container hc-footer__brand">
        <div className="hc-footer__logo">
          <SiteImg
            src={IMG.logo}
            alt="EpoxyBoost"
            width={180}
            height={40}
            loading="lazy"
            decoding="async"
            className="brightness-0 invert"
          />
        </div>
        <address className="hc-footer__contact">
          <a
            href="mailto:info@myepoxyboost.com"
            className="hc-footer__contact-link hc-footer__contact-link--email"
          >
            <EmailIcon className="text-[var(--eb-lime)]" />
            <span>info@myepoxyboost.com</span>
          </a>
        </address>
        <div className="hc-footer__legal-copy">
          <p className="hc-footer__legal-brand !text-[var(--eb-muted)]">&copy; 2026 EpoxyBoost</p>
          <p className="hc-footer__legal-links !text-[var(--eb-muted)]">
            <a href="/privacy-policy" className="!text-[var(--eb-muted)]">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
