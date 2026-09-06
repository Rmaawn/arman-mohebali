"use client";

import { useCallback, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { COLUMNS, FILE_LABELS, RANK_LABELS } from "@/data/cells";
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
    /*
     * Mobile  : flex-col — scene top 56vh, info panel bottom 44vh (scrollable)
     * Desktop : fixed inset-0 — scene fills screen, panels overlay
     */
    <main className="fixed inset-0 overflow-hidden bg-onyx flex flex-col md:block">

      {/* ── 3D Scene ─────────────────────────────────────── */}
      <div className="relative flex-shrink-0 h-[56vh] md:absolute md:inset-0 md:h-auto">
        <Scene
          hoverCell={hoverCell}
          activeCell={activeCell}
          onHoverCell={setHoverCell}
          onSelectCell={handleSelectCell}
        />
        {/* radial vignette */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 35%, rgba(5,5,5,0.55) 85%, rgba(0,0,0,0.85) 100%)",
          }}
        />
        {/* fade into mobile panel */}
        <div className="absolute bottom-0 inset-x-0 h-12 bg-gradient-to-t from-onyx to-transparent pointer-events-none md:hidden" />
      </div>

      {/* ── Mobile info panel (bottom 44vh, scrollable) ─── */}
      <div className="relative flex-1 overflow-y-auto md:hidden bg-onyx border-t border-gold/10">
        <MobileCellPanel
          locale={locale}
          activeCell={activeCell}
          onPrev={goPrev}
          onNext={goNext}
        />
      </div>

      {/* ── Back button ───────────────────────────────────── */}
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

      <BoardHud
        locale={locale}
        activeCell={activeCell}
        hoverCell={hoverCell}
        onSelectColumn={handleSelectColumn}
      />

      {/* Desktop CellPanel only */}
      <div className="hidden md:block">
        <CellPanel locale={locale} activeCell={activeCell} onPrev={goPrev} onNext={goNext} />
      </div>
    </main>
  );
}

/* ─── Mobile cell panel ──────────────────────────────────── */

function MobileCellPanel({
  locale,
  activeCell,
  onPrev,
  onNext,
}: {
  locale: Locale;
  activeCell: { col: number; row: number };
  onPrev: () => void;
  onNext: () => void;
}) {
  const isFa = locale === "fa";
  const column = COLUMNS[activeCell.col];
  const cell = column.cells[activeCell.row];

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={`${activeCell.col}-${activeCell.row}`}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
        className="p-5"
      >
        {/* Column & Cell Header */}
        <div className="flex items-center justify-between mb-3.5 pb-2.5 border-b border-gold/15">
          <div className="flex items-center gap-2">
            <span className="text-xl text-gold">{column.icon}</span>
            <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-gold/85 font-semibold">
              {FILE_LABELS[activeCell.col]} · {column.label[locale]}
            </div>
          </div>
          <div className="font-mono text-xs font-bold tracking-widest tabular-nums text-gold bg-gold/15 border border-gold/35 px-2 py-0.5 rounded">
            {FILE_LABELS[activeCell.col]}{RANK_LABELS[activeCell.row]}
          </div>
        </div>

        {cell ? (
          <>
            {cell.eyebrow && (
              <div className="font-mono text-[10px] tracking-[0.25em] uppercase text-gold/75 mb-1.5 font-medium">
                {cell.eyebrow[locale]}
              </div>
            )}
            <h2
              className={`text-2xl leading-tight mb-2 font-bold text-ivory ${isFa ? "font-fa" : "font-display"}`}
            >
              <span className="text-gold-gradient">{cell.title[locale]}</span>
            </h2>
            {cell.subtitle && (
              <div className="text-sm text-gold/90 font-medium mb-2.5">{cell.subtitle[locale]}</div>
            )}
            {cell.body && (
              <p className="text-sm leading-relaxed text-ivory/80 mb-4">{cell.body[locale]}</p>
            )}
            {cell.tags && cell.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-4">
                {cell.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 text-[11px] font-mono tracking-wider border border-gold/30 bg-gold/10 text-gold rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
            {cell.meta && (
              <div className="font-mono text-xs tracking-widest uppercase text-ivory/50 mb-3">
                {cell.meta[locale]}
              </div>
            )}
            {cell.link && (
              <a
                href={cell.link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold mt-2 text-xs font-mono tracking-wider inline-flex items-center gap-2 py-2 px-3.5"
              >
                {cell.link.label[locale]}
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </>
        ) : (
          <div className="py-6 text-center flex flex-col items-center justify-center">
            <span className="text-2xl text-gold/30 mb-2">♙</span>
            <div className="text-sm font-medium text-ivory/80 mb-1">
              {isFa ? "خانهٔ خالی" : "Empty square"}
            </div>
            <div className="font-mono text-[10px] tracking-wider text-ivory/40">
              {isFa
                ? "یکی از ستون‌های راهنمای شطرنج را انتخاب کنید."
                : "Select any column from the guide."}
            </div>
          </div>
        )}

        {/* Nav arrows */}
        <div className="mt-5 pt-3.5 border-t border-gold/15 flex items-center justify-between">
          <button
            onClick={onPrev}
            className="font-mono text-[11px] tracking-[0.2em] uppercase text-ivory/60 hover:text-gold transition-colors py-1.5 px-2 rounded hover:bg-gold/10"
          >
            ← {isFa ? "قبلی" : "Prev"}
          </button>
          <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-gold/50">
            ♞ {isFa ? "مهره فعال" : "Knight"}
          </span>
          <button
            onClick={onNext}
            className="font-mono text-[11px] tracking-[0.2em] uppercase text-ivory/60 hover:text-gold transition-colors py-1.5 px-2 rounded hover:bg-gold/10"
          >
            {isFa ? "بعدی" : "Next"} →
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
