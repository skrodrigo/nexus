import Image from "next/image";

const bentos = [
	{
		title: "Funis de Quiz Interativos",
		description:
			"Produza criativos de alto impacto com inteligência estratégica, formatos otimizados para conversão e elementos prontos para anúncios de performance.",
		image: "/quiz.svg",
		alt: "Quiz",
	},
	{
		title: "Páginas de Vendas com AI",
		description:
			"Produza criativos de alto impacto com inteligência estratégica, formatos otimizados para conversão e elementos prontos para anúncios de performance.",
		image: "/pv.svg",
		alt: "Vendas",
	},
	{
		title: "+12 Ferramentas",
		description:
			"Produza criativos de alto impacto com inteligência estratégica, formatos otimizados para conversão e elementos prontos para anúncios de performance.",
		image: "/ferramentas.svg",
		alt: "Ferramentas",
	},
	{
		title: "Área de Membros",
		description:
			"Produza criativos de alto impacto com inteligência estratégica, formatos otimizados para conversão e elementos prontos para anúncios de performance.",
		image: "/area-de-membros.svg",
		alt: "Membros",
	},
	{
		title: "Gerador de Criativos",
		description:
			"Produza criativos de alto impacto com inteligência estratégica, formatos otimizados para conversão e elementos prontos para anúncios de performance.",
		image: "/criativos.svg",
		alt: "Criativos",
	},
	{
		title: "VSL com Inteligência",
		description:
			"Produza criativos de alto impacto com inteligência estratégica, formatos otimizados para conversão e elementos prontos para anúncios de performance.",
		image: "/vsl.svg",
		alt: "VSL",
	},
];

export default function BentoGrid() {
	return (
		<div className="flex flex-col items-center justify-center container max-w-7xl mx-auto">
			<h1 className="text-4xl font-medium text-center">
				A plataforma definitiva de marketing digital.
			</h1>
			<p className="text-muted-foreground text-center max-w-2xl mt-2">
				Tudo o que você precisa para criar, conectar e escalar — páginas, funis,
				ofertas, AI e automação em um só sistema.
			</p>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
				{bentos.map((bento) => (
					<div
						key={bento.title}
						className="w-[353px] p-4 border border-border rounded-xl flex flex-col justify-between items-center"
					>
						<div className="space-y-2">
							<h3 className="text-xl font-medium text-left">{bento.title}</h3>
							<p className="text-muted-foreground text-sm text-left leading-snug">
								{bento.description}
							</p>
						</div>
						<Image
							src={bento.image}
							alt={bento.alt}
							width={300}
							height={152}
							priority
							quality={100}
							className="mt-4 w-[300px] h-[152px]"
						/>
					</div>
				))}
			</div>
		</div>
	);
}
