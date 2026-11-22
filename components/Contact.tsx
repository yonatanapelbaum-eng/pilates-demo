"use client";

import { useState } from "react";
import { contactSection as c, studio, waLink } from "@/data/studio";
import { ChevronIcon, ClockIcon, PinIcon, WhatsAppIcon } from "./Icons";

const inputClass =
  "h-[54px] w-full rounded-full bg-cream px-6 text-body text-ink placeholder:text-ink/70 focus:outline focus:outline-[3px] focus:outline-offset-2 focus:outline-ink";

export default function Contact() {
  const [sent, setSent] = useState(false);

  // The form opens WhatsApp with the fixed message plus what was filled in.
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const get = (k: string) => String(data.get(k) ?? "").trim();
    window.open(waLink(c.formMessage(get("name"), get("phone"), get("interest"))), "_blank", "noopener,noreferrer");
    setSent(true);
  };

  return (
    <section id="contact" data-hide-float aria-labelledby="contact-title" className="px-3 pb-14 pt-4 md:px-8 lg:pb-24 lg:pt-8">
      <div className="mx-auto max-w-page">
        {/* The trial class as a coupon to tear off. */}
        <div
          data-reveal
          className="relative grid overflow-hidden rounded-panel bg-blush lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]"
        >
          <div className="flex flex-col justify-between gap-10 px-6 pb-10 pt-12 md:px-10 lg:px-14 lg:py-16">
            <div>
              <h2 id="contact-title" className="text-title">
                {c.title}
              </h2>
              <p className="mt-4 max-w-[32ch]">{c.subtitle}</p>
            </div>
            <p className="flex items-baseline gap-3">
              <span className="font-display text-display font-medium tabular">{c.couponValue}</span>
              <span className="max-w-[22ch] text-small font-semibold">{c.couponNote}</span>
            </p>
          </div>

          {/* Perforation: notches at the edges and a row of punched holes. */}
          <div className="relative px-6 pb-10 pt-12 md:px-10 lg:px-14 lg:py-16">
            <span aria-hidden="true" className="absolute inset-x-8 top-0 flex -translate-y-1/2 justify-between lg:inset-x-auto lg:inset-y-10 lg:right-0 lg:translate-x-1/2 lg:translate-y-0 lg:flex-col">
              {Array.from({ length: 14 }).map((_, i) => (
                <span key={i} className="block h-2.5 w-2.5 rounded-full bg-cream" />
              ))}
            </span>
            <span aria-hidden="true" className="absolute -right-[18px] -top-[18px] h-9 w-9 rounded-full bg-cream" />
            <span aria-hidden="true" className="absolute -left-[18px] -top-[18px] h-9 w-9 rounded-full bg-cream lg:hidden" />
            <span aria-hidden="true" className="absolute -bottom-[18px] -right-[18px] hidden h-9 w-9 rounded-full bg-cream lg:block" />

            {sent ? (
              <div role="status" className="flex h-full min-h-[280px] flex-col justify-center">
                <p className="font-display text-title font-medium">{c.thanks}</p>
                <p className="mt-3">
                  {c.thanksNote}{" "}
                  <a href="#schedule" className="font-bold underline underline-offset-4">
                    למערכת השעות
                  </a>
                </p>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="flex flex-col gap-3 lg:ml-0 lg:mr-6">
                <label className="sr-only" htmlFor="f-name">
                  {c.fields.name}
                </label>
                <input id="f-name" name="name" required autoComplete="name" placeholder={c.fields.name} className={inputClass} />
                <label className="sr-only" htmlFor="f-phone">
                  {c.fields.phone}
                </label>
                <input
                  id="f-phone"
                  name="phone"
                  type="tel"
                  inputMode="tel"
                  required
                  autoComplete="tel"
                  pattern="[0-9+\-\s]{9,15}"
                  placeholder={c.fields.phone}
                  dir="rtl"
                  className={`${inputClass} text-right`}
                />
                <label className="sr-only" htmlFor="f-interest">
                  {c.fields.interest}
                </label>
                <div className="relative">
                  <select id="f-interest" name="interest" defaultValue="" required className={`${inputClass} appearance-none pl-12`}>
                    <option value="" disabled>
                      {c.fields.interest}
                    </option>
                    {c.fields.interestOptions.map((o) => (
                      <option key={o}>{o}</option>
                    ))}
                  </select>
                  <ChevronIcon className="pointer-events-none absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2" />
                </div>
                <button type="submit" className="btn btn-ink mt-2 min-h-[56px] w-full">
                  {c.submit}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Write directly, find the door, see the map. */}
        <div className="mt-10 grid gap-10 lg:mt-16 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
          <div data-reveal className="flex flex-col gap-10">
            <div>
              <p className="text-lead font-semibold">{c.whatsappPrompt}</p>
              <a href={waLink()} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp mt-5 min-h-[60px] w-full sm:w-auto sm:px-10">
                <WhatsAppIcon className="h-7 w-7" />
                {c.whatsappButton}
              </a>
            </div>
            <dl className="grid gap-8 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              <div>
                <dt className="flex items-center gap-2 font-bold">
                  <PinIcon />
                  {c.addressLabel}
                </dt>
                <dd className="mt-2">{studio.address}</dd>
                <dd className="mt-1">
                  <a href={studio.phoneHref} className="inline-flex min-h-[44px] items-center font-semibold underline underline-offset-4 tabular">
                    {studio.phoneDisplay}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="flex items-center gap-2 font-bold">
                  <ClockIcon />
                  {c.hoursLabel}
                </dt>
                {studio.hours.map((h) => (
                  <dd key={h.days} className="mt-2 flex gap-4">
                    <span className="w-16 font-semibold">{h.days}</span>
                    <span className="tabular" dir="ltr">{h.time}</span>
                  </dd>
                ))}
              </div>
            </dl>
          </div>

          <div data-reveal className="relative h-[340px] overflow-hidden rounded-panel bg-sand lg:h-[440px]">
            <iframe
              title={c.mapTitle}
              src={`https://maps.google.com/maps?q=${encodeURIComponent(studio.mapQuery)}&z=16&hl=iw&output=embed`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 h-full w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
