"use client";

import type { Locale } from "@/data/cells";

interface Props {
  locale: Locale;
  onChange: (l: Locale) => void;
  className?: string;
}

export function LanguageSwitcher({ locale, onChange, className }: Props) {
  const containerClass =
    className ??
    "fixed top-6 right-6 z-50 flex items-center gap-2 glass px-3 py-2 rounded-full";

  return (
    <div className={containerClass}>
      <button
        onClick={() => onChange("en")}
        className={`px-2.5 sm:px-3 py-1 text-xs font-medium tracking-wider uppercase rounded-full transition-all ${
          locale === "en"
            ? "bg-gold text-onyx shadow-sm font-semibold"
            : "text-ivory/60 hover:text-gold"
        }`}
      >
        EN
      </button>
      <span className="text-gold/30">·</span>
      <button
        onClick={() => onChange("fa")}
        className={`px-2.5 sm:px-3 py-1 text-xs font-medium tracking-wider rounded-full transition-all ${
          locale === "fa"
            ? "bg-gold text-onyx shadow-sm font-semibold font-fa"
            : "text-ivory/60 hover:text-gold"
        }`}
      >
        فا
      </button>
    </div>
  );
}
