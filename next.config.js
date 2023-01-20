/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "scd.cs.wayne.edu",
        port: '',
        pathname: "/scd_logo.png"
      }
    ]
  }
}

module.exports = nextConfig
