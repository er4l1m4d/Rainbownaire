/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ['@supabase/ssr'],
  images: {
    domains: ['localhost'],
  },
  experimental: {
    optimizeCss: false, // Disabled to prevent critters dependency issues in deployment
    scrollRestoration: true,
  },
  eslint: {
    ignoreDuringBuilds: true, // Temporarily disable ESLint during builds
  },
  typescript: {
    ignoreBuildErrors: false, // Keep TypeScript errors enabled
  },
  webpack: (config) => {
    config.resolve.fallback = { fs: false, net: false, tls: false };
    config.externals.push('pino-pretty', 'lokijs', 'encoding');
    // Fix for bufferutil and utf-8-validate optional dependencies
    config.resolve.alias = {
      ...config.resolve.alias,
      bufferutil: false,
      'utf-8-validate': false,
    };
    return config;
  },
};

export default nextConfig;