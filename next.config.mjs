/** @type {import('next').NextConfig} */
const nextConfig = {
   reactStrictMode: false,
   async headers()
   {
      return [
         {
            // matching all routes
            source: '/:path*',
            headers: [
               {
                  key: 'Cross-Origin-Opener-Policy',
                  value: 'unsafe-none', // setting the COOP header to 'unsafe-none'
               },
            ],
         },
      ];
   },
};

export default nextConfig;
