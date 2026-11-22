"use client";

import { useEffect, useState } from "react";
import { nav, studio } from "@/data/studio";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    // taste-skill-ignore: the brief asks for a light blur on the one sticky bar.
    <header
      className={`sticky top-0 z-40 transition-colors duration-300 ${
        scrolled ? "bg-cream/85 backdrop-blur-md" : "bg-cream"
      }`}
    >
      <a href="#main" className="sr-only-focusable absolute right-4 top-3 z-50 rounded-full bg-ink px-5 py-3 text-cream">
        דילוג לתוכן
      </a>
      <div className="mx-auto flex h-[60px] max-w-page lg:h-[72px] items-center justify-between gap-6 px-4 md:px-8">
        <a href="#top" className="flex flex-col leading-none">
          <span className="font-display text-[22px] font-medium lg:text-lead tracking-[-0.02em]">{studio.name}</span>
          <span className="mt-0.5 text-small font-semibold lg:mt-1">{studio.tagline}</span>
        </a>

        <nav aria-label="ניווט ראשי" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="rounded-full px-1 py-2 text-body font-semibold underline-offset-[6px] transition-colors hover:text-blush-dark hover:underline"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <a href="#contact" className="btn btn-primary min-h-[44px] px-5">
          שיעור ניסיון
        </a>
      </div>
    </header>
  );
}
