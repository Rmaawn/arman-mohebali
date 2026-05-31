"use client";

import { motion } from "framer-motion";
import { Award, GraduationCap } from "lucide-react";
import { resume } from "@/data/resume";
import type { Locale, UIDict } from "@/data/i18n";
import { SectionHeading } from "@/components/ui/SectionHeading";

interface Props {
  locale: Locale;
  dict: UIDict;
}

export function Education({ locale, dict }: Props) {
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
            {resume.certificates.map((cert, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="glass premium-card rounded-sm p-5 flex items-start gap-4 group hover:border-gold/40 transition-all"
              >
                <span className="text-3xl text-gold/60 group-hover:text-gold transition-colors">♗</span>
                <div className="flex-1">
                  <h4 className="text-ivory font-medium mb-1">{cert.title[locale]}</h4>
                  <div className="text-xs tracking-widest uppercase text-gold/70 font-mono">
                    {typeof cert.issuer === "string" ? cert.issuer : cert.issuer[locale]}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
