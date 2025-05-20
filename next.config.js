/** @type {import('next').NextConfig} */

const nextConfig = {
  // Disable ESLint during build
  eslint: {
    ignoreDuringBuilds: true,
  },

  // Disable TypeScript type checking during build
  typescript: {
    ignoreBuildErrors: true,
  },

  // Any other config options you need
};

module.exports = nextConfig;
