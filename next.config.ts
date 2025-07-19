import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	images: {
		domains: ["placehold.co"],
	},
	experimental: {
		optimizeCss: false,
	},
};

export default nextConfig;
