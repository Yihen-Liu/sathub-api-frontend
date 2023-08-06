/**
 * @type {import('next').NextConfig}
 */
 const nextConfig = {
  basePath: "/sathub",
  async redirects() {
    return [
      {
          source: '/',
          destination: '/sathub',
          basePath: false,
          permanent: false
      },
	  {
		    source: '/sathub/login',
		    destination: '/sathub',
		    basePath: false,
		    permanent: false
	  },

    ]
  },
	images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'static.justboil.me',
      },
    ],
  },
}

export default nextConfig