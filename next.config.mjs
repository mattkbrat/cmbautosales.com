/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "*.autoflp.com",
				port: "",
			},
		],
	},
};

export default nextConfig;
