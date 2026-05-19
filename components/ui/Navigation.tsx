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

  useEffect(() => {
    const handler = () => {
      setShow(window.scrollY > 200);
      const sections = ["hero", ...SECTIONS.map((s) => s.id)];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= 200 && rect.bottom >= 200) {
          setActive(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handler, { passive: true });
    handler();
    return () => window.removeEventListener("scroll", handler);
  }, []);

  if (!show) return null;

  return (
    <nav
      className={`fixed top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-3 ${
        locale === "fa" ? "left-6" : "right-6"
      }`}
    >
      {SECTIONS.map((s) => {
        const isActive = active === s.id;
        return (
          <a
            key={s.id}
            href={`#${s.id}`}
            className="group relative flex items-center gap-3"
          >
            <span
              className={`text-xs font-medium tracking-widest uppercase whitespace-nowrap transition-all ${
                isActive ? "opacity-100 text-gold" : "opacity-0 group-hover:opacity-100 text-ivory/70"
              }`}
            >
              {dict.nav[s.id as keyof typeof dict.nav]}
            </span>
            <span
              className={`w-8 h-8 flex items-center justify-center rounded-full border transition-all ${
                isActive
                  ? "border-gold bg-gold/10 text-gold scale-110"
                  : "border-ivory/20 text-ivory/40 hover:border-gold/50 hover:text-gold"
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
