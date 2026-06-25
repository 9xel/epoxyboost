"use client";

import { useRouter } from "next/navigation";
import { type FormEvent, useState } from "react";

import { pushWaitlistFormSubmitEvent } from "../../../lib/analytics";
import {
  WAITLIST_CONSENT_TEXT_VERSION,
  WAITLIST_CONTACT_CONSENT_TEXT,
} from "../../../lib/consent";
import { HeroFormServicesField } from "./HeroFormServicesField";

const formFields = [
  {
    name: "name",
    type: "text",
    autoComplete: "name" as const,
    label: "Name",
    placeholder: "Name *",
  },
  {
    name: "email",
    type: "email",
    autoComplete: "email" as const,
    label: "Email address",
    placeholder: "Email *",
  },
  {
    name: "phone",
    type: "tel",
    autoComplete: "tel" as const,
    label: "Phone number",
    placeholder: "Phone *",
  },
  {
    name: "company",
    type: "text",
    autoComplete: "organization" as const,
    label: "Company name",
    placeholder: "Company Name *",
  },
  {
    name: "city",
    type: "text",
    autoComplete: undefined,
    label: "Main service area",
    placeholder: "Main Service Area *",
  },
] as const;

const inputClassName =
  "hero-form__input hero-form__input--premium hero-form__input--premium-tight hero-form__input--premium-tight-compact";

const cardClassName =
  "hero-form-card hero-form-card--premium hero-form-card--premium-tight hero-form-card--premium-tight-fit hero-form-card--premium-tight-compact";

type FormStatus = "idle" | "submitting" | "error";

export function HeroLaunchForm() {
  const router = useRouter();
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [formKey, setFormKey] = useState(0);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const formData = new FormData(event.currentTarget);
    const payload = {
      name: String(formData.get("name") || "").trim(),
      email: String(formData.get("email") || "").trim(),
      phone: String(formData.get("phone") || "").trim(),
      company: String(formData.get("company") || "").trim(),
      city: String(formData.get("city") || "").trim(),
      services: formData.getAll("services").map(String),
      services_other: String(formData.get("services_other") || "").trim(),
      contact_consent: formData.get("contact_consent") === "yes",
      consent_at: new Date().toISOString(),
      consent_text_version: WAITLIST_CONSENT_TEXT_VERSION,
      consent_text: WAITLIST_CONTACT_CONSENT_TEXT,
    };

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = (await response.json()) as { ok?: boolean; message?: string };

      if (!response.ok || !result.ok) {
        throw new Error(result.message || "Something went wrong. Please try again.");
      }

      await pushWaitlistFormSubmitEvent();
      router.push("/waitlist/thank-you");
      return;
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "Something went wrong. Please try again.",
      );
    }
  }

  return (
    <aside className={cardClassName}>
      <p className="hero-form-card__badge">WAITLIST</p>
      <h2 id="hero-form-heading" className="hero-form-card__heading">
        Be the first to get EpoxyBoost in your area.
      </h2>
      <p className="hero-form-card__subheading">
        We&apos;re currently reviewing epoxy contractors by referral and waitlist only.
        We&apos;ll reach out if your company looks like a fit.
      </p>

      <form
        key={formKey}
        className="hero-form hero-form--premium hero-form--premium-tight hero-form--premium-tight-compact"
        onSubmit={handleSubmit}
      >
        <p className="hero-form__helper-line">Join in 30 seconds. No payment required.</p>
        {formFields.map((field) => {
          const inputId = `hero-${field.name}`;

          return (
            <div key={field.name} className="hero-form__field">
              <label htmlFor={inputId} className="sr-only">
                {field.label}
              </label>
              <input
                id={inputId}
                name={field.name}
                type={field.type}
                autoComplete={field.autoComplete}
                required
                disabled={status === "submitting"}
                placeholder={field.placeholder}
                className={inputClassName}
              />
            </div>
          );
        })}
        <HeroFormServicesField />
        <div className="hero-form__field hero-form__consent">
          <label className="hero-form__consent-label">
            <input
              id="hero-contact-consent"
              name="contact_consent"
              type="checkbox"
              value="yes"
              required
              disabled={status === "submitting"}
              className="hero-form__consent-checkbox"
            />
            <span className="hero-form__consent-text">
              I agree to be contacted by EpoxyBoost by phone, text, or email about my waitlist
              submission, services, updates, offers, and future opportunities. I understand I can opt
              out at any time. Consent is not a condition of purchase. We will never sell your
              personal information. See{" "}
              <a
                href="/privacy-policy"
                className="hero-form__consent-link"
                onClick={(event) => event.stopPropagation()}
                onMouseDown={(event) => event.stopPropagation()}
              >
                Privacy Policy
              </a>
            </span>
          </label>
        </div>
        {status === "error" ? (
          <p className="hero-form__error" role="alert">
            {errorMessage}
          </p>
        ) : null}
        <button
          type="submit"
          disabled={status === "submitting"}
          className="hero-form__submit hero-form__submit--premium hero-form__submit--premium-tight hero-form__submit--premium-tight-compact btn--big solid--lime btn--pill"
        >
          {status === "submitting" ? "Submitting…" : "Join the Waitlist"}
        </button>
        <p className="hero-form__trust-line">
          Joining the waitlist does not guarantee acceptance or availability in your area.
        </p>
      </form>
    </aside>
  );
}
