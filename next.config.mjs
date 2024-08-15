/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        hostname: "avatars.githubusercontent.com",
      },
    ],
  },
  sassOptions: {
    includePaths: ["./src"],
    prependData: `@import "@/styles/variables";`,
  },
};

export default nextConfig;
