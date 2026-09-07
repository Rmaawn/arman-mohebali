"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { resume } from "@/data/resume";
import type { Locale, UIDict } from "@/data/i18n";
import { SectionHeading } from "@/components/ui/SectionHeading";

interface Props {
  locale: Locale;
  dict: UIDict;
}

export function About({ locale, dict }: Props) {
  return (
    <section id="about" className="relative py-20 md:py-32 px-6 md:px-16 max-w-7xl mx-auto">
      <SectionHeading icon="♔" label={dict.nav.about} title={dict.sections.aboutTitle} />

      <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr_270px] gap-8 xl:gap-12 items-start">

        {/* ── Photo ── */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="flex justify-center lg:justify-start"
        >
          <ProfilePhoto locale={locale} />
        </motion.div>

        {/* ── Bio + Stats ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <p className="text-lg md:text-xl xl:text-2xl leading-relaxed text-ivory/80 font-light">
            {resume.about[locale]}
          </p>

          <div className="mt-10 grid grid-cols-2 xl:grid-cols-4 gap-4">
            {[
              { num: "3+",  label: locale === "fa" ? "سال تجربه" : "Years Exp." },
              { num: "10+", label: locale === "fa" ? "پروژه ساخته‌شده" : "Projects Built" },
              { num: "2",   label: locale === "fa" ? "سمینار و سخنرانی" : "Seminars & Talks" },
              { num: "3",   label: locale === "fa" ? "مقاله پژوهشی" : "Research Papers" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="text-center glass rounded-sm p-4 gold-glow-hover"
              >
                <div className="text-3xl md:text-4xl font-display text-gold-gradient">
                  {stat.num}
                </div>
                <div className="text-xs tracking-widest uppercase text-ivory/50 mt-2">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── Profile card ── */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="glass rounded-sm p-6 md:p-8 gold-glow"
        >
          <div className="text-xs tracking-[0.3em] uppercase text-gold/70 mb-6">
            {locale === "fa" ? "اطلاعات" : "Profile"}
          </div>
          <div className="space-y-5 font-mono text-sm">
            <Row label={locale === "fa" ? "موقعیت" : "Location"} value={resume.location[locale]} />
            <Row label="Email"    value={resume.contact.email}    mono />
            <Row label="GitHub"   value={resume.contact.github}   mono />
            <Row label="LinkedIn" value={resume.contact.linkedin} mono />
            <Row label="Telegram" value={resume.contact.telegram} mono />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Profile photo frame ─────────────────────────────────── */

function ProfilePhoto({ locale }: { locale: Locale }) {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="relative w-[200px] sm:w-[220px] lg:w-full max-w-[240px] select-none group">

      {/* Ambient glow halo */}
      <div className="absolute -inset-[3px] rounded-sm bg-gradient-to-b from-gold/35 via-gold/15 to-gold/05 opacity-80 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Frame */}
      <div
        className="relative rounded-sm overflow-hidden"
        style={{ aspectRatio: "3/4", background: "rgba(14,14,14,0.9)" }}
      >
        {/* Chess-square backdrop */}
        <div className="absolute inset-0 chess-bg opacity-[0.07] pointer-events-none z-10" />

        {/* Photo or placeholder */}
        <div className="absolute inset-0 z-0">
          {!imgError ? (
            <Image
              src="/armanmohebali.webp"
              alt="عکس آرمان محبعلی — مهندس نرم‌افزار و اتوماسیون | Arman Mohebali"
              title="آرمان محبعلی | Arman Mohebali"
              fill
              sizes="(max-width: 768px) 220px, 240px"
              className="object-cover object-top"
              onError={() => setImgError(true)}
              priority
            />
          ) : (
            /* Elegant placeholder until the user drops in armanmohebali.webp */
            <div className="w-full h-full flex flex-col items-center justify-center gap-4 bg-gradient-to-b from-onyx-light/60 to-onyx">
              <span className="text-[90px] leading-none text-gold/20">♔</span>
              <span className="font-mono text-xs tracking-[0.4em] uppercase text-ivory/25">A · M</span>
            </div>
          )}
        </div>

        {/* Bottom name overlay */}
        <div className="absolute bottom-0 inset-x-0 z-20 bg-gradient-to-t from-onyx/95 via-onyx/70 to-transparent pt-14 pb-4 px-4">
          <div className={`text-sm text-ivory font-light leading-tight ${locale === "fa" ? "font-fa" : "font-display text-base"}`}>
            {resume.name[locale]}
          </div>
          <div className="font-mono text-[9px] tracking-[0.28em] uppercase text-gold/70 mt-1">
            {resume.title[locale]}
          </div>
        </div>

        {/* Gold corner ornaments */}
        <div className="absolute top-3 left-3 z-20 pointer-events-none">
          <div className="w-4 h-4 border-t border-l border-gold/55" />
        </div>
        <div className="absolute top-3 right-3 z-20 pointer-events-none">
          <div className="w-4 h-4 border-t border-r border-gold/55" />
        </div>
        <div className="absolute bottom-3 left-3 z-20 pointer-events-none">
          <div className="w-4 h-4 border-b border-l border-gold/55" />
        </div>
        <div className="absolute bottom-3 right-3 z-20 pointer-events-none">
          <div className="w-4 h-4 border-b border-r border-gold/55" />
        </div>

        {/* Tiny chess pieces at top corners */}
        <div className="absolute top-[14px] left-[14px] z-20 text-gold/40 text-[10px] leading-none pointer-events-none">♟</div>
        <div className="absolute top-[14px] right-[14px] z-20 text-gold/40 text-[10px] leading-none pointer-events-none">♟</div>

        {/* Shine sweep on hover */}
        <div
          className="absolute inset-0 z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
          style={{
            background: "linear-gradient(115deg, transparent 30%, rgba(212,175,55,0.10) 50%, transparent 70%)",
            animation: "shimmer 2.4s linear infinite",
            backgroundSize: "200% 100%",
          }}
        />
      </div>

      {/* Bottom badge pill */}
      <div className="absolute -bottom-3.5 left-1/2 -translate-x-1/2 z-40 glass border border-gold/30 px-3 py-1 rounded-full whitespace-nowrap">
        <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-gold/80">
          {locale === "fa" ? "توسعه‌دهنده نرم‌افزار" : "Software Developer"}
        </span>
      </div>
    </div>
  );
}

function Row({ label, value, mono = false }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="flex flex-col gap-1 pb-4 border-b border-ivory/10 last:border-0">
      <span className="text-xs tracking-widest uppercase text-ivory/40">{label}</span>
      <span
        className={`text-ivory/90 text-[11px] sm:text-xs xl:text-sm tracking-tight ${
          mono ? "font-mono" : ""
        }`}
        style={{ wordBreak: "break-word" }}
      >
        {value}
      </span>
    </div>
  );
}
