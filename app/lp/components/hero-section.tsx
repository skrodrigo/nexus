import Image from "next/image";

export default function HeroSection() {
	return (
		<div className="flex flex-col items-center justify-center container max-w-7xl mx-auto">
			<h1 className="text-4xl font-medium ">
				A plataforma definitiva de marketing digital.
			</h1>
			<p className="text-muted-foreground">
				Tudo o que você precisa para criar, conectar e escalar — páginas, funis,
				ofertas, AI e automação em um só sistema.
			</p>
			<Image
				src="/dashboard.svg"
				alt="Logo"
				width={1920}
				height={1080}
				quality={100}
				priority
				className="w-full h-full"
			/>
		</div>
	);
}
