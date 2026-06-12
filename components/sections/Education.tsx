"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Award, GraduationCap, Expand } from "lucide-react";
import { resume } from "@/data/resume";
import type { Locale, UIDict } from "@/data/i18n";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Lightbox } from "@/components/ui/Lightbox";

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

  // Certificates that have an image, with their original index + caption.
  const certShots = resume.certificates.flatMap((c, i) => {
    if (!c.image) return [];
    const issuer = typeof c.issuer === "string" ? c.issuer : c.issuer[locale];
    return [{ fullIndex: i, src: c.image, caption: `${issuer} · ${c.title[locale]}` }];
  });

  return (
    <section id="education" className="relative py-20 md:py-32 px-6 md:px-16 max-w-7xl mx-auto">
      <SectionHeading icon="♗" label={dict.nav.education} title={dict.sections.educationTitle} />

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Education cards */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55 }}
          className="lg:col-span-2 space-y-6"
        >
          {resume.education.map((edu, i) => (
            <div key={i} className="glass premium-card rounded-sm p-8 gold-glow-hover">
              <div className="flex items-center gap-3 mb-6">
                <GraduationCap className="w-6 h-6 text-gold" />
                <span className="text-xs tracking-[0.3em] uppercase text-gold/70">
                  {locale === "fa" ? "تحصیلات" : "Education"}
                </span>
              </div>

              <div className="text-xs font-mono tracking-widest text-ivory/40 mb-3">
                {edu.period}
              </div>
              <h3 className="text-2xl font-display text-ivory mb-2">
                {edu.degree[locale]}
              </h3>
              <p className="text-ivory/70 text-sm mb-6">{edu.institution[locale]}</p>

              {edu.grade && (
                <div className="flex items-center gap-3 pt-6 border-t border-ivory/10">
                  <span className="text-xs tracking-widest uppercase text-ivory/40">
                    {dict.misc.grade}
                  </span>
                  <span className="text-2xl font-display text-gold-gradient">
                    {edu.grade}
                  </span>
                </div>
              )}
            </div>
          ))}
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
                  onClick={() => {
                    if (!hasImage) return;
                    setSelected(certShots.findIndex((s) => s.fullIndex === i));
                  }}
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
      <Lightbox
        images={certShots.map((s) => s.src)}
        captions={certShots.map((s) => s.caption)}
        startIndex={selected}
        onClose={close}
      />
    </section>
  );
}
