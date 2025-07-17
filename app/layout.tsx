import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

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
			<head />
			<body>
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
