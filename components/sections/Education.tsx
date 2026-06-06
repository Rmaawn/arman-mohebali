"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Award, GraduationCap, X, Expand } from "lucide-react";
import { resume } from "@/data/resume";
import type { Locale, UIDict } from "@/data/i18n";
import { SectionHeading } from "@/components/ui/SectionHeading";

interface Props {
  locale: Locale;
  dict: UIDict;
}

function CertThumbnail({ src, alt }: { src: string; alt: string }) {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;
  return (
    <img
      src={src}
      alt={alt}
      onError={() => setVisible(false)}
      className="w-full h-full object-cover"
    />
  );
}

export function Education({ locale, dict }: Props) {
  const [selected, setSelected] = useState<number | null>(null);

  const close = useCallback(() => setSelected(null), []);

  const cert = selected !== null ? resume.certificates[selected] : null;

  return (
    <section id="education" className="relative py-20 md:py-32 px-6 md:px-16 max-w-7xl mx-auto">
      <SectionHeading icon="♗" label={dict.nav.education} title={dict.sections.educationTitle} />

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Education card */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55 }}
          className="lg:col-span-2 glass premium-card rounded-sm p-8 gold-glow-hover"
        >
          <div className="flex items-center gap-3 mb-6">
            <GraduationCap className="w-6 h-6 text-gold" />
            <span className="text-xs tracking-[0.3em] uppercase text-gold/70">
              {locale === "fa" ? "تحصیلات" : "Education"}
            </span>
          </div>

          <div className="text-xs font-mono tracking-widest text-ivory/40 mb-3">
            {resume.education.period}
          </div>
          <h3 className="text-2xl font-display text-ivory mb-2">
            {resume.education.degree[locale]}
          </h3>
          <p className="text-ivory/70 text-sm mb-6">{resume.education.institution[locale]}</p>

          <div className="flex items-center gap-3 pt-6 border-t border-ivory/10">
            <span className="text-xs tracking-widest uppercase text-ivory/40">
              {dict.misc.grade}
            </span>
            <span className="text-2xl font-display text-gold-gradient">
              {resume.education.grade}
            </span>
          </div>
        </motion.div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="lg:col-span-3"
        >
          <div className="flex items-center gap-3 mb-6">
            <Award className="w-6 h-6 text-gold" />
            <span className="text-xs tracking-[0.3em] uppercase text-gold/70">
              {dict.misc.certifications}
            </span>
          </div>

          <div className="space-y-3">
            {resume.certificates.map((c, i) => {
              const issuerLabel = typeof c.issuer === "string" ? c.issuer : c.issuer[locale];
              const hasImage = !!c.image;

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.4, delay: i * 0.07 }}
                  onClick={() => hasImage && setSelected(i)}
                  className={[
                    "glass premium-card rounded-sm p-5 flex items-center gap-4 group",
                    "hover:border-gold/40 transition-all",
                    hasImage ? "cursor-pointer" : "",
                  ].join(" ")}
                >
                  <span className="text-3xl text-gold/60 group-hover:text-gold transition-colors flex-shrink-0">
                    ♗
                  </span>

                  <div className="flex-1 min-w-0">
                    <h4 className="text-ivory font-medium mb-1 leading-snug">
                      {c.title[locale]}
                    </h4>
                    <div className="text-xs tracking-widest uppercase text-gold/70 font-mono">
                      {issuerLabel}
                    </div>
                  </div>

                  {hasImage && (
                    <div className="relative w-28 h-20 flex-shrink-0 rounded-sm overflow-hidden border border-gold/25 group-hover:border-gold/60 transition-colors">
                      <CertThumbnail src={c.image!} alt={c.title.en} />
                      <div className="absolute inset-0 bg-onyx/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Expand className="w-4 h-4 text-gold" />
                      </div>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selected !== null && cert && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-6 bg-black/80 backdrop-blur-md"
            onClick={close}
          >
            <motion.div
              key="panel"
              initial={{ opacity: 0, scale: 0.92, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 12 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="relative w-full max-w-2xl glass-strong rounded-sm overflow-hidden"
              style={{
                boxShadow: "0 0 0 1px rgba(212,175,55,0.35), 0 32px 80px rgba(0,0,0,0.7), 0 0 40px rgba(212,175,55,0.12)",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header strip */}
              <div className="flex items-start justify-between gap-4 px-6 pt-5 pb-4 border-b border-gold/10">
                <div>
                  <div className="text-[10px] tracking-[0.35em] uppercase text-gold/60 font-mono mb-1">
                    {typeof cert.issuer === "string" ? cert.issuer : cert.issuer[locale]}
                  </div>
                  <h3 className="section-heading text-lg md:text-xl text-ivory leading-tight">
                    {cert.title[locale]}
                  </h3>
                </div>
                <button
                  onClick={close}
                  aria-label="Close"
                  className="mt-0.5 flex-shrink-0 text-ivory/30 hover:text-gold transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Certificate image frame */}
              <div className="p-4 md:p-6">
                <div
                  className="rounded-sm flex items-center justify-center"
                  style={{
                    border: "1px solid rgba(212,175,55,0.25)",
                  }}
                >
                  {cert.image && (
                    <img
                      src={cert.image}
                      alt={cert.title.en}
                      className="block max-h-[70vh] max-w-full w-auto h-auto"
                    />
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
