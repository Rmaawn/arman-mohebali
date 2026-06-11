"use client";

import { motion } from "framer-motion";
import type { ComponentType } from "react";
import {
  SiPython,
  SiDart,
  SiFlutter,
  SiFastapi,
  SiPostgresql,
  SiSqlite,
  SiN8N,
  SiLinux,
  SiDocker,
  SiGit,
  SiGithub,
  SiGithubactions,
  SiWordpress,
  SiWoocommerce,
  SiFigma,
  SiPostman,
  SiOpenai,
  SiHtml5,
  SiClaude,
  SiLangchain,
} from "react-icons/si";
import {
  Boxes,
  Sigma,
  Component,
  Shapes,
  Layers,
  Webhook,
  Network,
  Zap,
  Cpu,
  Router,
  Globe,
  Workflow,
  Brain,
  FileSearch,
  Database,
  Cloud,
  Infinity as InfinityIcon,
  Search,
  Sparkles,
} from "lucide-react";
import { resume } from "@/data/resume";
import type { Locale, UIDict } from "@/data/i18n";
import { SectionHeading } from "@/components/ui/SectionHeading";

interface Props {
  locale: Locale;
  dict: UIDict;
}

type Glyph = ComponentType<{ className?: string }>;

/* Each skill name → its mark. Brand logos (single-colour Simple Icons)
   tint gold; abstract concepts fall back to refined lucide glyphs. */
const SKILL_ICONS: Record<string, Glyph> = {
  // Core
  Python: SiPython,
  Dart: SiDart,
  Flutter: SiFlutter,
  // Software Engineering
  "Data Structures": Boxes,
  Algorithms: Sigma,
  OOP: Component,
  "Design Patterns": Shapes,
  "SOLID Principles": Layers,
  "REST APIs": Webhook,
  // Backend & Data
  FastAPI: SiFastapi,
  PostgreSQL: SiPostgresql,
  SQLite: SiSqlite,
  Hive: Database,
  // System Design
  "System Design": Network,
  Caching: Zap,
  Concurrency: Cpu,
  Networking: Router,
  "HTTP Internals": Globe,
  // Automation & AI
  "Workflow Automation": Workflow,
  n8n: SiN8N,
  "LLM Integration": Brain,
  RAG: FileSearch,
  LangGraph: SiLangchain,
  "Vector Databases": Boxes,
  // DevOps & Cloud
  Linux: SiLinux,
  Docker: SiDocker,
  Git: SiGit,
  "GitHub Actions": SiGithubactions,
  "CI/CD": InfinityIcon,
  AWS: Cloud,
  // Web & CMS
  WordPress: SiWordpress,
  WooCommerce: SiWoocommerce,
  "Technical SEO": Search,
  "HTML/CSS": SiHtml5,
  // Tools & Platforms
  GitHub: SiGithub,
  Postman: SiPostman,
  Figma: SiFigma,
  Claude: SiClaude,
  "OpenAI APIs": SiOpenai,
  LangChain: SiLangchain,
};

/* Thematic chess glyph per category — cycles the full set of pieces. */
const PIECES = ["♟", "♞", "♝", "♜", "♛", "♚", "♙", "♘"] as const;

const serif = { fontFamily: "var(--font-display)" } as const;

export function Skills({ locale, dict }: Props) {
  return (
    <section
      id="skills"
      className="relative py-20 md:py-32 px-6 md:px-16 max-w-7xl mx-auto"
    >
      <SectionHeading
        icon="♘"
        label={dict.nav.skills}
        title={dict.sections.skillsTitle}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-6">
        {resume.skills.map((cat, catIdx) => (
          <motion.div
            key={cat.label.en}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: (catIdx % 3) * 0.08, ease: [0.4, 0, 0.2, 1] }}
            className="glass premium-card rounded-sm p-6 md:p-7 flex flex-col"
          >
            {/* ── Category header ── */}
            <header className="flex items-baseline gap-3 mb-6 pb-4 border-b border-gold/15">
              <span className="text-2xl md:text-3xl text-gold/90 leading-none">
                {PIECES[catIdx % PIECES.length]}
              </span>
              <h3 className="flex-1 text-[0.78rem] md:text-sm tracking-[0.22em] uppercase text-ivory/90">
                {cat.label[locale]}
              </h3>
              <span
                className="text-gold/50 text-sm tabular-nums"
                style={serif}
              >
                {String(cat.items.length).padStart(2, "0")}
              </span>
            </header>

            {/* ── Skill rows ── */}
            <ul className="flex flex-col gap-4">
              {cat.items.map((skill, i) => {
                const Icon = SKILL_ICONS[skill.name] ?? Sparkles;
                return (
                  <li key={skill.name} className="group/skill">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="grid place-items-center w-8 h-8 flex-shrink-0 rounded-sm border border-gold/20 bg-gold/[0.04] text-gold/80 transition-colors duration-300 group-hover/skill:border-gold/60 group-hover/skill:text-gold">
                        <Icon className="w-[15px] h-[15px]" />
                      </span>
                      <span className="flex-1 text-sm text-ivory/85 transition-colors duration-300 group-hover/skill:text-ivory">
                        {skill.name}
                      </span>
                      <span
                        className="text-base text-gold/70 tabular-nums transition-colors duration-300 group-hover/skill:text-gold"
                        style={serif}
                      >
                        {skill.level}
                        <span className="text-[0.6em] align-super text-gold/40 ms-px">
                          %
                        </span>
                      </span>
                    </div>

                    {/* ── Proficiency meter ── */}
                    <div className="relative h-[3px] rounded-full bg-ivory/[0.07] overflow-hidden ms-11">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true, margin: "-40px" }}
                        transition={{
                          duration: 1.1,
                          delay: 0.15 + i * 0.06,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                        className="absolute inset-y-0 start-0 rounded-full bg-gradient-to-r from-gold-700 via-gold to-gold-50"
                        style={{
                          boxShadow: "0 0 8px rgba(212,175,55,0.45)",
                        }}
                      />
                    </div>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
