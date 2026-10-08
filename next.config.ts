import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    // Product, banner and category art is served from SharePal's own CDN.
    remotePatterns: [{ protocol: 'https', hostname: 'images.sharepal.in' }],
  },
  async redirects() {
    return [{ source: '/', destination: '/bangalore/gaming-gadgets-on-rent', permanent: false }];
  },
};

export default nextConfig;
