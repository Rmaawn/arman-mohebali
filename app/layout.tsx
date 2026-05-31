import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="en">
      <head>
        <link rel="preload" href="/fonts/Vazirmatn-Regular.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/Inter-Regular.ttf" as="font" type="font/ttf" crossOrigin="anonymous" />
      </head>
      <body className="bg-onyx text-ivory antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
