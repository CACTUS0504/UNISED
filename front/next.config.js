/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    transpilePackages: ['antd', 'rc-util', 'rc-pagination', 'rc-picker'],
    modularizeImports: {
        'antd': {
            transform: 'antd/lib/{{member}}',
            preventFullImport: true,
        },
        '@ant-design/icons': {
            transform: '@ant-design/icons/lib/icons/{{member}}',
            preventFullImport: true,
        },
    },
    images: {
        domains: [],
        disableStaticImages: true,
    },
    experimental: {
        serverActions: true,
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
    typescript: {
        ignoreBuildErrors: true,
    },
    async headers() {
        return [
            {
                source: '/(.*)',
                headers: [
                    {
                        key: 'X-Content-Type-Options',
                        value: 'nosniff'
                    },
                    {
                        key: 'X-Frame-Options',
                        value: 'SAMEORIGIN'
                    },
                    {
                        key: 'X-XSS-Protection',
                        value: '1; mode=block'
                    }
                ],
            },
        ];
    },
    webpack: (config) => {
        config.module.rules.push({
            test: /\.(png|jpe?g|gif|svg)$/i,
            use: [
                {
                    loader: 'file-loader',
                },
            ],
        });

        return config;
    },
};

module.exports = nextConfig;