"use client";

import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";
import { useRouter } from "next/navigation";
import { type FormEvent, useRef, useState } from "react";

import { pushWaitlistFormSubmitEvent } from "../../../lib/analytics";
import {
  WAITLIST_CONSENT_TEXT_VERSION,
  WAITLIST_CONTACT_CONSENT_TEXT,
} from "../../../lib/consent";
import { isValidEmail } from "../../../lib/email";
import { formatUsPhoneInput, isValidUsPhone } from "../../../lib/phone";
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

type FormFieldName =
  | "name"
  | "email"
  | "phone"
  | "company"
  | "city"
  | "services"
  | "services_other"
  | "contact_consent";

const inputClassName =
  "hero-form__input hero-form__input--premium hero-form__input--premium-tight hero-form__input--premium-tight-compact";

const cardClassName =
  "hero-form-card hero-form-card--premium hero-form-card--premium-tight hero-form-card--premium-tight-fit hero-form-card--premium-tight-compact";

const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

type FormStatus = "idle" | "submitting" | "error";

function getValidationError(invalidFields: Set<FormFieldName>): string {
  if (invalidFields.has("name")) return "Please enter your name.";
  if (invalidFields.has("email")) return "Please enter a valid email address.";
  if (invalidFields.has("phone")) return "Please enter a valid 10-digit phone number.";
  if (invalidFields.has("company")) return "Please enter your company name.";
  if (invalidFields.has("city")) return "Please enter your main service area.";
  if (invalidFields.has("services")) return "Please select at least one service.";
  if (invalidFields.has("services_other")) return "Please explain what you are interested in.";
  if (invalidFields.has("contact_consent")) return "Please agree to be contacted before submitting.";
  return "Please fix the highlighted fields and try again.";
}

function mapServerErrorToFields(message: string): Set<FormFieldName> {
  const invalid = new Set<FormFieldName>();
  const normalized = message.toLowerCase();

  if (normalized.includes("email")) invalid.add("email");
  if (normalized.includes("phone") || normalized.includes("10-digit")) invalid.add("phone");
  if (normalized.includes("consent")) invalid.add("contact_consent");
  if (normalized.includes("missing required")) {
    invalid.add("name");
    invalid.add("email");
    invalid.add("phone");
    invalid.add("company");
    invalid.add("city");
  }

  return invalid;
}

export function HeroLaunchForm() {
  const router = useRouter();
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [invalidFields, setInvalidFields] = useState<Set<FormFieldName>>(new Set());
  const phoneRef = useRef<HTMLInputElement>(null);
  const turnstileRef = useRef<TurnstileInstance>(null);

  function clearInvalidField(field: FormFieldName) {
    setInvalidFields((current) => {
      if (!current.has(field)) {
        return current;
      }

      const next = new Set(current);
      next.delete(field);
      return next;
    });
  }

  function getInputClassName(field: FormFieldName, classNames = inputClassName) {
    return invalidFields.has(field)
      ? `${classNames} hero-form__input--invalid`
      : classNames;
  }

  function validateForm(formData: FormData, phone: string) {
    const invalid = new Set<FormFieldName>();
    const services = formData.getAll("services").map(String);
    const servicesOther = String(formData.get("services_other") || "").trim();

    if (!String(formData.get("name") || "").trim()) invalid.add("name");

    const email = String(formData.get("email") || "").trim();
    if (!email || !isValidEmail(email)) invalid.add("email");

    if (!isValidUsPhone(phone)) invalid.add("phone");

    if (!String(formData.get("company") || "").trim()) invalid.add("company");
    if (!String(formData.get("city") || "").trim()) invalid.add("city");
    if (services.length === 0) invalid.add("services");
    if (services.includes("other") && !servicesOther) invalid.add("services_other");
    if (formData.get("contact_consent") !== "yes") invalid.add("contact_consent");

    return invalid;
  }

  async function getTurnstileToken(): Promise<string | undefined> {
    if (!turnstileSiteKey || !turnstileRef.current) {
      return undefined;
    }

    turnstileRef.current.reset();
    turnstileRef.current.execute();
    return turnstileRef.current.getResponsePromise();
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage("");
    setInvalidFields(new Set());

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") || "").trim();
    const phone = String(phoneRef.current?.value || formData.get("phone") || "").trim();
    const validationErrors = validateForm(formData, phone);

    if (validationErrors.size > 0) {
      setInvalidFields(validationErrors);
      setStatus("error");
      setErrorMessage(getValidationError(validationErrors));
      return;
    }

    setStatus("submitting");

    const payload = {
      name: String(formData.get("name") || "").trim(),
      email,
      phone,
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
      let turnstileToken: string | undefined;
      if (turnstileSiteKey) {
        turnstileToken = await getTurnstileToken();
        if (!turnstileToken) {
          throw new Error("Security check failed. Please try again.");
        }
      }

      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...payload,
          ...(turnstileToken ? { turnstile_token: turnstileToken } : {}),
        }),
      });

      const result = (await response.json()) as { ok?: boolean; message?: string };

      if (!response.ok || !result.ok) {
        throw new Error(result.message || "Something went wrong. Please try again.");
      }

      await pushWaitlistFormSubmitEvent();
      router.push("/waitlist/thank-you");
      return;
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Something went wrong. Please try again.";
      const serverInvalidFields = mapServerErrorToFields(message);

      setInvalidFields(serverInvalidFields);
      setStatus("error");
      setErrorMessage(message);
      turnstileRef.current?.reset();
    }
  }

  function handlePhoneInput(event: FormEvent<HTMLInputElement>) {
    const input = event.currentTarget;
    input.value = formatUsPhoneInput(input.value);
    clearInvalidField("phone");
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
        className="hero-form hero-form--premium hero-form--premium-tight hero-form--premium-tight-compact"
        onSubmit={handleSubmit}
        noValidate
      >
        <p className="hero-form__helper-line">Join in 30 seconds. No payment required.</p>
        {formFields.map((field) => {
          const inputId = `hero-${field.name}`;
          const fieldName = field.name as FormFieldName;

          if (field.name === "phone") {
            return (
              <div key={field.name} className="hero-form__field">
                <label htmlFor={inputId} className="sr-only">
                  {field.label}
                </label>
                <input
                  ref={phoneRef}
                  id={inputId}
                  name={field.name}
                  type="tel"
                  inputMode="tel"
                  autoComplete={field.autoComplete}
                  required
                  disabled={status === "submitting"}
                  placeholder={field.placeholder}
                  onInput={handlePhoneInput}
                  className={getInputClassName(fieldName)}
                />
              </div>
            );
          }

          return (
            <div key={field.name} className="hero-form__field">
              <label htmlFor={inputId} className="sr-only">
                {field.label}
              </label>
              <input
                id={inputId}
                name={field.name}
                type={field.type}
                {...(field.autoComplete ? { autoComplete: field.autoComplete } : {})}
                required
                disabled={status === "submitting"}
                placeholder={field.placeholder}
                onInput={() => clearInvalidField(fieldName)}
                className={getInputClassName(fieldName)}
              />
            </div>
          );
        })}
        <HeroFormServicesField
          invalidServices={invalidFields.has("services")}
          invalidServicesOther={invalidFields.has("services_other")}
          onServicesChange={() => {
            clearInvalidField("services");
            clearInvalidField("services_other");
          }}
          onOtherChange={() => clearInvalidField("services_other")}
        />
        <div className="hero-form__field hero-form__consent">
          <label
            className={`hero-form__consent-label${
              invalidFields.has("contact_consent") ? " hero-form__consent-label--invalid" : ""
            }`}
          >
            <input
              id="hero-contact-consent"
              name="contact_consent"
              type="checkbox"
              value="yes"
              required
              disabled={status === "submitting"}
              className="hero-form__consent-checkbox"
              onChange={() => clearInvalidField("contact_consent")}
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
        {turnstileSiteKey ? (
          <Turnstile
            ref={turnstileRef}
            siteKey={turnstileSiteKey}
            className="hero-form__turnstile hero-form__turnstile--invisible"
            options={{
              size: "invisible",
              appearance: "interaction-only",
              execution: "execute",
            }}
          />
        ) : null}
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
