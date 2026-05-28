"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { resume } from "@/data/resume";
import type { Locale, UIDict } from "@/data/i18n";

const Scene = dynamic(() => import("@/components/3d/Scene").then((m) => m.Scene), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="flex gap-2">
        <span className="loading-dot w-2 h-2 rounded-full bg-gold" />
        <span className="loading-dot w-2 h-2 rounded-full bg-gold" />
        <span className="loading-dot w-2 h-2 rounded-full bg-gold" />
      </div>
    </div>
  ),
});

interface Props {
  locale: Locale;
  dict: UIDict;
}

export function Hero({ locale, dict }: Props) {
  const handlePieceClick = (section: string) => {
    document.getElementById(section)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="relative w-full h-screen overflow-hidden">
      {/* 3D Scene */}
      <div className="absolute inset-0">
        <Scene onPieceClick={handlePieceClick} />
      </div>

      {/* Vignette */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-onyx/40 via-transparent to-onyx" />
      <div className="absolute inset-0 pointer-events-none bg-gradient-radial from-transparent via-transparent to-onyx/80" style={{ background: "radial-gradient(ellipse at center, transparent 0%, transparent 50%, rgba(10,10,10,0.7) 100%)" }} />

      {/* Foreground content */}
      <div className="relative z-10 h-full flex flex-col">
        {/* Top bar */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="px-8 md:px-16 pt-8 flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <span className="text-gold text-2xl">♛</span>
            <span className="font-mono text-xs tracking-[0.3em] uppercase text-ivory/60">
              {locale === "fa" ? "آرمان محب‌علی" : "A. Mohebali"}
            </span>
          </div>
          <div className="hidden md:block font-mono text-xs tracking-[0.3em] uppercase text-ivory/40">
            {locale === "fa" ? "نمونه‌کار ۲۰۲۶" : "Portfolio · 2026"}
          </div>
        </motion.div>

        {/* Center content */}
        <div className="flex-1 flex flex-col items-center justify-center px-8 pointer-events-none">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.4 }}
            className="text-center"
          >
            <div className="text-xs md:text-sm tracking-[0.4em] uppercase text-gold/80 mb-4 md:mb-6">
              {resume.title[locale]}
            </div>
            <h1 className="hero-title text-6xl md:text-8xl lg:text-9xl mb-6">
              <span className="text-gold-gradient">{resume.name[locale]}</span>
            </h1>
            <div className="text-ivory/50 max-w-xl mx-auto text-sm md:text-base leading-relaxed mt-4">
              {locale === "fa"
                ? "هر مهره یک بخش از من است — کلیک کن، حرکت کن، بازی را تماشا کن."
                : "Each piece is a part of me — click, move, watch the game unfold."}
            </div>
          </motion.div>
        </div>

        {/* Bottom hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="pb-10 flex flex-col items-center gap-3 pointer-events-none"
        >
          <div className="text-xs tracking-[0.3em] uppercase text-ivory/40">
            {dict.misc.scrollHint}
          </div>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="w-px h-12 bg-gradient-to-b from-gold/60 to-transparent"
          />
        </motion.div>
      </div>
    </section>
  );
}
