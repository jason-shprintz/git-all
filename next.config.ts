import type { NextConfig } from 'next';

const nextConfig: NextConfig = {};

export default nextConfig;

// Initialize OpenNext Cloudflare bindings for local development
import('@opennextjs/cloudflare').then((m) =>
  m.initOpenNextCloudflareForDev(),
);
