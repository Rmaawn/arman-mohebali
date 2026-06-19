/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["three"],
  images: {
    // Serve modern, smaller formats; the optimizer resizes the large seminar
    // WebPs down to the actual grid size so the browser never decodes a 390KB
    // full-res image just to paint a ~300px thumbnail.
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
  },
};

export default nextConfig;
