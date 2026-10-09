import type { NextConfig } from "next";

/**
 * Meridian, RidgeCap, Quant Engine, Sports ML and (from 2026-10-08) Gridiron
 * shipped to production and are indexed. Their pages are gone, but a permanent
 * redirect to the register is a better answer than a dead end for anyone
 * following an old link.
 */
const RETIRED_PROJECT_SLUGS = [
  "meridian",
  "ridgecap",
  "quant-engine",
  "sports-ml",
  "gridiron",
];

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "substackcdn.com",
      },
    ],
  },
  async redirects() {
    return RETIRED_PROJECT_SLUGS.map((slug) => ({
      source: `/portfolio/${slug}`,
      destination: "/portfolio",
      permanent: true,
    }));
  },
};

export default nextConfig;
