"use client";

import { useEffect, useState } from "react";
import type { Locale, UIDict } from "@/data/i18n";

interface Props {
  locale: Locale;
  dict: UIDict;
}

const SECTIONS = [
  { id: "about", icon: "♔" },
  { id: "skills", icon: "♘" },
  { id: "experience", icon: "♕" },
  { id: "projects", icon: "♖" },
  { id: "education", icon: "♗" },
  { id: "publications", icon: "♙" },
  { id: "languages", icon: "♙" },
  { id: "contact", icon: "♚" },
] as const;

export function Navigation({ locale, dict }: Props) {
  const [active, setActive] = useState<string>("hero");
  const [show, setShow] = useState(false);

  // Active-section tracking via IntersectionObserver — no per-scroll layout
  // reads. A section becomes active while it crosses a band near the top third
  // of the viewport.
  useEffect(() => {
    const ids = ["hero", ...SECTIONS.map((s) => s.id)];
    const els = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (els.length === 0) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-35% 0px -60% 0px", threshold: 0 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // Show/hide is a cheap scrollY compare (no forced layout).
  useEffect(() => {
    const handler = () => setShow(window.scrollY > 200);
    window.addEventListener("scroll", handler, { passive: true });
    handler();
    return () => window.removeEventListener("scroll", handler);
  }, []);

  if (!show) return null;

  const isFa = locale === "fa";

  return (
    <nav
      className={`fixed top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center gap-3 ${
        isFa ? "left-6" : "right-6"
      }`}
    >
      {SECTIONS.map((s) => {
        const isActive = active === s.id;
        return (
          <a
            key={s.id}
            href={`#${s.id}`}
            aria-label={dict.nav[s.id as keyof typeof dict.nav]}
            className="group relative block"
          >
            {/* Label floats beside the dot (absolute) so it never shifts the
                dot — keeps every circle on one straight vertical line. */}
            <span
              className={`pointer-events-none absolute top-1/2 -translate-y-1/2 whitespace-nowrap text-xs font-medium tracking-widest uppercase transition-all duration-300 ${
                isFa ? "left-full ml-3" : "right-full mr-3"
              } ${
                isActive
                  ? "opacity-100 text-gold"
                  : "opacity-0 group-hover:opacity-100 text-ivory/70"
              }`}
            >
              {dict.nav[s.id as keyof typeof dict.nav]}
            </span>
            <span
              className={`w-8 h-8 flex items-center justify-center rounded-full border transition-all ${
                isActive
                  ? "border-gold bg-gold/10 text-gold scale-110"
                  : "border-ivory/20 text-ivory/40 group-hover:border-gold/50 group-hover:text-gold"
              }`}
            >
              {s.icon}
            </span>
          </a>
        );
      })}
    </nav>
  );
}
