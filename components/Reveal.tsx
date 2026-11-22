"use client";

import { useEffect } from "react";

/**
 * Staggered entrances: every [data-reveal] element rises in once as it enters,
 * 80ms after the one before it in the same section.
 */
export default function Reveal() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("in"));
      return;
    }
    const counters = new Map<Element, number>();
    els.forEach((el) => {
      const group = el.closest("section, header, footer") ?? document.body;
      const i = counters.get(group) ?? 0;
      counters.set(group, i + 1);
      el.style.transitionDelay = `${Math.min(i, 6) * 80}ms`;
    });
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: "0px 0px -4% 0px", threshold: 0.05 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return null;
}
