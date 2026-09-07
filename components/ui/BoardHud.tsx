"use client";

import { COLUMNS, FILE_LABELS } from "@/data/cells";
import type { Locale } from "@/data/cells";

interface Props {
  locale: Locale;
  activeCell: { col: number; row: number };
  hoverCell: { col: number; row: number } | null;
  hoverCol?: number | null;
  onSelectColumn: (col: number) => void;
  onHoverColumn?: (col: number | null) => void;
}

export function BoardHud({
  locale,
  activeCell,
  hoverCell,
  hoverCol,
  onSelectColumn,
  onHoverColumn,
}: Props) {
  const isFa = locale === "fa";
  const effectiveCol = hoverCol !== null && hoverCol !== undefined ? hoverCol : hoverCell?.col ?? activeCell.col;

  return (
    <nav
      aria-label={isFa ? "راهنمای ستون‌های شطرنج" : "Chess files guide"}
      className="fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-30 w-full max-w-[95vw] lg:max-w-4xl px-2 pointer-events-auto"
    >
      <div className="w-full bg-[#0c0c0e]/92 backdrop-blur-xl border border-gold/35 rounded-2xl p-2 sm:p-2.5 shadow-[0_16px_45px_rgba(0,0,0,0.85),0_0_25px_rgba(212,175,55,0.15)] flex flex-col gap-1.5">
        {/* Subtle guide hint / status header */}
        <div className="flex items-center justify-between px-2 pt-0.5 text-[10px] sm:text-[11px] font-mono">
          <div className="flex items-center gap-1.5 text-gold/90 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
            <span className="tracking-wider uppercase font-semibold">
              {activeCell.row === 0
                ? isFa
                  ? "👑 ارتقای سرباز به وزیر"
                  : "👑 PROMOTED TO QUEEN"
                : isFa
                ? "راهنمای ستون‌های ۸‌گانه شطرنج"
                : "CHESSBOARD FILES (A → H)"}
            </span>
          </div>
          <div className="text-ivory/50 tracking-wider hidden sm:block">
            {isFa
              ? "اشاره‌گر مستقیم به ستون‌های بورد · هاور برای هایلایت و کلیک برای پرش"
              : "Hover to highlight column · Click to inspect"}
          </div>
        </div>

        {/* 8 Column tabs — strictly LTR matching the 3D board space */}
        <div
          dir="ltr"
          className="grid grid-cols-8 gap-1 sm:gap-1.5 w-full"
        >
          {COLUMNS.map((c, i) => {
            const isActive = activeCell.col === i;
            const isHovered = effectiveCol === i;

            return (
              <button
                key={c.file}
                onClick={() => onSelectColumn(i)}
                onMouseEnter={() => onHoverColumn?.(i)}
                onMouseLeave={() => onHoverColumn?.(null)}
                className={`group relative flex flex-col items-center justify-between py-2 px-1 sm:px-2 rounded-xl transition-all duration-200 border text-center select-none ${
                  isActive
                    ? "bg-gold/25 border-gold shadow-[0_0_18px_rgba(212,175,55,0.4)] ring-1 ring-gold/60 -translate-y-1"
                    : isHovered
                    ? "bg-gold/15 border-gold/60 shadow-[0_0_12px_rgba(212,175,55,0.25)] -translate-y-0.5"
                    : "bg-onyx-light/40 border-gold/20 hover:border-gold/50 text-ivory/70 hover:text-ivory hover:bg-gold/10 hover:-translate-y-0.5"
                }`}
                title={`${FILE_LABELS[i]} · ${c.label[locale]}`}
              >
                {/* Directional upward pointer directly aimed at the 3D board column */}
                <div
                  className={`text-[8px] sm:text-[9px] leading-none mb-0.5 transition-all duration-200 ${
                    isActive
                      ? "text-gold font-bold scale-125"
                      : isHovered
                      ? "text-gold font-semibold scale-110"
                      : "text-gold/30 group-hover:text-gold/70"
                  }`}
                >
                  ▲
                </div>

                {/* Column File Letter badge (A through H) */}
                <span
                  className={`font-mono text-xs sm:text-sm font-bold uppercase tracking-wider px-1.5 py-0.5 rounded transition-colors ${
                    isActive
                      ? "bg-gold text-onyx shadow-sm font-extrabold"
                      : isHovered
                      ? "bg-gold/30 text-gold font-bold"
                      : "bg-gold/15 text-gold group-hover:bg-gold/25"
                  }`}
                >
                  {FILE_LABELS[i]}
                </span>

                {/* Category Icon */}
                <span className="text-sm sm:text-base my-0.5 leading-none">{c.icon}</span>

                {/* Column Label */}
                <span
                  className={`text-[9px] sm:text-[10px] md:text-[11px] font-medium leading-tight line-clamp-1 w-full transition-colors ${
                    isFa ? "font-fa" : ""
                  } ${
                    isActive
                      ? "text-gold font-bold"
                      : isHovered
                      ? "text-ivory font-semibold"
                      : "text-ivory/75 group-hover:text-ivory"
                  }`}
                  dir={isFa ? "rtl" : "ltr"}
                >
                  {c.label[locale]}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
