import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Ensure the gated PDF is bundled into the /api/download serverless function
  // on Vercel (it's read at runtime via fs, which isn't auto-traced).
  outputFileTracingIncludes: {
    "/api/download": ["./content/guide.pdf"],
  },
};

export default nextConfig;
