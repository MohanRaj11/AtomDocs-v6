/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static exports for SSG
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // Disable API routes for static export
  // Remove this if you want to keep API routes for development
  experimental: {
    appDir: true,
  },
};

export default nextConfig;
