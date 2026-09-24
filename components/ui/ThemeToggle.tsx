"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

interface Props {
  className?: string;
  compactOnMobile?: boolean;
}

export function ThemeToggle({ className, compactOnMobile = false }: Props) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  // On /board, the global ThemeToggle from layout.tsx is suppressed
  // so /board can render it cleanly inside its responsive header
  if (!className && pathname === "/board") {
    return null;
  }

  const isDark = theme !== "light";

  const containerClass =
    className ??
    "fixed top-6 left-6 z-50 flex items-center gap-2 glass px-3 py-2 rounded-full border border-gold/30 text-gold/80 hover:text-gold hover:border-gold/60 hover:bg-gold/5 transition-all group";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={containerClass}
    >
      {/* Icon */}
      <span className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex items-center justify-center flex-shrink-0">
        {isDark ? (
          /* Sun */
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="4"/>
            <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
          </svg>
        ) : (
          /* Moon */
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
          </svg>
        )}
      </span>
      {/* Label */}
      <span className={`font-mono text-xs tracking-wider uppercase ${compactOnMobile ? "hidden sm:inline" : ""}`}>
        {isDark ? "Light" : "Dark"}
      </span>
    </button>
  );
}
