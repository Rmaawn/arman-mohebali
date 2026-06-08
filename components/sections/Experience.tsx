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

/** First 4-digit run of the localized period — the start year for the timeline milestone. */
function startYear(period: string): string {
  const match = period.match(/[\d۰-۹]{4}/);
  return match ? match[0] : "";
}

export function Experience({ locale, dict }: Props) {
  const isFa = locale === "fa";

  return (
    <section id="experience" className="relative py-20 md:py-32 px-6 md:px-16 max-w-7xl mx-auto">
      <SectionHeading icon="♕" label={dict.nav.experience} title={dict.sections.experienceTitle} />

      <div className="relative">
        {/* Vertical timeline spine */}
        <div className={`absolute top-0 bottom-0 w-px bg-gradient-to-b from-gold/50 via-gold/25 to-transparent ${isFa ? "right-[3.25rem]" : "left-[3.25rem]"} hidden md:block`} />

        <div className="space-y-12">
          {resume.experience.map((exp, i) => {
            const isCurrent = exp.end === null;
            const duration = formatDuration(monthsBetween(exp.start, exp.end), locale);
            const year = startYear(exp.period[locale]);

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className={`relative ${isFa ? "md:pr-28" : "md:pl-28"}`}
              >
                {/* Year milestone — straddles the timeline spine */}
                <div
                  className={`absolute top-3 z-10 hidden md:block ${
                    isFa ? "right-[3.25rem] translate-x-1/2" : "left-[3.25rem] -translate-x-1/2"
                  }`}
                >
                  <div className="relative flex items-center justify-center">
                    {isCurrent && (
                      <span className="absolute inset-0 rounded-full bg-gold/30 blur-md animate-pulse-gold" />
                    )}
                    <span
                      className={`relative px-2.5 py-1 rounded-full font-mono text-[11px] tracking-[0.15em] tabular-nums bg-onyx ${
                        isCurrent
                          ? "border border-gold text-gold shadow-[0_0_18px_rgba(212,175,55,0.35)]"
                          : "border border-gold/45 text-gold/85"
                      }`}
                    >
                      {year}
                    </span>
                  </div>
                </div>

                <div className="glass premium-card rounded-sm p-6 md:p-8 gold-glow-hover">
                  {/* Role + ongoing indicator */}
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                    <h3 className="text-2xl md:text-3xl font-display text-ivory leading-tight">
                      {exp.role[locale]}
                    </h3>
                    {isCurrent && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-400/10 border border-emerald-400/30 text-emerald-300 text-[10px] font-mono tracking-[0.18em] uppercase">
                        <span className="relative flex w-1.5 h-1.5">
                          <span className="absolute inline-flex w-full h-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
                          <span className="relative inline-flex w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        </span>
                        {dict.misc.current}
                      </span>
                    )}
                  </div>

                  {/* Identity line — company · tenure */}
                  <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1">
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
                        <span className="font-mono text-sm font-bold tracking-wider text-gold">
                          {exp.company}
                        </span>
                      );
                    })()}
                    <span className="text-ivory/25">·</span>
                    <span className="inline-flex items-center gap-1.5 text-ivory/60 font-mono text-xs tracking-wider">
                      <Clock3 className="w-3.5 h-3.5 text-gold/70" />
                      {duration}
                    </span>
                  </div>

                  {/* Secondary meta — period & location */}
                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm border border-ivory/12 text-ivory/50 font-mono text-[11px] tracking-wider">
                      <CalendarDays className="w-3.5 h-3.5 opacity-70" />
                      {exp.period[locale]}
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm border border-ivory/12 text-ivory/50 font-mono text-[11px] tracking-wider">
                      <MapPin className="w-3.5 h-3.5 opacity-70" />
                      {exp.location[locale]}
                    </span>
                  </div>

                  <p className="mt-5 text-ivory/70 leading-relaxed text-sm md:text-base">
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
