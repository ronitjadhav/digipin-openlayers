/** @type {import('next').NextConfig} */
const nextConfig = {
    basePath : "/digipin-openlayers",
    output : "export",
    reactStrictMode : true,
    
    // SEO and Performance Optimizations
    compress: true,
    poweredByHeader: false,
    
    // Image optimization for better loading
    images: {
        unoptimized: true, // Required for static export
        formats: ['image/webp', 'image/avif'],
    },
    
    // Enable trailing slash for static export
    trailingSlash: true,
    
    // Skip build-time optimizations that don't work with static export
    experimental: {
        optimizePackageImports: ['ol']
    }
};

export default nextConfig;
