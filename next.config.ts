import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true
  },

  images: {
    domains: ["placehold.co"]
  }
};

export default nextConfig;
