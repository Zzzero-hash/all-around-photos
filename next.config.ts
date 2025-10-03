import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
    dangerouslyAllowSVG: true,
    unoptimized: false,
  },
  async rewrites() {
    return [
      {
        source: '/gallery/:slug',
        destination: '/api/gallery/:slug',
      },
      {
        source: '/hero/:slug',
        destination: '/api/hero/:slug',
      },
      {
        source: '/services/:slug',
        destination: '/api/services/:slug',
      },
      {
        source: '/testimonials/:slug',
        destination: '/api/testimonials/:slug',
      },
    ];
  },
};

export default nextConfig;
