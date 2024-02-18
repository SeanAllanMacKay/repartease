/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
      return [
        {
          destination: "/:path*",
          source: "/app/:path*", // The :path parameter isn't used here so will be automatically passed in the query
        },
      ];
    },
    reactStrictMode: true,
    assetPrefix: "/app",
};

module.exports = nextConfig;
