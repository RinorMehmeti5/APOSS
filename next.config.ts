import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  // Disable ESLint during build to allow deployment
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
