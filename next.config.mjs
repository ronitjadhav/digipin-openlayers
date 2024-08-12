/** @type {import('next').NextConfig} */
const nextConfig = {
    basePath: "/digipin-openlayers",
    output: "export",
    reactStrictMode: true,
    images: {
        unoptimized: true,
    },
    env: {
        NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN: process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN,
        NEXT_PUBLIC_MAPBOX_LIGHT_STYLE_URL: process.env.NEXT_PUBLIC_MAPBOX_LIGHT_STYLE_URL,
        NEXT_PUBLIC_MAPBOX_DARK_STYLE_URL: process.env.NEXT_PUBLIC_MAPBOX_DARK_STYLE_URL,
    },
    // This function is optional, but can be helpful if you have dynamic routes
    // exportPathMap: async function (defaultPathMap, { dev, dir, outDir, distDir, buildId }) {
    //   return {
    //     '/': { page: '/' },
    //     '/about': { page: '/about' },
    //     // Add other routes as needed
    //   }
    // },
};

module.exports = nextConfig;