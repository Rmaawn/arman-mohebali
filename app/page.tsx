"use client";

import { useEffect, useState } from "react";
import type { Locale } from "@/data/i18n";
import { ui } from "@/data/i18n";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import { Navigation } from "@/components/ui/Navigation";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Experience } from "@/components/sections/Experience";
import { Projects } from "@/components/sections/Projects";
import { Education } from "@/components/sections/Education";
import { Publications } from "@/components/sections/Publications";
import { Languages } from "@/components/sections/Languages";
import { Contact } from "@/components/sections/Contact";

export default function HomePage() {
  const [locale, setLocale] = useState<Locale>("en");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = localStorage.getItem("locale") as Locale | null;
    if (saved === "en" || saved === "fa") setLocale(saved);
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === "fa" ? "rtl" : "ltr";
    document.body.dir = locale === "fa" ? "rtl" : "ltr";
    if (typeof window !== "undefined") localStorage.setItem("locale", locale);
  }, [locale]);

  const dict = ui[locale];

  return (
    <main className="relative">
      <LanguageSwitcher locale={locale} onChange={setLocale} />
      <Navigation locale={locale} dict={dict} />

      <Hero locale={locale} dict={dict} />
      <About locale={locale} dict={dict} />
      <Skills locale={locale} dict={dict} />
      <Experience locale={locale} dict={dict} />
      <Projects locale={locale} dict={dict} />
      <Education locale={locale} dict={dict} />
      <Publications locale={locale} dict={dict} />
      <Languages locale={locale} dict={dict} />
      <Contact locale={locale} dict={dict} />
    </main>
  );
}
