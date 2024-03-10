const nextConfig = {
    reactStrictMode: false,
    images: {
        remotePatterns: [
				{
					protocol: 'https',
					hostname: "cdn.intra.42.fr",
				},
				{
					protocol: 'https',
					hostname: "res.cloudinary.com",
				}
        ],
    },
	env:{
		API_BASE_URL: process.env.SERVER_BACKEND
	}
};

module.exports = nextConfig