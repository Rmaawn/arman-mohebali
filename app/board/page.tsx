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

export default function BoardPage() {
  const [locale, setLocale] = useState<Locale>("en");
  const [activeCell, setActiveCell] = useState<{ col: number; row: number }>({ col: 0, row: 0 });
  const [hoverCell, setHoverCell] = useState<{ col: number; row: number } | null>(null);
  const [hoverCol, setHoverCol] = useState<number | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = localStorage.getItem("locale") as Locale | null;
    if (saved === "en" || saved === "fa") setLocale(saved);
  }, []);

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
    const idx = COLUMNS[col].cells.findIndex((c) => c !== null);
    setActiveCell({ col, row: idx >= 0 ? idx : 0 });
  }, []);

  const goPrev = useCallback(() => {
    setActiveCell((prev) => {
      let { col, row } = prev;
      for (let step = 0; step < 64; step++) {
        row -= 1;
        if (row < 0) { row = 7; col = (col - 1 + 8) % 8; }
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
        if (row > 7) { row = 0; col = (col + 1) % 8; }
        if (COLUMNS[col].cells[row] !== null) return { col, row };
      }
      return prev;
    });
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") { e.preventDefault(); setActiveCell((p) => ({ col: (p.col + 1) % 8, row: p.row })); }
      else if (e.key === "ArrowLeft") { e.preventDefault(); setActiveCell((p) => ({ col: (p.col - 1 + 8) % 8, row: p.row })); }
      else if (e.key === "ArrowUp") { e.preventDefault(); setActiveCell((p) => ({ col: p.col, row: (p.row - 1 + 8) % 8 })); }
      else if (e.key === "ArrowDown") { e.preventDefault(); setActiveCell((p) => ({ col: p.col, row: (p.row + 1) % 8 })); }
      else if (e.key === "Enter" || e.key === " ") { e.preventDefault(); goNext(); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goNext]);

  return (
    <main className="fixed inset-0 overflow-hidden bg-onyx select-none">
      {/* ── 3D Chess Scene: Full Screen Canvas (Hero Focus) ── */}
      <div className="absolute inset-0">
        <Scene
          hoverCell={hoverCell}
          activeCell={activeCell}
          hoverCol={hoverCol}
          onHoverCell={setHoverCell}
          onSelectCell={handleSelectCell}
        />
        {/* Subtle radial vignette for cinematic depth */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 35%, rgba(5,5,5,0.45) 80%, rgba(0,0,0,0.85) 100%)",
          }}
        />
      </div>

      {/* ── Top Bar Controls ──────────────────────────────── */}
      <Link
        href="/"
        className={`fixed top-6 z-50 group inline-flex items-center gap-2 glass px-3.5 py-2 rounded-full text-xs font-mono tracking-[0.2em] uppercase text-ivory/70 hover:text-gold hover:border-gold/50 transition-all ${
          locale === "fa" ? "right-28 sm:right-32" : "left-28 sm:left-32"
        }`}
      >
        <ArrowLeft className={`w-3.5 h-3.5 ${locale === "fa" ? "flip-rtl" : ""}`} />
        <span>{locale === "fa" ? "بازگشت به رزومه" : "Resume"}</span>
      </Link>

      <LanguageSwitcher locale={locale} onChange={setLocale} />

      {/* ── 8-Column Guide at Bottom (A to H with Upward Pointers & Real-time 3D Highlight) ── */}
      <BoardHud
        locale={locale}
        activeCell={activeCell}
        hoverCell={hoverCell}
        hoverCol={hoverCol}
        onSelectColumn={handleSelectColumn}
        onHoverColumn={setHoverCol}
      />

      {/* ── Highly Readable Cell Data Pop-up ─────────────── */}
      <CellPanel
        locale={locale}
        activeCell={activeCell}
        onPrev={goPrev}
        onNext={goNext}
        onSelectColumn={handleSelectColumn}
      />
    </main>
  );
}
