import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      // `/` → `/es`. Va como redirect y no como middleware a propósito:
      // se resuelve en el CDN, sin función en runtime.
      { source: "/", destination: "/es", permanent: false },
    ];
  },
};

export default nextConfig;
