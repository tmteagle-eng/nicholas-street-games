/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [],
  },
  async redirects() {
    return [
      // The printed box QR code points to /our-games. Letter Me This! now
      // lives on its own dedicated page, so send that traffic there.
      {
        source: '/our-games',
        destination: '/letter-me-this',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
