import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "placeholder.pics",
				port: "",
				pathname: "/**",
			},
		],
	},
};

export default nextConfig;
