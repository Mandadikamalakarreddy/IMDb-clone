/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: ['image.tmdb.org'],
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'image.tmdb.org',
          port: '',
          pathname: '/t/p/**',
        },
      ],
      formats: ['image/webp', 'image/avif'],
      minimumCacheTTL: 86400, // 24 hours
    },
    compress: true,
    poweredByHeader: false,
    generateEtags: true,
    productionBrowserSourceMaps: false,
    optimizeFonts: true,
    swcMinify: true,
    experimental: {
      optimizeCss: true,
      turbo: {
        rules: {
          '*.svg': {
            loaders: ['@svgr/webpack'],
            as: '*.js',
          },
        },
      },
    },
    async headers() {
      return [
        {
          source: '/(.*)',
          headers: [
            {
              key: 'X-DNS-Prefetch-Control',
              value: 'on'
            },
            {
              key: 'X-Content-Type-Options',
              value: 'nosniff'
            },
            {
              key: 'Referrer-Policy',
              value: 'strict-origin-when-cross-origin'
            },
          ],
        },
      ]
    },
  };
  
  export default nextConfig;