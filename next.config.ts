import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // allow from any domain
      },
      {
        protocol: 'http',
        hostname: '**', // also allow http if needed
      },
    ],
  },
};

export default nextConfig;
