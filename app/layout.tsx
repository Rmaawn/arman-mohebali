import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { SmoothScroll } from "@/components/ui/SmoothScroll";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { ScrollToTop } from "@/components/ui/ScrollToTop";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const SITE_URL = "https://armanmohebali.ir";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "آرمان محبعلی | Arman Mohebali — Software Solutions Developer",
  description:
    "وب‌سایت رسمی آرمان محبعلی، مهندس و توسعه‌دهنده نرم‌افزار اهل کرج. پورتفولیو شخصی با تمرکز بر اتوماسیون، Python، Flutter و WordPress. The official portfolio of Arman Mohebali, Software Solutions Developer.",
  keywords: [
    "آرمان محبعلی",
    "آرمان محب‌علی",
    "Arman Mohebali",
    " arman mohebali",
    "توسعه‌دهنده نرم‌افزار",
    "مهندس نرم‌افزار",
    "اتوماسیون",
    "Automation",
    "Python",
    "Flutter",
    "WordPress",
  ],
  authors: [{ name: "Arman Mohebali", url: SITE_URL }],
  creator: "Arman Mohebali",
  publisher: "Arman Mohebali",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "آرمان محبعلی | Arman Mohebali — Software Solutions Developer",
    description:
      "وب‌سایت رسمی آرمان محبعلی — پورتفولیو شخصی مهندس نرم‌افزار با تمرکز بر اتوماسیون، Python، Flutter و WordPress.",
    url: SITE_URL,
    siteName: "Arman Mohebali",
    locale: "fa_IR",
    alternateLocale: "en_US",
    type: "website",
    images: [
      {
        url: "/armanmohebali.webp",
        width: 1200,
        height: 1600,
        alt: "آرمان محبعلی — Arman Mohebali",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "آرمان محبعلی | Arman Mohebali — Software Solutions Developer",
    description:
      "وب‌سایت رسمی آرمان محبعلی — مهندس و توسعه‌دهنده نرم‌افزار.",
    images: ["/armanmohebali.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  // پس از ساخت سایت در Google Search Console، توکن تأیید را اینجا بگذار:
  // verification: { google: "PASTE_YOUR_GSC_TOKEN" },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Arman Mohebali",
  alternateName: ["آرمان محبعلی", "آرمان محب‌علی", "Arman Mohebali"],
  url: SITE_URL,
  image: `${SITE_URL}/armanmohebali.webp`,
  jobTitle: "Software Solutions Developer",
  description:
    "Software Engineer building reliable automation systems with Python, Flutter and WordPress.",
  knowsAbout: [
    "Software Engineering",
    "Automation",
    "Python",
    "Flutter",
    "WordPress",
    "n8n",
    "SEO",
    "Machine Learning",
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Karaj",
    addressRegion: "Alborz",
    addressCountry: "IR",
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Shamsipour Technical & Vocational College",
  },
  sameAs: [
    "https://linkedin.com/in/rmaawn",
    "https://github.com/rmaawn",
    "https://t.me/arman_mohebali",
  ],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Arman Mohebali",
  alternateName: "آرمان محبعلی",
  url: SITE_URL,
  inLanguage: ["fa-IR", "en-US"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preload" href="/fonts/Vazirmatn-Regular.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/Inter-Regular.ttf" as="font" type="font/ttf" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body className="bg-onyx text-ivory antialiased overflow-x-hidden">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          storageKey="portfolio-theme"
        >
          <SmoothScroll />
          <ScrollProgress />
          {children}
          <ThemeToggle />
          <ScrollToTop />
          <Analytics />
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  );
}
