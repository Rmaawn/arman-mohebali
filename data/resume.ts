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
      status: "LIVE",
      link: "https://cafebazaar.ir/app/com.rmaan.nootika",
      image: "/projects/nootika.webp",
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
      issuer: "Everest IT Academy",
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
      issuer: "Forage",
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
      issuer: "Anthropic",
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
      issuer: "Kaggle",
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
        "/seminar/01.webp",
        "/seminar/02.webp",
        "/seminar/03.webp",
        "/seminar/04.webp",
      ],
    },
    {
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
        "/seminar/01.webp",
        "/seminar/02.webp",
        "/seminar/03.webp",
        "/seminar/04.webp",
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
