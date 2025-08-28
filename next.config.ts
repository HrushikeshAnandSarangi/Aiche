import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "**", // allows all paths, you can restrict further if needed
      },
    ],
  },
};

export default nextConfig;
