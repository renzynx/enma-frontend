/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["cdn.discordapp.com", "img.youtube.com"],
  },
};

module.exports = nextConfig;
