import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	images: {
		domains: ["picsum.photos"],
	},
	experimental: {
		optimizeCss: false,
	},
};

export default nextConfig;
