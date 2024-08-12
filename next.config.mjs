/** @type {import('next').NextConfig} */
const nextConfig = {
    basePath : "/digipin-openlayers",
    output : "export",
    reactStrictMode : true,
    env: {
        NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN: process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN,
        NEXT_PUBLIC_MAPBOX_LIGHT_STYLE_URL: process.env.NEXT_PUBLIC_MAPBOX_LIGHT_STYLE_URL,
        NEXT_PUBLIC_MAPBOX_DARK_STYLE_URL: process.env.NEXT_PUBLIC_MAPBOX_DARK_STYLE_URL,
    },
};

export default nextConfig;
