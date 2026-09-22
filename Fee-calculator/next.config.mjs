/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";

const nextConfig = {
  output: "export",
  images: { unoptimized: true },
  ...(isProd && {
    basePath: "/KIRINYAGA-FEE-LEDGER",
    assetPrefix: "/KIRINYAGA-FEE-LEDGER/",
  }),
};

export default nextConfig;