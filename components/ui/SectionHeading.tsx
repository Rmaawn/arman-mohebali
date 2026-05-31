"use client";

import { motion } from "framer-motion";

interface Props {
  icon: string;
  label: string;
  title: string;
}

export function SectionHeading({ icon, label, title }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
      className="mb-10 md:mb-16 flex items-center gap-4 md:gap-6"
    >
      <span className="text-3xl md:text-5xl text-gold/80 flex-shrink-0">{icon}</span>
      <div className="flex-1">
        <div className="text-xs tracking-[0.3em] uppercase text-gold/70 mb-2">
          {label}
        </div>
        <h2 className="section-heading text-3xl md:text-4xl lg:text-5xl text-ivory">{title}</h2>
      </div>
      <div className="flex-1 h-px bg-gradient-to-r from-gold/40 to-transparent" />
    </motion.div>
  );
}
