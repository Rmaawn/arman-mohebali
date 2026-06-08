import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Arman Mohebali — آرمان محبعلی",
    short_name: "Arman Mohebali",
    description:
      "وب‌سایت رسمی آرمان محبعلی، توسعه‌دهنده راهکارهای نرم‌افزاری.",
    start_url: "/",
    display: "standalone",
    background_color: "#0a0a0a",
    theme_color: "#0a0a0a",
    icons: [
      {
        src: "/profile.jpg",
        sizes: "any",
        type: "image/jpeg",
      },
    ],
  };
}
