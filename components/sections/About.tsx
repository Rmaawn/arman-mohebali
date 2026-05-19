"use client";

import { motion } from "framer-motion";
import { resume } from "@/data/resume";
import type { Locale, UIDict } from "@/data/i18n";
import { SectionHeading } from "@/components/ui/SectionHeading";

interface Props {
  locale: Locale;
  dict: UIDict;
}

export function About({ locale, dict }: Props) {
  return (
    <section id="about" className="relative py-32 px-6 md:px-16 max-w-7xl mx-auto">
      <SectionHeading icon="♔" label={dict.nav.about} title={dict.sections.aboutTitle} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-2"
        >
          <p className="text-xl md:text-2xl leading-relaxed text-ivory/80 font-light">
            {resume.about[locale]}
          </p>

          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { num: "2+", label: locale === "fa" ? "سال تجربه" : "Years Exp." },
              { num: "847", label: locale === "fa" ? "محصول" : "Products" },
              { num: "500M", label: locale === "fa" ? "فروش (تومان)" : "Sales (T)" },
              { num: "3", label: locale === "fa" ? "انتشار" : "Papers" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
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

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="glass rounded-sm p-8 gold-glow"
        >
          <div className="text-xs tracking-[0.3em] uppercase text-gold/70 mb-6">
            {locale === "fa" ? "اطلاعات" : "Profile"}
          </div>

          <div className="space-y-5 font-mono text-sm">
            <Row label={locale === "fa" ? "موقعیت" : "Location"} value={resume.location[locale]} />
            <Row label="Email" value={resume.contact.email} mono />
            <Row label="GitHub" value={resume.contact.github} mono />
            <Row label="LinkedIn" value={resume.contact.linkedin} mono />
            <Row label="Telegram" value={resume.contact.telegram} mono />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Row({ label, value, mono = false }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="flex flex-col gap-1 pb-4 border-b border-ivory/10 last:border-0">
      <span className="text-xs tracking-widest uppercase text-ivory/40">{label}</span>
      <span className={`text-ivory/90 break-all ${mono ? "font-mono" : ""}`}>{value}</span>
    </div>
  );
}
