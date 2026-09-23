"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ExternalLink, X, ChevronRight, ChevronLeft, ChevronUp, ChevronDown } from "lucide-react";
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
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

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

  // When active cell changes:
  // Re-open if closed. On mobile, keep current expansion mode (peek stays peek, expanded stays expanded)
  useEffect(() => {
    setIsOpen(true);
  }, [activeCell.col, activeCell.row]);

  // -------------------------------------------------------------
  // Content Body Sub-renderer (Shared between Desktop & Mobile)
  // -------------------------------------------------------------
  const renderContentBody = () => (
    <>
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

        {/* Square Coordinate Badge & Close/Minimize Button */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="font-mono text-xs sm:text-sm font-extrabold tracking-widest tabular-nums text-onyx bg-gold px-2.5 py-0.5 rounded-md shadow-sm">
            {FILE_LABELS[activeCell.col]}{RANK_LABELS[activeCell.row]}
          </span>
          <button
            onClick={() => {
              if (isDesktop) {
                setIsOpen(false);
              } else {
                setIsExpanded(false);
              }
            }}
            className="p-1.5 rounded-lg text-ivory/60 hover:text-gold hover:bg-gold/10 active:scale-95 transition-colors"
            title={isFa ? "بستن" : "Close"}
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {cell ? (
        <article className="select-text">
          {cell.eyebrow && (
            <div className="font-mono text-xs tracking-wider uppercase text-gold font-bold mb-1.5">
              {cell.eyebrow[locale]}
            </div>
          )}

          <h2
            className={`text-lg sm:text-2xl font-extrabold text-[#fdfdfd] leading-snug tracking-tight mb-2 ${
              isFa ? "font-fa" : "font-display"
            }`}
          >
            {cell.title[locale]}
          </h2>

          {cell.subtitle && (
            <div className="text-xs sm:text-base font-semibold text-gold/95 mb-3 leading-normal">
              {cell.subtitle[locale]}
            </div>
          )}

          {cell.body && (
            <p className="text-[13px] sm:text-[15px] leading-relaxed text-[#f0ebe1] font-normal mb-4">
              {cell.body[locale]}
            </p>
          )}

          {cell.tags && cell.tags.length > 0 && (
            <div className="mb-4">
              <div className="flex flex-wrap gap-1.5">
                {cell.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-0.5 sm:py-1 text-[11px] sm:text-xs font-mono tracking-wider border border-gold/30 bg-gold/10 text-gold rounded-md font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {cell.meta && (
            <div className="bg-gold/10 border border-gold/20 rounded-xl p-2.5 sm:p-3 mb-4 flex items-center gap-2 text-xs sm:text-sm font-mono text-[#fdfdfd]/90 font-medium">
              <span className="text-gold">📌</span>
              <span>{cell.meta[locale]}</span>
            </div>
          )}

          {cell.link && (
            <a
              href={cell.link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 text-xs sm:text-sm font-mono font-semibold rounded-xl shadow-md hover:scale-[1.01] active:scale-95 transition-transform"
            >
              <span>{cell.link.label[locale]}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </article>
      ) : (
        <div className="py-6 sm:py-8 text-center flex flex-col items-center justify-center">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center text-xl sm:text-2xl text-gold mb-2 sm:mb-3">
            ♙
          </div>
          <div className="text-sm sm:text-base font-bold text-ivory mb-1">
            {isFa ? "این خانه خالی است" : "Empty Square"}
          </div>
          <p className="text-xs sm:text-sm leading-relaxed text-ivory/70 max-w-[280px] mb-3">
            {isFa
              ? "برای مشاهده سوابق، روی یکی از ستون‌های راهنما کلیک کنید یا مهره را حرکت دهید."
              : "To inspect resume content, pick any column from the bottom guide or move the knight."}
          </p>
          {onSelectColumn && (
            <div className="flex flex-wrap items-center justify-center gap-1.5">
              {[0, 1, 2, 4].map((cIdx) => (
                <button
                  key={cIdx}
                  onClick={() => {
                    onSelectColumn(cIdx);
                    if (!isDesktop) setIsExpanded(false);
                  }}
                  className="px-2.5 py-1 text-xs font-mono border border-gold/30 bg-gold/10 text-gold rounded-lg hover:bg-gold/20 active:scale-95 transition-all"
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
  // DESKTOP LAYOUT (>= 1024px)
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
              {renderContentBody()}
            </div>

            {/* Navigation Footer */}
            <div className="pt-3 border-t border-gold/20 flex items-center justify-between text-xs font-mono">
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
  // -------------------------------------------------------------

  // Minimized Pill (when user closes peek card to enjoy full 3D view)
  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-[74px] sm:bottom-[92px] ${
          isFa ? "right-3 sm:right-6" : "left-3 sm:left-6"
        } z-40 group inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#0c0c0e]/95 border border-gold/45 text-gold shadow-lg hover:border-gold active:scale-95 transition-all`}
      >
        <span className="text-sm">{isQueen ? "👑" : "♙"}</span>
        <span className="font-mono text-xs font-bold tracking-wider uppercase text-ivory">
          [{FILE_LABELS[activeCell.col]}{RANK_LABELS[activeCell.row]}] {isFa ? "مشاهده" : "Inspect"}
        </span>
        <ChevronUp className="w-3.5 h-3.5 text-gold" />
      </button>
    );
  }

  return (
    <>
      {/* ── 1. Compact Peek Card (Docked just above the Bottom HUD) ── */}
      {!isExpanded && (
        <AnimatePresence mode="wait">
          <motion.div
            key={`peek-${activeCell.col}-${activeCell.row}`}
            initial={{ opacity: 0, y: 10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.96 }}
            transition={{ duration: 0.18 }}
            className="fixed bottom-[72px] sm:bottom-[92px] inset-x-2 sm:inset-x-4 z-40 max-w-lg mx-auto pointer-events-auto"
          >
            <div className="w-full bg-[#0c0c0e]/95 backdrop-blur-xl rounded-2xl p-2.5 sm:p-3 border border-gold/45 shadow-[0_12px_36px_rgba(0,0,0,0.85),0_0_20px_rgba(212,175,55,0.2)] flex items-center justify-between gap-2">
              {/* Tap to expand full card */}
              <button
                onClick={() => setIsExpanded(true)}
                className="flex-1 flex items-center gap-2 text-start overflow-hidden group py-0.5"
              >
                {/* Coordinate Badge */}
                <span className="font-mono text-xs font-extrabold px-2 py-1 rounded-md bg-gold text-onyx shadow-sm shrink-0">
                  {FILE_LABELS[activeCell.col]}{RANK_LABELS[activeCell.row]}
                </span>

                <span className="text-base shrink-0">{column.icon}</span>

                <div className="flex-1 min-w-0">
                  <div className="text-[10px] font-mono uppercase text-gold font-bold tracking-wider truncate">
                    {column.label[locale]}
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-ivory truncate group-hover:text-gold transition-colors">
                    {cell ? cell.title[locale] : isFa ? "خانه خالی" : "Empty Square"}
                  </div>
                </div>
              </button>

              {/* Quick Actions */}
              <div className="flex items-center gap-1 shrink-0">
                <button
                  onClick={onPrev}
                  className="p-1.5 rounded-lg text-ivory/70 hover:text-gold hover:bg-gold/10 active:scale-90 transition-all"
                  aria-label={isFa ? "خانه قبلی" : "Previous square"}
                  title={isFa ? "قبلی" : "Prev"}
                >
                  {isFa ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
                </button>
                <button
                  onClick={onNext}
                  className="p-1.5 rounded-lg text-ivory/70 hover:text-gold hover:bg-gold/10 active:scale-90 transition-all"
                  aria-label={isFa ? "خانه بعدی" : "Next square"}
                  title={isFa ? "بعدی" : "Next"}
                >
                  {isFa ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                </button>

                {/* Details Button */}
                <button
                  onClick={() => setIsExpanded(true)}
                  className="px-2.5 py-1 text-xs font-mono font-bold rounded-lg bg-gold/15 text-gold border border-gold/40 hover:bg-gold/25 active:scale-95 transition-all flex items-center gap-1"
                >
                  <span>{isFa ? "جزئیات" : "Details"}</span>
                  <ChevronUp className="w-3 h-3" />
                </button>

                {/* Minimize Button */}
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg text-ivory/50 hover:text-gold hover:bg-gold/10 active:scale-90 transition-all"
                  title={isFa ? "کوچک کردن" : "Minimize"}
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      )}

      {/* ── 2. Expanded Bottom Sheet (Modal with backdrop & drag handle) ── */}
      <AnimatePresence>
        {isExpanded && (
          <>
            {/* Dark glass backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsExpanded(false)}
              className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 pointer-events-auto"
            />

            {/* Bottom Sheet Container */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 280 }}
              className="fixed inset-x-0 bottom-0 z-50 max-h-[84vh] bg-[#0c0c0e]/98 backdrop-blur-2xl rounded-t-3xl border-t border-x border-gold/45 shadow-[0_-15px_45px_rgba(0,0,0,0.9),0_0_30px_rgba(212,175,55,0.25)] flex flex-col pointer-events-auto pb-[max(1rem,env(safe-area-inset-bottom))]"
            >
              {/* Swipe/tap handle indicator */}
              <button
                onClick={() => setIsExpanded(false)}
                className="w-full flex justify-center py-2.5 shrink-0"
                aria-label={isFa ? "بستن جزئیات" : "Collapse details"}
              >
                <span className="w-12 h-1 bg-gold/40 hover:bg-gold/70 rounded-full transition-colors" />
              </button>

              {/* Scrollable Content Container */}
              <div className="overflow-y-auto px-5 sm:px-6 py-1 flex-1 custom-scrollbar">
                {renderContentBody()}
              </div>

              {/* Sheet Navigation Footer */}
              <div className="px-5 sm:px-6 pt-3 mt-1 border-t border-gold/20 flex items-center justify-between text-xs font-mono shrink-0">
                <button
                  onClick={onPrev}
                  className="text-ivory/75 hover:text-gold transition-colors flex items-center gap-1 py-1.5 px-2.5 rounded-lg hover:bg-gold/10 active:scale-95"
                >
                  {isFa ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronLeft className="w-3.5 h-3.5" />}
                  <span>{isFa ? "قبلی" : "Prev"}</span>
                </button>

                <button
                  onClick={() => setIsExpanded(false)}
                  className="text-[11px] font-mono text-gold/80 hover:text-gold py-1 px-2 rounded hover:bg-gold/10 flex items-center gap-1"
                >
                  <span>{isFa ? "بستن صفحه" : "Close"}</span>
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={onNext}
                  className="text-ivory/75 hover:text-gold transition-colors flex items-center gap-1 py-1.5 px-2.5 rounded-lg hover:bg-gold/10 active:scale-95"
                >
                  <span>{isFa ? "بعدی" : "Next"}</span>
                  {isFa ? <ChevronLeft className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
