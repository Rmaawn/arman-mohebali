"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Presentation, X } from "lucide-react";
import { resume } from "@/data/resume";
import type { Locale, UIDict } from "@/data/i18n";
import { SectionHeading } from "@/components/ui/SectionHeading";

interface Props {
  locale: Locale;
  dict: UIDict;
}

function SeminarPhoto({ src, alt, onClick }: { src: string; alt: string; onClick: () => void }) {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;
  return (
    <button
      onClick={onClick}
      className="relative overflow-hidden rounded-sm group/photo aspect-[4/3] w-full block"
      style={{ border: "1px solid rgba(212,175,55,0.18)" }}
    >
      <img
        src={src}
        alt={alt}
        onError={() => setVisible(false)}
        className="w-full h-full object-cover transition-transform duration-500 group-hover/photo:scale-105"
      />
      <div className="absolute inset-0 bg-onyx/50 opacity-0 group-hover/photo:opacity-100 transition-opacity duration-300 flex items-center justify-center">
        <span className="text-gold/80 text-xs tracking-[0.25em] uppercase font-mono">
          {alt}
        </span>
      </div>
    </button>
  );
}

export function Publications({ locale, dict }: Props) {
  const [lightbox, setLightbox] = useState<string | null>(null);
  const close = useCallback(() => setLightbox(null), []);
  const { seminar } = resume;

  return (
    <section id="publications" className="relative py-20 md:py-32 px-6 md:px-16 max-w-7xl mx-auto">
      <SectionHeading icon="♙" label={dict.nav.publications} title={dict.sections.publicationsTitle} />

      {/* ── Seminar block ── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.55 }}
        className="glass premium-card rounded-sm p-7 md:p-9 mb-6 gold-glow-hover"
      >
        {/* Label */}
        <div className="flex items-center gap-3 mb-5">
          <Presentation className="w-5 h-5 text-gold/70" />
          <span className="text-xs tracking-[0.3em] uppercase text-gold/70 font-mono">
            {locale === "fa" ? "سمینار" : "Seminar"}
          </span>
        </div>

        {/* Title + description */}
        <h3 className="section-heading text-2xl md:text-3xl text-ivory mb-3">
          {seminar.title[locale]}
        </h3>
        <p className="text-ivory/60 text-sm leading-relaxed max-w-2xl mb-7">
          {seminar.description[locale]}
        </p>

        {/* Photo grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {seminar.images.map((src, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <SeminarPhoto
                src={src}
                alt={locale === "fa" ? `تصویر ${i + 1}` : `Photo ${i + 1}`}
                onClick={() => setLightbox(src)}
              />
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* ── Publications grid ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {resume.publications.map((pub, i) => (
          <motion.article
            key={i}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.45, delay: i * 0.09 }}
            className="glass premium-card rounded-sm p-6 gold-glow-hover group relative"
          >
            <div className="absolute top-4 right-4 text-3xl text-gold/20 group-hover:text-gold/40 transition-colors">
              ♙
            </div>

            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="w-4 h-4 text-gold/60" />
              <span className="text-xs tracking-[0.25em] uppercase text-gold/70 font-mono">
                {pub.publisher}
              </span>
            </div>

            <h3 className="text-lg font-display text-ivory leading-snug">
              {pub.title[locale]}
            </h3>

            <div className="mt-4 pt-4 border-t border-ivory/10 text-xs tracking-widest uppercase text-ivory/40">
              {locale === "fa" ? "مقاله علمی" : "Research Paper"}
            </div>
          </motion.article>
        ))}
      </div>

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-6 bg-black/85 backdrop-blur-md"
            onClick={close}
          >
            <motion.div
              key="panel"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
              className="relative max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={close}
                aria-label="Close"
                className="absolute -top-10 right-0 text-ivory/40 hover:text-gold transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <div
                className="rounded-sm flex items-center justify-center"
                style={{
                  border: "1px solid rgba(212,175,55,0.3)",
                  boxShadow: "0 0 0 1px rgba(212,175,55,0.1), 0 40px 100px rgba(0,0,0,0.8)",
                }}
              >
                <img
                  src={lightbox}
                  alt="Seminar"
                  className="block max-h-[85vh] max-w-full w-auto h-auto"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
