import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: 'cdn.sanity.io'
            }
        ]
    },
    async redirects() {
        return [
            {
                source: '/support',
                destination: 'https://docs.trysouschef.com/troubleshooting/contact-support',
                permanent: true,
            },
        ]
    },
};

export default nextConfig;
