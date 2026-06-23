import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.saysdont.com',
      },
    ],
  },
  // Ensure ONNX runtime (used by Transformers.js) isn't bundled server-side
  serverExternalPackages: ['onnxruntime-node'],
};

export default nextConfig;
