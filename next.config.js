const nextTranslate = require("next-translate");

/** @type {import('next').NextConfig} **/
const nextConfig = {
  reactStrictMode: true,
  ...nextTranslate(),
  async redirects() {
    return [
      {
        source: '/research',
        destination: 'https://researchcatalogue.net/view/1592116/1592117',
        permanent: false,
      },
      {
        source: '/edo',
        destination: 'https://gaudeamusscreendive.com/edo-synth',
        permanent: false,
      },]
  },
  experimental: {
    scrollRestoration: true,
  }
};

module.exports = nextConfig;