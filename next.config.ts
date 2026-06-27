import type { NextConfig } from "next";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.homzify.net";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/v1/:path*",
        destination: `${API_URL}/api/v1/:path*`,
      },
    ];
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "placehold.co" },
      {
        protocol: "https",
        hostname: "sellpixer.websolutionit.com",
        pathname: "/public/**",
      },
      { protocol: "https", hostname: "cdn.dummyjson.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "test.eaconsultancy.org" },
      // Backend image server (localhost dev + production)
      {
        protocol: "http",
        hostname: "localhost",
        port: "5000",
        pathname: "/images/**",
      },
      { protocol: "https", hostname: "**", pathname: "/images/**" },
    ],
  },
};

export default nextConfig;
