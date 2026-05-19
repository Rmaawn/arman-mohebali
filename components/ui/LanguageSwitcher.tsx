"use client";

import type { Locale } from "@/data/i18n";

interface Props {
  locale: Locale;
  onChange: (l: Locale) => void;
}

export function LanguageSwitcher({ locale, onChange }: Props) {
  return (
    <div className="fixed top-6 right-6 z-50 flex items-center gap-2 glass px-3 py-2 rounded-full">
      <button
        onClick={() => onChange("en")}
        className={`px-3 py-1 text-xs font-medium tracking-wider uppercase rounded-full transition-all ${
          locale === "en"
            ? "bg-gold text-onyx"
            : "text-ivory/60 hover:text-gold"
        }`}
      >
        EN
      </button>
      <span className="text-gold/30">·</span>
      <button
        onClick={() => onChange("fa")}
        className={`px-3 py-1 text-xs font-medium tracking-wider rounded-full transition-all ${
          locale === "fa"
            ? "bg-gold text-onyx"
            : "text-ivory/60 hover:text-gold"
        }`}
      >
        فا
      </button>
    </div>
  );
}
