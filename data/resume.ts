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
    website: "armanmohebali.ir",
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
  // ════════════════════════════════════════════════════════════════
  // SKILLS  —  ویرایش از همین‌جا
  //   • هر گروه یک { label, items } است.
  //   • هر مهارت: { name, level } که level درصد تسلط (۰ تا ۱۰۰) است.
  //   • برای افزودن مهارت کافیست یک { name, level } به items اضافه کنی.
  //   • برای حذف، خط مربوطه را پاک کن. برای ادیت، name یا level را تغییر بده.
  //   • آیکون هر مهارت خودکار از روی name انتخاب می‌شود (در Skills.tsx).
  // ════════════════════════════════════════════════════════════════
  skills: [
    {
      label: { en: "Core Technologies", fa: "فناوری‌های اصلی" },
      items: [
        { name: "Python", level: 92 },
        { name: "Dart", level: 82 },
        { name: "Flutter", level: 85 },
      ],
    },
    {
      label: { en: "Software Engineering", fa: "مهندسی نرم‌افزار" },
      items: [
        { name: "Data Structures", level: 85 },
        { name: "Algorithms", level: 80 },
        { name: "OOP", level: 90 },
        // { name: "Design Patterns", level: 78 },
        { name: "SOLID Principles", level: 80 },
        { name: "REST APIs", level: 88 },
      ],
    },
    {
      label: { en: "Backend & Data", fa: "بک‌اند و داده" },
      items: [
        { name: "FastAPI", level: 85 },
        { name: "PostgreSQL", level: 80 },
        { name: "SQLite", level: 88 },
        { name: "Hive", level: 82 },
      ],
    },
    // {
    //   label: { en: "System Design", fa: "طراحی سیستم" },
    //   items: [
    //     { name: "System Design", level: 72 },
    //     { name: "Caching", level: 75 },
    //     { name: "Concurrency", level: 70 },
    //     { name: "Networking", level: 76 },
    //     { name: "HTTP Internals", level: 80 },
    //   ],
    // },
    // {
    //   label: { en: "Automation & AI", fa: "اتوماسیون و هوش مصنوعی" },
    //   items: [
    //     { name: "Workflow Automation", level: 92 },
    //     { name: "n8n", level: 92 },
    //     { name: "LLM Integration", level: 85 },
    //     { name: "RAG", level: 80 },
    //     { name: "LangGraph", level: 72 },
    //     { name: "Vector Databases", level: 75 },
    //   ],
    // },
    {
      label: { en: "DevOps & Cloud", fa: "دواپس و کلاد" },
      items: [
        { name: "Linux", level: 85 },
        { name: "Docker", level: 82 },
        { name: "Git", level: 90 },
        { name: "GitHub Actions", level: 80 },
        { name: "CI/CD", level: 78 },
        // { name: "AWS", level: 68 },
      ],
    },
    {
      label: { en: "Web & CMS", fa: "وب و مدیریت محتوا" },
      items: [
        { name: "WordPress", level: 92 },
        { name: "WooCommerce", level: 90 },
        { name: "Technical SEO", level: 85 },
        { name: "HTML/CSS", level: 88 },
      ],
    },
    {
      label: { en: "Tools & Platforms", fa: "ابزارها و پلتفرم‌ها" },
      items: [
        { name: "GitHub", level: 92 },
        { name: "Postman", level: 85 },
        { name: "Figma", level: 80 },
        { name: "Claude", level: 90 },
        { name: "OpenAI APIs", level: 85 },
      ],
    },
  ],
  experience: [
    {
      company: "tadnaco.com",
      url: "https://tadnaco.com",
      logo: "/logos/tadnaco.webp",
      role: { en: "Automation Engineer", fa: "مهندس اتوماسیون" },
      location: { en: "Dubai & Tehran", fa: "دبی و تهران" },
      period: { en: "Feb 2026 — Present", fa: "بهمن ۱۴۰۴ — اکنون" },
      start: "2026-02",
      end: null,
      description: {
        en: "Designed and developed real-world automation systems using Python and n8n, focusing on scalable, modular, and production-ready architectures. Built automated workflows for data processing, AI-powered content generation, and multi-platform publishing — maintained as open-source on GitHub. Implemented scheduling, retry mechanisms, logging, API integrations, and content deduplication.",
        fa: "طراحی و توسعه سیستم‌های اتوماسیون واقعی با Python و n8n، با تمرکز بر معماری‌های مقیاس‌پذیر، ماژولار و آماده تولید. ساخت ورک‌فلوهای خودکار برای پردازش داده، تولید محتوای هوشمند و انتشار چندپلتفرمی. پیاده‌سازی scheduling، retry، logging، یکپارچه‌سازی API و حذف محتوای تکراری.",
      },
    },
    {
      company: "championsshop1.ir",
      url: "https://championsshop1.ir",
      logo: "/logos/championsshop1.webp",
      role: { en: "E-Commerce Specialist", fa: "متخصص فروشگاه آنلاین" },
      location: { en: "Tehran", fa: "تهران" },
      period: { en: "Mar 2024 — Jan 2026", fa: "اسفند ۱۴۰۲ — دی ۱۴۰۴" },
      start: "2024-03",
      end: "2026-01",
      description: {
        en: "Launched an online store from scratch — solo. WordPress + WooCommerce design, technical SEO, SEO-optimized articles, sales strategy, order management, and accurate listing of 847 products in 241 categories. Within a year: 434K+ Google impressions, 20K+ clicks, 250+ active customers, and 500M Tomans in annual sales.",
        fa: "راه‌اندازی یک فروشگاه آنلاین از صفر — به‌تنهایی. طراحی با WordPress و WooCommerce، سئو تکنیکال، تولید مقالات سئو، استراتژی فروش، مدیریت سفارش‌ها و لیست‌سازی دقیق ۸۴۷ محصول در ۲۴۱ دسته‌بندی. در طول یک سال: بیش از ۴۳۴ هزار ایمپرشن از گوگل، ۲۰ هزار کلیک، ۲۵۰+ مشتری فعال و ۵۰۰ میلیون تومان فروش سالانه.",
      },
    },
    {
      company: "Pixlweb.ir",
      url: "https://pixlweb.ir",
      logo: "/logos/pixlweb.webp",
      role: { en: "Web Designer & Admin", fa: "طراح و مدیر وب" },
      location: { en: "Karaj", fa: "کرج" },
      period: { en: "Apr 2023 — Sep 2024", fa: "فروردین ۱۴۰۲ — مهر ۱۴۰۳" },
      start: "2023-04",
      end: "2024-09",
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
      date: {
        en: "2024 · Shipped on Bazaar",
        fa: "۱۴۰۳ · منتشر شده در کافه‌بازار",
      },
      status: "LIVE",
      link: "https://cafebazaar.ir/app/com.rmaan.nootika",
      image: "/projects/nootika.webp",
      images: [
        "/projects/nootika-1.webp",
        "/projects/nootika-2.webp",
        "/projects/nootika-3.webp",
      ],
      technologies: [
        "Flutter",
        "Dart",
        "BLoC",
        "Hive DB",
        "Clean Architecture",
        "Material 3",
        "Lottie",
      ],
      description: {
        en: "A simple and elegant reminder & task management app — Flutter, Hive local DB, BLoC state management, and clean architecture.",
        fa: "یک اپلیکیشن ساده و خوش‌سلیقه برای یادآوری و مدیریت کارها — Flutter، دیتابیس Hive، مدیریت state با BLoC و معماری تمیز.",
      },
      details: {
        en: "Experience with Flutter packages: lottie, permission_handler, native_splash, alarm, share_plus.",
        fa: "تجربه کار با پکیج‌های Flutter: lottie، permission_handler، native_splash، alarm و share_plus.",
      },
      highlights: {
        en: [
          "Offline-First data storage using Hive with instant read/write operations",
          "Clean Architecture with BLoC for predictable, testable, and robust state flow",
          "Battery-optimized native background alarms & reliable reminders",
          "Delightful tactile micro-interactions with Lottie & Material Design 3",
        ],
        fa: [
          "معماری آفلاین‌محور با دیتابیس سریع Hive بدون کمترین تاخیر در خواندن و نوشتن",
          "معماری تمیز (Clean Architecture) همراه با الگوی BLoC برای جریان وضعیت پایدار و تست‌پذیر",
          "زمان‌بندی دقیق و بهینه آلارم‌ها و یادآورهای پس‌زمینه بدون مصرف اضافه باتری",
          "انیمیشن‌ها و تعاملات لمسی جذاب با Lottie و متریال دیزاین ۳",
        ],
      },
    },
    {
      brand: "Nootika",
      name: "Architecture & Core",
      year: "2024",
      date: {
        en: "2024 · Core Engine",
        fa: "۱۴۰۳ · معماری و هسته",
      },
      status: "LIVE",
      link: "https://cafebazaar.ir/app/com.rmaan.nootika",
      image: "/projects/nootika-2.webp",
      images: [
        "/projects/nootika-2.webp",
        "/projects/nootika-1.webp",
        "/projects/nootika-3.webp",
      ],
      technologies: [
        "Flutter BLoC",
        "Repository Pattern",
        "Hive NoSQL",
        "Dependency Injection",
        "Clean Architecture",
      ],
      description: {
        en: "The architectural foundation of Nootika — structured around domain, data, and presentation boundaries for long-term scalability.",
        fa: "زیرساخت معماری پروژه نوتیکا — ساختاریافته بر اساس تفکیک لایه‌های Domain، Data و Presentation برای مقیاس‌پذیری و پایداری بلندمدت.",
      },
      details: {
        en: "Engineered with strict separation of concerns, testable use-cases, and optimized local persistence.",
        fa: "طراحی‌شده با تفکیک دقیق وظایف (Separation of Concerns)، یوزکیس‌های تست‌پذیر و ذخیره‌سازی محلی بهینه.",
      },
      highlights: {
        en: [
          "Strict separation between presentation widgets and business logic",
          "Custom repository abstractions decoupling local storage from domain entities",
          "Zero crash rate with comprehensive error handling and safe fallbacks",
        ],
        fa: [
          "تفکیک کامل ویجت‌های نمایشی از لایه منطق بیزینس",
          "پیاده‌سازی لایه Repository جهت عدم وابستگی انتیتی‌ها به دیتابیس",
          "پایداری حداکثری و مدیریت کامل خطاها در تمام جریان‌های اپلیکیشن",
        ],
      },
    },
    {
      brand: "Nootika",
      name: "Offline Storage & Sync",
      year: "2024",
      date: {
        en: "2024 · Data Layer",
        fa: "۱۴۰۳ · لایه داده و ذخیره‌سازی",
      },
      status: "LIVE",
      link: "https://cafebazaar.ir/app/com.rmaan.nootika",
      image: "/projects/nootika-3.webp",
      images: [
        "/projects/nootika-3.webp",
        "/projects/nootika-1.webp",
        "/projects/nootika-2.webp",
      ],
      technologies: [
        "Hive",
        "TypeAdapters",
        "Binary Serialization",
        "Local DB",
        "Dart",
      ],
      description: {
        en: "High-performance embedded NoSQL database solution powered by Hive, delivering instant boot times and zero database lag.",
        fa: "سیستم ذخیره‌سازی محلی NoSQL با کارایی فوق‌العاده بر پایه Hive، تضمین‌کننده لودینگ آنی و عملکرد روان برنامه.",
      },
      details: {
        en: "Custom Hive TypeAdapters for fast binary serialization and compact on-device disk footprint.",
        fa: "تایپ‌ادپترهای سفارشی برای سریالایز باینری پرسرعت و اشغال حداقل فضای حافظه دستگاه.",
      },
      highlights: {
        en: [
          "Ultra-fast key-value & box queries with sub-millisecond retrieval",
          "Strongly typed binary models with auto-generated type adapters",
          "Encrypted boxes support for secure user preferences and reminders",
        ],
        fa: [
          "کوئری‌های فوق‌سریع کمتر از میلی‌ثانیه روی Boxهای محلی",
          "مدل‌های داده‌ای Strongly Typed با امنیت بالا در ذخیره‌سازی",
          "پشتیبانی از باکس‌های رمزنگاری‌شده برای داده‌های حساس کاربر",
        ],
      },
    },
    {
      brand: "Nootika",
      name: "UI & Interaction",
      year: "2024",
      date: {
        en: "2024 · Design System",
        fa: "۱۴۰۳ · دیزاین سیستم و تعاملات",
      },
      status: "LIVE",
      link: "https://cafebazaar.ir/app/com.rmaan.nootika",
      image: "/projects/nootika-1.webp",
      images: [
        "/projects/nootika-1.webp",
        "/projects/nootika-3.webp",
        "/projects/nootika-2.webp",
      ],
      technologies: [
        "Material 3",
        "Lottie Animations",
        "Haptic Feedback",
        "Dynamic Theming",
        "Custom Painters",
      ],
      description: {
        en: "Polished user experience with Material 3 design tokens, smooth Lottie micro-interactions, and responsive layout scaling.",
        fa: "تجربه کاربری دقیق و دلنشین با اصول طراحی متریال ۳، انیمیشن‌های ظریف Lottie و تعاملات لمسی پاسخگو.",
      },
      details: {
        en: "Crafted with attention to typography, fluid state transitions, and accessible dark/light contrast.",
        fa: "پیاده‌سازی‌شده با دقت به تایپوگرافی، ترنزیشن‌های نرم و کنتراست رنگی استاندارد در تم‌های تیره و روشن.",
      },
      highlights: {
        en: [
          "Smooth interactive micro-animations with 60fps Lottie vector graphics",
          "Consistent Material 3 surface elevation, color palette, and iconography",
          "Haptic feedback triggers on task completion and timer setting",
        ],
        fa: [
          "میکرو انیمیشن‌های تعاملی ۶۰ فریم با گرافیک‌های وکتوری Lottie",
          "هماهنگی کامل پالت رنگی و استانداردهای ارتفاع بصری متریال ۳",
          "فیدبک‌های لرزشی (Haptic) هنگام تکمیل کارها و تنظیم یادآور",
        ],
      },
    },
  ],
  // ════════════════════════════════════════════════════════════════
  // EDUCATION  —  ویرایش از همین‌جا
  //   • هر مقطع تحصیلی یک بلوک { period, grade, degree, institution } است.
  //   • برای افزودن مقطع جدید، کل یک بلوک {...} را کپی کن و زیرش بگذار.
  //   • برای حذف، کل بلوک {...} مربوطه را پاک کن.
  //   • grade اختیاری است؛ اگر نخواستی نمایش داده شود، مقدارش را "" بگذار.
  // ════════════════════════════════════════════════════════════════
  education: [
    {
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
  ],
  // ════════════════════════════════════════════════════════════════
  // CERTIFICATES  —  ویرایش از همین‌جا
  //   • هر مدرک یک بلوک { issuer, title, description, image } است.
  //   • برای افزودن مدرک جدید، کل یک بلوک {...} را کپی کن و زیرش بگذار.
  //   • برای حذف، کل بلوک {...} مربوطه را پاک کن.
  //   • description اختیاری است؛ نخواستی کل خط را پاک کن.
  //   • image: فایل را در public/certificates/ بگذار و مسیرش را اینجا بنویس.
  // ════════════════════════════════════════════════════════════════
  certificates: [
    {
      issuer: { en: "Everest IT Academy", fa: "کالج اورست" },
      title: {
        en: "PCAP — Python Certified Associate in Programming",
        fa: "PCAP — گواهی برنامه‌نویسی پایتون",
      },
      description: {
        en: "This course marked the beginning of my journey in software development. At the age of 16, I gained a solid understanding of programming fundamentals, algorithmic thinking, and problem-solving, which motivated me to pursue software engineering more seriously.",
        fa: "این دوره نقطه آغاز مسیر حرفه‌ای من در برنامه‌نویسی بود. در سن ۱۶ سالگی با شرکت در این دوره حضوری، با مفاهیم بنیادین برنامه‌نویسی، تفکر الگوریتمی و حل مسئله آشنا شدم و علاقه‌ام به توسعه نرم‌افزار را به‌صورت جدی دنبال کردم.",
      },
      image: "/certificates/pcap.webp",
    },
    {
      issuer: { en: "Forage", fa: "فوریج" },
      title: {
        en: "Software Engineering Job Simulation",
        fa: "شبیه‌سازی شغلی مهندسی نرم‌افزار",
      },
      description: {
        en: "This job simulation provided hands-on exposure to workflows commonly found in professional software engineering environments. It helped me better understand industry practices, team collaboration, and the professional mindset required for building software at scale.",
        fa: "این دوره در قالب یک شبیه‌سازی نزدیک به محیط‌های کاری واقعی، بخشی از مسئولیت‌ها و فرآیندهای روزمره مهندسان نرم‌افزار در شرکت‌های حرفه‌ای را بازسازی می‌کرد. تجربه آن دید بهتری نسبت به استانداردهای کاری، همکاری تیمی و رویکرد حرفه‌ای در توسعه نرم‌افزار به من داد.",
      },
      image: "/certificates/forage-se.webp",
    },
    {
      issuer: { en: "Faradars", fa: "فرادرس" },
      title: {
        en: "Git, GitHub and GitLab Training",
        fa: "آموزش Git، GitHub و GitLab",
      },
      description: {
        en: "This course introduced me to version control best practices using Git. It enabled me to manage projects more professionally, track code changes efficiently, and leverage GitHub and GitLab for collaboration, deployment, and code maintenance.",
        fa: "در این دوره با اصول کنترل نسخه و گردش‌کار حرفه‌ای Git آشنا شدم. پس از آن توانستم پروژه‌هایم را با ساختاری استاندارد مدیریت کرده، تغییرات را به‌صورت مؤثر ردیابی کنم و از GitHub و GitLab برای همکاری، استقرار و نگهداری کد استفاده کنم.",
      },
      image: "/certificates/faradars-git.webp",
    },
    {
      // 👉 issuer را با نام صادرکننده‌ی واقعی جایگزین کن (مثلاً "Anthropic")
      issuer: { en: "Anthropic", fa: "انتروپیک" },
      title: {
        en: "Claude Code 101",
        fa: "Claude Code 101",
      },
      description: {
        en: "This course introduced me to Claude Code and practical AI-assisted software development workflows. Since completing it, I have applied these skills across real-world projects to improve development speed, code quality, and problem-solving efficiency.",
        fa: "این دوره من را با اصول کار با Claude Code و استفاده عملی از ابزارهای هوش مصنوعی در فرایند توسعه نرم‌افزار آشنا کرد. پس از گذراندن آن، توانستم از این ابزار در پروژه‌های واقعی برای افزایش سرعت توسعه، بهبود کیفیت کد و تسهیل فرایند حل مسئله استفاده کنم.",
      },
      // 👉 فایل تصویر را در public/certificates/ با همین نام بگذار
      image: "/certificates/claude-code-101.webp",
    },
    {
      // 👉 issuer را با نام صادرکننده‌ی واقعی جایگزین کن (مثلاً "Kaggle")
      issuer: { en: "DataCamp", fa: "دیتاکمپ" },
      title: {
        en: "Introduction to SQL",
        fa: "مقدمه‌ای بر SQL",
      },
      description: {
        en: "This course provided a solid foundation in database concepts and SQL. It strengthened my ability to write practical queries, work with structured data, and understand the fundamentals of modern database systems.",
        fa: "این دوره پایه‌ای مستحکم برای درک مفاهیم پایگاه داده و زبان SQL در اختیارم قرار داد. علاوه بر آشنایی با ساختار و طراحی داده‌ها، مهارت من در نوشتن کوئری‌های کاربردی و کار با داده‌های واقعی را نیز تقویت کرد.",
      },
      // 👉 فایل تصویر را در public/certificates/ با همین نام بگذار
      image: "/certificates/sql-intro.webp",
    },
  ],
  // ════════════════════════════════════════════════════════════════
  // SEMINARS  —  ویرایش از همین‌جا
  //   • هر سمینار یک بلوک { title, description, link, images } است.
  //   • برای افزودن سمینار جدید، کل یک بلوک {...} را کپی کن و زیرش بگذار.
  //   • برای حذف، کل بلوک {...} مربوطه را پاک کن.
  //   • link: لینک خبر دانشگاه (خالی بگذاری دکمه‌اش غیرفعال می‌شود).
  //   • images: مسیر عکس‌ها؛ هرچند تا خواستی کم/زیاد کن.
  // ════════════════════════════════════════════════════════════════
  seminars: [
    {
      title: {
        en: "Prompt Engineering: The Art of Communicating with AI",
        fa: "مهندسی پرامپت؛ هنر گفتگو با هوش مصنوعی",
      },
      // زیرعنوان (نقش/محل) — کنار عنوان نمایش داده می‌شود.
      subtitle: {
        en: "Speaker & Workshop Organizer — Shahid Shamsipour Technical and Vocational College",
        fa: "سخنران و برگزارکننده کارگاه تخصصی — دانشکده فنی و حرفه‌ای شهید شمسی‌پور",
      },
      // 📅 تاریخ — در یک باکس جدا کنار عنوان می‌آید.
      date: {
        en: "December 2025",
        fa: "آذر ۱۴۰۴",
      },
      description: {
        en: "I co-organized and presented a technical workshop on Prompt Engineering and effective interaction with Large Language Models (LLMs) at Shahid Shamsipour Technical and Vocational College. The workshop focused on practical techniques for designing high-quality prompts, improving AI-generated outputs, and building structured communication strategies with modern AI systems — covering prompt decomposition, step-by-step reasoning, prompt patterns, self-refinement workflows, system prompts, reverse prompting, and creating reusable master prompts. The event was organized in collaboration with the Computer Science Student Association and the Research & Technology Department, attracting students and technology enthusiasts interested in artificial intelligence and emerging technologies. This seminar marked my first public technical speaking experience and provided an opportunity to share practical AI knowledge while helping participants develop more effective workflows for learning, content creation, problem-solving, and software development using AI tools.",
        fa: "در این رویداد تخصصی، به عنوان سخنران و برگزارکننده کارگاه «مهندسی پرامپت؛ هنر گفتگو با هوش مصنوعی» در دانشکده فنی و حرفه‌ای شهید شمسی‌پور حضور داشتم. هدف این کارگاه آموزش اصول و تکنیک‌های کاربردی برای برقراری ارتباط مؤثر با مدل‌های هوش مصنوعی و طراحی پرامپت‌های حرفه‌ای بود؛ موضوعاتی مانند جزئی‌سازی درخواست‌ها، تفکر مرحله‌ای، استفاده از الگوهای پرامپت، طراحی System Prompt، تکنیک Reverse Prompting، چرخه بهبود پرامپت‌ها و ساخت Master Prompt شخصی در آن بررسی شد. این رویداد با همکاری انجمن علمی کامپیوتر و معاونت پژوهش و فناوری برگزار شد و میزبان دانشجویان و علاقه‌مندان حوزه هوش مصنوعی و فناوری اطلاعات بود. این سمینار نخستین تجربه رسمی من در حوزه سخنرانی فنی و آموزشی بود و فرصتی ارزشمند فراهم کرد تا دانش و تجربیاتم را در زمینه هوش مصنوعی با دیگران به اشتراک بگذارم و به علاقه‌مندان کمک کنم از ابزارهای هوش مصنوعی در یادگیری، تولید محتوا، برنامه‌نویسی و حل مسئله بهره‌وری بیشتری داشته باشند.",
      },
      // سرفصل‌ها — به‌صورت تگ نمایش داده می‌شوند (می‌توانی کم/زیاد کنی).
      topics: [
        { en: "Fundamentals of Prompt Engineering", fa: "مبانی مهندسی پرامپت" },
        { en: "Prompt Patterns & Templates", fa: "الگوها و قالب‌های پرامپت‌نویسی" },
        { en: "Chain-of-Thought Reasoning", fa: "تفکر گام‌به‌گام (Chain of Thought)" },
        { en: "System Prompt Design", fa: "طراحی System Prompt" },
        { en: "Reverse Prompting Techniques", fa: "تکنیک Reverse Prompting" },
        { en: "Self-Improving Prompt Workflows", fa: "ساخت چرخه بهبود پرامپت" },
        { en: "Master Prompt Creation", fa: "طراحی Master Prompt شخصی" },
        { en: "Practical AI Applications for Developers & Students", fa: "کاربردهای عملی هوش مصنوعی برای دانشجویان و توسعه‌دهندگان" },
      ],
      // 👉 لینک خبر دانشگاه را اینجا بگذار (مثلاً "https://uni.ac.ir/news/...")
      link: "https://shamsipour.tvu.ac.ir/fa/713548/",
      images: [
        "/seminar/01.webp",
        "/seminar/02.webp",
        "/seminar/03.webp",
        "/seminar/04.webp",
      ],
    },
    {
      title: {
        en: "IoT Summit 2025 – Industry & Innovation Forum",
        fa: "نخستین همایش تخصصی اینترنت اشیاء (IoT Summit)",
      },
      subtitle: {
        en: "Invited Participant & Computer Science Student Association Representative",
        fa: "شرکت‌کننده دعوت‌شده و نماینده انجمن علمی کامپیوتر دانشکده شهید شمسی‌پور",
      },
      date: {
        en: "Feb 16, 2026",
        fa: "۲۷ بهمن ۱۴۰۴",
      },
      description: {
        en: "I was invited to attend the first IoT Summit — held at Sharif University of Technology — as a representative of the Computer Science Student Association of Shahid Shamsipour Technical and Vocational College. The event brought together industry leaders, startup founders, technology executives, and IoT specialists to discuss emerging trends, real-world applications, and future opportunities in the Internet of Things ecosystem. Throughout the summit, I gained valuable insights into industrial IoT solutions, smart transportation systems, connected devices, startup innovation, and the evolving role of IoT in digital transformation — and engaged with professionals from leading technology companies to explore potential collaborations between academia and industry. Being selected for this invitation-only event was a valuable experience that strengthened my understanding of how modern IoT technologies are applied in real-world business and engineering environments.",
        fa: "به عنوان نماینده انجمن علمی کامپیوتر دانشکده ملی مهارت شهید شمسی‌پور، به دعوت شرکت نیراسیستم در نخستین همایش تخصصی اینترنت اشیاء (IoT Summit) که در دانشگاه صنعتی شریف برگزار شد، حضور پیدا کردم. این رویداد با حضور مدیران ارشد، بنیان‌گذاران استارتاپ‌ها، متخصصان صنعت و فعالان حوزه فناوری برگزار شد و به بررسی آخرین دستاوردها، کاربردهای عملی و روندهای آینده اینترنت اشیاء در صنایع مختلف پرداخت. در طول این همایش با نمونه‌های واقعی استفاده از فناوری‌های IoT در حوزه‌هایی مانند حمل‌ونقل هوشمند، مدیریت ناوگان، سخت‌افزارهای متصل، استارتاپ‌های فناوری و تحول دیجیتال آشنا شدم و فرصت ارزشمندی برای تعامل با متخصصان صنعت و آشنایی نزدیک‌تر با نیازها و چالش‌های واقعی کسب‌وکارها فراهم شد. حضور در این رویداد تخصصی و دعوت‌محور، تجربه‌ای ارزشمند در مسیر توسعه حرفه‌ای من بود و دید عمیق‌تری نسبت به نقش اینترنت اشیاء در آینده محصولات و سامانه‌های هوشمند ایجاد کرد.",
      },
      topics: [
        { en: "Industrial Internet of Things (IIoT)", fa: "اینترنت اشیاء صنعتی (IIoT)" },
        { en: "Smart Mobility & Fleet Management", fa: "مدیریت ناوگان و حمل‌ونقل هوشمند" },
        { en: "IoT Startup Ecosystems", fa: "اکوسیستم استارتاپ‌های IoT" },
        { en: "Connected Hardware & Embedded Systems", fa: "سخت‌افزارهای متصل و سیستم‌های Embedded" },
        { en: "Smart Transportation Technologies", fa: "خدمات و زیرساخت‌های هوشمند" },
        { en: "Industry-Academia Collaboration", fa: "ارتباط صنعت و دانشگاه" },
        { en: "Future Trends in IoT & Digital Transformation", fa: "روندهای آینده اینترنت اشیاء و تحول دیجیتال" },
      ],
      // 👉 لینک خبر دانشگاه را اینجا بگذار (مثلاً "https://uni.ac.ir/news/...")
      link: "https://shamsipour.tvu.ac.ir/fa/715530/",
      images: [
        "/seminar/05.webp",
        "/seminar/06.webp",
        "/seminar/07.webp",
        "/seminar/08.webp",
      ],
    },
  ],
  // 👉 لینک هر مقاله را در فیلد url همان مقاله بگذار (مثلاً "https://civilica.com/doc/...")
  publications: [
    {
      publisher: "CIVILICA",
      title: {
        en: "Challenges and Transformations in Smart Cities",
        fa: "چالش‌ها و تحولات در شهرهای هوشمند",
      },
      url: "https://civilica.com/doc/2505441/",
    },
    {
      publisher: "CIVILICA",
      title: {
        en: "Monetizing Freedom: Business Models in Free Software",
        fa: "کسب درآمد از آزادی: مدل‌های کسب‌وکار در نرم‌افزار آزاد",
      },
      url: "https://civilica.com/doc/2541596/",
    },
    {
      publisher: "CIVILICA",
      title: {
        en: "User Privacy in Large Language Models",
        fa: "حریم خصوصی کاربر در مدل‌های زبانی بزرگ",
      },
      url: "https://civilica.com/doc/2541605/",
    },
  ],
  languages: [
    { language: { en: "Persian", fa: "فارسی" }, level: { en: "Native", fa: "زبان مادری" }, value: 100 },
    { language: { en: "English", fa: "انگلیسی" }, level: { en: "Intermediate", fa: "متوسط" }, value: 50 },
  ],
} as const;

export type ResumeData = typeof resume;
