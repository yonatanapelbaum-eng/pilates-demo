"use client";

import { useState } from "react";
import { pricingSection, waLink } from "@/data/studio";

const fields = [
  { ground: "bg-sand", button: "btn-primary", track: "bg-cream" },
  { ground: "bg-blush", button: "btn-ink", track: "bg-cream/60" },
  { ground: "bg-sage", button: "btn-cream", track: "bg-cream/60" },
];

export default function Pricing() {
  const [choice, setChoice] = useState<Record<string, number>>({});

  return (
    <section id="pricing" data-own-whatsapp aria-labelledby="pricing-title" className="pb-24 lg:pb-40">
      <div className="mx-auto max-w-page px-4 md:px-8">
        <h2 id="pricing-title" data-reveal className="text-title">
          {pricingSection.title}
        </h2>
      </div>

      {/* Three plans as three flat fields meeting at hard edges. The middle one is wider and in the accent. */}
      <div className="mt-12 grid lg:mt-16 lg:grid-cols-[1fr_1.4fr_1fr]">
        {pricingSection.plans.map((plan, i) => {
          const f = fields[i];
          const sel = choice[plan.id] ?? 0;
          const opt = plan.options[sel];
          const message = plan.id === "monthly" ? plan.message(opt.label, opt.price) : plan.message("", opt.price);
          return (
            <article
              key={plan.id}
              aria-labelledby={`plan-${plan.id}`}
              className={`${f.ground} flex flex-col px-6 py-12 md:px-10 lg:min-h-[520px] lg:px-10 lg:py-14 xl:px-14`}
            >
              <div data-reveal className="flex flex-wrap items-center gap-3">
                <h3 id={`plan-${plan.id}`} className="text-lead">
                  {plan.name}
                </h3>
              </div>
              <p data-reveal className="mt-6 flex flex-wrap items-baseline gap-x-3 gap-y-2">
                <span className="font-display text-title font-medium tabular" aria-live="polite">
                  {opt.price} ₪
                </span>
                <span className="text-small font-semibold">{opt.period}</span>
                {"featured" in plan && plan.featured && (
                  <span className="self-center rounded-full bg-ink px-4 py-1.5 text-small font-bold text-cream">{plan.featured}</span>
                )}
              </p>

              {plan.options.length > 1 && (
                <fieldset data-reveal className="mt-6">
                  <legend className="sr-only">כמה פעמים בשבוע</legend>
                  <div className={`inline-flex rounded-full p-1.5 ${f.track}`}>
                    {plan.options.map((o, oi) => (
                      <label
                        key={o.label}
                        className={`relative flex min-h-[44px] cursor-pointer items-center rounded-full px-5 text-small font-bold transition-colors duration-200 has-[:focus-visible]:outline has-[:focus-visible]:outline-[3px] has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-ink ${
                          sel === oi ? "bg-ink text-cream" : "text-ink hover:bg-cream"
                        }`}
                      >
                        <input
                          type="radio"
                          name={`opt-${plan.id}`}
                          value={oi}
                          checked={sel === oi}
                          onChange={() => setChoice((c) => ({ ...c, [plan.id]: oi }))}
                          className="sr-only"
                        />
                        {o.label}
                      </label>
                    ))}
                  </div>
                </fieldset>
              )}

              <div data-reveal className="mt-auto pt-10">
                <p className="max-w-[32ch]">{plan.text}</p>
                <a
                  href={waLink(message)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`btn ${f.button} mt-6 w-full`}
                >
                  {plan.cta}
                </a>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
