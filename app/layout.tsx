import type { Metadata } from "next";
import "./globals.css";
import { Poppins } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { cn } from "@/lib/utils";

const poppins = Poppins({
	weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
	style: ["normal", "italic"],
	subsets: ["latin"],
	display: "swap",
});

interface RootLayoutProps {
	children: React.ReactNode;
}

export const metadata: Metadata = {
	title: "Nexus",
	description:
		"Tudo o que você precisa para criar, conectar e escalar — páginas, funis, ofertas, AI e automação em um só sistema.",
};

export default function RootLayout({ children }: RootLayoutProps) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				<meta name="apple-mobile-web-app-title" content="Nexus" />
			</head>
			<body className={cn(poppins.className, "antialiased")}>
				<ThemeProvider
					attribute="class"
					defaultTheme="dark"
					disableTransitionOnChange
				>
					{children}
				</ThemeProvider>
			</body>
		</html>
	);
}
