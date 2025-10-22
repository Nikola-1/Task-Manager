import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    typescript: {
    // ❌ Skip TypeScript build errors (ovo je ključno)
    ignoreBuildErrors: true,
  },
  eslint: {
    // ❌ Skip ESLint during builds
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
