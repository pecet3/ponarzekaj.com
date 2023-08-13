/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com',
                port: '',
                pathname: '**',
            },
            {
                protocol: 'https',
                hostname: 'images2.alphacoders.com',
                port: '',
                pathname: '**',
            },
        ],
    },
    experimental: {
        serverActions: true,
      },

}
module.exports = nextConfig
