"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ChevronsDown } from "lucide-react";
import { resume } from "@/data/resume";
import type { Locale, UIDict } from "@/data/i18n";

interface Props {
  locale: Locale;
  dict: UIDict;
}

export function Hero({ locale, dict }: Props) {
  const isFa = locale === "fa";

  // Scroll-linked parallax: as the hero leaves, the chess backdrop drifts down
  // slowly while the foreground lifts and fades, opening a sense of depth and
  // making the very first scroll feel intentional rather than abrupt.
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "28%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-22%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const hintOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);

  return (
    <section ref={ref} id="hero" className="relative w-full h-screen overflow-hidden">
      {/* ── Lightweight chess backdrop (CSS only, no WebGL) ── */}
      <motion.div style={{ y: bgY }} className="hero-stage" aria-hidden="true">
        {/* Perspective chessboard receding to a glowing horizon */}
        <div className="hero-floor" />
        <div className="hero-horizon" />
        {/* Ambient gold light that breathes behind the title */}
        <div className="hero-aura" />
      </motion.div>

      {/* Theme-aware vignette + soft central spotlight */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-onyx/30 via-transparent to-onyx" />
      <div className="absolute inset-0 pointer-events-none hero-vignette" />

      {/* Art-deco corner frame */}
      <div className="hero-frame" aria-hidden="true">
        <span className="hero-corner hero-corner--tl" />
        <span className="hero-corner hero-corner--tr" />
        <span className="hero-corner hero-corner--bl" />
        <span className="hero-corner hero-corner--br" />
      </div>

      {/* Foreground content */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 h-full flex flex-col"
      >
        {/* Top bar */}
        <motion.div
          dir="ltr"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="px-8 md:px-16 pt-8 flex items-center justify-start"
        >
          <div className="flex items-center gap-3">
            <span className="text-gold text-2xl">♛</span>
            <span className="font-mono text-xs tracking-[0.3em] uppercase hero-name">
              {isFa ? "آرمان محب‌علی" : "A. Mohebali"}
            </span>
          </div>
        </motion.div>

        {/* Center content */}
        <div className="flex-1 flex flex-col items-center justify-center px-8">
          <motion.div
            initial="hidden"
            animate="show"
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } },
            }}
            className="text-center"
          >
            {/* Eyebrow — title flanked by gold rules */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 14 },
                show: { opacity: 1, y: 0, transition: { duration: 0.7 } },
              }}
              className="flex items-center justify-center gap-3 sm:gap-4 mb-5 md:mb-6"
            >
              <span className="hero-rule" />
              <span className="font-mono text-[10px] md:text-xs tracking-[0.28em] md:tracking-[0.42em] uppercase text-gold/85">
                {resume.title[locale]}
              </span>
              <span className="hero-rule" />
            </motion.div>

            {/* Name */}
            <motion.h1
              variants={{
                hidden: { opacity: 0, y: 22 },
                show: { opacity: 1, y: 0, transition: { duration: 0.9 } },
              }}
              className="hero-title hero-display text-6xl sm:text-7xl md:text-8xl lg:text-9xl mb-5 md:mb-7"
            >
              <span className="text-gold-gradient">{resume.name[locale]}</span>
            </motion.h1>

            {/* Lede */}
            <motion.p
              variants={{
                hidden: { opacity: 0, y: 18 },
                show: { opacity: 1, y: 0, transition: { duration: 0.8 } },
              }}
              className="hero-lede max-w-xl mx-auto text-sm md:text-base leading-relaxed"
            >
              {isFa
                ? "هر مهره یک بخش از من است — کلیک کن، حرکت کن، بازی را تماشا کن."
                : "Each piece is a part of me — click, move, watch the game unfold."}
            </motion.p>
          </motion.div>

          {/* Play-with-me CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.0 }}
            className="mt-8 md:mt-14 flex flex-col items-center gap-3"
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

            <span className="font-mono text-[10px] tracking-[0.3em] uppercase hero-hint">
              {isFa
                ? "یا رزومه را پایین اسکرول کن"
                : "or scroll down to read the resume"}
            </span>
          </motion.div>
        </div>

        {/* Bottom hint — fades out quickly as the reader starts scrolling */}
        <motion.div style={{ opacity: hintOpacity }}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
            className="pb-8 flex flex-col items-center gap-2 pointer-events-none"
          >
            <ChevronsDown className="w-4 h-4 text-gold/60 animate-bounce" />
            <div className="text-[10px] tracking-[0.3em] uppercase hero-hint">
              {dict.misc.scrollHint}
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
