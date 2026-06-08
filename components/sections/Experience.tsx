"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, CalendarDays, Clock3, MapPin } from "lucide-react";
import { resume } from "@/data/resume";
import type { Locale, UIDict } from "@/data/i18n";
import { SectionHeading } from "@/components/ui/SectionHeading";

interface Props {
  locale: Locale;
  dict: UIDict;
}

const FA_DIGITS = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
const toFa = (value: number | string) =>
  String(value).replace(/\d/g, (d) => FA_DIGITS[Number(d)]);

/** Whole months from `start` (YYYY-MM) to `end` (YYYY-MM, or now if null), inclusive of the start month. */
function monthsBetween(start: string, end: string | null): number {
  const [sy, sm] = start.split("-").map(Number);
  const now = new Date();
  const [ey, em] = end
    ? end.split("-").map(Number)
    : [now.getFullYear(), now.getMonth() + 1];
  return Math.max(1, (ey - sy) * 12 + (em - sm) + 1);
}

function formatDuration(months: number, locale: Locale): string {
  const years = Math.floor(months / 12);
  const rest = months % 12;

  if (locale === "fa") {
    const parts: string[] = [];
    if (years) parts.push(`${toFa(years)} سال`);
    if (rest) parts.push(`${toFa(rest)} ماه`);
    return parts.join(" و ") || `${toFa(months)} ماه`;
  }

  const parts: string[] = [];
  if (years) parts.push(`${years} yr${years > 1 ? "s" : ""}`);
  if (rest) parts.push(`${rest} mo${rest > 1 ? "s" : ""}`);
  return parts.join(" ") || `${months} mos`;
}

export function Experience({ locale, dict }: Props) {
  const isFa = locale === "fa";

  return (
    <section id="experience" className="relative py-20 md:py-32 px-6 md:px-16 max-w-7xl mx-auto">
      <SectionHeading icon="♕" label={dict.nav.experience} title={dict.sections.experienceTitle} />

      <div className="relative">
        {/* Vertical timeline */}
        <div className={`absolute top-0 bottom-0 w-px bg-gradient-to-b from-gold/40 via-gold/20 to-transparent ${isFa ? "right-6" : "left-6"} hidden md:block`} />

        <div className="space-y-12">
          {resume.experience.map((exp, i) => {
            const isCurrent = exp.end === null;
            const months = monthsBetween(exp.start, exp.end);
            const duration = formatDuration(months, locale);

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className={`relative ${isFa ? "md:pr-20" : "md:pl-20"}`}
              >
                {/* Timeline node */}
                <div className={`absolute top-2 hidden md:block ${isFa ? "right-3" : "left-3"}`}>
                  <div className="relative w-6 h-6">
                    {isCurrent && (
                      <span className="absolute inset-0 rounded-full bg-gold/40 animate-ping" />
                    )}
                    <div className="relative w-6 h-6 rounded-full bg-onyx border-2 border-gold flex items-center justify-center">
                      <div className={`w-2 h-2 rounded-full bg-gold ${isCurrent ? "animate-pulse-gold" : ""}`} />
                    </div>
                  </div>
                </div>

                <div className="glass premium-card rounded-sm p-6 md:p-8 gold-glow-hover">
                  {/* Meta chips — duration leads, period & location support */}
                  <div className="flex flex-wrap items-center gap-2 mb-5">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-sm bg-gradient-to-r from-gold/20 to-gold/5 border border-gold/40 text-gold font-mono text-xs tracking-wider">
                      <Clock3 className="w-3.5 h-3.5" />
                      {duration}
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-sm border border-ivory/15 text-ivory/55 font-mono text-xs tracking-wider">
                      <CalendarDays className="w-3.5 h-3.5 opacity-70" />
                      {exp.period[locale]}
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-sm border border-ivory/15 text-ivory/55 font-mono text-xs tracking-wider">
                      <MapPin className="w-3.5 h-3.5 opacity-70" />
                      {exp.location[locale]}
                    </span>
                  </div>

                  {/* Role + live badge */}
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-2 mb-1">
                    <h3 className="text-2xl md:text-3xl font-display text-ivory">
                      {exp.role[locale]}
                    </h3>
                    {isCurrent && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-400/10 border border-emerald-400/30 text-emerald-300 text-[10px] font-mono tracking-[0.2em] uppercase">
                        <span className="relative flex w-1.5 h-1.5">
                          <span className="absolute inline-flex w-full h-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
                          <span className="relative inline-flex w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        </span>
                        {dict.misc.live}
                      </span>
                    )}
                  </div>

                  {/* Company */}
                  {(() => {
                    const url = (exp as { url?: string }).url;
                    return url ? (
                      <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 font-mono text-sm font-bold tracking-wider text-gold hover:text-gold-50 transition-colors group/link"
                      >
                        {exp.company}
                        <ArrowUpRight className="w-3.5 h-3.5 opacity-50 group-hover/link:opacity-100 transition-opacity" />
                      </a>
                    ) : (
                      <div className="font-mono text-sm font-bold tracking-wider text-gold">
                        {exp.company}
                      </div>
                    );
                  })()}

                  <p className="mt-4 text-ivory/70 leading-relaxed text-sm md:text-base">
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
            );
          })}
        </div>
      </div>
    </section>
  );
}
