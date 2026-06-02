/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  productionBrowserSourceMaps: false,

  experimental: {
    optimizePackageImports: ["@/"],
  },

  turbopack: {},
};

export default nextConfig;