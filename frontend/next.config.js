/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'https://xborg-tech-challenge-production.up.railway.app',
    NEXT_PUBLIC_FRONTEND_URL: process.env.NEXT_PUBLIC_FRONTEND_URL || 'https://xborg-tech-challenge-rose.vercel.app',
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.NEXT_PUBLIC_API_URL || 'https://xborg-tech-challenge-production.up.railway.app'}/:path*`,
      },
    ];
  },
  async redirects() {
    return [
      {
        source: '/auth/login/google',
        destination: `${process.env.NEXT_PUBLIC_API_URL || 'https://xborg-tech-challenge-production.up.railway.app'}/auth/login/google`,
        permanent: false,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

module.exports = nextConfig;
