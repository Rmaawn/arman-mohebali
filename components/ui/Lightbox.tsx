"use client";

import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface LightboxProps {
  images: readonly string[];
  /** Index to open at. `null` keeps the lightbox closed. */
  startIndex: number | null;
  onClose: () => void;
  /** Optional caption per image (same order as `images`). */
  captions?: (React.ReactNode | string | undefined)[];
}

/**
 * Minimal, full-bleed image lightbox.
 *
 * Rendered through a portal on `document.body` so it is always positioned
 * against the viewport — ancestors with `transform` / `will-change`
 * (e.g. `.premium-card`, animated `motion.div`s) would otherwise capture the
 * `position: fixed` overlay and make it open at the scroll offset.
 *
 * The image fills most of the viewport (minimal margins) with a crisp gold
 * edge. Supports keyboard (Esc / ← / →), click-to-close on the backdrop, and
 * prev/next when given multiple images.
 */
export function Lightbox({ images, startIndex, onClose, captions }: LightboxProps) {
  const [index, setIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  const open = startIndex !== null;
  const hasMany = images.length > 1;

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (startIndex !== null) setIndex(startIndex);
  }, [startIndex]);

  const next = useCallback(
    () => setIndex((i) => (i + 1) % images.length),
    [images.length]
  );
  const prev = useCallback(
    () => setIndex((i) => (i - 1 + images.length) % images.length),
    [images.length]
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, next, prev, onClose]);

  if (!mounted) return null;

  const caption = captions?.[index];

  return (
    <>
      {createPortal(
        <AnimatePresence>
      {open && (
        <motion.div
          key="lb-overlay"
          dir="ltr"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[250] flex items-center justify-center bg-black/90 backdrop-blur-md cursor-zoom-out"
          style={{ touchAction: "manipulation" }}
          onClick={onClose}
        >
          {/* Close */}
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute top-4 right-4 md:top-5 md:right-5 z-20 w-11 h-11 rounded-full flex items-center justify-center text-ivory/70 hover:text-gold transition-colors"
            style={{ background: "rgba(0,0,0,0.45)", backdropFilter: "blur(6px)" }}
          >
            <X className="w-5 h-5" />
          </button>

          {/* Prev */}
          {hasMany && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              aria-label="Previous"
              className="absolute left-2 md:left-5 z-20 w-11 h-11 rounded-full flex items-center justify-center text-ivory/70 hover:text-gold transition-colors"
              style={{ background: "rgba(0,0,0,0.45)", backdropFilter: "blur(6px)" }}
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}

          {/* Image */}
          <motion.img
            key={images[index]}
            src={images[index]}
            alt={typeof caption === "string" ? caption : ""}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="w-auto h-auto max-h-[88dvh] max-w-[92vw] md:max-h-[90dvh] md:max-w-[84vw] object-contain rounded-md cursor-default select-none"
            style={{
              border: "1px solid rgba(212,175,55,0.35)",
              boxShadow: "0 16px 50px rgba(0,0,0,0.5)",
            }}
          />

          {/* Next */}
          {hasMany && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              aria-label="Next"
              className="absolute right-2 md:right-5 z-20 w-11 h-11 rounded-full flex items-center justify-center text-ivory/70 hover:text-gold transition-colors"
              style={{ background: "rgba(0,0,0,0.45)", backdropFilter: "blur(6px)" }}
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}

          {/* Caption */}
          {caption && (
            <div
              className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 max-w-[90vw] md:max-w-2xl px-5 py-3 rounded-md text-center text-xs md:text-sm text-ivory/90 pointer-events-auto shadow-2xl border border-gold/25 backdrop-blur-md bg-black/80 space-y-1 custom-scrollbar max-h-[30vh] overflow-y-auto z-30"
              style={{ backdropFilter: "blur(12px)" }}
              onClick={(e) => e.stopPropagation()}
            >
              {caption}
            </div>
          )}
        </motion.div>
      )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}
