"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { BookOpen, Presentation, ExternalLink, ArrowUpRight, CalendarDays } from "lucide-react";
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
  const [loaded, setLoaded] = useState(false);
  if (!visible) return null;
  return (
    <button
      onClick={onClick}
      className="relative overflow-hidden rounded-sm group/photo aspect-[4/3] w-full block cursor-pointer"
      style={{ border: "1px solid rgba(212,175,55,0.18)" }}
    >
      {!loaded && <span className="absolute inset-0 seminar-skeleton" aria-hidden="true" />}

      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 640px) 45vw, (max-width: 1280px) 23vw, 300px"
        loading="lazy"
        quality={75}
        onLoad={() => setLoaded(true)}
        onError={() => setVisible(false)}
        className={`object-cover transition-[transform,opacity] duration-700 ease-out group-hover/photo:scale-105 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      />
      <div className="absolute inset-0 bg-onyx/50 opacity-0 group-hover/photo:opacity-100 transition-opacity duration-300 flex items-center justify-center p-1 text-center">
        <span className="text-gold/80 text-[10px] sm:text-xs tracking-[0.2em] uppercase font-mono">
          {alt}
        </span>
      </div>
    </button>
  );
}

export function Publications({ locale, dict }: Props) {
  const [lightbox, setLightbox] = useState<{ s: number; i: number } | null>(null);
  const close = useCallback(() => setLightbox(null), []);
  const { seminars } = resume;
  const activeImages = lightbox !== null ? seminars[lightbox.s].images : [];

  return (
    <section id="publications" className="relative py-20 md:py-32 px-6 md:px-16 max-w-7xl mx-auto space-y-8">
      <SectionHeading icon="♙" label={dict.nav.publications} title={dict.sections.publicationsTitle} />

      {/* ── Seminar blocks ── */}
      {seminars.map((seminar, s) => (
        <motion.div
          key={s}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55 }}
          className="glass premium-card rounded-sm p-5 sm:p-7 md:p-9 mb-6 gold-glow-hover border border-gold/15"
        >
          {/* Header: Label + Date box */}
          <div className="flex flex-wrap items-center gap-3 mb-5">
            <div className="flex items-center gap-2.5">
              <Presentation className="w-5 h-5 text-gold/70" />
              <span className="text-xs tracking-[0.3em] uppercase text-gold/70 font-mono">
                {locale === "fa" ? "سمینار" : "Seminar"}
              </span>
            </div>

            {/* Date box */}
            {seminar.date?.[locale] && (
              <div
                className="flex items-center gap-2 rounded-sm px-3 py-1.5 bg-gold/[0.06] border border-gold/20"
              >
                <CalendarDays className="w-3.5 h-3.5 text-gold/70 shrink-0" />
                <div className="leading-tight">
                  <div className="text-[9px] sm:text-[10px] tracking-[0.2em] uppercase text-gold/50 font-mono">
                    {locale === "fa" ? "تاریخ" : "Date"}
                  </div>
                  <div className="text-xs sm:text-sm text-ivory/90 font-mono whitespace-nowrap">
                    {seminar.date[locale]}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Title + subtitle */}
          <h3 className="text-xl sm:text-2xl md:text-3xl text-ivory mb-2 font-bold leading-snug">
            {seminar.title[locale]}
          </h3>
          {seminar.subtitle?.[locale] && (
            <p className="text-gold/70 text-xs sm:text-sm font-mono leading-relaxed mb-4">
              {seminar.subtitle[locale]}
            </p>
          )}

          {/* Description */}
          <p className="text-ivory/60 text-xs sm:text-sm leading-relaxed max-w-3xl mb-5">
            {seminar.description[locale]}
          </p>

          {/* Topics */}
          {seminar.topics && seminar.topics.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6 sm:mb-7">
              {seminar.topics.map((t, ti) => (
                <span
                  key={ti}
                  className="text-[11px] sm:text-xs text-ivory/70 rounded-full px-2.5 sm:px-3 py-1 bg-ivory/[0.04] border border-gold/20"
                >
                  {t[locale]}
                </span>
              ))}
            </div>
          )}

          {/* Photo grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
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
                  onClick={() => setLightbox({ s, i })}
                />
              </motion.div>
            ))}
          </div>

          {/* Bottom Action Footer for University Link */}
          <div className="mt-6 pt-5 border-t border-gold/15 flex items-center justify-between flex-wrap gap-3">
            <span className="text-xs font-mono text-ivory/50">
              {locale === "fa"
                ? "خبر رسمی و پوشش رسانه‌ای سمینار"
                : "Official coverage & media report"}
            </span>

            {seminar.link ? (
              <a
                href={seminar.link}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-xs tracking-[0.15em] uppercase font-mono text-gold/90 hover:text-gold border border-gold/30 hover:border-gold/60 rounded-full px-5 py-2 bg-gold/5 hover:bg-gold/15 transition-all shadow-sm group/btn"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>{locale === "fa" ? "خبر در سایت دانشگاه" : "Read on university site"}</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-gold/60 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
              </a>
            ) : (
              <span
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-xs tracking-[0.15em] uppercase font-mono text-gold/40 border border-gold/15 rounded-full px-5 py-2 cursor-default select-none"
                title={locale === "fa" ? "لینک خبر هنوز ثبت نشده" : "Link not set yet"}
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>{locale === "fa" ? "خبر در سایت دانشگاه" : "Read on university site"}</span>
              </span>
            )}
          </div>
        </motion.div>
      ))}

      {/* ── Articles sub-heading ── */}
      <div className="flex items-center gap-3 mt-12 mb-6">
        <BookOpen className="w-5 h-5 text-gold/70" />
        <span className="text-xs tracking-[0.3em] uppercase text-gold/70 font-mono">
          {locale === "fa" ? "مقالات" : "Articles"}
        </span>
        <div className="flex-1 h-px bg-gold/15" />
      </div>

      {/* ── Publications grid ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
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
            className="glass premium-card rounded-sm p-5 sm:p-6 gold-glow-hover group relative block cursor-pointer border border-gold/15"
          >
            <div className="absolute top-4 end-4 text-3xl text-gold/20 group-hover:text-gold/40 transition-colors">
              ♙
            </div>

            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="w-4 h-4 text-gold/60" />
              <span className="text-xs tracking-[0.25em] uppercase text-gold/70 font-mono">
                {pub.publisher}
              </span>
            </div>

            <h3 className="text-base sm:text-lg font-bold text-ivory leading-snug">
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

      {/* Lightbox */}
      <Lightbox
        images={activeImages}
        captions={activeImages.map((_, i) =>
          locale === "fa" ? `تصویر ${i + 1} از ${activeImages.length}` : `Photo ${i + 1} of ${activeImages.length}`
        )}
        startIndex={lightbox !== null ? lightbox.i : null}
        onClose={close}
      />
    </section>
  );
}
