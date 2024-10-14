/** @type {import('next').NextConfig} */
const nextConfig = {}

export default nextConfig

/*
const nextConfig = {
   webpack(config) {
      config.resolve.fallback = {

         // if you miss it, all the other options in fallback, specified
         // by next.js will be dropped.
         ...config.resolve.fallback,
         fs: false,
      };

      return config;
   },
}

export default nextConfig
*/