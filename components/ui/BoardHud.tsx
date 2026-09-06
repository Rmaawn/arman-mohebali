"use client";

import { COLUMNS, FILE_LABELS, RANK_LABELS } from "@/data/cells";
import type { Locale } from "@/data/cells";

interface Props {
  locale: Locale;
  activeCell: { col: number; row: number };
  hoverCell: { col: number; row: number } | null;
  onSelectColumn: (col: number) => void;
}

export function BoardHud({ locale, activeCell, hoverCell, onSelectColumn }: Props) {
  const currentCol = hoverCell?.col ?? activeCell.col;
  const currentRow = hoverCell?.row ?? activeCell.row;
  const isFa = locale === "fa";

  return (
    <>
      {/* ── Top center active cell indicator (Desktop) ─────────── */}
      <div className="fixed top-6 left-1/2 -translate-x-1/2 z-30 pointer-events-none hidden md:flex items-center gap-2 glass px-3.5 py-1.5 rounded-full border border-gold/25 shadow-lg">
        <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
        <span className="font-mono text-xs font-bold text-gold tabular-nums">
          {FILE_LABELS[currentCol]}{RANK_LABELS[currentRow]}
        </span>
        <span className="text-gold/40">·</span>
        <span className="text-xs font-mono tracking-wider text-ivory/80">
          {COLUMNS[currentCol].icon} {COLUMNS[currentCol].label[locale]}
        </span>
      </div>

      {/* ── Rank labels — side (desktop only) ─────────────────── */}
      <div
        className={`fixed top-1/2 -translate-y-1/2 z-20 pointer-events-none hidden md:flex flex-col gap-3 ${
          isFa ? "right-4" : "left-4"
        }`}
      >
        {RANK_LABELS.map((r, i) => {
          const active = currentRow === i;
          return (
            <span
              key={r}
              className={`font-mono text-xs tracking-widest tabular-nums transition-all ${
                active ? "text-gold scale-125 font-bold" : "text-ivory/30"
              }`}
            >
              {r}
            </span>
          );
        })}
      </div>

      {/* ── 8-Column Guide Dock (Bottom of screen) ─────────────── */}
      <div className="fixed bottom-3 md:bottom-5 left-1/2 -translate-x-1/2 z-40 w-full max-w-[min(98vw,960px)] px-2 pointer-events-none">
        {/* Minimal desktop instruction hint right above dock */}
        <div className="hidden md:flex items-center justify-center gap-2 mb-1.5 text-center">
          <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-ivory/45">
            {isFa
              ? "راهنمای ستون‌های شطرنج (A تا H) — جهت مشاهده هر بخش روی ستون مربوطه کلیک کنید"
              : "Chess Columns (A to H) — Click any column to inspect section"}
          </span>
        </div>

        <div className="pointer-events-auto glass-strong rounded-2xl md:rounded-full border border-gold/30 p-1.5 md:p-2 shadow-[0_16px_50px_rgba(0,0,0,0.65)] flex items-center justify-between overflow-x-auto no-scrollbar gap-1">
          {COLUMNS.map((c, i) => {
            const active = currentCol === i;
            return (
              <button
                key={c.file}
                onClick={() => onSelectColumn(i)}
                className={`group flex items-center justify-center gap-1.5 md:gap-2 px-2.5 md:px-3.5 py-1.5 md:py-2 rounded-xl md:rounded-full transition-all flex-1 min-w-[74px] sm:min-w-0 ${
                  active
                    ? "bg-gold/20 text-gold border border-gold/50 shadow-[0_0_14px_rgba(212,175,55,0.2)] font-semibold"
                    : "text-ivory/70 hover:text-ivory hover:bg-gold/10 border border-transparent"
                }`}
                title={`${FILE_LABELS[i]} · ${c.label[locale]}`}
              >
                <span className="font-mono text-[11px] font-bold text-gold/90">{FILE_LABELS[i]}</span>
                <span className="text-sm md:text-base leading-none">{c.icon}</span>
                <span
                  className={`text-[11px] md:text-xs tracking-tight whitespace-nowrap ${
                    isFa ? "font-fa" : ""
                  }`}
                >
                  {c.label[locale]}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}
