"use client";

import { useRef, useState } from "react";
import { faqSection } from "@/data/studio";

const grounds = ["bg-sand", "bg-blush", "bg-sage"];

/** Questions filed like index cards: one open at a time, the first open on arrival. */
export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  const btns = useRef<(HTMLButtonElement | null)[]>([]);

  const onKey = (e: React.KeyboardEvent, i: number) => {
    const n = faqSection.items.length;
    let to: number | null = null;
    if (e.key === "ArrowDown") to = (i + 1) % n;
    if (e.key === "ArrowUp") to = (i - 1 + n) % n;
    if (e.key === "Home") to = 0;
    if (e.key === "End") to = n - 1;
    if (to === null) return;
    e.preventDefault();
    btns.current[to]?.focus();
  };

  return (
    <section id="faq" aria-labelledby="faq-title" className="px-4 py-14 md:px-8 lg:py-24">
      <div className="mx-auto max-w-page lg:grid lg:grid-cols-12 lg:gap-8">
        <h2 id="faq-title" data-reveal className="text-title lg:col-span-4">
          {faqSection.title}
        </h2>

        <ol className="mt-12 [--step:36px] lg:col-span-8 lg:mt-4 lg:[--step:104px]" aria-label="שאלות נפוצות">
          {faqSection.items.map((item, i) => {
            const isOpen = open === i;
            const g = grounds[i % grounds.length];
            return (
              <li
                key={item.q}
                data-reveal
                className={`relative rounded-panel ${g} ${i === 0 ? "" : "-mt-7"}`}
                style={{ zIndex: i + 1 }}
              >
                {/* The tab on the card's top edge: the same capsule, stepping across the drawer. */}
                <span
                  className={`absolute -top-[22px] flex h-11 items-center rounded-full px-5 text-small font-bold ${g}`}
                  style={{ right: `calc(20px + var(--step) * ${i})` }}
                  aria-hidden="true"
                >
                  {item.topic}
                </span>
                <h3>
                  <button
                    ref={(el) => {
                      btns.current[i] = el;
                    }}
                    id={`faq-q-${i}`}
                    aria-expanded={isOpen}
                    aria-controls={`faq-a-${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                    onKeyDown={(e) => onKey(e, i)}
                    className="flex w-full items-center justify-between gap-6 rounded-panel px-6 pb-14 pt-9 text-start font-sans text-lead font-bold lg:px-10"
                  >
                    <span>{item.q}</span>
                    <span
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-cream/70 transition-transform duration-300 ${
                        isOpen ? "rotate-45" : ""
                      }`}
                    >
                      <span className="relative block h-5 w-5" aria-hidden="true">
                        <span className="absolute inset-x-0 top-1/2 h-[5px] -translate-y-1/2 rounded-full bg-ink" />
                        <span className="absolute inset-y-0 left-1/2 w-[5px] -translate-x-1/2 rounded-full bg-ink" />
                      </span>
                    </span>
                  </button>
                </h3>
                <div
                  id={`faq-a-${i}`}
                  role="region"
                  aria-labelledby={`faq-q-${i}`}
                  className={`grid transition-[grid-template-rows] duration-300 ease-out ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
                >
                  <div className="overflow-hidden" inert={!isOpen}>
                    <p className="max-w-[54ch] px-6 pb-14 lg:px-10">{item.a}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
