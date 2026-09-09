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
  Maximize2,
} from "lucide-react";
import type { Locale, UIDict } from "@/data/i18n";
import { Lightbox } from "@/components/ui/Lightbox";

export interface ProjectData {
  readonly brand: string | { readonly en: string; readonly fa: string };
  readonly name: string | { readonly en: string; readonly fa: string };
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

export function getLocalized(
  val: string | { readonly en: string; readonly fa: string } | undefined,
  locale: Locale
): string {
  if (!val) return "";
  if (typeof val === "string") return val;
  return val[locale] || val.en || "";
}

interface ProjectModalProps {
  project: ProjectData | null;
  onClose: () => void;
  locale: Locale;
  dict: UIDict;
}

export function ProjectModal({ project, onClose, locale, dict }: ProjectModalProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
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
      setLightboxIndex(null);
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

  // Preload all project images into browser cache for instant 0ms switching
  useEffect(() => {
    if (isOpen && images.length > 0) {
      images.forEach((src) => {
        const img = new window.Image();
        img.src = src;
      });
    }
  }, [isOpen, images]);

  // Keyboard navigation & body scroll lock
  useEffect(() => {
    if (!isOpen || lightboxIndex !== null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowRight") {
        nextImage();
      } else if (e.key === "ArrowLeft") {
        prevImage();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen, lightboxIndex, onClose, nextImage, prevImage]);

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
              className="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-5 md:p-8 bg-black/60 dark:bg-black/80 backdrop-blur-md cursor-zoom-out"
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
                className="relative w-full max-w-3xl max-h-[92vh] md:max-h-[88vh] flex flex-col bg-[#fbf8f1] dark:bg-[#111113] text-ivory rounded-md overflow-hidden cursor-default shadow-2xl border border-gold/30 dark:border-gold/25"
              >
                {/* ── Top Bar ── */}
                <div className="flex items-center justify-between px-5 sm:px-7 py-4 border-b border-gold/15 bg-onyx-100/70 dark:bg-onyx-900/60 backdrop-blur-sm shrink-0">
                  <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap">
                    <span className="text-xl text-gold font-serif select-none">♖</span>
                    <span className="text-xs font-mono uppercase tracking-widest text-gold-700 dark:text-gold/80 font-semibold">
                      {getLocalized(project.brand, locale)}
                    </span>
                    <span className="text-ivory/30">/</span>
                    <span className="text-xs font-mono uppercase tracking-widest text-ivory/75 font-medium">
                      {getLocalized(project.name, locale)}
                    </span>
                    {project.status && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-gold/15 border border-gold/30 text-gold-700 dark:text-gold text-[11px] font-mono tracking-wider font-medium">
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
                    <div className="space-y-3" dir="ltr">
                      <div
                        onClick={() => setLightboxIndex(activeImageIndex)}
                        className="relative w-full h-[280px] sm:h-[380px] md:h-[440px] rounded-sm overflow-hidden bg-stone-950/80 dark:bg-black/90 border border-gold/25 flex items-center justify-center select-none group cursor-pointer shadow-inner"
                      >
                        {!imageError[activeImageIndex] ? (
                          <>
                            {/* Blurred background thumbnail to fill letterbox gracefully */}
                            <Image
                              key={`bg-${images[activeImageIndex]}`}
                              src={images[activeImageIndex]}
                              alt=""
                              fill
                              unoptimized
                              className="object-cover opacity-15 blur-md scale-110 pointer-events-none"
                            />
                            {/* Main uncropped image */}
                            <Image
                              key={`main-${images[activeImageIndex]}`}
                              src={images[activeImageIndex]}
                              alt={`${getLocalized(project.name, locale)} preview ${activeImageIndex + 1}`}
                              fill
                              sizes="(max-width: 768px) 95vw, 850px"
                              priority
                              unoptimized
                              className="object-contain p-2 transition-transform duration-300 group-hover:scale-[1.01]"
                              onError={() =>
                                setImageError((prev) => ({ ...prev, [activeImageIndex]: true }))
                              }
                            />
                          </>
                        ) : (
                          <div className="flex flex-col items-center justify-center p-6 text-center space-y-2">
                            <span className="text-6xl text-gold/40">♖</span>
                            <span className="text-sm font-display text-ivory/80">
                              {getLocalized(project.name, locale)}
                            </span>
                          </div>
                        )}

                        {/* Zoom hint on hover */}
                        <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-black/80 backdrop-blur-md border border-gold/30 text-gold text-xs font-mono opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-md">
                          <Maximize2 className="w-3.5 h-3.5" />
                          <span>{isRtl ? "بزرگ‌نمایی تصویر" : "Click to expand"}</span>
                        </div>

                        {/* Prev / Next controls */}
                        {images.length > 1 && (
                          <>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                prevImage();
                              }}
                              aria-label="Previous image"
                              className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full flex items-center justify-center text-ivory hover:text-gold bg-black/75 backdrop-blur-md border border-gold/30 transition-all opacity-90 group-hover:opacity-100 shadow-lg active:scale-95"
                            >
                              <ChevronLeft className="w-6 h-6" />
                            </button>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                nextImage();
                              }}
                              aria-label="Next image"
                              className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full flex items-center justify-center text-ivory hover:text-gold bg-black/75 backdrop-blur-md border border-gold/30 transition-all opacity-90 group-hover:opacity-100 shadow-lg active:scale-95"
                            >
                              <ChevronRight className="w-6 h-6" />
                            </button>

                            {/* Counter pill */}
                            <div className="absolute bottom-3 left-3 z-20 px-2.5 py-1 rounded-sm bg-black/80 backdrop-blur-md border border-gold/20 text-[11px] font-mono text-ivory/90 tracking-wider">
                              {activeImageIndex + 1} / {images.length}
                            </div>
                          </>
                        )}
                      </div>

                      {/* Thumbnail strip */}
                      {images.length > 1 && (
                        <div className="flex items-center gap-2.5 overflow-x-auto pb-1 pt-0.5 custom-scrollbar">
                          {images.map((img, idx) => (
                            <button
                              key={idx}
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setActiveImageIndex(idx);
                              }}
                              className={`relative w-20 h-14 sm:w-24 sm:h-16 rounded-sm overflow-hidden border transition-all shrink-0 bg-stone-950/80 cursor-pointer ${
                                activeImageIndex === idx
                                  ? "border-gold ring-2 ring-gold/50 opacity-100 scale-105 shadow-md"
                                  : "border-gold/20 opacity-60 hover:opacity-100"
                              }`}
                            >
                              <Image
                                src={img}
                                alt={`Thumb ${idx + 1}`}
                                fill
                                sizes="96px"
                                unoptimized
                                className="object-contain p-0.5"
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
                        <h2 className={`text-2xl sm:text-3xl text-ivory ${isRtl ? "font-fa font-bold" : "font-display"}`}>
                          {getLocalized(project.brand, locale)} · {getLocalized(project.name, locale)}
                        </h2>

                        {/* Vibe Coding Badge */}
                        {project.vibeCoding && (
                          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-sm text-xs font-mono font-medium bg-violet-100 dark:bg-gradient-to-r dark:from-violet-950/80 dark:via-purple-900/60 dark:to-onyx border border-violet-400/40 text-violet-800 dark:text-violet-300 shadow-sm">
                            <Sparkles className="w-3.5 h-3.5 text-violet-600 dark:text-violet-400 animate-pulse" />
                            <span>{dict.misc.vibeCoding}</span>
                          </div>
                        )}
                      </div>

                      {/* Creation date */}
                      <div className="flex items-center gap-1.5 text-xs text-gold-700 dark:text-gold/80 font-mono bg-gold/[0.12] dark:bg-gold/[0.08] px-3 py-1 rounded-sm border border-gold/25">
                        <Calendar className="w-3.5 h-3.5 text-gold-700 dark:text-gold/70" />
                        <span>
                          {project.date ? project.date[locale] : `${project.year}`}
                        </span>
                      </div>
                    </div>

                    {/* Vibe Coding explanatory note */}
                    {project.vibeCoding && (
                      <div className="flex items-start sm:items-center gap-2.5 p-3 rounded-sm bg-violet-500/[0.08] dark:bg-gradient-to-r dark:from-violet-950/40 dark:via-purple-900/20 dark:to-onyx border border-violet-400/30 text-xs font-mono text-violet-900 dark:text-violet-200/90 leading-relaxed">
                        <Sparkles className="w-4 h-4 text-violet-600 dark:text-violet-400 shrink-0 mt-0.5 sm:mt-0 animate-pulse" />
                        <span>{dict.misc.vibeCodingDesc}</span>
                      </div>
                    )}

                    {/* Main description */}
                    <p className="text-ivory/80 text-sm sm:text-base leading-relaxed">
                      {project.description[locale]}
                    </p>
                    {project.details && (
                      <p className="text-ivory/65 dark:text-ivory/55 text-xs sm:text-sm leading-relaxed">
                        {project.details[locale]}
                      </p>
                    )}
                  </div>

                  {/* ── Technologies Used ── */}
                  {project.technologies && project.technologies.length > 0 && (
                    <div className="space-y-2.5 pt-1">
                      <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-gold-700 dark:text-gold/85 font-semibold">
                        <Layers className="w-3.5 h-3.5 text-gold-700 dark:text-gold" />
                        <span>
                          {locale === "fa" ? "تکنولوژی‌ها و ابزارهای به‌کاررفته" : "Technologies & Stack"}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, idx) => (
                          <span
                            key={idx}
                            className="px-2.5 py-1 text-xs font-mono rounded-sm bg-gold/[0.08] dark:bg-gold/[0.07] border border-gold/25 text-ivory/90 hover:border-gold/50 transition-colors"
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
                      <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-gold-700 dark:text-gold/85 font-semibold">
                        <Sparkles className="w-3.5 h-3.5 text-gold-700 dark:text-gold" />
                        <span>
                          {locale === "fa" ? "ویژگی‌های کلیدی و برجسته" : "Key Highlights"}
                        </span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {project.highlights[locale].map((point, idx) => (
                          <div
                            key={idx}
                            className="flex items-start gap-2.5 p-2.5 rounded-sm bg-onyx-100/70 dark:bg-onyx-50/40 border border-gold/15 text-xs text-ivory/80 leading-relaxed shadow-sm"
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
                <div className="flex items-center justify-between gap-3 px-5 sm:px-7 py-4 border-t border-gold/15 bg-onyx-100/70 dark:bg-onyx-900/60 backdrop-blur-sm shrink-0">
                  <button
                    onClick={onClose}
                    className="px-4 py-2 text-xs sm:text-sm font-mono tracking-wider rounded-sm text-ivory/75 hover:text-gold border border-gold/25 hover:border-gold/50 transition-colors"
                  >
                    {locale === "fa" ? "بستن" : "Close"}
                  </button>

                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2 text-xs sm:text-sm font-semibold rounded-sm bg-gold text-stone-950 hover:bg-gold-50 transition-all shadow-md active:scale-95 select-none"
                    >
                      <span>
                        {locale === "fa" ? "ورود به لینک پروژه" : "Visit Project Link"}
                      </span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
                {/* Lightbox for full-bleed fullscreen view */}
                <Lightbox
                  images={images}
                  startIndex={lightboxIndex}
                  onClose={() => setLightboxIndex(null)}
                  captions={images.map((_, idx) => `${getLocalized(project.name, locale)} (${idx + 1} / ${images.length})`)}
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}
