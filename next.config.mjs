/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    dynamicIO: true,
  },
  // async redirects() {
  //   return [
  //     {
  //       source: '/',
  //       destination: '/en/trade/BTCUSDT',
  //       permanent: true,
  //     },
  //   ];
  // },
};

export default nextConfig;
