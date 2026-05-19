import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Production domain
  // Deploy to grievegently.com via Vercel — add domain in Vercel dashboard

  async redirects() {
    return [
      { source: "/families", destination: "/for-you", permanent: true },
      { source: "/partners/health-plans", destination: "/partners/funeral-homes", permanent: true },
    ];
  },

  images: {
    remotePatterns: [{ protocol: "https", hostname: "grievegently.com" }],
    formats: ["image/avif", "image/webp"],
  },

  // Strict headers for production
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },
};

export default nextConfig;
