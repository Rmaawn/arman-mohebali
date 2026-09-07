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

      {/* ── 8-Column Guide (Closer to board with distinct separated cards) ─── */}
      <div className="fixed bottom-7 md:bottom-12 lg:bottom-14 left-1/2 -translate-x-1/2 z-40 w-full max-w-[min(98vw,900px)] px-2 sm:px-4 pointer-events-none">
        {/* Minimal instruction label */}
        <div className="hidden md:flex items-center justify-center gap-2 mb-2 text-center">
          <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-ivory/50">
            {isFa
              ? "راهنمای ستون‌های شطرنج (A تا H) — هر کارت به ستون متناظر خود در بالا اشاره دارد"
              : "Chess Columns Guide (A to H) — Each card points directly to its board column above"}
          </span>
        </div>

        <div
          dir="ltr"
          className="pointer-events-auto grid grid-cols-8 gap-1.5 sm:gap-2 md:gap-3 w-full"
        >
          {COLUMNS.map((c, i) => {
            const active = currentCol === i;
            return (
              <button
                key={c.file}
                onClick={() => onSelectColumn(i)}
                className={`group relative flex flex-col items-center justify-between p-2 md:p-2.5 rounded-xl border transition-all duration-200 text-center ${
                  active
                    ? "bg-gold/20 border-gold shadow-[0_0_18px_rgba(212,175,55,0.35)] -translate-y-1.5 ring-1 ring-gold/50"
                    : "glass border-gold/25 hover:border-gold/60 text-ivory/75 hover:text-ivory hover:bg-gold/10 hover:-translate-y-1"
                }`}
              >
                {/* Upward pointer pointing directly to this column on the board above */}
                <div
                  className={`absolute -top-2 left-1/2 -translate-x-1/2 text-[9px] leading-none transition-colors ${
                    active ? "text-gold" : "text-gold/40 group-hover:text-gold/80"
                  }`}
                >
                  ▲
                </div>

                {/* Column letter badge */}
                <span
                  className={`font-mono text-[10px] md:text-xs font-bold uppercase tracking-wider px-1.5 py-0.5 rounded ${
                    active
                      ? "bg-gold text-onyx shadow-sm"
                      : "bg-gold/15 text-gold group-hover:bg-gold/25"
                  }`}
                >
                  {FILE_LABELS[i]}
                </span>

                {/* Section icon */}
                <span className="text-base md:text-lg my-1 leading-none">{c.icon}</span>

                {/* Full section label */}
                <span
                  className={`text-[10px] sm:text-[11px] md:text-xs font-medium leading-tight line-clamp-2 transition-colors ${
                    isFa ? "font-fa" : ""
                  } ${active ? "text-gold font-bold" : "text-ivory/80 group-hover:text-ivory"}`}
                  dir={isFa ? "rtl" : "ltr"}
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
