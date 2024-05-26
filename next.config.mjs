/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  async redirects() {
    return [
      {
        source: '/',
        missing: [
          {
            type: 'cookie',
            key: 'TOKEN',
          }
        ],
        destination: '/login',
        permanent: false
      },
      {
        source: '/patient',
        missing: [
          {
            type: 'cookie',
            key: 'TOKEN',
          }
        ],
        destination: '/login',
        permanent: false
      },
      {
        source: '/patient/checkup',
        missing: [
          {
            type: 'cookie',
            key: 'TOKEN',
          }
        ],
        destination: '/login',
        permanent: false
      },
    ]
  }
};

export default nextConfig;
