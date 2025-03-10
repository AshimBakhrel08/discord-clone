import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pq64omwha2.ufs.sh",
      },
      {
        protocol: "https",
        hostname: "uploadthing.com",
      },
      {
        protocol: "https",
        hostname: "utfs.io",
      },
    ],
    // Optional: You can also specify domains for direct image sources if needed
    // Optional: If you need to change the loader or configuration for image optimization
    // loader: 'imgix', // You could also consider using an external CDN like Imgix or Cloudinary
    // path: '/_next/image',
  },
  // Optional: Add any custom headers, rewrites, or redirects here as necessary
};

export default nextConfig;
