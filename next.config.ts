import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  logging: {
    fetches: { fullUrl: true },
  },

  experimental: {
    prefetchInlining: true,
  },

  typedRoutes: true,
  // cacheComponents: true,
}

export default nextConfig
