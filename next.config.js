/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/homePage",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
