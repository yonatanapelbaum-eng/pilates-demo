"use client";

import { useEffect, useState } from "react";
import { waLink } from "@/data/studio";
import { WhatsAppIcon } from "./Icons";

/**
 * Floating WhatsApp button. It steps aside while a section with its own
 * WhatsApp buttons (schedule, pricing, contact, footer) is on screen,
 * so it never sits on top of another button.
 */
export default function WhatsAppFloat() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const targets = Array.from(document.querySelectorAll("[data-own-whatsapp]"));
    if (!targets.length || !("IntersectionObserver" in window)) return;
    const visible = new Set<Element>();
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => (e.isIntersecting ? visible.add(e.target) : visible.delete(e.target)));
        setHidden(visible.size > 0);
      },
      // Only the strip of screen where the button lives counts.
      { rootMargin: "-80% 0px 0px 0px" },
    );
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, []);

  return (
    <a
      href={waLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="שליחת הודעה בוואטסאפ"
      aria-hidden={hidden || undefined}
      tabIndex={hidden ? -1 : undefined}
      className={`fixed bottom-4 left-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-ink transition-[transform,opacity] duration-300 hover:-translate-y-0.5 active:scale-95 md:bottom-6 md:left-6 ${
        hidden ? "pointer-events-none translate-y-4 opacity-0" : "opacity-100"
      }`}
    >
      <WhatsAppIcon className="h-7 w-7" />
    </a>
  );
}
