import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  reactStrictMode: false,
  experimental: {
    useCache: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '9s8p8ymf20.ufs.sh',
      },
      {
        protocol: 'https',
        hostname: 'dobamboo-demo.vercel.app',
      },
      {
        protocol: 'https',
        hostname: 'utfs.io',
      },
    ],
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
