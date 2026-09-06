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
}

export function CellPanel({ locale, activeCell, onPrev, onNext }: Props) {
  const column = COLUMNS[activeCell.col];
  const cell = column.cells[activeCell.row];
  const isFa = locale === "fa";

  return (
    <div
      className={`fixed top-1/2 -translate-y-1/2 z-30 pointer-events-none flex justify-center ${
        isFa ? "left-4 md:left-8 lg:left-12" : "right-4 md:right-8 lg:right-12"
      }`}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={`${activeCell.col}-${activeCell.row}`}
          initial={{ opacity: 0, y: 16, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -12, scale: 0.97 }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          className="pointer-events-auto glass-strong rounded-2xl p-6 md:p-7 max-w-[400px] lg:max-w-[430px] w-full border border-gold/40 shadow-[0_24px_70px_rgba(0,0,0,0.7),0_0_24px_rgba(212,175,55,0.12)] max-h-[min(80vh,680px)] overflow-y-auto"
        >
          {/* Column & Cell Badge Header */}
          <div className="flex items-center justify-between mb-4 pb-3.5 border-b border-gold/20">
            <div className="flex items-center gap-2.5">
              <span className="text-xl md:text-2xl text-gold">{column.icon}</span>
              <div>
                <div className="font-mono text-[10px] tracking-[0.25em] uppercase text-gold/90 font-semibold">
                  {FILE_LABELS[activeCell.col]} · {column.label[locale]}
                </div>
              </div>
            </div>
            <div className="font-mono text-xs font-bold tracking-widest tabular-nums text-gold bg-gold/15 border border-gold/40 px-2.5 py-1 rounded-md shadow-sm">
              {FILE_LABELS[activeCell.col]}
              {RANK_LABELS[activeCell.row]}
            </div>
          </div>

          {cell ? (
            <div>
              {cell.eyebrow && (
                <div className="font-mono text-[10px] md:text-[11px] tracking-[0.25em] uppercase text-gold/80 font-medium mb-1.5">
                  {cell.eyebrow[locale]}
                </div>
              )}

              <h2
                className={`text-2xl md:text-[26px] leading-snug mb-2 font-bold text-ivory ${
                  isFa ? "font-fa" : "font-display"
                }`}
              >
                <span className="text-gold-gradient">{cell.title[locale]}</span>
              </h2>

              {cell.subtitle && (
                <div className="text-sm text-gold/90 font-medium mb-3">{cell.subtitle[locale]}</div>
              )}

              {cell.body && (
                <p className="text-sm leading-relaxed text-ivory/80 mb-4">{cell.body[locale]}</p>
              )}

              {cell.tags && cell.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {cell.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 text-[11px] font-mono tracking-wider border border-gold/30 bg-gold/10 text-gold rounded-md"
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
                  className="btn-gold mt-2 inline-flex items-center gap-2 text-xs font-mono tracking-wider py-2.5 px-4"
                >
                  {cell.link.label[locale]}
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          ) : (
            <div className="py-8 text-center flex flex-col items-center justify-center">
              <span className="text-3xl text-gold/30 mb-3">♙</span>
              <div className="text-sm font-medium text-ivory/80 mb-1">
                {isFa ? "خانهٔ خالی" : "Empty Square"}
              </div>
              <div className="font-mono text-[11px] tracking-wider text-ivory/45 max-w-[240px]">
                {isFa
                  ? "روی یکی از خانه‌های دارای نشان کلیک کنید یا از ستون‌های زیر انتخاب نمایید."
                  : "Click any marked square on the board or choose a column below."}
              </div>
            </div>
          )}

          {/* Footer nav arrows */}
          <div className="mt-5 pt-3.5 border-t border-gold/15 flex items-center justify-between">
            <button
              onClick={onPrev}
              className="font-mono text-[11px] tracking-[0.2em] uppercase text-ivory/60 hover:text-gold transition-colors flex items-center gap-1 py-1 px-1.5 rounded-md hover:bg-gold/10"
            >
              ← {isFa ? "قبلی" : "Prev"}
            </button>
            <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-gold/60">
              ♞ {isFa ? "مهره فعال" : "Knight"}
            </span>
            <button
              onClick={onNext}
              className="font-mono text-[11px] tracking-[0.2em] uppercase text-ivory/60 hover:text-gold transition-colors flex items-center gap-1 py-1 px-1.5 rounded-md hover:bg-gold/10"
            >
              {isFa ? "بعدی" : "Next"} →
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
