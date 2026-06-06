"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { BookOpen, Presentation, ExternalLink, ArrowUpRight } from "lucide-react";
import { resume } from "@/data/resume";
import type { Locale, UIDict } from "@/data/i18n";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Lightbox } from "@/components/ui/Lightbox";

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
  const [lightbox, setLightbox] = useState<number | null>(null);
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
        <p className="text-ivory/60 text-sm leading-relaxed max-w-2xl mb-5">
          {seminar.description[locale]}
        </p>

        {/* University coverage link */}
        <a
          href={seminar.link || "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 mb-7 text-xs tracking-[0.15em] uppercase font-mono text-gold/80 hover:text-gold border border-gold/30 hover:border-gold/60 rounded-full px-4 py-2 transition-colors"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          {locale === "fa" ? "خبر این رویداد در سایت دانشگاه" : "University coverage of this event"}
        </a>

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
                onClick={() => setLightbox(i)}
              />
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* ── Publications grid ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {resume.publications.map((pub, i) => (
          <motion.a
            key={i}
            href={pub.url || "#"}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.45, delay: i * 0.09 }}
            className="glass premium-card rounded-sm p-6 gold-glow-hover group relative block cursor-pointer"
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

            <div className="mt-4 pt-4 border-t border-ivory/10 flex items-center justify-between gap-2">
              <span className="text-xs tracking-widest uppercase text-gold/70 group-hover:text-gold font-mono transition-colors">
                {locale === "fa" ? "مشاهده در سیویلیکا" : "View on CIVILICA"}
              </span>
              <ArrowUpRight className="w-4 h-4 text-gold/60 group-hover:text-gold group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </div>
          </motion.a>
        ))}
      </div>

      {/* ── Lightbox ── */}
      <Lightbox
        images={seminar.images}
        captions={seminar.images.map((_, i) =>
          locale === "fa" ? `تصویر ${i + 1} از ${seminar.images.length}` : `Photo ${i + 1} of ${seminar.images.length}`
        )}
        startIndex={lightbox}
        onClose={close}
      />
    </section>
  );
}
