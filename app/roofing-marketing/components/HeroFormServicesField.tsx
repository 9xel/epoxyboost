"use client";

import { useEffect, useId, useRef, useState } from "react";

const SERVICE_OPTIONS = [
  { value: "website-seo", label: "Website + SEO" },
  { value: "branding", label: "Branding / Company Image" },
  { value: "growth-strategy", label: "Growth Strategy" },
  { value: "courses-training", label: "Future Courses / Training" },
  { value: "start-company", label: "I want to start my own epoxy company." },
  { value: "other", label: "Other" },
] as const;

const inputClassName =
  "hero-form__input hero-form__input--premium hero-form__input--premium-tight hero-form__input--premium-tight-compact";

type HeroFormServicesFieldProps = {
  idPrefix?: string;
};

export function HeroFormServicesField({ idPrefix = "hero" }: HeroFormServicesFieldProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);
  const [otherText, setOtherText] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const validationRef = useRef<HTMLInputElement>(null);
  const otherInputRef = useRef<HTMLInputElement>(null);
  const listboxId = useId();
  const fieldId = `${idPrefix}-services`;
  const otherFieldId = `${idPrefix}-services-other`;
  const showOther = selected.includes("other");

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, []);

  useEffect(() => {
    if (!validationRef.current) {
      return;
    }

    validationRef.current.setCustomValidity(
      selected.length === 0 ? "Please select at least one service." : "",
    );
  }, [selected]);

  useEffect(() => {
    if (!otherInputRef.current) {
      return;
    }

    otherInputRef.current.setCustomValidity(
      showOther && !otherText.trim() ? "Please explain what you are interested in." : "",
    );
  }, [showOther, otherText]);

  const handleOptionClick = (value: string) => {
    const isSelecting = !selected.includes(value);

    setSelected((current) => {
      const next = current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value];

      if (value === "other" && !next.includes("other")) {
        setOtherText("");
      }

      return next;
    });

    if (value === "other" && isSelecting) {
      setIsOpen(false);
    }
  };

  const selectedLabels = SERVICE_OPTIONS.filter((option) => selected.includes(option.value)).map(
    (option) => option.label,
  );

  const displayValue = selectedLabels.join(", ");

  return (
    <div
      className={`hero-form__field hero-form__field--services${isOpen ? " hero-form__field--services--open" : ""}`}
      ref={containerRef}
    >
      <label htmlFor={fieldId} className="sr-only">
        Which services are you interested in?
      </label>

      {selected.map((value) => (
        <input key={value} type="hidden" name="services" value={value} />
      ))}

      <div className={`hero-form__multiselect${isOpen ? " hero-form__multiselect--open" : ""}`}>
        <div className="hero-form__multiselect-trigger-wrap">
          <input
            ref={validationRef}
            id={fieldId}
            type="text"
            value={displayValue}
            readOnly
            required
            tabIndex={-1}
            aria-hidden="true"
            className="hero-form__validation-proxy"
          />
          <button
            type="button"
            className={`${inputClassName} hero-form__multiselect-trigger`}
            aria-expanded={isOpen}
            aria-haspopup="listbox"
            aria-controls={listboxId}
            onClick={() => setIsOpen((open) => !open)}
          >
            <span
              className={
                displayValue ? "hero-form__multiselect-value" : "hero-form__multiselect-placeholder"
              }
            >
              {displayValue || "Which services are you interested in? *"}
            </span>
            <span className="hero-form__multiselect-caret" aria-hidden="true">
              ▾
            </span>
          </button>
        </div>

        {isOpen ? (
          <ul
            id={listboxId}
            role="listbox"
            aria-multiselectable="true"
            aria-label="Which services are you interested in?"
            className="hero-form__multiselect-panel"
          >
            {SERVICE_OPTIONS.map((option) => {
              const isSelected = selected.includes(option.value);

              return (
                <li key={option.value} role="presentation">
                  <button
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    className={`hero-form__multiselect-option${
                      isSelected ? " hero-form__multiselect-option--selected" : ""
                    }`}
                    onClick={() => handleOptionClick(option.value)}
                  >
                    <span
                      className={`hero-form__multiselect-checkbox${
                        isSelected ? " hero-form__multiselect-checkbox--checked" : ""
                      }`}
                      aria-hidden="true"
                    >
                      {isSelected ? "✓" : null}
                    </span>
                    <span className="hero-form__multiselect-option-label">{option.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        ) : null}
      </div>

      {showOther ? (
        <div className="hero-form__field--other">
          <label htmlFor={otherFieldId} className="sr-only">
            Explain what you are interested in
          </label>
          <input
            ref={otherInputRef}
            id={otherFieldId}
            name="services_other"
            type="text"
            required
            value={otherText}
            onChange={(event) => setOtherText(event.target.value)}
            placeholder="Please explain what you are interested in *"
            className={inputClassName}
          />
        </div>
      ) : null}
    </div>
  );
}
