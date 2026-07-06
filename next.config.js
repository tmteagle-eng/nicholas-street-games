/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [],
  },
  async redirects() {
    return [
      // The printed box QR code points to /lettermethis (no dashes). The page
      // lives at /letter-me-this, so redirect the QR traffic there.
      {
        source: '/lettermethis',
        destination: '/letter-me-this',
        permanent: true,
      },
      // Legacy: earlier the game page was /our-games. Keep this redirect too.
      {
        source: '/our-games',
        destination: '/letter-me-this',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
