/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**.unsplash.com',
            },
            // Add other patterns as needed
        ],
    },
};

export default nextConfig;
