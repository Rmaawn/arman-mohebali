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
      className={`fixed bottom-16 z-30 pointer-events-none flex justify-center ${
        isFa ? "right-4 md:right-12 left-4 md:left-auto" : "left-4 md:left-12 right-4 md:right-auto"
      }`}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={`${activeCell.col}-${activeCell.row}`}
          initial={{ opacity: 0, y: 20, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.96 }}
          transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
          className="pointer-events-auto glass-strong rounded-sm p-6 md:p-7 max-w-md w-full gold-border"
          style={{
            borderColor: "rgba(212,175,55,0.35)",
          }}
        >
          {/* Column tag */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl text-gold">{column.icon}</span>
              <div>
                <div className="font-mono text-[9px] tracking-[0.3em] uppercase text-gold/70">
                  {FILE_LABELS[activeCell.col]} · {column.label[locale]}
                </div>
              </div>
            </div>
            <div className="font-mono text-xs tracking-widest tabular-nums text-ivory/40">
              {FILE_LABELS[activeCell.col]}
              {RANK_LABELS[activeCell.row]}
            </div>
          </div>

          {cell ? (
            <>
              {cell.eyebrow && (
                <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-ivory/45 mb-2">
                  {cell.eyebrow[locale]}
                </div>
              )}

              <h2
                className={`text-2xl md:text-3xl leading-tight mb-2 ${
                  isFa ? "section-heading" : "hero-title"
                }`}
                style={{ color: "var(--ivory)" }}
              >
                <span className="text-gold-gradient">{cell.title[locale]}</span>
              </h2>

              {cell.subtitle && (
                <div className="text-sm text-ivory/70 mb-3">{cell.subtitle[locale]}</div>
              )}

              {cell.body && (
                <p className="text-sm leading-relaxed text-ivory/65 mb-4">{cell.body[locale]}</p>
              )}

              {cell.tags && cell.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {cell.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 text-[11px] font-mono tracking-wider border border-gold/30 text-gold/90 rounded-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {cell.meta && (
                <div className="font-mono text-xs tracking-widest uppercase text-ivory/45 mb-3">
                  {cell.meta[locale]}
                </div>
              )}

              {cell.link && (
                <a
                  href={cell.link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold mt-2"
                >
                  {cell.link.label[locale]}
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </>
          ) : (
            <div className="py-4 text-center">
              <div className="text-4xl text-ivory/15 mb-2">·</div>
              <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-ivory/40">
                {isFa ? "خانهٔ خالی" : "Empty square"}
              </div>
            </div>
          )}

          {/* Footer nav arrows */}
          <div className="mt-5 pt-4 border-t border-ivory/10 flex items-center justify-between">
            <button
              onClick={onPrev}
              className="font-mono text-[10px] tracking-[0.3em] uppercase text-ivory/50 hover:text-gold transition-colors"
            >
              ← {isFa ? "قبلی" : "Prev"}
            </button>
            <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-ivory/30">
              ♞ {isFa ? "اسب طلایی" : "Your knight"}
            </span>
            <button
              onClick={onNext}
              className="font-mono text-[10px] tracking-[0.3em] uppercase text-ivory/50 hover:text-gold transition-colors"
            >
              {isFa ? "بعدی" : "Next"} →
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
