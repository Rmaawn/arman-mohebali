"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ChevronsDown } from "lucide-react";
import { resume } from "@/data/resume";
import type { Locale, UIDict } from "@/data/i18n";

const HeroScene = dynamic(
  () => import("@/components/3d/HeroScene").then((m) => m.HeroScene),
  {
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
  }
);

interface Props {
  locale: Locale;
  dict: UIDict;
}

export function Hero({ locale, dict }: Props) {
  const handlePieceClick = (section: string) => {
    document.getElementById(section)?.scrollIntoView({ behavior: "smooth" });
  };

  const isFa = locale === "fa";

  return (
    <section id="hero" className="relative w-full h-screen overflow-hidden">
      {/* 3D Scene */}
      <div className="absolute inset-0">
        <HeroScene onPieceClick={handlePieceClick} />
      </div>

      {/* Vignette */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-onyx/40 via-transparent to-onyx" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 0%, transparent 45%, rgba(10,10,10,0.75) 100%)",
        }}
      />

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
              {isFa ? "آرمان محب‌علی" : "A. Mohebali"}
            </span>
          </div>
          <div className="hidden md:block font-mono text-xs tracking-[0.3em] uppercase text-ivory/40">
            {isFa ? "نمونه‌کار ۲۰۲۶" : "Portfolio · 2026"}
          </div>
        </motion.div>

        {/* Center content */}
        <div className="flex-1 flex flex-col items-center justify-center px-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.4 }}
            className="text-center pointer-events-none"
          >
            <div className="text-xs md:text-sm tracking-[0.4em] uppercase text-gold/80 mb-4 md:mb-6">
              {resume.title[locale]}
            </div>
            <h1 className="hero-title text-6xl md:text-8xl lg:text-9xl mb-6">
              <span className="text-gold-gradient">{resume.name[locale]}</span>
            </h1>
            <div className="text-ivory/50 max-w-xl mx-auto text-sm md:text-base leading-relaxed mt-4">
              {isFa
                ? "هر مهره یک بخش از من است — کلیک کن، حرکت کن، بازی را تماشا کن."
                : "Each piece is a part of me — click, move, watch the game unfold."}
            </div>
          </motion.div>

          {/* Play-with-me CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.1 }}
            className="mt-10 md:mt-14 flex flex-col items-center gap-3"
          >
            <Link
              href="/board"
              className="group relative inline-flex items-center gap-3 px-6 md:px-8 py-3 md:py-4 border border-gold/40 bg-gold/5 rounded-sm overflow-hidden transition-all hover:border-gold hover:bg-gold/10"
              style={{
                boxShadow:
                  "0 0 30px rgba(212,175,55,0.15), inset 0 0 30px rgba(212,175,55,0.04)",
              }}
            >
              <span className="text-2xl md:text-3xl text-gold animate-pulse-gold leading-none">
                ♞
              </span>
              <span className="flex flex-col items-start leading-tight">
                <span className="font-mono text-[10px] md:text-xs tracking-[0.3em] uppercase text-gold/70">
                  {isFa ? "نسخه تعاملی" : "Interactive mode"}
                </span>
                <span className="text-base md:text-lg text-ivory group-hover:text-gold transition-colors">
                  {isFa ? "بیا روی صفحه شطرنج بازی کنیم" : "Care to play on the board?"}
                </span>
              </span>
              <ArrowRight
                className={`w-5 h-5 text-gold transition-transform group-hover:translate-x-1 ${
                  isFa ? "flip-rtl" : ""
                }`}
              />

              {/* sweeping shine */}
              <span
                className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"
                style={{
                  background:
                    "linear-gradient(110deg, transparent 35%, rgba(212,175,55,0.18) 50%, transparent 65%)",
                  animation: "shimmer 2.4s linear infinite",
                  backgroundSize: "200% 100%",
                }}
              />
            </Link>

            <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-ivory/35">
              {isFa
                ? "یا رزومه را پایین اسکرول کن"
                : "or scroll down to read the resume"}
            </span>
          </motion.div>
        </div>

        {/* Bottom hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="pb-8 flex flex-col items-center gap-2 pointer-events-none"
        >
          <ChevronsDown className="w-4 h-4 text-gold/60 animate-bounce" />
          <div className="text-[10px] tracking-[0.3em] uppercase text-ivory/40">
            {dict.misc.scrollHint}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
