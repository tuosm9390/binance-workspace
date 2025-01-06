/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/en/trade/BTCUSDT',
        permanent: true,
      },
      // {
      //   source: '/en/trade/[symbol]',
      //   destination: '/en/trade/BTCUSDT',
      //   permanent: true,
      // },
    ];
  },
};

export default nextConfig;
