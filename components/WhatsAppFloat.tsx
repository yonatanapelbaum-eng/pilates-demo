"use client";

import { useEffect, useState } from "react";
import { demo, waLink } from "@/data/studio";
import { WhatsAppIcon } from "./Icons";

const BAR_KEY = "demo-bar-closed";

/**
 * The fixed "sample site" bar at the bottom of the screen, and the floating
 * WhatsApp button that sits above it. The button steps aside while a section
 * with its own WhatsApp buttons is on screen, so it never covers one.
 */
export default function WhatsAppFloat() {
  const [barOpen, setBarOpen] = useState(true);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(BAR_KEY) === "1") setBarOpen(false);
    } catch {
      /* storage unavailable: keep the bar */
    }
  }, []);

  useEffect(() => {
    const targets = Array.from(document.querySelectorAll("[data-hide-float]"));
    if (!targets.length || !("IntersectionObserver" in window)) return;
    const visible = new Set<Element>();
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => (e.isIntersecting ? visible.add(e.target) : visible.delete(e.target)));
        setHidden(visible.size > 0);
      },
      // Only the strip of screen where the button lives counts.
      { rootMargin: "-75% 0px 0px 0px" },
    );
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, []);

  const closeBar = () => {
    setBarOpen(false);
    try {
      sessionStorage.setItem(BAR_KEY, "1");
    } catch {
      /* ignore */
    }
  };

  return (
    <>
      <a
        href={waLink()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="שליחת הודעה בוואטסאפ"
        aria-hidden={hidden || undefined}
        tabIndex={hidden ? -1 : undefined}
        className={`fixed left-3 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-whatsapp text-ink transition-[transform,opacity,bottom] duration-300 hover:-translate-y-0.5 active:scale-95 md:left-6 ${
          barOpen ? "bottom-[60px]" : "bottom-3 md:bottom-6"
        } ${hidden ? "pointer-events-none translate-y-4 opacity-0" : "opacity-100"}`}
      >
        <WhatsAppIcon className="h-6 w-6" />
      </a>

      {barOpen && (
        <div className="fixed inset-x-0 bottom-0 z-[60] flex h-12 items-stretch bg-ink text-cream">
          <a
            href={waLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-1 items-center justify-center gap-2 px-4 text-small font-bold underline-offset-4 hover:underline"
          >
            <WhatsAppIcon className="h-5 w-5 shrink-0 text-whatsapp" />
            {demo.bar}
          </a>
          <button
            type="button"
            onClick={closeBar}
            aria-label={demo.barClose}
            className="flex w-12 shrink-0 items-center justify-center text-cream transition-colors hover:bg-cream/10"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" className="h-5 w-5" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>
      )}
    </>
  );
}
