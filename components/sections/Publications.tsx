"use client";

import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";
import { resume } from "@/data/resume";
import type { Locale, UIDict } from "@/data/i18n";
import { SectionHeading } from "@/components/ui/SectionHeading";

interface Props {
  locale: Locale;
  dict: UIDict;
}

export function Publications({ locale, dict }: Props) {
  return (
    <section id="publications" className="relative py-32 px-6 md:px-16 max-w-7xl mx-auto">
      <SectionHeading icon="♙" label={dict.nav.publications} title={dict.sections.publicationsTitle} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {resume.publications.map((pub, i) => (
          <motion.article
            key={i}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.45, delay: i * 0.09 }}
            className="glass premium-card rounded-sm p-6 gold-glow-hover group relative"
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

            <div className="mt-4 pt-4 border-t border-ivory/10 text-xs tracking-widest uppercase text-ivory/40">
              {locale === "fa" ? "مقاله علمی" : "Research Paper"}
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
