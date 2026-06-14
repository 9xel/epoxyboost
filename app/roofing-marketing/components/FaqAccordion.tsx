"use client";

import { useState } from "react";

const faqs = [
  {
    question: "What kinds of results have you gotten for roofers before?",
    answer:
      "We have built gorgeous effective websites for roofers, many times. One of our clients has consistently received 600% more traffic from Google than the previous year. We work with roofers focused on quality and customer service.",
  },
  {
    question:
      "What's different about this than buying leads from Home Advisor, etc?",
    answer:
      "With Home Advisor and similar services you're buying off a list that hasn't said they want YOU. We help you build an asset in your website that gets people to become a fan of your brand.",
  },
  {
    question: "What does your web design process look like?",
    answer:
      "Discovery, wireframes, visual design, WordPress development, launch with QA, and optional SEO to build traffic. We focus on clearly displaying your services and helping people trust you and take action.",
  },
];

export function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="space-y-3">
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={faq.question}
            className="overflow-hidden rounded border border-white/10 bg-[#1a1a1a]"
          >
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? -1 : index)}
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
            >
              <span className="text-base font-bold text-white md:text-lg">
                {faq.question}
              </span>
              <span
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--hook-lime)] text-black transition-transform ${isOpen ? "rotate-180" : ""}`}
              >
                ▲
              </span>
            </button>
            {isOpen && (
              <div className="border-t border-white/10 px-6 py-5 text-sm leading-7 text-white/80 md:text-base">
                {faq.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
