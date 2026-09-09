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
    "arman mohebali",
    "Arman Moheb Ali",
    "armanmohebali",
    "سایت آرمان محبعلی",
    "پورتفولیو آرمان محبعلی",
    "Arman Mohebali portfolio",
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
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "32x32" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "آرمان محبعلی | Arman Mohebali — Software Solutions Developer",
    description:
      "وب‌سایت رسمی آرمان محبعلی — پورتفولیو شخصی مهندس نرم‌افزار با تمرکز بر اتوماسیون، Python، Flutter و WordPress.",
    url: SITE_URL,
    siteName: "آرمان محبعلی | Arman Mohebali",
    locale: "fa_IR",
    alternateLocale: "en_US",
    type: "website",
    images: [
      {
        url: `${SITE_URL}/armanmohebali.webp`,
        width: 1200,
        height: 1600,
        type: "image/webp",
        alt: "عکس آرمان محبعلی — Arman Mohebali",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "آرمان محبعلی | Arman Mohebali — Software Solutions Developer",
    description:
      "وب‌سایت رسمی آرمان محبعلی — مهندس و توسعه‌دهنده نرم‌افزار.",
    images: [`${SITE_URL}/armanmohebali.webp`],
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
  // پس از دریافت کد تایید از Google Search Console، توکن تأیید را اینجا قرار دهید:
  // verification: { google: "PASTE_YOUR_GSC_TOKEN" },
};

const profileImageObject = {
  "@type": "ImageObject",
  "@id": `${SITE_URL}/#profile-photo`,
  url: `${SITE_URL}/armanmohebali.webp`,
  contentUrl: `${SITE_URL}/armanmohebali.webp`,
  caption: "آرمان محبعلی — مهندس نرم‌افزار و توسعه‌دهنده | Arman Mohebali",
  description: "عکس پرسنلی آرمان محبعلی مهندس نرم‌افزار و توسعه‌دهنده سیستم‌های اتوماسیون",
  representativeOfPage: true,
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${SITE_URL}/#person`,
  name: "Arman Mohebali",
  givenName: "Arman",
  familyName: "Mohebali",
  alternateName: ["آرمان محبعلی", "آرمان محب‌علی", "Arman Mohebali", "armanmohebali"],
  disambiguatingDescription: "توسعه‌دهنده نرم‌افزار و مهندس اتوماسیون اهل کرج، ایران | Software Solutions Developer",
  url: SITE_URL,
  image: profileImageObject,
  jobTitle: "Software Solutions Developer",
  description:
    "Software Engineer building reliable automation systems with Python, Flutter and WordPress. مهندس نرم‌افزار و توسعه‌دهنده سیستم‌های اتوماسیون.",
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
  "@id": `${SITE_URL}/#website`,
  name: "آرمان محبعلی | Arman Mohebali",
  alternateName: ["Arman Mohebali", "آرمان محبعلی", "armanmohebali.ir"],
  url: SITE_URL,
  inLanguage: ["fa-IR", "en-US"],
  author: {
    "@id": `${SITE_URL}/#person`,
  },
};

const profilePageJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "@id": `${SITE_URL}/#profilepage`,
  url: SITE_URL,
  name: "آرمان محبعلی | Arman Mohebali — Software Solutions Developer",
  mainEntity: {
    "@id": `${SITE_URL}/#person`,
  },
  isPartOf: {
    "@id": `${SITE_URL}/#website`,
  },
  primaryImageOfPage: profileImageObject,
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePageJsonLd) }}
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
