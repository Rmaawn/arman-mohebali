"use client";

import { motion } from "framer-motion";
import { resume } from "@/data/resume";
import type { Locale, UIDict } from "@/data/i18n";
import { SectionHeading } from "@/components/ui/SectionHeading";

interface Props {
  locale: Locale;
  dict: UIDict;
}

export function Experience({ locale, dict }: Props) {
  return (
    <section id="experience" className="relative py-32 px-6 md:px-16 max-w-7xl mx-auto">
      <SectionHeading icon="♕" label={dict.nav.experience} title={dict.sections.experienceTitle} />

      <div className="relative">
        {/* Vertical timeline */}
        <div className={`absolute top-0 bottom-0 w-px bg-gradient-to-b from-gold/40 via-gold/20 to-transparent ${locale === "fa" ? "right-6" : "left-6"} hidden md:block`} />

        <div className="space-y-12">
          {resume.experience.map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className={`relative ${locale === "fa" ? "md:pr-20" : "md:pl-20"}`}
            >
              {/* Timeline dot */}
              <div className={`absolute top-2 hidden md:block ${locale === "fa" ? "right-3" : "left-3"}`}>
                <div className="relative">
                  <div className="w-6 h-6 rounded-full bg-onyx border-2 border-gold flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-gold animate-pulse-gold" />
                  </div>
                </div>
              </div>

              <div className="glass premium-card rounded-sm p-6 md:p-8 gold-glow-hover">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                  <div>
                    <div className="text-xs tracking-[0.25em] uppercase text-gold/70 mb-2">
                      {exp.period[locale]} · {exp.location[locale]}
                    </div>
                    <h3 className="text-2xl md:text-3xl font-display text-ivory mb-1">
                      {exp.role[locale]}
                    </h3>
                    <div className="text-gold font-mono text-sm tracking-wider">
                      {exp.company}
                    </div>
                  </div>
                </div>

                <p className="text-ivory/70 leading-relaxed text-sm md:text-base">
                  {exp.description[locale]}
                </p>

                {"portfolio" in exp && exp.portfolio && (
                  <div className="mt-4 pt-4 border-t border-ivory/10">
                    <div className="text-xs tracking-widest uppercase text-ivory/40 mb-2">
                      {dict.misc.portfolio}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {exp.portfolio.map((p) => (
                        <span key={p} className="font-mono text-xs px-2 py-1 bg-gold/5 text-gold/80 border border-gold/20 rounded-sm">
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
