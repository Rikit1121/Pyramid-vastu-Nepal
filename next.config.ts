import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "8mb",
    },
  },
  async redirects() {
    return [
      {
        source: "/vastu-advisory",
        destination: "/vaastu-advisory",
        permanent: true,
      },
      {
        source: "/vastu-advisory/:path*",
        destination: "/vaastu-advisory/:path*",
        permanent: true,
      },
      {
        source: "/cupping-healing",
        destination: "/geopathic-stress",
        permanent: true,
      },
      {
        source: "/cupping-healing/:path*",
        destination: "/geopathic-stress/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
