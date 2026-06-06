export type Locale = "en" | "fa";

export const resume = {
  name: {
    en: "Arman Mohebali",
    fa: "آرمان محبعلی",
    // fa: "آرمان محب‌علی",
  },
  title: {
    en: "Software Solutions Developer",
    fa: "توسعه‌دهنده راهکارهای نرم‌افزاری",
  },
  location: {
    en: "Karaj, Alborz — Iran",
    fa: "کرج، البرز — ایران",
  },
  contact: {
    website: "arman-mohebali.ir",
    linkedin: "linkedin.com/in/rmaawn",
    github: "github.com/rmaawn",
    telegram: "t.me/arman_mohebali",
    whatsapp: "+98 933 862 3634",
    email: "armanmohebali@outlook.com",
  },
  about: {
    en: "Software Engineer building reliable automation systems for real-world workflows — combining Python, Flutter, WordPress, and digital product experience, while growing deeper into Data Science, Machine Learning, and LLMs.",
    fa: "مهندس نرم‌افزار با تمرکز بر ساخت سیستم‌های اتوماسیون قابل اتکا برای جریان‌های کاری واقعی — ترکیبی از Python، Flutter، WordPress و تجربه محصول دیجیتال، در حال عمیق‌تر شدن در علم داده، یادگیری ماشین و LLMها.",
  },
  skills: {
    design: {
      label: { en: "Design", fa: "طراحی" },
      items: ["WordPress", "Figma"],
    },
    coding: {
      label: { en: "Coding & Technologies", fa: "کدنویسی و تکنولوژی" },
      items: ["Linux", "Git", "Python", "Dart", "Flutter", "HTML5", "SEO & Content"],
    },
    devtools: {
      label: { en: "Development & Productivity", fa: "ابزارهای توسعه و بهره‌وری" },
      items: ["n8n", "Docker", "GitHub", "Claude", "Postman"],
    },
  },
  experience: [
    {
      company: "tadnaco.com",
      url: "https://tadnaco.com",
      role: { en: "Automation Engineer", fa: "مهندس اتوماسیون" },
      location: { en: "Dubai", fa: "دبی" },
      period: { en: "Feb 2026 — Present", fa: "بهمن ۱۴۰۴ — اکنون" },
      description: {
        en: "Designed and developed real-world automation systems using Python and n8n, focusing on scalable, modular, and production-ready architectures. Built automated workflows for data processing, AI-powered content generation, and multi-platform publishing — maintained as open-source on GitHub. Implemented scheduling, retry mechanisms, logging, API integrations, and content deduplication.",
        fa: "طراحی و توسعه سیستم‌های اتوماسیون واقعی با Python و n8n، با تمرکز بر معماری‌های مقیاس‌پذیر، ماژولار و آماده تولید. ساخت ورک‌فلوهای خودکار برای پردازش داده، تولید محتوای هوشمند و انتشار چندپلتفرمی. پیاده‌سازی scheduling، retry، logging، یکپارچه‌سازی API و حذف محتوای تکراری.",
      },
    },
    {
      company: "championsshop1.ir",
      url: "https://championsshop1.ir",
      role: { en: "E-Commerce Specialist", fa: "متخصص فروشگاه آنلاین" },
      location: { en: "Tehran", fa: "تهران" },
      period: { en: "Mar 2024 — Jan 2026", fa: "اسفند ۱۴۰۲ — دی ۱۴۰۴" },
      description: {
        en: "Launched an online store from scratch — solo. WordPress + WooCommerce design, technical SEO, SEO-optimized articles, sales strategy, order management, and accurate listing of 847 products in 241 categories. Within a year: 434K+ Google impressions, 20K+ clicks, 250+ active customers, and 500M Tomans in annual sales.",
        fa: "راه‌اندازی یک فروشگاه آنلاین از صفر — به‌تنهایی. طراحی با WordPress و WooCommerce، سئو تکنیکال، تولید مقالات سئو، استراتژی فروش، مدیریت سفارش‌ها و لیست‌سازی دقیق ۸۴۷ محصول در ۲۴۱ دسته‌بندی. در طول یک سال: بیش از ۴۳۴ هزار ایمپرشن از گوگل، ۲۰ هزار کلیک، ۲۵۰+ مشتری فعال و ۵۰۰ میلیون تومان فروش سالانه.",
      },
    },
    {
      company: "Pixlweb.ir",
      url: "https://pixlweb.ir",
      role: { en: "Web Designer & Admin", fa: "طراح و مدیر وب" },
      location: { en: "Karaj", fa: "کرج" },
      period: { en: "Apr 2023 — Sep 2024", fa: "فروردین ۱۴۰۲ — مهر ۱۴۰۳" },
      description: {
        en: "Comprehensive WordPress website design and management — domain acquisition, hosting setup, theme/plugin customization with Elementor. Managed content, product listing, technical support, and page design across e-commerce and content websites.",
        fa: "طراحی و مدیریت جامع سایت‌های WordPress — تهیه دامنه، راه‌اندازی هاست، شخصی‌سازی قالب و افزونه با Elementor. مدیریت محتوا، لیست محصولات، پشتیبانی فنی و طراحی صفحات در سایت‌های فروشگاهی و محتوایی.",
      },
      portfolio: ["sazoseda.ir", "olgashopping.com", "sephruya.com"],
    },
  ],
  projects: [
    {
      brand: "Nootika",
      name: "Reminder",
      year: "2024",
      status: "LIVE",
      link: "https://cafebazaar.ir/app/com.rmaan.nootika",
      description: {
        en: "A simple and elegant reminder & task management app — Flutter, Hive local DB, BLoC state management, and clean architecture.",
        fa: "یک اپلیکیشن ساده و خوش‌سلیقه برای یادآوری و مدیریت کارها — Flutter، دیتابیس Hive، مدیریت state با BLoC و معماری تمیز.",
      },
      details: {
        en: "Experience with Flutter packages: lottie, permission_handler, native_splash, alarm, share_plus.",
        fa: "تجربه کار با پکیج‌های Flutter: lottie، permission_handler، native_splash، alarm و share_plus.",
      },
    },
  ],
  education: {
    period: "2024 — 2028",
    grade: "17.5 / 20",
    degree: {
      en: "Associate Degree in Software Engineering",
      fa: "کاردانی مهندسی نرم‌افزار",
    },
    institution: {
      en: "Shamsipour Technical & Vocational College",
      fa: "دانشکده فنی و حرفه‌ای شمسی‌پور",
    },
  },
  certificates: [
    {
      issuer: "Everest IT Academy",
      title: {
        en: "PCAP — Python Certified Associate in Programming",
        fa: "PCAP — گواهی برنامه‌نویسی پایتون",
      },
      image: "/certificates/pcap.jpg",
    },
    {
      issuer: "Forage",
      title: {
        en: "Software Engineering Job Simulation",
        fa: "شبیه‌سازی شغلی مهندسی نرم‌افزار",
      },
      image: "/certificates/forage-se.jpg",
    },
    {
      issuer: { en: "Faradars", fa: "فرادرس" },
      title: {
        en: "Git, GitHub and GitLab Training",
        fa: "آموزش Git، GitHub و GitLab",
      },
      image: "/certificates/faradars-git.jpg",
    },
  ],
  seminar: {
    title: {
      en: "National Conference on Smart City & IoT",
      fa: "کنفرانس ملی شهر هوشمند و اینترنت اشیا",
    },
    description: {
      en: "Presented two research papers on smart city challenges and open-source business models. The event brought together engineers, urban planners, and researchers to explore digital transformation in Iranian cities.",
      fa: "ارائه دو مقاله پژوهشی درباره چالش‌های شهر هوشمند و مدل‌های کسب‌وکار در نرم‌افزار آزاد. این رویداد مهندسان، برنامه‌ریزان شهری و پژوهشگران را برای بررسی تحول دیجیتال در شهرهای ایران گرد هم آورد.",
    },
    // 👉 لینک خبر دانشگاه را اینجا بگذار (مثلاً "https://uni.ac.ir/news/...")
    link: "",
    images: [
      "/seminar/01.jpg",
      "/seminar/02.jpg",
      "/seminar/03.jpg",
      "/seminar/04.jpg",
    ],
  },
  // 👉 لینک هر مقاله را در فیلد url همان مقاله بگذار (مثلاً "https://civilica.com/doc/...")
  publications: [
    {
      publisher: "CIVILICA",
      title: {
        en: "Challenges and Transformations in Smart Cities",
        fa: "چالش‌ها و تحولات در شهرهای هوشمند",
      },
      url: "",
    },
    {
      publisher: "CIVILICA",
      title: {
        en: "Monetizing Freedom: Business Models in Free Software",
        fa: "کسب درآمد از آزادی: مدل‌های کسب‌وکار در نرم‌افزار آزاد",
      },
      url: "",
    },
    {
      publisher: "CIVILICA",
      title: {
        en: "User Privacy in Large Language Models",
        fa: "حریم خصوصی کاربر در مدل‌های زبانی بزرگ",
      },
      url: "",
    },
  ],
  languages: [
    { language: { en: "Persian", fa: "فارسی" }, level: { en: "Native", fa: "زبان مادری" }, value: 100 },
    { language: { en: "English", fa: "انگلیسی" }, level: { en: "Intermediate", fa: "متوسط" }, value: 50 },
  ],
} as const;

export type ResumeData = typeof resume;
