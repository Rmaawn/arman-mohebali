"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ExternalLink, ChevronRight, ChevronLeft, ChevronUp, ChevronDown } from "lucide-react";
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
  const [isDesktop, setIsDesktop] = useState(false);
  const [isMinimizedMobile, setIsMinimizedMobile] = useState(false);

  const column = COLUMNS[activeCell.col];
  const cell = column.cells[activeCell.row];
  const isFa = locale === "fa";
  const isQueen = activeCell.row === 0;

  // Track desktop breakpoint (1024px) for layout switching
  useEffect(() => {
    const checkIsDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    checkIsDesktop();
    window.addEventListener("resize", checkIsDesktop);
    return () => window.removeEventListener("resize", checkIsDesktop);
  }, []);

  // When active cell changes on desktop, ensure open
  useEffect(() => {
    setIsOpen(true);
  }, [activeCell.col, activeCell.row]);

  // -------------------------------------------------------------
  // Content Sub-renderer (Shared Article Content)
  // -------------------------------------------------------------
  const renderArticleContent = () => (
    <>
      {cell ? (
        <article className="select-text space-y-2">
          {cell.eyebrow && (
            <div className="font-mono text-[11px] sm:text-xs tracking-wider uppercase text-gold font-bold">
              {cell.eyebrow[locale]}
            </div>
          )}

          <h2
            className={`text-base sm:text-2xl font-extrabold text-[#fdfdfd] leading-snug tracking-tight ${
              isFa ? "font-fa" : "font-display"
            }`}
          >
            {cell.title[locale]}
          </h2>

          {cell.subtitle && (
            <div className="text-xs sm:text-sm font-semibold text-gold/90 leading-normal">
              {cell.subtitle[locale]}
            </div>
          )}

          {cell.body && (
            <p className="text-[12.5px] sm:text-[14.5px] leading-relaxed text-[#f0ebe1] font-normal">
              {cell.body[locale]}
            </p>
          )}

          {cell.tags && cell.tags.length > 0 && (
            <div className="pt-1">
              <div className="flex flex-wrap gap-1 sm:gap-1.5">
                {cell.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 text-[10px] sm:text-xs font-mono tracking-wider border border-gold/30 bg-gold/10 text-gold rounded-md font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {cell.meta && (
            <div className="bg-gold/10 border border-gold/20 rounded-lg sm:rounded-xl p-2 sm:p-2.5 flex items-center gap-2 text-[11px] sm:text-xs font-mono text-[#fdfdfd]/90 font-medium">
              <span className="text-gold shrink-0">📌</span>
              <span className="truncate">{cell.meta[locale]}</span>
            </div>
          )}

          {cell.link && (
            <div className="pt-1">
              <a
                href={cell.link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold w-full inline-flex items-center justify-center gap-2 py-2 px-3 text-xs sm:text-sm font-mono font-semibold rounded-xl shadow-md hover:scale-[1.01] active:scale-95 transition-transform"
              >
                <span>{cell.link.label[locale]}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          )}
        </article>
      ) : (
        <div className="py-3 sm:py-6 text-center flex flex-col items-center justify-center">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center text-base sm:text-lg text-gold mb-1.5">
            ♙
          </div>
          <div className="text-xs sm:text-sm font-bold text-ivory mb-0.5">
            {isFa ? "این خانه خالی است" : "Empty Square"}
          </div>
          <p className="text-[11px] sm:text-xs leading-relaxed text-ivory/70 max-w-[260px] mb-2">
            {isFa
              ? "برای مشاهده محتوا، یکی از ستون‌های راهنمای پایین را انتخاب کنید یا مهره را جابجا کنید."
              : "To inspect resume content, pick any column below or move the knight."}
          </p>
          {onSelectColumn && (
            <div className="flex flex-wrap items-center justify-center gap-1 sm:gap-1.5">
              {[0, 1, 2, 4].map((cIdx) => (
                <button
                  key={cIdx}
                  onClick={() => onSelectColumn(cIdx)}
                  className="px-2 py-0.5 text-[10px] sm:text-xs font-mono border border-gold/30 bg-gold/10 text-gold rounded-lg hover:bg-gold/20 active:scale-95 transition-all"
                >
                  {COLUMNS[cIdx].icon} {COLUMNS[cIdx].label[locale]}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );

  // -------------------------------------------------------------
  // DESKTOP LAYOUT (>= 1024px) - Side Panel
  // -------------------------------------------------------------
  if (isDesktop) {
    if (!isOpen) {
      return (
        <button
          onClick={() => setIsOpen(true)}
          className={`fixed top-24 ${
            isFa ? "right-8" : "left-8"
          } z-40 group inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-[#0c0c0e]/95 border border-gold/40 text-gold shadow-[0_10px_30px_rgba(0,0,0,0.8),0_0_15px_rgba(212,175,55,0.2)] hover:border-gold hover:scale-105 transition-all`}
        >
          <span className="text-base">{isQueen ? "👑" : "♙"}</span>
          <span className="font-mono text-xs font-bold tracking-wider uppercase text-ivory">
            {isFa ? "مشاهده توضیحات خانه" : "Inspect Square"} [{FILE_LABELS[activeCell.col]}{RANK_LABELS[activeCell.row]}]
          </span>
          <span className="text-gold text-xs">▼</span>
        </button>
      );
    }

    return (
      <div
        className={`fixed top-20 bottom-24 ${
          isFa ? "right-6 xl:right-8" : "left-6 xl:left-8"
        } z-40 w-[420px] max-w-[calc(100vw-3rem)] pointer-events-auto flex flex-col`}
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
              {/* Promotion Notification Banner */}
              {isQueen && (
                <div className="mb-3.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-500/20 via-gold/30 to-amber-500/20 border border-gold/60 flex items-center justify-between text-xs font-mono font-bold text-gold shadow-md">
                  <span className="flex items-center gap-2">
                    <span className="text-base animate-bounce">👑</span>
                    <span>{isFa ? "ارتقای سرباز به وزیر!" : "Pawn Promoted to Queen!"}</span>
                  </span>
                  <span className="text-[10px] tracking-widest uppercase bg-gold/20 px-2 py-0.5 rounded border border-gold/40 text-ivory">
                    RANK 8
                  </span>
                </div>
              )}

              {/* Header Info */}
              <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-gold/25">
                <div className="flex items-center gap-2.5">
                  <span className="w-8 h-8 rounded-lg bg-gold/15 border border-gold/30 flex items-center justify-center text-base text-gold shadow-sm shrink-0">
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

                <div className="flex items-center gap-2 shrink-0">
                  <span className="font-mono text-xs sm:text-sm font-extrabold tracking-widest tabular-nums text-onyx bg-gold px-2.5 py-0.5 rounded-md shadow-sm">
                    {FILE_LABELS[activeCell.col]}{RANK_LABELS[activeCell.row]}
                  </span>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-1.5 rounded-lg text-ivory/60 hover:text-gold hover:bg-gold/10 active:scale-95 transition-colors"
                    title={isFa ? "بستن پنل" : "Close panel"}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {renderArticleContent()}
            </div>

            {/* Navigation Footer */}
            <div className="pt-3 border-t border-gold/20 flex items-center justify-between text-xs font-mono shrink-0">
              <button
                onClick={onPrev}
                className="text-ivory/75 hover:text-gold transition-colors flex items-center gap-1 py-1.5 px-2.5 rounded-lg hover:bg-gold/10 active:scale-95"
              >
                {isFa ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronLeft className="w-3.5 h-3.5" />}
                <span>{isFa ? "قبلی" : "Prev"}</span>
              </button>

              <span className="text-[10px] text-gold/60 uppercase tracking-widest hidden sm:inline">
                {isFa ? "کلیدهای جهت‌نما" : "Arrow keys"}
              </span>

              <button
                onClick={onNext}
                className="text-ivory/75 hover:text-gold transition-colors flex items-center gap-1 py-1.5 px-2.5 rounded-lg hover:bg-gold/10 active:scale-95"
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

  // -------------------------------------------------------------
  // MOBILE / TABLET LAYOUT (< 1024px)
  // Perfectly positioned ABOVE the 3D board so both are simultaneously visible!
  // -------------------------------------------------------------

  // Minimized Single-line Pill (if user explicitly chooses to minimize)
  if (isMinimizedMobile) {
    return (
      <div className="fixed top-14 sm:top-16 inset-x-2 sm:inset-x-4 z-40 max-w-xl mx-auto pointer-events-auto">
        <button
          onClick={() => setIsMinimizedMobile(false)}
          className="w-full bg-[#0c0c0e]/95 backdrop-blur-xl border border-gold/45 rounded-xl px-3 py-2 text-gold shadow-lg flex items-center justify-between text-xs font-mono group active:scale-98 transition-all"
        >
          <div className="flex items-center gap-2 truncate">
            <span className="font-extrabold px-1.5 py-0.5 rounded bg-gold text-onyx shadow-sm text-[11px] shrink-0">
              {FILE_LABELS[activeCell.col]}{RANK_LABELS[activeCell.row]}
            </span>
            <span className="shrink-0">{column.icon}</span>
            <span className="text-ivory font-bold truncate">
              {cell ? cell.title[locale] : isFa ? "خانه خالی" : "Empty Square"}
            </span>
          </div>

          <div className="flex items-center gap-1 text-gold/80 group-hover:text-gold shrink-0">
            <span className="text-[10px] tracking-wider uppercase font-semibold">
              {isFa ? "نمایش کامل" : "Expand"}
            </span>
            <ChevronDown className="w-3.5 h-3.5" />
          </div>
        </button>
      </div>
    );
  }

  // Full Cell Info Box Displayed Above the 3D Chessboard
  return (
    <div className="fixed top-14 sm:top-16 inset-x-2 sm:inset-x-4 z-40 max-w-xl mx-auto pointer-events-auto">
      <AnimatePresence mode="wait">
        <motion.div
          key={`mobile-cell-${activeCell.col}-${activeCell.row}`}
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.18 }}
          className="w-full bg-[#0c0c0e]/95 backdrop-blur-2xl rounded-2xl border border-gold/45 shadow-[0_12px_36px_rgba(0,0,0,0.85),0_0_20px_rgba(212,175,55,0.18)] flex flex-col overflow-hidden"
        >
          {/* Card Top Control Header */}
          <div className="px-3.5 py-2 border-b border-gold/20 flex items-center justify-between gap-2 shrink-0 bg-gold/5">
            {/* Coordinate & Column Title */}
            <div className="flex items-center gap-2 truncate">
              <span className="font-mono text-xs font-extrabold px-2 py-0.5 rounded-md bg-gold text-onyx shadow-sm shrink-0">
                {FILE_LABELS[activeCell.col]}{RANK_LABELS[activeCell.row]}
              </span>
              <span className="text-sm shrink-0">{column.icon}</span>
              <span className="font-mono text-xs font-bold text-gold truncate">
                {FILE_LABELS[activeCell.col]} · {column.label[locale]}
              </span>
              {isQueen && (
                <span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-gold border border-gold/40 text-[10px] font-mono font-bold shrink-0">
                  👑 {isFa ? "وزیر" : "QUEEN"}
                </span>
              )}
            </div>

            {/* Header Actions: Prev, Next, Minimize */}
            <div className="flex items-center gap-1 shrink-0">
              <button
                onClick={onPrev}
                className="p-1 rounded-md text-ivory/70 hover:text-gold hover:bg-gold/15 active:scale-90 transition-all"
                title={isFa ? "قبلی" : "Prev"}
                aria-label={isFa ? "خانه قبلی" : "Previous square"}
              >
                {isFa ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
              </button>
              <button
                onClick={onNext}
                className="p-1 rounded-md text-ivory/70 hover:text-gold hover:bg-gold/15 active:scale-90 transition-all"
                title={isFa ? "بعدی" : "Next"}
                aria-label={isFa ? "خانه بعدی" : "Next square"}
              >
                {isFa ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
              </button>
              <button
                onClick={() => setIsMinimizedMobile(true)}
                className="p-1 rounded-md text-ivory/50 hover:text-gold hover:bg-gold/15 active:scale-90 transition-all"
                title={isFa ? "کوچک کردن" : "Minimize"}
                aria-label={isFa ? "کوچک کردن" : "Minimize"}
              >
                <ChevronUp className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Complete Content Section (Scrollable if lengthy, completely visible) */}
          <div className="px-3.5 py-2.5 max-h-[30vh] sm:max-h-[34vh] overflow-y-auto custom-scrollbar">
            {renderArticleContent()}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
