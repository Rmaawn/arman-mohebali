"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ExternalLink, X, ChevronRight, ChevronLeft } from "lucide-react";
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
  const [isOpen, setIsOpen] = useState(true);
  const column = COLUMNS[activeCell.col];
  const cell = column.cells[activeCell.row];
  const isFa = locale === "fa";

  // Re-open automatically when active cell changes
  useEffect(() => {
    setIsOpen(true);
  }, [activeCell.col, activeCell.row]);

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed top-24 ${
          isFa ? "right-6" : "left-6"
        } z-40 group inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-[#0c0c0e]/95 border border-gold/40 text-gold shadow-[0_10px_30px_rgba(0,0,0,0.8),0_0_15px_rgba(212,175,55,0.2)] hover:border-gold hover:scale-105 transition-all`}
      >
        <span className="text-base">♞</span>
        <span className="font-mono text-xs font-bold tracking-wider uppercase text-ivory">
          {isFa ? "مشاهده توضیحات خانه" : "Inspect Square"} [{FILE_LABELS[activeCell.col]}{RANK_LABELS[activeCell.row]}]
        </span>
        <span className="text-gold text-xs">▼</span>
      </button>
    );
  }

  return (
    <div
      className={`fixed top-20 bottom-28 ${
        isFa ? "right-4 sm:right-8" : "left-4 sm:left-8"
      } z-40 w-full max-w-[450px] pointer-events-auto flex flex-col`}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={`${activeCell.col}-${activeCell.row}`}
          initial={{ opacity: 0, y: 14, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.97 }}
          transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
          className="w-full h-full bg-[#0c0c0e]/96 backdrop-blur-2xl rounded-2xl p-5 sm:p-6 border border-gold/40 shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_25px_rgba(212,175,55,0.15)] flex flex-col justify-between overflow-hidden"
        >
          {/* Scrollable Content Container */}
          <div className="overflow-y-auto pr-1 -mr-1 custom-scrollbar flex-1 pb-4">
            {/* Pop-up Top Bar */}
            <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-gold/25">
              {/* Column Info */}
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-lg bg-gold/15 border border-gold/30 flex items-center justify-center text-base text-gold shadow-sm">
                  {column.icon}
                </span>
                <div>
                  <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-gold font-bold">
                    {isFa ? "ستون شطرنج" : "CHESS FILE"}
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-ivory">
                    {FILE_LABELS[activeCell.col]} · {column.label[locale]}
                  </div>
                </div>
              </div>

              {/* Square Coordinate Badge & Close Button */}
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs sm:text-sm font-extrabold tracking-widest tabular-nums text-onyx bg-gold px-2.5 py-0.5 rounded-md shadow-sm">
                  {FILE_LABELS[activeCell.col]}{RANK_LABELS[activeCell.row]}
                </span>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg text-ivory/60 hover:text-gold hover:bg-gold/10 transition-colors"
                  title={isFa ? "بستن پاپ‌آپ" : "Close"}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {cell ? (
              <article>
                {cell.eyebrow && (
                  <div className="font-mono text-xs tracking-wider uppercase text-gold font-bold mb-1.5">
                    {cell.eyebrow[locale]}
                  </div>
                )}

                <h2
                  className={`text-xl sm:text-2xl font-extrabold text-[#fdfdfd] leading-snug tracking-tight mb-2 ${
                    isFa ? "font-fa" : "font-display"
                  }`}
                >
                  {cell.title[locale]}
                </h2>

                {cell.subtitle && (
                  <div className="text-sm sm:text-base font-semibold text-gold/95 mb-3 leading-normal">
                    {cell.subtitle[locale]}
                  </div>
                )}

                {cell.body && (
                  <p className="text-[14px] sm:text-[15px] leading-relaxed text-[#f0ebe1] font-normal mb-4">
                    {cell.body[locale]}
                  </p>
                )}

                {cell.tags && cell.tags.length > 0 && (
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1.5">
                      {cell.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 text-xs font-mono tracking-wider border border-gold/30 bg-gold/10 text-gold rounded-md font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {cell.meta && (
                  <div className="bg-gold/10 border border-gold/20 rounded-xl p-3 mb-4 flex items-center gap-2 text-xs sm:text-sm font-mono text-[#fdfdfd]/90 font-medium">
                    <span className="text-gold">📌</span>
                    <span>{cell.meta[locale]}</span>
                  </div>
                )}

                {cell.link && (
                  <a
                    href={cell.link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-gold w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 text-xs sm:text-sm font-mono font-semibold rounded-xl shadow-md hover:scale-[1.01] transition-transform"
                  >
                    <span>{cell.link.label[locale]}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </article>
            ) : (
              <div className="py-8 text-center flex flex-col items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center text-2xl text-gold mb-3">
                  ♙
                </div>
                <div className="text-base font-bold text-ivory mb-1">
                  {isFa ? "این خانه خالی است" : "Empty Square"}
                </div>
                <p className="text-xs sm:text-sm leading-relaxed text-ivory/70 max-w-[300px] mb-4">
                  {isFa
                    ? "برای مشاهده سوابق و محتوا، روی یکی از ستون‌های راهنمای پایین (A تا H) کلیک کنید یا مهره را حرکت دهید."
                    : "To inspect resume content, pick any column from the bottom guide (A to H) or move the knight."}
                </p>
                {onSelectColumn && (
                  <div className="flex flex-wrap items-center justify-center gap-1.5">
                    {[0, 1, 2, 4].map((cIdx) => (
                      <button
                        key={cIdx}
                        onClick={() => onSelectColumn(cIdx)}
                        className="px-2.5 py-1 text-xs font-mono border border-gold/30 bg-gold/10 text-gold rounded-lg hover:bg-gold/20 transition-colors"
                      >
                        {COLUMNS[cIdx].icon} {COLUMNS[cIdx].label[locale]}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Pop-up Navigation Footer */}
          <div className="pt-3 border-t border-gold/20 flex items-center justify-between text-xs font-mono">
            <button
              onClick={onPrev}
              className="text-ivory/75 hover:text-gold transition-colors flex items-center gap-1 py-1.5 px-2.5 rounded-lg hover:bg-gold/10"
            >
              {isFa ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronLeft className="w-3.5 h-3.5" />}
              <span>{isFa ? "قبلی" : "Prev"}</span>
            </button>

            <span className="text-[10px] text-gold/60 uppercase tracking-widest hidden sm:inline">
              {isFa ? "کلیدهای جهت‌نما" : "Arrow keys"}
            </span>

            <button
              onClick={onNext}
              className="text-ivory/75 hover:text-gold transition-colors flex items-center gap-1 py-1.5 px-2.5 rounded-lg hover:bg-gold/10"
            >
              <span>{isFa ? "بعدی" : "Next"}</span>
              {isFa ? <ChevronLeft className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

