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
    ]
  }
};

module.exports = nextConfig;