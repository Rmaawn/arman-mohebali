"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { COLUMNS, FILE_LABELS, RANK_LABELS } from "@/data/cells";
import type { Locale } from "@/data/cells";

interface Props {
  locale: Locale;
  activeCell: { col: number; row: number };
  onPrev: () => void;
  onNext: () => void;
  onSelectColumn?: (col: number) => void;
}

export function CellPanel({ locale, activeCell, onPrev, onNext, onSelectColumn }: Props) {
  const column = COLUMNS[activeCell.col];
  const cell = column.cells[activeCell.row];
  const isFa = locale === "fa";

  return (
    <div
      className={`fixed top-1/2 -translate-y-1/2 z-30 pointer-events-none flex justify-center ${
        isFa ? "left-4 md:left-8 lg:left-10 xl:left-14" : "right-4 md:right-8 lg:right-10 xl:right-14"
      }`}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={`${activeCell.col}-${activeCell.row}`}
          initial={{ opacity: 0, y: 16, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -12, scale: 0.97 }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          className="pointer-events-auto glass-strong rounded-3xl p-7 md:p-8 lg:p-9 w-[92vw] sm:w-[480px] md:w-[520px] lg:w-[560px] xl:w-[600px] border-2 border-gold/45 shadow-[0_28px_85px_rgba(0,0,0,0.8),0_0_30px_rgba(212,175,55,0.18)] max-h-[min(86vh,780px)] overflow-y-auto flex flex-col justify-between"
        >
          <div>
            {/* Showcase Primary Banner — unmistakable main content header */}
            <div className="flex items-center justify-between mb-5 pb-4 border-b border-gold/25">
              <div className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-gold/25 to-gold/05 border border-gold/40 flex items-center justify-center text-xl text-gold shadow-sm">
                  {column.icon}
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] md:text-[11px] tracking-[0.25em] uppercase text-gold font-bold">
                      {isFa ? "شناسنامهٔ محتوای رزومه" : "CORE RESUME CONTENT"}
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
                  </div>
                  <div className="text-sm md:text-base font-bold text-ivory mt-0.5">
                    {FILE_LABELS[activeCell.col]} · {column.label[locale]}
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-end">
                <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-ivory/40 mb-0.5">
                  {isFa ? "مختصات خانه" : "CHESS CELL"}
                </span>
                <span className="font-mono text-xs md:text-sm font-bold tracking-widest tabular-nums text-gold bg-gold/15 border border-gold/40 px-3 py-1 rounded-lg shadow-sm">
                  {FILE_LABELS[activeCell.col]}{RANK_LABELS[activeCell.row]}
                </span>
              </div>
            </div>

            {cell ? (
              <div>
                {cell.eyebrow && (
                  <div className="font-mono text-xs md:text-sm tracking-[0.25em] uppercase text-gold/90 font-semibold mb-2">
                    {cell.eyebrow[locale]}
                  </div>
                )}

                <h2
                  className={`text-2xl sm:text-3xl md:text-4xl leading-tight mb-3 font-extrabold text-ivory tracking-tight ${
                    isFa ? "font-fa" : "font-display"
                  }`}
                >
                  <span className="text-gold-gradient">{cell.title[locale]}</span>
                </h2>

                {cell.subtitle && (
                  <div className="text-base md:text-lg text-gold/95 font-medium mb-3.5 leading-snug">
                    {cell.subtitle[locale]}
                  </div>
                )}

                {cell.body && (
                  <p className="text-sm md:text-base leading-relaxed text-ivory/85 mb-5">
                    {cell.body[locale]}
                  </p>
                )}

                {cell.tags && cell.tags.length > 0 && (
                  <div className="mb-5">
                    <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-ivory/45 mb-2">
                      {isFa ? "مهارت‌ها و فناوری‌های مرتبط" : "Associated Technologies & Skills"}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {cell.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 text-xs md:text-sm font-mono tracking-wider border border-gold/30 bg-gold/10 text-gold rounded-lg font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {cell.meta && (
                  <div className="bg-gold/5 border border-gold/20 rounded-xl p-3.5 mb-5 flex items-center gap-3">
                    <span className="text-gold text-base">📌</span>
                    <span className="font-mono text-xs md:text-sm tracking-wider uppercase text-ivory/70 font-medium">
                      {cell.meta[locale]}
                    </span>
                  </div>
                )}

                {cell.link && (
                  <a
                    href={cell.link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-gold w-full sm:w-auto mt-2 inline-flex items-center justify-center gap-2.5 text-xs md:text-sm font-mono tracking-wider py-3 px-6 rounded-xl shadow-lg shadow-gold/20 hover:scale-[1.02] transition-transform"
                  >
                    <span>{cell.link.label[locale]}</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            ) : (
              <div className="py-10 text-center flex flex-col items-center justify-center">
                <div className="w-14 h-14 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center text-3xl text-gold mb-4">
                  ♙
                </div>
                <div className="text-lg font-bold text-ivory mb-2">
                  {isFa ? "خانهٔ آزاد در این ردیف" : "Open Board Square"}
                </div>
                <p className="text-sm leading-relaxed text-ivory/60 max-w-[320px] mb-5">
                  {isFa
                    ? "این خانه خالی است. برای مطالعه اطلاعات و سوابق اصلی، از راهنمای ستون‌های پایین (A تا H) استفاده کنید یا روی خانه‌های دارای نشان کلیک نمایید."
                    : "This square has no entry. To explore primary resume sections, choose any column from the guide below or click on highlighted squares."}
                </p>
                {onSelectColumn && (
                  <div className="flex flex-wrap items-center justify-center gap-2">
                    {[4, 3, 2, 5].map((colIdx) => (
                      <button
                        key={colIdx}
                        onClick={() => onSelectColumn(colIdx)}
                        className="px-3 py-1.5 text-xs font-mono border border-gold/30 bg-gold/10 text-gold rounded-lg hover:bg-gold/20 transition-colors"
                      >
                        {COLUMNS[colIdx].icon} {COLUMNS[colIdx].label[locale]}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Footer nav arrows */}
          <div className="mt-6 pt-4 border-t border-gold/20 flex items-center justify-between">
            <button
              onClick={onPrev}
              className="font-mono text-xs md:text-sm tracking-[0.15em] uppercase text-ivory/70 hover:text-gold transition-all flex items-center gap-1.5 py-2 px-3 rounded-lg hover:bg-gold/10 border border-transparent hover:border-gold/20"
            >
              ← {isFa ? "خانه قبلی" : "Prev Cell"}
            </button>
            <div className="flex items-center gap-1.5 font-mono text-[11px] tracking-[0.2em] uppercase text-gold/75">
              <span>♞</span>
              <span className="hidden sm:inline">
                {isFa ? "ناوبری با کلیدهای جهت‌نما" : "Arrow keys"}
              </span>
            </div>
            <button
              onClick={onNext}
              className="font-mono text-xs md:text-sm tracking-[0.15em] uppercase text-ivory/70 hover:text-gold transition-all flex items-center gap-1.5 py-2 px-3 rounded-lg hover:bg-gold/10 border border-transparent hover:border-gold/20"
            >
              {isFa ? "خانه بعدی" : "Next Cell"} →
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
