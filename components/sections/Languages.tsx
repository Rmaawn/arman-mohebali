"use client";

import { motion } from "framer-motion";
import { resume } from "@/data/resume";
import type { Locale, UIDict } from "@/data/i18n";
import { SectionHeading } from "@/components/ui/SectionHeading";

interface Props {
  locale: Locale;
  dict: UIDict;
}

export function Languages({ locale, dict }: Props) {
  return (
    <section id="languages" className="relative py-32 px-6 md:px-16 max-w-7xl mx-auto">
      <SectionHeading icon="♙" label={dict.nav.languages} title={dict.sections.languagesTitle} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl">
        {resume.languages.map((lang, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.15 }}
            className="glass rounded-sm p-6 gold-glow-hover"
          >
            <div className="flex items-end justify-between mb-4">
              <h3 className="text-2xl font-display text-ivory">{lang.language[locale]}</h3>
              <span className="text-xs tracking-widest uppercase text-gold/80 font-mono">
                {lang.level[locale]}
              </span>
            </div>

            {/* Chess pawn progress */}
            <div className="flex items-center gap-1">
              {Array.from({ length: 8 }).map((_, idx) => {
                const filled = lang.value / 100 >= (idx + 1) / 8;
                return (
                  <motion.span
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.15 + idx * 0.05 }}
                    className={`flex-1 h-10 flex items-center justify-center text-2xl transition-all ${
                      filled ? "text-gold" : "text-ivory/15"
                    }`}
                  >
                    ♟
                  </motion.span>
                );
              })}
            </div>

            <div className="mt-2 flex items-center justify-between text-xs text-ivory/40 font-mono">
              <span>0%</span>
              <span className="text-gold">{lang.value}%</span>
              <span>100%</span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
