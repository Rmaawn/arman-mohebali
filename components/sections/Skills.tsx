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
    <section id="skills" className="relative py-20 md:py-32 px-6 md:px-16 max-w-7xl mx-auto">
      <SectionHeading icon="♘" label={dict.nav.skills} title={dict.sections.skillsTitle} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {categories.map(([key, cat], idx) => (
          <motion.div
            key={key}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="glass premium-card rounded-sm p-8 group"
          >
            <div className="flex items-center gap-4 mb-8">
              <span className="text-4xl text-gold">{CATEGORY_ICONS[key]}</span>
              <h3 className="text-lg tracking-[0.2em] uppercase text-ivory/90">
                {cat.label[locale]}
              </h3>
            </div>

            <div className="flex flex-wrap gap-2">
              {cat.items.map((item) => (
                <span
                  key={item}
                  className="px-3 py-1.5 text-sm border border-gold/20 text-ivory/80 hover:border-gold hover:text-gold hover:bg-gold/5 transition-colors duration-200 cursor-default rounded-sm"
                >
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
