import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true
  },

  images: {
    domains: ["i.etsystatic.com"]
  }
};

export default nextConfig;
