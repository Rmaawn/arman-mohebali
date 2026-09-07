"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Award, GraduationCap, Expand, ArrowUpRight } from "lucide-react";
import { resume } from "@/data/resume";
import type { Locale, UIDict } from "@/data/i18n";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Lightbox } from "@/components/ui/Lightbox";

interface Props {
  locale: Locale;
  dict: UIDict;
}

function CertCard({
  cert,
  fullIndex,
  locale,
  onClick,
}: {
  cert: (typeof resume.certificates)[number];
  fullIndex: number;
  locale: Locale;
  onClick: () => void;
}) {
  const [imgError, setImgError] = useState(false);
  const issuerLabel = typeof cert.issuer === "string" ? cert.issuer : cert.issuer[locale];
  const isFa = locale === "fa";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45, delay: fullIndex * 0.07 }}
      onClick={onClick}
      className="group glass premium-card rounded-sm overflow-hidden cursor-pointer flex flex-col justify-between border border-gold/15 hover:border-gold/50 gold-glow-hover transition-all duration-300 transform hover:-translate-y-1"
    >
      {/* Thumbnail Top Banner */}
      <div className="relative h-44 w-full bg-onyx-50/50 overflow-hidden border-b border-gold/15">
        <div className="absolute inset-0 chess-bg opacity-20" />

        {cert.image && !imgError ? (
          <img
            src={cert.image}
            alt={cert.title[locale]}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-gold/30 p-4 text-center">
            <span className="text-5xl mb-1 text-gold/45">♗</span>
            <span className="font-mono text-xs font-bold tracking-widest uppercase text-gold/60">
              {issuerLabel}
            </span>
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-onyx via-transparent to-black/30" />

        {/* Issuer Badge */}
        <div className="absolute top-3 start-3 z-10 px-2.5 py-1 rounded-sm bg-onyx/90 backdrop-blur-md border border-gold/30 text-gold text-xs font-mono font-bold tracking-wider flex items-center gap-1.5 shadow-sm">
          <Award className="w-3.5 h-3.5 text-gold" />
          <span>{issuerLabel}</span>
        </div>

        {/* Hover Expand Overlay Button */}
        <div className="absolute inset-0 z-20 bg-onyx/80 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
          <div className="px-3.5 py-1.5 rounded-sm bg-gold text-stone-950 font-mono text-xs font-bold tracking-wider flex items-center gap-1.5 shadow-md transform translate-y-1 group-hover:translate-y-0 transition-transform">
            <Expand className="w-3.5 h-3.5" />
            <span>{isFa ? "مشاهده گواهی" : "Inspect Certificate"}</span>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <h4
            className={`text-xl text-ivory group-hover:text-gold transition-colors leading-snug ${
              isFa ? "font-fa font-bold" : "font-display font-medium"
            }`}
          >
            {cert.title[locale]}
          </h4>
          {"description" in cert && cert.description && (
            <p className="text-ivory/70 text-sm leading-relaxed mt-2.5 line-clamp-3">
              {cert.description[locale]}
            </p>
          )}
        </div>

        {/* Footer Action Hint */}
        <div className="pt-3 border-t border-gold/15 flex items-center justify-between text-xs font-mono text-gold/60 group-hover:text-gold transition-colors">
          <span className="tracking-wider">
            {isFa ? "مشاهده تصویر رزولوشن بالا" : "High-resolution preview"}
          </span>
          <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </div>
      </div>
    </motion.div>
  );
}

export function Education({ locale, dict }: Props) {
  const [selected, setSelected] = useState<number | null>(null);

  const close = useCallback(() => setSelected(null), []);

  const certShots = resume.certificates.flatMap((c, i) => {
    if (!c.image) return [];
    const issuer = typeof c.issuer === "string" ? c.issuer : c.issuer[locale];
    return [{ fullIndex: i, src: c.image, caption: `${issuer} · ${c.title[locale]}` }];
  });

  const isFa = locale === "fa";

  return (
    <section id="education" className="relative py-20 md:py-32 px-6 md:px-16 max-w-7xl mx-auto space-y-12">
      <SectionHeading icon="♗" label={dict.nav.education} title={dict.sections.educationTitle} />

      {/* ── Academic Education Card ──────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.55 }}
        className="w-full"
      >
        <div className="flex items-center gap-3 mb-4">
          <GraduationCap className="w-5 h-5 text-gold" />
          <span className="text-xs font-mono tracking-[0.3em] uppercase text-gold/70">
            {isFa ? "مقطع تحصیلی و آکادمیک" : "Academic Education"}
          </span>
        </div>

        {resume.education.map((edu, i) => (
          <div
            key={i}
            className="glass premium-card rounded-sm p-6 md:p-8 gold-glow-hover flex flex-col md:flex-row md:items-center justify-between gap-6 border border-gold/15"
          >
            <div className="space-y-2">
              <div className="text-xs font-mono tracking-widest text-gold/70 uppercase">
                {edu.period}
              </div>
              <h3 className={`text-2xl md:text-3xl text-ivory ${isFa ? "font-fa font-bold" : "font-display"}`}>
                {edu.degree[locale]}
              </h3>
              <p className="text-ivory/70 text-sm md:text-base">{edu.institution[locale]}</p>
            </div>

            {edu.grade && (
              <div className="flex items-center gap-3 pt-4 md:pt-0 border-t md:border-t-0 border-ivory/10 md:border-s md:ps-8">
                <span className="text-xs font-mono tracking-widest uppercase text-ivory/40">
                  {dict.misc.grade}
                </span>
                <span className="text-3xl font-display text-gold-gradient font-bold">
                  {edu.grade}
                </span>
              </div>
            )}
          </div>
        ))}
      </motion.div>

      {/* ── Certificates Grid Showcase Section ────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.55, delay: 0.1 }}
        className="w-full space-y-6"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Award className="w-5 h-5 text-gold" />
            <span className="text-xs font-mono tracking-[0.3em] uppercase text-gold/70">
              {dict.misc.certifications}
            </span>
          </div>
          <span className="text-xs font-mono text-ivory/40 tracking-wider">
            {resume.certificates.length} {isFa ? "مدرک معتبر" : "Credentials"}
          </span>
        </div>

        {/* Responsive Grid Layout Matching Projects section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resume.certificates.map((c, i) => {
            const hasImage = !!c.image;
            const shotIndex = certShots.findIndex((s) => s.fullIndex === i);

            return (
              <CertCard
                key={i}
                cert={c}
                fullIndex={i}
                locale={locale}
                onClick={() => {
                  if (hasImage && shotIndex >= 0) {
                    setSelected(shotIndex);
                  }
                }}
              />
            );
          })}
        </div>
      </motion.div>

      {/* Lightbox */}
      <Lightbox
        images={certShots.map((s) => s.src)}
        captions={certShots.map((s) => s.caption)}
        startIndex={selected}
        onClose={close}
      />
    </section>
  );
}
