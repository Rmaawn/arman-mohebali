"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { resume } from "@/data/resume";
import type { Locale, UIDict } from "@/data/i18n";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectModal, type ProjectData } from "@/components/ui/ProjectModal";

interface Props {
  locale: Locale;
  dict: UIDict;
}

export function Projects({ locale, dict }: Props) {
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);
  const isRtl = locale === "fa";

  return (
    <section id="projects" className="relative py-20 md:py-32 px-6 md:px-16 max-w-7xl mx-auto">
      <SectionHeading icon="♖" label={dict.nav.projects} title={dict.sections.projectsTitle} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {resume.projects.map((p, i) => (
          <motion.button
            key={i}
            type="button"
            onClick={() => setSelectedProject(p)}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="text-start block w-full group glass premium-card rounded-sm overflow-hidden gold-glow-hover cursor-pointer outline-none focus-visible:ring-1 focus-visible:ring-gold/60"
          >
            {/* Visual top section with preview thumbnail & chess motif */}
            <div className="relative h-52 flex items-center justify-center bg-gradient-to-br from-onyx-50 to-onyx overflow-hidden border-b border-gold/15">
              <div className="absolute inset-0 chess-bg opacity-30" />

              {/* Thumbnail image if available */}
              {p.image ? (
                <div className="absolute inset-0 w-full h-full">
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 600px"
                    className="object-cover opacity-60 group-hover:opacity-85 group-hover:scale-105 transition-all duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-onyx via-onyx/40 to-transparent" />
                </div>
              ) : null}

              {/* Rook motif overlay */}
              <div className="relative z-10 text-8xl text-gold/30 group-hover:text-gold/50 group-hover:scale-110 transition-all duration-700">
                ♖
              </div>

              {/* Status pill */}
              <div className="absolute top-4 end-4 z-20 flex items-center gap-2 px-3 py-1 bg-gold/90 text-onyx text-xs font-mono tracking-widest uppercase rounded-sm shadow-md">
                <span className="w-1.5 h-1.5 rounded-full bg-onyx animate-pulse" />
                {dict.misc.live}
              </div>

              {/* Vibe Coding badge */}
              {p.vibeCoding && (
                <div className="absolute top-4 start-4 z-20 flex items-center gap-1.5 px-3 py-1 bg-onyx/90 backdrop-blur-md border border-violet-400/50 text-violet-200 text-xs font-mono font-medium tracking-wider rounded-sm shadow-[0_0_15px_rgba(168,85,247,0.35)]">
                  <Sparkles className="w-3.5 h-3.5 text-violet-400 animate-pulse" />
                  <span>{dict.misc.vibeCoding}</span>
                </div>
              )}

              {/* Hover prompt pill */}
              <div className="absolute bottom-3 start-4 z-20 flex items-center gap-1.5 px-3 py-1 bg-onyx/80 backdrop-blur-md border border-gold/30 text-gold text-[11px] font-mono tracking-wider rounded-sm opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-1 group-hover:translate-y-0">
                <Sparkles className="w-3.5 h-3.5 text-gold" />
                <span>{isRtl ? "مشاهده جزئیات و گالری" : "View Details & Gallery"}</span>
              </div>
            </div>

            {/* Card Content */}
            <div className="p-6 md:p-8 space-y-3.5">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs tracking-[0.25em] uppercase text-gold/70 font-mono">
                    {p.brand} · {p.year}
                  </span>
                  {p.vibeCoding && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-sm text-[10px] font-mono font-medium tracking-wider bg-violet-500/15 border border-violet-400/35 text-violet-300">
                      <Sparkles className="w-2.5 h-2.5 text-violet-400" />
                      {dict.misc.vibeCoding}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-1 text-xs text-gold/60 group-hover:text-gold font-mono transition-colors shrink-0">
                  <span className="hidden sm:inline text-[11px]">
                    {isRtl ? "باز کردن" : "Details"}
                  </span>
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>

              <div className="flex items-start justify-between gap-3">
                <h3 className="text-2xl md:text-3xl font-display text-ivory group-hover:text-gold-50 transition-colors">
                  {p.name}
                </h3>
              </div>

              <p className="text-ivory/70 text-sm leading-relaxed line-clamp-2">
                {p.description[locale]}
              </p>

              {/* Tech Stack Chips Preview */}
              {p.technologies && p.technologies.length > 0 && (
                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  {p.technologies.slice(0, 4).map((tech, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] font-mono px-2 py-0.5 rounded-sm bg-gold/[0.07] border border-gold/20 text-gold/90"
                    >
                      {tech}
                    </span>
                  ))}
                  {p.technologies.length > 4 && (
                    <span className="text-[10px] font-mono text-ivory/40">
                      +{p.technologies.length - 4}
                    </span>
                  )}
                </div>
              )}
            </div>
          </motion.button>
        ))}
      </div>

      {/* Project Details Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        locale={locale}
        dict={dict}
      />
    </section>
  );
}
