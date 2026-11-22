"use client";

import { useEffect, useRef, useState } from "react";
import { classTypes, days, schedule, scheduleSection, waLink, type Slot } from "@/data/studio";
import { ClockIcon } from "./Icons";

type Now = { day: number; minutes: number };
type Next = { day: number; slot: Slot; offset: number; diff: number };

const toMinutes = (t: string) => {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
};

/** Current weekday (0 = Sunday) and minutes past midnight in Israel, wherever the visitor is. */
function nowInIsrael(): Now {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Jerusalem",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(new Date());
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
  const day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(get("weekday"));
  return { day, minutes: Number(get("hour")) * 60 + Number(get("minute")) };
}

function findNext(now: Now): Next | null {
  for (let offset = 0; offset < 8; offset++) {
    const d = (now.day + offset) % 7;
    if (d === 6) continue; // Saturday: closed
    for (const slot of schedule[d]) {
      const mins = toMinutes(slot.time);
      if (offset === 0 && mins <= now.minutes) continue;
      return { day: d, slot, offset, diff: offset * 1440 + mins - now.minutes };
    }
  }
  return null;
}

function whenLabel(n: Next) {
  if (n.offset === 0) return "היום";
  if (n.offset === 1) return "מחר";
  return `ביום ${days[n.day].long}`;
}

function countdown(diff: number) {
  if (diff >= 24 * 60) return "";
  const h = Math.floor(diff / 60);
  const m = diff % 60;
  if (h === 0) return `מתחיל בעוד ${m} דקות`;
  const hours = h === 1 ? "שעה" : h === 2 ? "שעתיים" : `${h} שעות`;
  return m === 0 ? `מתחיל בעוד ${hours}` : `מתחיל בעוד ${hours} ו-${m} דקות`;
}


function BookButton({ slot, day, tone = "sand" }: { slot: Slot; day: number; tone?: "sand" | "cream" | "ink" }) {
  const toneClass = tone === "ink" ? "btn-ink" : tone === "cream" ? "btn-cream" : "bg-sand text-ink hover:bg-blush";
  return (
    <a
      href={waLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${scheduleSection.bookLabel}: ${classTypes[slot.type].short}, יום ${days[day].long}, ${slot.time}`}
      className={`btn min-h-[44px] shrink-0 px-5 text-small ${toneClass}`}
    >
      {scheduleSection.bookLabel}
    </a>
  );
}

export default function Schedule() {
  const [today, setToday] = useState<number | null>(null);
  const [active, setActive] = useState(0);
  const [next, setNext] = useState<Next | null>(null);
  const [isSaturday, setIsSaturday] = useState(false);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const tick = () => {
      const now = nowInIsrael();
      const d = now.day === 6 ? 0 : now.day;
      setIsSaturday(now.day === 6);
      setToday(d);
      setNext(findNext(now));
      return d;
    };
    setActive(tick());
    const id = window.setInterval(tick, 30_000);
    return () => window.clearInterval(id);
  }, []);

  const onTabKey = (e: React.KeyboardEvent, i: number) => {
    // RTL: the arrow pointing left moves forward in the week.
    const step = e.key === "ArrowLeft" ? 1 : e.key === "ArrowRight" ? -1 : 0;
    if (!step) return;
    e.preventDefault();
    const n = (i + step + days.length) % days.length;
    setActive(n);
    tabRefs.current[n]?.focus();
  };

  const isNext = (d: number, slot: Slot) => next !== null && next.day === d && next.slot === slot;
  const maxRows = Math.max(...schedule.map((s) => s.length));

  return (
    <section id="schedule" data-hide-float aria-labelledby="schedule-title" className="px-4 py-14 md:px-8 lg:py-24">
      <div className="mx-auto max-w-page">
        <div className="lg:flex lg:items-end lg:justify-between lg:gap-12">
          <h2 id="schedule-title" data-reveal className="text-title">
            {scheduleSection.title}
          </h2>

          {/* The live line: what's next, counted down in Israel time. */}
          <div data-reveal aria-live="polite" className="mt-6 min-h-[112px] lg:mt-0 lg:min-w-[520px]">
            {next && (
              <div className="flex flex-col gap-4 rounded-panel bg-blush p-5 sm:flex-row sm:items-center sm:justify-between sm:rounded-full sm:py-4 sm:pl-4 sm:pr-7">
                <div>
                  <p className="flex items-center gap-2 text-small font-bold">
                    <ClockIcon className="h-[18px] w-[18px]" />
                    {scheduleSection.nextLabel}
                    {countdown(next.diff) && <span className="font-semibold">· {countdown(next.diff)}</span>}
                  </p>
                  <p className="mt-1 font-bold leading-snug">
                    {whenLabel(next)} ב-<span className="tabular">{next.slot.time}</span> · {classTypes[next.slot.type].short} עם{" "}
                    {next.slot.teacher}
                  </p>
                </div>
                <BookButton slot={next.slot} day={next.day} tone="ink" />
              </div>
            )}
          </div>
        </div>

        {isSaturday && <p className="mt-6 font-semibold">{scheduleSection.saturdayNote}</p>}

        {/* Legend */}
        <ul data-reveal className="mt-8 flex flex-wrap gap-x-6 gap-y-3 lg:mt-12" aria-label="סוגי שיעורים">
          {Object.entries(classTypes).map(([key, c]) => (
            <li key={key} className="flex items-center gap-2 text-small font-semibold">
              <span className={`block h-2.5 w-6 rounded-full ${c.dot}`} aria-hidden="true" />
              {c.short}
            </li>
          ))}
        </ul>

        {/* Phone and tablet: day tabs + list */}
        <div className="mt-8 lg:hidden">
          <div role="tablist" aria-label="ימי השבוע" className="js-only grid grid-cols-6 gap-1.5">
            {days.map((d, i) => (
              <button
                key={d.short}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                role="tab"
                id={`tab-${i}`}
                aria-selected={active === i}
                aria-controls={`day-${i}`}
                tabIndex={active === i ? 0 : -1}
                onClick={() => setActive(i)}
                onKeyDown={(e) => onTabKey(e, i)}
                className={`relative flex h-12 flex-col items-center justify-center rounded-full text-body font-bold transition-colors duration-200 ${
                  active === i ? "bg-ink text-cream" : "bg-sand text-ink hover:bg-blush"
                }`}
              >
                <span aria-hidden="true">{d.short}</span>
                <span className="sr-only">יום {d.long}</span>
                {today === i && (
                  <span
                    className={`absolute bottom-1.5 h-1 w-1 rounded-full ${active === i ? "bg-blush" : "bg-ink"}`}
                    aria-hidden="true"
                  />
                )}
              </button>
            ))}
          </div>

          {days.map((d, i) => (
            <div
              key={d.short}
              id={`day-${i}`}
              role="tabpanel"
              aria-labelledby={`tab-${i}`}
              className={`mt-6 ${active === i ? "" : "js-hide"}`}
            >
              <h3 className="nojs-only mb-3 mt-8 text-lead">יום {d.long}</h3>
              <ul className="flex flex-col gap-2.5">
                {schedule[i].map((slot) => {
                  const c = classTypes[slot.type];
                  const hot = isNext(i, slot);
                  return (
                    <li
                      key={slot.time}
                      className={`flex min-h-[72px] items-center gap-4 rounded-full py-2 pl-2 pr-6 ${hot ? "bg-blush" : "bg-sand"}`}
                    >
                      <span className="w-[64px] shrink-0 font-display text-lead font-medium tabular">{slot.time}</span>
                      <span className="min-w-0 flex-1">
                        <span className="flex items-center gap-2 font-semibold">
                          <span className={`block h-2.5 w-5 shrink-0 rounded-full ${c.dot}`} aria-hidden="true" />
                          {c.short}
                        </span>
                        <span className="block text-small">עם {slot.teacher}</span>
                      </span>
                      <BookButton slot={slot} day={i} tone={hot ? "ink" : "cream"} />
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        {/* Desktop: the week as a table */}
        <div data-reveal className="mt-10 hidden lg:block">
          <table className="w-full table-fixed border-separate border-spacing-x-2 border-spacing-y-0">
            <caption className="sr-only">{scheduleSection.title}</caption>
            <thead>
              <tr>
                {days.map((d, i) => (
                  <th
                    key={d.short}
                    scope="col"
                    className={`rounded-t-panel px-4 pb-4 pt-6 text-start font-display text-lead font-medium ${
                      today === i ? "bg-sand" : ""
                    }`}
                  >
                    {d.long}
                    {today === i && <span className="block text-small">היום</span>}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: maxRows }).map((_, r) => (
                <tr key={r}>
                  {days.map((d, i) => {
                    const slot = schedule[i][r];
                    const last = r === maxRows - 1;
                    return (
                      <td
                        key={d.short}
                        className={`px-2 pb-2 align-top ${today === i ? "bg-sand" : ""} ${last ? "rounded-b-panel pb-4" : ""}`}
                      >
                        {slot && (
                          <div
                            className={`flex h-full flex-col gap-1 rounded-panel p-4 transition-colors ${
                              isNext(i, slot) ? "bg-blush" : today === i ? "bg-cream" : "bg-sand"
                            }`}
                          >
                            <span className="font-display text-lead font-medium tabular">{slot.time}</span>
                            <span className="flex items-center gap-2 font-semibold leading-snug">
                              <span className={`block h-2.5 w-5 shrink-0 rounded-full ${classTypes[slot.type].dot}`} aria-hidden="true" />
                              {classTypes[slot.type].short}
                            </span>
                            <span className="text-small">עם {slot.teacher}</span>
                            <span className="mt-3">
                              <BookButton slot={slot} day={i} tone={isNext(i, slot) ? "ink" : today === i ? "sand" : "cream"} />
                            </span>
                          </div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
