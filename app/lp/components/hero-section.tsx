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
				src="/dashboard.png"
				alt="Logo"
				width={3000}
				height={1685}
				quality={100}
				priority
				className="max-w-[1000px] max-h-[685px] w-full h-full object-contain mt-10"
			/>
		</div>
	);
}
