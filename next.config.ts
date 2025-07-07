import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
//   images: {
//     domains: ['picsum.photos '], // tambahin domain ini
//   },

// };


// next.config.js atau next.config.ts
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // Mengizinkan semua host (⚠️ hati-hati untuk production)
      },
    ],
  },
};

module.exports = nextConfig;


export default nextConfig;
