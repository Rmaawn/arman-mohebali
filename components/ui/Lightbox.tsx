"use client";

import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface LightboxProps {
  images: readonly string[];
  /** Index to open at. `null` keeps the lightbox closed. */
  startIndex: number | null;
  onClose: () => void;
  /** Optional caption per image (same order as `images`). */
  captions?: (string | undefined)[];
}

/**
 * Minimal, full-bleed image lightbox.
 * The image fills the viewport (no chunky black margins), with a crisp
 * gold edge instead of a fuzzy black halo. Supports keyboard (Esc / ← / →),
 * click-to-close on the backdrop, and prev/next when given multiple images.
 */
export function Lightbox({ images, startIndex, onClose, captions }: LightboxProps) {
  const [index, setIndex] = useState(0);
  const open = startIndex !== null;
  const hasMany = images.length > 1;

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

  const caption = captions?.[index];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="lb-overlay"
          dir="ltr"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[80] flex items-center justify-center bg-onyx/95 backdrop-blur-sm cursor-zoom-out"
          onClick={onClose}
        >
          {/* Close */}
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute top-5 right-5 z-10 w-10 h-10 rounded-full flex items-center justify-center text-ivory/70 hover:text-gold transition-colors"
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
              className="absolute left-3 md:left-6 z-10 w-11 h-11 rounded-full flex items-center justify-center text-ivory/70 hover:text-gold transition-colors"
              style={{ background: "rgba(0,0,0,0.45)", backdropFilter: "blur(6px)" }}
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}

          {/* Image */}
          <motion.img
            key={images[index]}
            src={images[index]}
            alt={caption ?? ""}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[78vh] max-w-[82vw] md:max-w-[70vw] w-auto h-auto object-contain rounded-md cursor-default select-none"
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
              className="absolute right-3 md:right-6 z-10 w-11 h-11 rounded-full flex items-center justify-center text-ivory/70 hover:text-gold transition-colors"
              style={{ background: "rgba(0,0,0,0.45)", backdropFilter: "blur(6px)" }}
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}

          {/* Caption */}
          {caption && (
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full text-xs tracking-wide text-ivory/80 font-mono pointer-events-none"
              style={{ background: "rgba(0,0,0,0.45)", backdropFilter: "blur(6px)" }}
            >
              {caption}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
