/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
                port: '',
                pathname: '/**',
                
            },
            {
                protocol: 'https',
                hostname: 'ik.imagekit.io',
                port: '',
                pathname: '/**',
            }
            // Add other patterns as needed
        ],
    },
};

export default nextConfig;
