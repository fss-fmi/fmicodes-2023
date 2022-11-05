/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: true
  },
  eslint: {
    dirs: ['app', 'components', 'lib', 'src']
  }
}

module.exports = nextConfig
