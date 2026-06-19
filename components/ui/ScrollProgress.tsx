"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/**
 * ScrollProgress — a thin gold bar pinned to the very top of the viewport that
 * fills left→right as the page is read. The raw scroll progress is passed
 * through a spring so the bar eases toward its target instead of tracking the
 * wheel 1:1, which pairs with the Lenis momentum and feels alive.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 z-[60] h-[3px] origin-left
                 bg-gradient-to-r from-gold-700 via-gold to-gold-50
                 shadow-[0_0_12px_rgba(212,175,55,0.55)]"
    />
  );
}
