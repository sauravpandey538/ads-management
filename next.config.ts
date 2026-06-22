import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/services/instagram",
        destination: "/services/meta",
        permanent: true,
      },
      {
        source: "/services/linkedin",
        destination: "/services/meta",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
