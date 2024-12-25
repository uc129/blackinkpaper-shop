import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [{
      hostname: 'res.cloudinary.com',
      pathname: '/blackinkpaper/image/upload/',
      protocol: 'https',
      search: ''
    }],
    domains: ['res.cloudinary.com']
  },


};

export default nextConfig;
