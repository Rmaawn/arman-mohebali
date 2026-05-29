"use client";

import { useCallback, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { COLUMNS } from "@/data/cells";
import type { Locale } from "@/data/cells";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import { BoardHud } from "@/components/ui/BoardHud";
import { CellPanel } from "@/components/ui/CellPanel";

const Scene = dynamic(() => import("@/components/3d/Scene").then((m) => m.Scene), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="flex gap-2">
        <span className="loading-dot w-2 h-2 rounded-full bg-gold" />
        <span className="loading-dot w-2 h-2 rounded-full bg-gold" />
        <span className="loading-dot w-2 h-2 rounded-full bg-gold" />
      </div>
    </div>
  ),
});

export default function HomePage() {
  const [locale, setLocale] = useState<Locale>("en");
  const [activeCell, setActiveCell] = useState<{ col: number; row: number }>({ col: 0, row: 0 });
  const [hoverCell, setHoverCell] = useState<{ col: number; row: number } | null>(null);

  // restore locale
  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = localStorage.getItem("locale") as Locale | null;
    if (saved === "en" || saved === "fa") setLocale(saved);
  }, []);

  // lock the body scroll while on the board page
  useEffect(() => {
    const prevHtml = document.documentElement.style.overflow;
    const prevBody = document.body.style.overflow;
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = prevHtml;
      document.body.style.overflow = prevBody;
    };
  }, []);

  // apply dir + lang + persist
  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === "fa" ? "rtl" : "ltr";
    document.body.dir = locale === "fa" ? "rtl" : "ltr";
    if (typeof window !== "undefined") localStorage.setItem("locale", locale);
  }, [locale]);

  const handleSelectCell = useCallback((col: number, row: number) => {
    setActiveCell({ col, row });
  }, []);

  const handleSelectColumn = useCallback((col: number) => {
    // jump to the first filled cell in that column
    const idx = COLUMNS[col].cells.findIndex((c) => c !== null);
    setActiveCell({ col, row: idx >= 0 ? idx : 0 });
  }, []);

  const goPrev = useCallback(() => {
    setActiveCell((prev) => {
      let { col, row } = prev;
      for (let step = 0; step < 64; step++) {
        row -= 1;
        if (row < 0) {
          row = 7;
          col = (col - 1 + 8) % 8;
        }
        if (COLUMNS[col].cells[row] !== null) return { col, row };
      }
      return prev;
    });
  }, []);

  const goNext = useCallback(() => {
    setActiveCell((prev) => {
      let { col, row } = prev;
      for (let step = 0; step < 64; step++) {
        row += 1;
        if (row > 7) {
          row = 0;
          col = (col + 1) % 8;
        }
        if (COLUMNS[col].cells[row] !== null) return { col, row };
      }
      return prev;
    });
  }, []);

  // keyboard nav
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        setActiveCell((p) => ({ col: (p.col + 1) % 8, row: p.row }));
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        setActiveCell((p) => ({ col: (p.col - 1 + 8) % 8, row: p.row }));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveCell((p) => ({ col: p.col, row: (p.row - 1 + 8) % 8 }));
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveCell((p) => ({ col: p.col, row: (p.row + 1) % 8 }));
      } else if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        goNext();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goNext]);

  return (
    <main className="fixed inset-0 overflow-hidden">
      {/* 3D scene fills the entire viewport */}
      <div className="absolute inset-0">
        <Scene
          hoverCell={hoverCell}
          activeCell={activeCell}
          onHoverCell={setHoverCell}
          onSelectCell={handleSelectCell}
        />
      </div>

      {/* premium vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 35%, rgba(5,5,5,0.55) 85%, rgba(0,0,0,0.85) 100%)",
        }}
      />

      {/* Back to resume */}
      <Link
        href="/"
        className={`fixed top-6 z-50 group inline-flex items-center gap-2 glass px-3 py-2 rounded-full text-xs font-mono tracking-[0.25em] uppercase text-ivory/60 hover:text-gold transition-colors ${
          locale === "fa" ? "right-24" : "left-6"
        }`}
      >
        <ArrowLeft className={`w-3.5 h-3.5 ${locale === "fa" ? "flip-rtl" : ""}`} />
        <span>{locale === "fa" ? "رزومه" : "Resume"}</span>
      </Link>

      <LanguageSwitcher locale={locale} onChange={setLocale} />
      <BoardHud
        locale={locale}
        activeCell={activeCell}
        hoverCell={hoverCell}
        onSelectColumn={handleSelectColumn}
      />
      <CellPanel locale={locale} activeCell={activeCell} onPrev={goPrev} onNext={goNext} />
    </main>
  );
}
