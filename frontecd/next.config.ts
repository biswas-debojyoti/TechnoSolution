import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["example.com"], // ← add your image domain here
  },
  output: "export",
  // images: {
  //   unoptimized: true,
  // },
};

export default nextConfig;

