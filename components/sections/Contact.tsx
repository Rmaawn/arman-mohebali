"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Github, Linkedin, Send, MessageCircle, Globe, Copy, Check } from "lucide-react";
import { resume } from "@/data/resume";
import type { Locale, UIDict } from "@/data/i18n";
import { SectionHeading } from "@/components/ui/SectionHeading";

interface Props {
  locale: Locale;
  dict: UIDict;
}

export function Contact({ locale, dict }: Props) {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    await navigator.clipboard.writeText(resume.contact.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const channels = [
    { icon: Mail, label: "Email", value: resume.contact.email, href: `mailto:${resume.contact.email}` },
    { icon: Linkedin, label: "LinkedIn", value: resume.contact.linkedin, href: `https://${resume.contact.linkedin}` },
    { icon: Github, label: "GitHub", value: resume.contact.github, href: `https://${resume.contact.github}` },
    { icon: Send, label: "Telegram", value: resume.contact.telegram, href: `https://${resume.contact.telegram}` },
    { icon: MessageCircle, label: "WhatsApp", value: resume.contact.whatsapp, href: `https://wa.me/${resume.contact.whatsapp.replace(/\D/g, "")}` },
    { icon: Globe, label: "Website", value: resume.contact.website, href: `https://${resume.contact.website}` },
  ];

  return (
    <section id="contact" className="relative py-32 px-6 md:px-16 max-w-7xl mx-auto">
      <SectionHeading icon="♚" label={dict.nav.contact} title={dict.sections.contactTitle} />

      <div className="text-center mb-12">
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="hero-title text-5xl md:text-7xl mb-6"
        >
          <span className="text-gold-gradient">{dict.misc.yourMove}</span>
        </motion.h3>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-ivory/60 max-w-xl mx-auto"
        >
          {locale === "fa"
            ? "آماده‌ام برای پروژه‌های جدید، همکاری و گفت‌وگو. مهره‌ات را حرکت بده."
            : "Ready for new projects, collaboration, and conversation. Make your move."}
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
        {channels.map((c, i) => (
          <motion.a
            key={c.label}
            href={c.href}
            target={c.label === "Email" ? undefined : "_blank"}
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="glass premium-card rounded-sm p-5 flex items-center gap-4 group gold-glow-hover"
          >
            <span className="w-12 h-12 flex items-center justify-center rounded-full bg-gold/10 border border-gold/30 text-gold group-hover:bg-gold group-hover:text-onyx transition-all">
              <c.icon className="w-5 h-5" />
            </span>
            <div className="flex-1 min-w-0">
              <div className="text-xs tracking-widest uppercase text-ivory/40 mb-0.5">
                {c.label}
              </div>
              <div className="text-sm text-ivory/90 truncate font-mono">{c.value}</div>
            </div>
          </motion.a>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.4 }}
        className="mt-12 flex flex-col md:flex-row items-center justify-center gap-4"
      >
        <a href={`mailto:${resume.contact.email}`} className="btn-gold">
          <Mail className="w-4 h-4" />
          {locale === "fa" ? "ارسال ایمیل" : "Send an Email"}
        </a>
        <button onClick={copyEmail} className="btn-ghost">
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          {copied ? dict.misc.copied : dict.misc.copyEmail}
        </button>
      </motion.div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.6 }}
        className="mt-24 pt-12 border-t border-ivory/10 text-center"
      >
        <div className="flex items-center justify-center gap-3 mb-4">
          <span className="text-2xl text-gold/40">♚</span>
          <span className="text-2xl text-gold/40">♛</span>
          <span className="text-2xl text-gold/40">♝</span>
          <span className="text-2xl text-gold/40">♞</span>
          <span className="text-2xl text-gold/40">♜</span>
          <span className="text-2xl text-gold/40">♟</span>
        </div>
        <p className="text-sm text-ivory/40 italic mb-2">{dict.misc.footerNote}</p>
        <p className="text-xs text-ivory/30 font-mono tracking-widest">
          © {new Date().getFullYear()} · {resume.name[locale]} · {dict.misc.builtWith}
        </p>
      </motion.footer>
    </section>
  );
}
