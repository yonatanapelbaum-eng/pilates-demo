"use client";

import { useEffect, useRef, useState } from "react";
import { classTypes, days, schedule, scheduleSection as s, waLink, type Slot } from "@/data/studio";
import { ChevronIcon, ClockIcon } from "./Icons";

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

export default function Schedule() {
  const [open, setOpen] = useState(false);
  const [today, setToday] = useState<number | null>(null);
  const [active, setActive] = useState(0);
  const [next, setNext] = useState<Next | null>(null);
  const [isSaturday, setIsSaturday] = useState(false);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Live: today's tab and the next class, in Israel time.
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

  // Links to #schedule (menu, hero) open the full timetable.
  useEffect(() => {
    if (window.location.hash === "#schedule") setOpen(true);
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.('a[href="#schedule"]');
      if (a) setOpen(true);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
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

  return (
    <section id="schedule" data-hide-float aria-labelledby="schedule-title" className="px-4 py-14 md:px-8 lg:py-24">
      <div className="mx-auto max-w-[760px]">
        <h2 id="schedule-title" data-reveal className="text-title">
          {s.title}
        </h2>
        <p data-reveal className="mt-3 max-w-[44ch]">
          {s.intro}
        </p>

        {/* The live line: what's next, counted down in Israel time. */}
        <div data-reveal aria-live="polite" className="mt-8 min-h-[96px]">
          {next && (
            <div className="flex flex-col gap-4 rounded-3xl bg-sand p-5 sm:flex-row sm:items-center sm:justify-between sm:px-7">
              <div>
                <p className="flex flex-wrap items-center gap-x-2 text-small font-bold">
                  <ClockIcon className="h-[18px] w-[18px]" />
                  <span>{s.nextLabel}</span>
                  {countdown(next.diff) && <span className="w-full font-semibold sm:w-auto">{countdown(next.diff)}</span>}
                </p>
                <p className="mt-1 text-lead">
                  {whenLabel(next)} <span className="tabular">{next.slot.time}</span> · {classTypes[next.slot.type].short} עם{" "}
                  {next.slot.teacher}
                </p>
              </div>
              <a href={waLink()} target="_blank" rel="noopener noreferrer" className="btn btn-ink min-h-[44px] shrink-0 px-6">
                {s.bookLabel}
              </a>
            </div>
          )}
        </div>

        <button
          type="button"
          data-reveal
          aria-expanded={open}
          aria-controls="schedule-week"
          onClick={() => setOpen((o) => !o)}
          className="js-only mt-4 inline-flex min-h-[48px] items-center gap-2 rounded-full px-1 font-bold underline-offset-[6px] hover:underline"
        >
          {open ? s.hideAll : s.showAll}
          <ChevronIcon className={`h-5 w-5 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
        </button>

        {/* The full week: collapsed until asked for (always shown without script). */}
        <div id="schedule-week" className={open ? "mt-6" : "js-hide"}>
          {isSaturday && <p className="mb-4 font-semibold">{s.saturdayNote}</p>}

          <div role="tablist" aria-label="ימי השבוע" className="js-only flex gap-1 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
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
                className={`flex min-h-[44px] min-w-[44px] shrink-0 flex-1 flex-col items-center justify-center rounded-full px-2 font-bold transition-colors duration-200 sm:flex-none sm:px-5 ${
                  active === i ? "bg-ink text-cream" : "text-ink hover:bg-sand"
                }`}
              >
                <span className="sm:hidden" aria-hidden="true">
                  {d.short}
                </span>
                <span className="hidden sm:inline" aria-hidden="true">
                  {d.long}
                </span>
                <span className="sr-only">
                  יום {d.long}
                  {today === i ? ", היום" : ""}
                </span>
                {today === i && <span className={`mt-0.5 h-1 w-1 rounded-full ${active === i ? "bg-blush" : "bg-ink"}`} aria-hidden="true" />}
              </button>
            ))}
          </div>

          {days.map((d, i) => (
            <div key={d.short} id={`day-${i}`} role="tabpanel" aria-labelledby={`tab-${i}`} className={active === i ? "mt-4" : "js-hide"}>
              <h3 className="nojs-only mb-2 mt-8 text-lead">יום {d.long}</h3>
              <ul>
                {schedule[i].map((slot) => {
                  const c = classTypes[slot.type];
                  const hot = isNext(i, slot);
                  return (
                    <li
                      key={slot.time}
                      className={`flex min-h-[64px] items-center gap-4 rounded-2xl px-3 py-2 sm:gap-6 sm:px-4 ${hot ? "bg-sand" : ""}`}
                    >
                      <span className="w-[56px] shrink-0 text-lead font-medium font-display tabular sm:w-[64px]">{slot.time}</span>
                      <span className="min-w-0 flex-1">
                        <span className="flex items-center gap-2 font-semibold">
                          <span className={`block h-2 w-2 shrink-0 rounded-full ${c.dot}`} aria-hidden="true" />
                          {c.short}
                          {hot && <span className="rounded-full bg-ink px-2.5 py-0.5 text-small font-bold leading-tight text-cream">{s.nextTag}</span>}
                        </span>
                        <span className="block text-small">עם {slot.teacher}</span>
                      </span>
                      <a
                        href={waLink()}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${s.bookLabel}: ${c.short}, יום ${d.long}, ${slot.time}`}
                        className="inline-flex min-h-[44px] shrink-0 items-center rounded-full px-3 text-small font-bold underline underline-offset-4 transition-colors hover:bg-sand"
                      >
                        {s.bookLabel}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
