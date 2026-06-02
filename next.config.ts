import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image.tmdb.org",
        pathname: "/t/p/**",
      },
      {
        protocol: "https",
        hostname: "localhost",
        port: "8000",
        pathname: "/uploads/**",
      },
    ],
  },
};

export default nextConfig;
