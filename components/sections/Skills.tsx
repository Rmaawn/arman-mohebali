"use client";

import { motion } from "framer-motion";
import { resume } from "@/data/resume";
import type { Locale, UIDict } from "@/data/i18n";
import { SectionHeading } from "@/components/ui/SectionHeading";

interface Props {
  locale: Locale;
  dict: UIDict;
}

const CATEGORY_ICONS = {
  design: "♗",
  coding: "♘",
  devtools: "♖",
} as const;

export function Skills({ locale, dict }: Props) {
  const categories = Object.entries(resume.skills) as [
    keyof typeof resume.skills,
    (typeof resume.skills)[keyof typeof resume.skills]
  ][];

  return (
    <section id="skills" className="relative py-32 px-6 md:px-16 max-w-7xl mx-auto">
      <SectionHeading icon="♘" label={dict.nav.skills} title={dict.sections.skillsTitle} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {categories.map(([key, cat], idx) => (
          <motion.div
            key={key}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.15 }}
            className="glass premium-card rounded-sm p-8 group"
          >
            <div className="flex items-center gap-4 mb-8">
              <span className="text-4xl text-gold">{CATEGORY_ICONS[key]}</span>
              <h3 className="text-lg tracking-[0.2em] uppercase text-ivory/90">
                {cat.label[locale]}
              </h3>
            </div>

            <div className="flex flex-wrap gap-2">
              {cat.items.map((item, i) => (
                <motion.span
                  key={item}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.15 + i * 0.05 }}
                  className="px-3 py-1.5 text-sm border border-gold/20 text-ivory/80 hover:border-gold hover:text-gold hover:bg-gold/5 transition-all cursor-default rounded-sm"
                >
                  {item}
                </motion.span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
