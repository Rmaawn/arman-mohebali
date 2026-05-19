/**
 * The board is 8 files (columns A..H) × 8 ranks (rows 1..8).
 *
 *  Files (columns) — one per resume section:
 *    A → Header + Contact
 *    B → About Me
 *    C → Skills
 *    D → Experience
 *    E → Projects
 *    F → Education + Certifications
 *    G → Publications + Seminars
 *    H → Languages
 *
 *  Ranks (rows 1..8) — every cell of a file is one item of that section.
 *  Empty cells are `null` (decorative, not clickable).
 *
 *  Visual layout (top-down view from camera):
 *     rank 8 (back)  → row index 0 in the array
 *     rank 1 (front) → row index 7
 *     file A (left)  → col index 0
 *     file H (right) → col index 7
 */

export type Locale = "en" | "fa";

export interface CellContent {
  eyebrow?: { en: string; fa: string };
  title: { en: string; fa: string };
  subtitle?: { en: string; fa: string };
  body?: { en: string; fa: string };
  meta?: { en: string; fa: string };
  tags?: string[];
  link?: { href: string; label: { en: string; fa: string } };
  icon?: string;
}

export interface Column {
  file: "a" | "b" | "c" | "d" | "e" | "f" | "g" | "h";
  index: number; // 0..7
  icon: string;
  label: { en: string; fa: string };
  /** length 8, row 0 = rank 8 (back), row 7 = rank 1 (front) */
  cells: (CellContent | null)[];
}

const t = (en: string, fa: string) => ({ en, fa });

// ============================================================
// A — Header + Contact
// ============================================================
const colA: Column = {
  file: "a",
  index: 0,
  icon: "♚",
  label: t("Identity & Contact", "هویت و تماس"),
  cells: [
    {
      eyebrow: t("Identity · A8", "هویت · A۸"),
      title: t("Arman Mohebali", "آرمان محب‌علی"),
      subtitle: t("Software Solutions Developer", "توسعه‌دهنده راهکارهای نرم‌افزاری"),
      body: t(
        "Welcome to the board. Move my knight onto any glowing square to read that line of my story.",
        "به صفحه شطرنج خوش آمدی. اسب طلایی را روی هر خانه درخشان بنشان تا یک خط از داستان من را بخوانی."
      ),
      icon: "♚",
    },
    {
      eyebrow: t("Location · A7", "موقعیت · A۷"),
      title: t("Karaj, Alborz", "کرج، البرز"),
      subtitle: t("Iran · GMT +3:30", "ایران · GMT +۳:۳۰"),
      icon: "🜨",
    },
    {
      eyebrow: t("Email · A6", "ایمیل · A۶"),
      title: t("armanmohebali@outlook.com", "armanmohebali@outlook.com"),
      link: { href: "mailto:armanmohebali@outlook.com", label: t("Compose", "ارسال ایمیل") },
      icon: "✉",
    },
    {
      eyebrow: t("Website · A5", "وب‌سایت · A۵"),
      title: t("arman-mohebali.ir", "arman-mohebali.ir"),
      subtitle: t("Soon · this very page", "به‌زودی · همین صفحه"),
      link: { href: "https://arman-mohebali.ir", label: t("Visit", "بازدید") },
      icon: "❖",
    },
    {
      eyebrow: t("LinkedIn · A4", "لینکدین · A۴"),
      title: t("linkedin.com/in/rmaawn", "linkedin.com/in/rmaawn"),
      link: { href: "https://linkedin.com/in/rmaawn", label: t("Open", "ورود") },
      icon: "in",
    },
    {
      eyebrow: t("GitHub · A3", "گیت‌هاب · A۳"),
      title: t("github.com/rmaawn", "github.com/rmaawn"),
      link: { href: "https://github.com/rmaawn", label: t("Open", "ورود") },
      icon: "❮❯",
    },
    {
      eyebrow: t("Telegram · A2", "تلگرام · A۲"),
      title: t("t.me/arman_mohebali", "t.me/arman_mohebali"),
      link: { href: "https://t.me/arman_mohebali", label: t("Message", "گفتگو") },
      icon: "✈",
    },
    {
      eyebrow: t("WhatsApp · A1", "واتساپ · A۱"),
      title: t("+98 933 862 3634", "+۹۸ ۹۳۳ ۸۶۲ ۳۶۳۴"),
      link: { href: "https://wa.me/989338623634", label: t("Chat", "چت") },
      icon: "✆",
    },
  ],
};

// ============================================================
// B — About Me
// ============================================================
const colB: Column = {
  file: "b",
  index: 1,
  icon: "♔",
  label: t("About Me", "درباره من"),
  cells: [
    {
      eyebrow: t("Bio · B8", "زندگی‌نامه · B۸"),
      title: t("Software Engineer", "مهندس نرم‌افزار"),
      body: t(
        "Building reliable automation systems for real-world workflows — combining Python, Flutter, WordPress, and digital product experience.",
        "می‌سازم سیستم‌های اتوماسیون قابل اتکا برای جریان‌های کاری واقعی — ترکیبی از پایتون، فلاتر، وردپرس و تجربه محصول دیجیتال."
      ),
      icon: "♔",
    },
    {
      eyebrow: t("Focus · B7", "تمرکز · B۷"),
      title: t("Automation Systems", "سیستم‌های اتوماسیون"),
      subtitle: t("Scalable · modular · production-ready", "مقیاس‌پذیر · ماژولار · آماده تولید"),
      icon: "⚙",
    },
    {
      eyebrow: t("Stack · B6", "استک · B۶"),
      title: t("Python", "پایتون"),
      subtitle: t("Backend · scripting · automation", "بک‌اند · اسکریپت · اتوماسیون"),
      icon: "🐍",
    },
    {
      eyebrow: t("Stack · B5", "استک · B۵"),
      title: t("Flutter", "فلاتر"),
      subtitle: t("Cross-platform mobile · Dart", "موبایل کراس‌پلتفرم · دارت"),
      icon: "◈",
    },
    {
      eyebrow: t("Stack · B4", "استک · B۴"),
      title: t("WordPress & WooCommerce", "وردپرس و ووکامرس"),
      subtitle: t("Storefronts · SEO · content systems", "فروشگاه · سئو · سیستم‌های محتوا"),
      icon: "❖",
    },
    {
      eyebrow: t("Growing · B3", "در حال رشد · B۳"),
      title: t("Data Science", "علم داده"),
      subtitle: t("Pandas · numpy · analysis", "پانداس · نام‌پای · تحلیل"),
      icon: "∑",
    },
    {
      eyebrow: t("Growing · B2", "در حال رشد · B۲"),
      title: t("Machine Learning", "یادگیری ماشین"),
      subtitle: t("Supervised · feature design", "نظارت‌شده · طراحی ویژگی"),
      icon: "∞",
    },
    {
      eyebrow: t("Growing · B1", "در حال رشد · B۱"),
      title: t("Large Language Models", "مدل‌های زبانی بزرگ"),
      subtitle: t("Prompting · agents · evals", "پرامپت · ایجنت · ارزیابی"),
      icon: "✺",
    },
  ],
};

// ============================================================
// C — Skills
// ============================================================
const colC: Column = {
  file: "c",
  index: 2,
  icon: "♘",
  label: t("Skills & Arsenal", "مهارت‌ها و ابزار"),
  cells: [
    {
      eyebrow: t("Design · C8", "طراحی · C۸"),
      title: t("WordPress", "وردپرس"),
      subtitle: t("Theming · Elementor · WooCommerce", "قالب‌بندی · المنتور · ووکامرس"),
      icon: "❖",
    },
    {
      eyebrow: t("Design · C7", "طراحی · C۷"),
      title: t("Figma", "فیگما"),
      subtitle: t("UI mockups · design tokens", "موکاپ UI · توکن‌های دیزاین"),
      icon: "▲",
    },
    {
      eyebrow: t("Code · C6", "کد · C۶"),
      title: t("Python · Dart", "پایتون · دارت"),
      tags: ["Python", "Dart"],
      icon: "{ }",
    },
    {
      eyebrow: t("Code · C5", "کد · C۵"),
      title: t("Flutter · HTML5", "فلاتر · HTML۵"),
      tags: ["Flutter", "HTML5"],
      icon: "◈",
    },
    {
      eyebrow: t("Code · C4", "کد · C۴"),
      title: t("Linux · Git", "لینوکس · گیت"),
      tags: ["Linux", "Git"],
      icon: "❯_",
    },
    {
      eyebrow: t("Code · C3", "کد · C۳"),
      title: t("SEO On-Page & Content", "سئو داخلی و محتوا"),
      subtitle: t("Technical SEO · writing", "سئو تکنیکال · نگارش"),
      icon: "✎",
    },
    {
      eyebrow: t("DevTools · C2", "ابزارها · C۲"),
      title: t("n8n · Docker", "n8n · داکر"),
      tags: ["n8n", "Docker"],
      icon: "⚒",
    },
    {
      eyebrow: t("DevTools · C1", "ابزارها · C۱"),
      title: t("GitHub · Claude · Postman", "گیت‌هاب · کلود · پست‌من"),
      tags: ["GitHub", "Claude", "Postman"],
      icon: "✦",
    },
  ],
};

// ============================================================
// D — Experience
// ============================================================
const colD: Column = {
  file: "d",
  index: 3,
  icon: "♕",
  label: t("Experience", "سوابق کاری"),
  cells: [
    {
      eyebrow: t("Now · D8", "اکنون · D۸"),
      title: t("Automation Engineer", "مهندس اتوماسیون"),
      subtitle: t("tadnaco.com · Dubai", "tadnaco.com · دبی"),
      meta: t("Feb 2026 — Present", "بهمن ۱۴۰۴ — اکنون"),
      icon: "♕",
    },
    {
      eyebrow: t("Stack · D7", "استک · D۷"),
      title: t("Python · n8n", "پایتون · n8n"),
      subtitle: t("Scalable · modular · production-ready", "مقیاس‌پذیر · ماژولار · آماده تولید"),
      tags: ["Python", "n8n", "Docker"],
    },
    {
      eyebrow: t("Detail · D6", "جزئیات · D۶"),
      title: t("Workflows & AI Content", "ورک‌فلو و تولید محتوا با AI"),
      body: t(
        "Data processing, AI-powered content generation, multi-platform publishing — maintained open-source on GitHub. Scheduling, retry, logging, API integrations, content deduplication.",
        "پردازش داده، تولید محتوای هوشمند، انتشار چندپلتفرمی — متن‌باز روی گیت‌هاب. شامل scheduling، retry، logging، یکپارچه‌سازی API و حذف محتوای تکراری."
      ),
    },
    {
      eyebrow: t("Previous · D5", "قبلی · D۵"),
      title: t("E-Commerce Specialist", "متخصص فروشگاه آنلاین"),
      subtitle: t("championsshop1.ir · Tehran", "championsshop1.ir · تهران"),
      meta: t("Mar 2024 — Jan 2026", "اسفند ۱۴۰۲ — دی ۱۴۰۴"),
      icon: "♖",
    },
    {
      eyebrow: t("Impact · D4", "اثر · D۴"),
      title: t("500M Tomans / year", "۵۰۰ میلیون تومان فروش سالانه"),
      body: t(
        "Solo: 847 products in 241 categories. 434K+ Google impressions, 20K+ clicks, 250+ active customers in a single year.",
        "به‌تنهایی: ۸۴۷ محصول در ۲۴۱ دسته‌بندی. بیش از ۴۳۴ هزار ایمپرشن گوگل، ۲۰ هزار کلیک و ۲۵۰+ مشتری فعال در یک سال."
      ),
    },
    {
      eyebrow: t("Earlier · D3", "پیشین · D۳"),
      title: t("Web Designer & Admin", "طراح و مدیر وب"),
      subtitle: t("Pixlweb.ir · Karaj", "Pixlweb.ir · کرج"),
      meta: t("Apr 2023 — Sep 2024", "فروردین ۱۴۰۲ — مهر ۱۴۰۳"),
      icon: "♗",
    },
    {
      eyebrow: t("Detail · D2", "جزئیات · D۲"),
      title: t("WordPress Build-outs", "ساخت سایت‌های وردپرسی"),
      body: t(
        "Domain, hosting, Elementor themes & plugins customization. Content, product listing, technical support, page design across e-commerce and content sites.",
        "تهیه دامنه و هاست، شخصی‌سازی قالب و افزونه با المنتور. مدیریت محتوا، لیست محصولات، پشتیبانی فنی و طراحی صفحات."
      ),
    },
    {
      eyebrow: t("Portfolio · D1", "نمونه‌کار · D۱"),
      title: t("Live Sites", "سایت‌های فعال"),
      tags: ["sazoseda.ir", "olgashopping.com", "sephruya.com"],
    },
  ],
};

// ============================================================
// E — Projects
// ============================================================
const colE: Column = {
  file: "e",
  index: 4,
  icon: "♖",
  label: t("Projects", "پروژه‌ها"),
  cells: [
    {
      eyebrow: t("Project · E8", "پروژه · E۸"),
      title: t("Nootika · Reminder", "نوتیکا · یادآور"),
      subtitle: t("2024 · LIVE on Cafe Bazaar", "۱۴۰۳ · فعال در کافه‌بازار"),
      icon: "♖",
    },
    {
      eyebrow: t("Summary · E7", "خلاصه · E۷"),
      title: t("Reminder & Task Management", "یادآور و مدیریت کارها"),
      body: t(
        "A simple and elegant reminder & task management app — Flutter, Hive local DB, BLoC state management, clean architecture.",
        "اپلیکیشن ساده و خوش‌سلیقه برای یادآوری و مدیریت کارها — فلاتر، دیتابیس Hive، مدیریت state با BLoC و معماری تمیز."
      ),
    },
    {
      eyebrow: t("Stack · E6", "استک · E۶"),
      title: t("Flutter", "فلاتر"),
      subtitle: t("Single codebase · Material 3", "یک کدبیس · متریال ۳"),
      tags: ["Dart", "Flutter"],
    },
    {
      eyebrow: t("Stack · E5", "استک · E۵"),
      title: t("Hive Local DB", "دیتابیس محلی Hive"),
      subtitle: t("Fast key-value persistence", "ذخیره‌سازی سریع key-value"),
    },
    {
      eyebrow: t("Stack · E4", "استک · E۴"),
      title: t("BLoC + Clean Architecture", "BLoC + معماری تمیز"),
      subtitle: t("Predictable state · testable layers", "وضعیت قابل‌پیش‌بینی · لایه‌های تست‌پذیر"),
    },
    {
      eyebrow: t("Packages · E3", "پکیج‌ها · E۳"),
      title: t("Tooling", "ابزارها"),
      tags: ["lottie", "permission_handler", "native_splash", "alarm", "share_plus"],
    },
    {
      eyebrow: t("Status · E2", "وضعیت · E۲"),
      title: t("Shipped & Live", "منتشر شده و فعال"),
      subtitle: t("Available on Cafe Bazaar", "در دسترس روی کافه‌بازار"),
    },
    {
      eyebrow: t("Link · E1", "لینک · E۱"),
      title: t("Install on Bazaar", "نصب از بازار"),
      link: {
        href: "https://cafebazaar.ir/app/com.rmaan.nootika",
        label: t("Open in store", "ورود به فروشگاه"),
      },
    },
  ],
};

// ============================================================
// F — Education + Certifications
// ============================================================
const colF: Column = {
  file: "f",
  index: 5,
  icon: "♗",
  label: t("Education & Certs", "تحصیلات و گواهی‌ها"),
  cells: [
    {
      eyebrow: t("Degree · F8", "مدرک · F۸"),
      title: t("Associate · Software Engineering", "کاردانی · مهندسی نرم‌افزار"),
      subtitle: t("2024 — 2028", "۱۴۰۳ — ۱۴۰۷"),
      icon: "♗",
    },
    {
      eyebrow: t("Institution · F7", "موسسه · F۷"),
      title: t("Shamsipour Technical & Vocational", "دانشکده فنی و حرفه‌ای شمسی‌پور"),
      subtitle: t("Tehran, Iran", "تهران، ایران"),
    },
    {
      eyebrow: t("Grade · F6", "معدل · F۶"),
      title: t("17.5 / 20", "۱۷٫۵ از ۲۰"),
      subtitle: t("Top tier of program", "رده برتر دوره"),
    },
    {
      eyebrow: t("Focus · F5", "گرایش · F۵"),
      title: t("Software Engineering", "مهندسی نرم‌افزار"),
      tags: ["Algorithms", "Databases", "OS", "Web"],
    },
    {
      eyebrow: t("Cert · F4", "گواهی · F۴"),
      title: t("PCAP — Python Programming", "PCAP — برنامه‌نویسی پایتون"),
      subtitle: t("Everest IT Academy", "آکادمی Everest IT"),
      icon: "🐍",
    },
    {
      eyebrow: t("Cert · F3", "گواهی · F۳"),
      title: t("Software Engineering Job Simulation", "شبیه‌سازی شغلی مهندسی نرم‌افزار"),
      subtitle: t("Forage", "Forage"),
    },
    {
      eyebrow: t("Cert · F2", "گواهی · F۲"),
      title: t("Git · GitHub · GitLab", "گیت · گیت‌هاب · گیت‌لب"),
      subtitle: t("Faradars", "فرادرس"),
    },
    {
      eyebrow: t("Philosophy · F1", "نگرش · F۱"),
      title: t("Always Learning", "همیشه در حال یادگیری"),
      subtitle: t("Reading, building, shipping.", "خواندن، ساختن، انتشار."),
    },
  ],
};

// ============================================================
// G — Publications + Seminars
// ============================================================
const colG: Column = {
  file: "g",
  index: 6,
  icon: "♙",
  label: t("Publications", "انتشارات"),
  cells: [
    {
      eyebrow: t("Publisher · G8", "ناشر · G۸"),
      title: t("CIVILICA", "سیویلیکا"),
      subtitle: t("Persian scientific archive", "آرشیو علمی فارسی"),
      icon: "♙",
    },
    {
      eyebrow: t("Paper · G7", "مقاله · G۷"),
      title: t("Challenges and Transformations in Smart Cities", "چالش‌ها و تحولات در شهرهای هوشمند"),
      subtitle: t("Urban informatics", "علوم اطلاعات شهری"),
    },
    {
      eyebrow: t("Paper · G6", "مقاله · G۶"),
      title: t("Monetizing Freedom: Business Models in Free Software", "کسب درآمد از آزادی: مدل‌های کسب‌وکار در نرم‌افزار آزاد"),
      subtitle: t("Open-source economics", "اقتصاد متن‌باز"),
    },
    {
      eyebrow: t("Paper · G5", "مقاله · G۵"),
      title: t("User Privacy in Large Language Models", "حریم خصوصی کاربر در مدل‌های زبانی بزرگ"),
      subtitle: t("Privacy · LLM safety", "حریم خصوصی · ایمنی LLM"),
    },
    {
      eyebrow: t("Theme · G4", "موضوع · G۴"),
      title: t("Technology & Society", "فناوری و جامعه"),
      tags: ["Smart cities", "Open source", "AI ethics"],
    },
    null,
    null,
    {
      eyebrow: t("Count · G1", "تعداد · G۱"),
      title: t("3 Papers Published", "۳ مقاله منتشر شده"),
      subtitle: t("Indexed on CIVILICA", "نمایه‌شده در سیویلیکا"),
    },
  ],
};

// ============================================================
// H — Languages
// ============================================================
const colH: Column = {
  file: "h",
  index: 7,
  icon: "♟",
  label: t("Languages", "زبان‌ها"),
  cells: [
    {
      eyebrow: t("Mother tongue · H8", "زبان مادری · H۸"),
      title: t("Persian", "فارسی"),
      subtitle: t("Native fluency", "تسلط کامل"),
      icon: "♟",
    },
    {
      eyebrow: t("Level · H7", "سطح · H۷"),
      title: t("Native", "بومی"),
      subtitle: t("Reading · writing · speaking · listening", "خواندن · نوشتن · گفتار · شنیدار"),
    },
    null,
    null,
    {
      eyebrow: t("Second · H4", "دوم · H۴"),
      title: t("English", "انگلیسی"),
      subtitle: t("Intermediate · growing", "متوسط · در حال پیشرفت"),
      icon: "♟",
    },
    {
      eyebrow: t("Level · H3", "سطح · H۳"),
      title: t("Intermediate", "متوسط"),
      subtitle: t("Comfortable reading docs & writing code-adjacent prose.", "راحت با خواندن مستندات و نوشتن متون فنی."),
    },
    null,
    {
      eyebrow: t("Goal · H1", "هدف · H۱"),
      title: t("Toward Advanced", "به سوی پیشرفته"),
      subtitle: t("Daily writing + technical reading.", "نوشتن روزانه + مطالعه فنی."),
    },
  ],
};

export const COLUMNS: Column[] = [colA, colB, colC, colD, colE, colF, colG, colH];

/** rank labels (back to front for the player) */
export const RANK_LABELS = ["8", "7", "6", "5", "4", "3", "2", "1"];
export const FILE_LABELS = ["A", "B", "C", "D", "E", "F", "G", "H"];

/** Returns the content of board[col][row] or null. */
export function getCell(col: number, row: number): CellContent | null {
  if (col < 0 || col > 7 || row < 0 || row > 7) return null;
  return COLUMNS[col].cells[row] ?? null;
}

/** Total number of non-empty cells (for HUD progress). */
export const TOTAL_FILLED = COLUMNS.reduce(
  (sum, c) => sum + c.cells.filter((x) => x !== null).length,
  0
);
