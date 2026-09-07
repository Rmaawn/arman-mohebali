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
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-100px" }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.1 } },
      }}
      className="mb-8 sm:mb-10 md:mb-16 flex items-center gap-3 sm:gap-4 md:gap-6 min-w-0"
    >
      <motion.span
        variants={{
          hidden: { opacity: 0, scale: 0.5, rotate: -12 },
          show: {
            opacity: 1,
            scale: 1,
            rotate: 0,
            transition: { duration: 0.6, ease: [0.34, 1.56, 0.64, 1] },
          },
        }}
        className="text-2xl sm:text-3xl md:text-5xl text-gold/80 flex-shrink-0"
      >
        {icon}
      </motion.span>

      <div className="flex-1 min-w-0">
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 12, filter: "blur(6px)" },
            show: {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
            },
          }}
          className="text-[10px] sm:text-xs tracking-[0.25em] sm:tracking-[0.3em] uppercase text-gold/70 mb-1 sm:mb-2 truncate"
        >
          {label}
        </motion.div>
        <motion.h2
          variants={{
            hidden: { opacity: 0, y: 22, filter: "blur(8px)" },
            show: {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              transition: { duration: 0.7, ease: [0.4, 0, 0.2, 1] },
            },
          }}
          className="section-heading text-xl sm:text-3xl md:text-4xl lg:text-5xl text-ivory whitespace-nowrap overflow-hidden text-ellipsis"
        >
          {title}
        </motion.h2>
      </div>

      {/* Gold rule that draws itself outward — hidden on small mobile to give title max space */}
      <motion.div
        variants={{
          hidden: { scaleX: 0, opacity: 0 },
          show: {
            scaleX: 1,
            opacity: 1,
            transition: { duration: 0.9, ease: [0.4, 0, 0.2, 1] },
          },
        }}
        className="hidden sm:block flex-1 h-px origin-left bg-gradient-to-r from-gold/40 to-transparent"
      />
    </motion.div>
  );
}
