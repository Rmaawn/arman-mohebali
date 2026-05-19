import type { Metadata } from "next";
import { Cormorant_Garamond, Inter, JetBrains_Mono, Vazirmatn } from "next/font/google";
import "./globals.css";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const fa = Vazirmatn({
  subsets: ["arabic"],
  variable: "--font-fa",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Arman Mohebali — Software Solutions Developer",
  description:
    "A premium 3D chess-themed portfolio of Arman Mohebali, Software Solutions Developer crafting reliable automation systems.",
  keywords: ["Arman Mohebali", "Software Engineer", "Automation", "Python", "Flutter", "WordPress"],
  authors: [{ name: "Arman Mohebali" }],
  openGraph: {
    title: "Arman Mohebali — Software Solutions Developer",
    description: "Premium 3D chess-themed personal portfolio.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} ${mono.variable} ${fa.variable}`}>
      <body className="bg-onyx text-ivory antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
