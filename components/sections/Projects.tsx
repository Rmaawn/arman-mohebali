"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { resume } from "@/data/resume";
import type { Locale, UIDict } from "@/data/i18n";
import { SectionHeading } from "@/components/ui/SectionHeading";

interface Props {
  locale: Locale;
  dict: UIDict;
}

export function Projects({ locale, dict }: Props) {
  return (
    <section id="projects" className="relative py-32 px-6 md:px-16 max-w-7xl mx-auto">
      <SectionHeading icon="♖" label={dict.nav.projects} title={dict.sections.projectsTitle} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {resume.projects.map((p, i) => (
          <motion.a
            key={i}
            href={p.link}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="block group glass premium-card rounded-sm overflow-hidden gold-glow-hover"
          >
            {/* Visual top section with chess piece motif */}
            <div className="relative h-48 flex items-center justify-center bg-gradient-to-br from-onyx-50 to-onyx overflow-hidden">
              <div className="absolute inset-0 chess-bg opacity-30" />
              <div className="text-9xl text-gold/30 group-hover:text-gold/50 group-hover:scale-110 transition-all duration-700">
                ♖
              </div>
              <div className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1 bg-gold/90 text-onyx text-xs font-mono tracking-widest uppercase rounded-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-onyx animate-pulse" />
                {dict.misc.live}
              </div>
            </div>

            <div className="p-6 md:p-8">
              <div className="text-xs tracking-[0.25em] uppercase text-gold/70 mb-2">
                {p.brand} · {p.year}
              </div>
              <div className="flex items-start justify-between gap-3 mb-4">
                <h3 className="text-2xl md:text-3xl font-display text-ivory">{p.name}</h3>
                <ExternalLink className="w-5 h-5 text-gold/60 group-hover:text-gold transition-colors flex-shrink-0 mt-1" />
              </div>
              <p className="text-ivory/70 text-sm leading-relaxed mb-3">
                {p.description[locale]}
              </p>
              <p className="text-ivory/50 text-xs leading-relaxed">{p.details[locale]}</p>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
}
