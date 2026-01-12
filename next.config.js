/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: [
            'gateway.pinata.cloud',
            'ipfs.io',
            'gateway.ipfs.io',
        ],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**.pinata.cloud',
            },
            {
                protocol: 'https',
                hostname: '**.ipfs.io',
            },
        ],
    },
    webpack: (config) => {
        config.resolve.fallback = {
            ...config.resolve.fallback,
            fs: false,
            net: false,
            tls: false,
        };
        return config;
    },
}

module.exports = nextConfig
