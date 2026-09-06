"use client";

import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  X,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Layers,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import type { Locale, UIDict } from "@/data/i18n";

export interface ProjectData {
  readonly brand: string;
  readonly name: string;
  readonly year: string;
  readonly date?: {
    readonly en: string;
    readonly fa: string;
  };
  readonly status: string;
  readonly vibeCoding?: boolean;
  readonly link?: string;
  readonly image?: string;
  readonly images?: readonly string[];
  readonly technologies?: readonly string[];
  readonly description: {
    readonly en: string;
    readonly fa: string;
  };
  readonly details: {
    readonly en: string;
    readonly fa: string;
  };
  readonly highlights?: {
    readonly en: readonly string[];
    readonly fa: readonly string[];
  };
}

interface ProjectModalProps {
  project: ProjectData | null;
  onClose: () => void;
  locale: Locale;
  dict: UIDict;
}

export function ProjectModal({ project, onClose, locale, dict }: ProjectModalProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [imageError, setImageError] = useState<Record<number, boolean>>({});

  const isOpen = project !== null;
  const isRtl = locale === "fa";

  useEffect(() => {
    setMounted(true);
  }, []);

  // Reset image index when a new project opens
  useEffect(() => {
    if (project) {
      setActiveImageIndex(0);
      setImageError({});
    }
  }, [project]);

  const images = project?.images && project.images.length > 0
    ? project.images
    : project?.image
    ? [project.image]
    : [];

  const nextImage = useCallback(() => {
    if (images.length <= 1) return;
    setActiveImageIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const prevImage = useCallback(() => {
    if (images.length <= 1) return;
    setActiveImageIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  // Keyboard navigation & body scroll lock
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowRight") {
        if (isRtl) prevImage();
        else nextImage();
      } else if (e.key === "ArrowLeft") {
        if (isRtl) nextImage();
        else prevImage();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen, onClose, nextImage, prevImage, isRtl]);

  if (!mounted) return null;

  return (
    <>
      {createPortal(
        <AnimatePresence>
          {isOpen && project && (
            <motion.div
              key="project-modal-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
              className="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-5 md:p-8 bg-onyx/85 backdrop-blur-md cursor-zoom-out"
              onClick={onClose}
              dir={isRtl ? "rtl" : "ltr"}
            >
              <motion.div
                key="project-modal-card"
                initial={{ opacity: 0, scale: 0.94, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.94, y: 16 }}
                transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                onClick={(e) => e.stopPropagation()}
                data-lenis-prevent
                className="relative w-full max-w-3xl max-h-[92vh] md:max-h-[88vh] flex flex-col glass premium-card rounded-md overflow-hidden cursor-default shadow-2xl border border-gold/25"
                style={{
                  background: "radial-gradient(ellipse at top, rgba(26,26,28,0.98), rgba(12,12,14,0.98))",
                }}
              >
                {/* ── Top Bar ── */}
                <div className="flex items-center justify-between px-5 sm:px-7 py-4 border-b border-gold/15 bg-onyx/40 backdrop-blur-sm shrink-0">
                  <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap">
                    <span className="text-xl text-gold/80 font-serif select-none">♖</span>
                    <span className="text-xs font-mono uppercase tracking-widest text-gold/70">
                      {project.brand}
                    </span>
                    <span className="text-ivory/20">/</span>
                    <span className="text-xs font-mono uppercase tracking-widest text-ivory/60">
                      {project.name}
                    </span>
                    {project.status && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-gold/15 border border-gold/30 text-gold text-[11px] font-mono tracking-wider">
                        <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
                        {dict.misc.live}
                      </span>
                    )}
                  </div>

                  {/* Close button */}
                  <button
                    onClick={onClose}
                    aria-label={isRtl ? "بستن" : "Close"}
                    className="w-9 h-9 rounded-full flex items-center justify-center text-ivory/60 hover:text-gold hover:bg-gold/10 transition-colors shrink-0"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* ── Scrollable Body ── */}
                <div className="overflow-y-auto p-5 sm:p-7 space-y-6 flex-1 custom-scrollbar">
                  {/* Gallery View */}
                  {images.length > 0 && (
                    <div className="space-y-2.5">
                      <div className="relative aspect-[16/9] w-full rounded-sm overflow-hidden bg-onyx-100 border border-gold/20 flex items-center justify-center select-none group">
                        {!imageError[activeImageIndex] ? (
                          <Image
                            src={images[activeImageIndex]}
                            alt={`${project.name} preview ${activeImageIndex + 1}`}
                            fill
                            sizes="(max-width: 768px) 95vw, 750px"
                            priority
                            className="object-cover"
                            onError={() =>
                              setImageError((prev) => ({ ...prev, [activeImageIndex]: true }))
                            }
                          />
                        ) : (
                          <div className="flex flex-col items-center justify-center p-6 text-center space-y-2">
                            <span className="text-6xl text-gold/40">♖</span>
                            <span className="text-sm font-display text-ivory/80">
                              {project.name}
                            </span>
                          </div>
                        )}

                        {/* Prev / Next controls */}
                        {images.length > 1 && (
                          <>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                prevImage();
                              }}
                              aria-label="Previous image"
                              className="absolute left-2.5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center text-ivory/80 hover:text-gold bg-onyx/75 backdrop-blur-sm border border-gold/25 transition-all opacity-85 group-hover:opacity-100"
                            >
                              <ChevronLeft className="w-5 h-5" />
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                nextImage();
                              }}
                              aria-label="Next image"
                              className="absolute right-2.5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center text-ivory/80 hover:text-gold bg-onyx/75 backdrop-blur-sm border border-gold/25 transition-all opacity-85 group-hover:opacity-100"
                            >
                              <ChevronRight className="w-5 h-5" />
                            </button>

                            {/* Counter pill */}
                            <div className="absolute bottom-2.5 right-3 px-2.5 py-1 rounded-sm bg-onyx/85 backdrop-blur-sm border border-gold/20 text-[11px] font-mono text-ivory/80 tracking-wider">
                              {activeImageIndex + 1} / {images.length}
                            </div>
                          </>
                        )}
                      </div>

                      {/* Thumbnail strip */}
                      {images.length > 1 && (
                        <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-0.5">
                          {images.map((img, idx) => (
                            <button
                              key={idx}
                              onClick={() => setActiveImageIndex(idx)}
                              className={`relative w-16 h-11 rounded-sm overflow-hidden border transition-all shrink-0 ${
                                activeImageIndex === idx
                                  ? "border-gold ring-1 ring-gold/40 scale-105"
                                  : "border-gold/20 opacity-60 hover:opacity-100"
                              }`}
                            >
                              <Image
                                src={img}
                                alt={`Thumb ${idx + 1}`}
                                fill
                                sizes="64px"
                                className="object-cover"
                              />
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* ── Title & Meta Info ── */}
                  <div className="space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2.5">
                      <div className="flex flex-wrap items-center gap-2.5">
                        <h2 className="text-2xl sm:text-3xl font-display text-ivory">
                          {project.brand} · {project.name}
                        </h2>

                        {/* Vibe Coding Badge */}
                        {project.vibeCoding && (
                          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-sm text-xs font-mono font-medium bg-gradient-to-r from-violet-950/80 via-purple-900/60 to-onyx border border-violet-400/40 text-violet-300 shadow-[0_0_14px_rgba(168,85,247,0.25)]">
                            <Sparkles className="w-3.5 h-3.5 text-violet-400 animate-pulse" />
                            <span>{dict.misc.vibeCoding}</span>
                          </div>
                        )}
                      </div>

                      {/* Creation date */}
                      <div className="flex items-center gap-1.5 text-xs text-gold/80 font-mono bg-gold/[0.08] px-3 py-1 rounded-sm border border-gold/20">
                        <Calendar className="w-3.5 h-3.5 text-gold/70" />
                        <span>
                          {project.date ? project.date[locale] : `${project.year}`}
                        </span>
                      </div>
                    </div>

                    {/* Vibe Coding explanatory note */}
                    {project.vibeCoding && (
                      <div className="flex items-start sm:items-center gap-2.5 p-3 rounded-sm bg-gradient-to-r from-violet-950/40 via-purple-900/20 to-onyx border border-violet-400/30 text-xs font-mono text-violet-200/90 leading-relaxed">
                        <Sparkles className="w-4 h-4 text-violet-400 shrink-0 mt-0.5 sm:mt-0 animate-pulse" />
                        <span>{dict.misc.vibeCodingDesc}</span>
                      </div>
                    )}

                    {/* Main description */}
                    <p className="text-ivory/80 text-sm sm:text-base leading-relaxed">
                      {project.description[locale]}
                    </p>
                    {project.details && (
                      <p className="text-ivory/55 text-xs sm:text-sm leading-relaxed">
                        {project.details[locale]}
                      </p>
                    )}
                  </div>

                  {/* ── Technologies Used ── */}
                  {project.technologies && project.technologies.length > 0 && (
                    <div className="space-y-2.5 pt-1">
                      <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-gold/85">
                        <Layers className="w-3.5 h-3.5 text-gold" />
                        <span>
                          {locale === "fa" ? "تکنولوژی‌ها و ابزارهای به‌کاررفته" : "Technologies & Stack"}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, idx) => (
                          <span
                            key={idx}
                            className="px-2.5 py-1 text-xs font-mono rounded-sm bg-gold/[0.07] border border-gold/25 text-ivory/90 hover:border-gold/50 transition-colors"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* ── Key Highlights ── */}
                  {project.highlights && project.highlights[locale] && (
                    <div className="space-y-2.5 pt-1">
                      <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-gold/85">
                        <Sparkles className="w-3.5 h-3.5 text-gold" />
                        <span>
                          {locale === "fa" ? "ویژگی‌های کلیدی و برجسته" : "Key Highlights"}
                        </span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {project.highlights[locale].map((point, idx) => (
                          <div
                            key={idx}
                            className="flex items-start gap-2.5 p-2.5 rounded-sm bg-onyx-50/40 border border-gold/15 text-xs text-ivory/75 leading-relaxed"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 text-gold shrink-0 mt-0.5" />
                            <span>{point}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* ── Footer Actions ── */}
                <div className="flex items-center justify-between gap-3 px-5 sm:px-7 py-4 border-t border-gold/15 bg-onyx/40 backdrop-blur-sm shrink-0">
                  <button
                    onClick={onClose}
                    className="px-4 py-2 text-xs sm:text-sm font-mono tracking-wider rounded-sm text-ivory/70 hover:text-gold border border-gold/25 hover:border-gold/50 transition-colors"
                  >
                    {locale === "fa" ? "بستن" : "Close"}
                  </button>

                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2 text-xs sm:text-sm font-medium rounded-sm bg-gold text-onyx hover:bg-gold-50 transition-all shadow-md active:scale-95 select-none"
                    >
                      <span>
                        {locale === "fa" ? "ورود به لینک پروژه" : "Visit Project Link"}
                      </span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}
