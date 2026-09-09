export const ui = {
  en: {
    nav: {
      about: "About",
      skills: "Skills",
      experience: "Experience",
      projects: "Projects",
      education: "Education",
      publications: "Publications",
      languages: "Languages",
      contact: "Contact",
    },
    sections: {
      aboutTitle: "About Me",
      skillsTitle: "Skills & Arsenal",
      experienceTitle: "Experience",
      projectsTitle: "Projects",
      educationTitle: "Education & Certifications",
      publicationsTitle: "Publications & Seminars",
      languagesTitle: "Languages",
      contactTitle: "Get in Touch",
    },
    chess: {
      king: "About",
      queen: "Experience",
      rook: "Projects",
      knight: "Skills",
      bishop: "Education",
      pawn: "More",
    },
    misc: {
      explore: "Press a piece to move",
      scrollHint: "Scroll to descend the board",
      live: "Live",
      current: "Currently here",
      portfolio: "Portfolio",
      grade: "Grade",
      certifications: "Certifications",
      enterTheBoard: "Enter the Board",
      yourMove: "Your move.",
      footerNote: "Crafted like a chess opening — precise, deliberate, engineered.",
      builtWith: "Built with Next.js · React Three Fiber · Tailwind",
      copyEmail: "Copy email",
      copied: "Copied!",
      vibeCoding: "Vibe Coding",
      vibeCodingDesc: "Engineered via Vibe Coding & AI collaboration",
    },
  },
  fa: {
    nav: {
      about: "درباره من",
      skills: "مهارت‌ها",
      experience: "تجربه",
      projects: "پروژه‌ها",
      education: "تحصیلات",
      publications: "مقالات",
      languages: "زبان‌ها",
      contact: "تماس",
    },
    sections: {
      aboutTitle: "درباره من",
      skillsTitle: "مهارت‌ها و ابزار",
      experienceTitle: "سوابق کاری",
      projectsTitle: "پروژه‌ها",
      educationTitle: "تحصیلات و گواهینامه‌ها",
      publicationsTitle: "سمینارها و مقالات",
      languagesTitle: "زبان‌ها",
      contactTitle: "تماس با من",
    },
    chess: {
      king: "درباره",
      queen: "تجربه",
      rook: "پروژه",
      knight: "مهارت",
      bishop: "تحصیلات",
      pawn: "بیشتر",
    },
    misc: {
      explore: "روی هر مهره کلیک کن تا حرکت کنه",
      scrollHint: "برای ادامه اسکرول کن",
      live: "فعال",
      current: "در حال همکاری",
      portfolio: "نمونه‌کار",
      grade: "معدل",
      certifications: "گواهینامه‌ها",
      enterTheBoard: "ورود به صفحه شطرنج",
      yourMove: "نوبت توست.",
      footerNote: "ساخته‌شده مثل یک گشایش شطرنج — دقیق، حساب‌شده، مهندسی‌شده.",
      builtWith: "ساخته‌شده با Next.js · React Three Fiber · Tailwind",
      copyEmail: "کپی ایمیل",
      copied: "کپی شد!",
      vibeCoding: "وایب کدینگ",
      vibeCodingDesc: "توسعه‌یافته با متدولوژی وایب کدینگ و هوش مصنوعی",
    },
  },
} as const;

export type Locale = "en" | "fa";
export type UIDict = {
  nav: Record<keyof typeof ui.en.nav, string>;
  sections: Record<keyof typeof ui.en.sections, string>;
  chess: Record<keyof typeof ui.en.chess, string>;
  misc: Record<keyof typeof ui.en.misc, string>;
};
