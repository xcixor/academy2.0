/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: "utfs.io" },
      { hostname: "lh3.googleusercontent.com" },
      { hostname: "images.unsplash.com" },
      { hostname: "storage.googleapis.com" },
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
