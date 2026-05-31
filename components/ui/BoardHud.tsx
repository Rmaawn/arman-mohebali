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
      {/* ── Top brand bar ─────────────────────────────────────── */}
      <div className="fixed top-0 left-0 right-0 z-30 pointer-events-none px-4 md:px-10 pt-4 md:pt-6 flex items-center justify-between">
        <div className="pointer-events-auto flex items-center gap-2 md:gap-3">
          <span className="text-xl md:text-2xl text-gold">♛</span>
          <div className="leading-tight hidden sm:block">
            <div className="font-mono text-[9px] md:text-[10px] tracking-[0.3em] uppercase text-ivory/50">
              {isFa ? "نمونه‌کار شطرنجی" : "Chess Portfolio"}
            </div>
            <div className="font-display text-base md:text-lg text-ivory/90">
              {isFa ? "آرمان محب‌علی" : "Arman Mohebali"}
            </div>
          </div>
        </div>

        <div className="pointer-events-none hidden md:block text-right">
          <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-ivory/40">
            {isFa ? "خانه" : "Cell"}
          </div>
          <div className="font-display text-2xl text-gold tabular-nums">
            {FILE_LABELS[currentCol]}{RANK_LABELS[currentRow]}
          </div>
        </div>
      </div>

      {/* ── Column labels ─────────────────────────────────────── */}
      {/* On mobile: icons + file letters only  |  Desktop: full labels on hover */}
      <div className="fixed top-[52px] md:top-24 left-0 right-0 z-20 pointer-events-none flex justify-center">
        <div className="pointer-events-auto grid grid-cols-8 gap-0 max-w-[min(96vw,900px)] w-full px-2 md:px-4">
          {COLUMNS.map((c, i) => {
            const active = currentCol === i;
            return (
              <button
                key={c.file}
                onClick={() => onSelectColumn(i)}
                className={`group flex flex-col items-center gap-0.5 md:gap-1 px-0.5 md:px-1 py-1.5 md:py-2 transition-all ${
                  active ? "text-gold" : "text-ivory/45 hover:text-ivory/80"
                }`}
              >
                <span className="text-base md:text-lg leading-none">{c.icon}</span>
                <span
                  className={`font-mono text-[8px] md:text-[9px] tracking-[0.2em] uppercase leading-tight transition-all ${
                    active ? "opacity-100" : "opacity-60"
                  }`}
                >
                  {FILE_LABELS[i]}
                </span>
                {/* Section name — hidden on mobile, hover-revealed on desktop */}
                <span
                  className={`hidden md:block text-[10px] leading-tight text-center max-w-[90px] ${
                    isFa ? "font-fa" : ""
                  } ${active ? "opacity-100" : "opacity-0 group-hover:opacity-90"} transition-opacity`}
                >
                  {c.label[locale]}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Rank labels — left/right side (desktop only) ──────── */}
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
                active ? "text-gold scale-125" : "text-ivory/30"
              }`}
            >
              {r}
            </span>
          );
        })}
      </div>

      {/* ── Bottom hint (desktop only) ────────────────────────── */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30 pointer-events-none hidden md:block">
        <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-ivory/40 text-center">
          {isFa
            ? "روی هر خانهٔ درخشان کلیک کن · با ماوس بچرخان"
            : "Click any glowing square · drag to rotate"}
        </div>
      </div>
    </>
  );
}
