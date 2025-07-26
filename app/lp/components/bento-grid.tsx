import Image from "next/image";

const bentos = [
	{
		title: "Funis de Quiz Interativos",
		description:
			"Crie quizzes que capturam leads, segmentam sua audiência e aumentam o engajamento de forma inteligente e automatizada.",
		image: "/quiz.svg",
		alt: "Quiz",
	},
	{
		title: "Páginas de Vendas com AI",
		description:
			"Desenvolva landing pages de alta conversão em minutos com o poder da inteligência artificial, otimizadas para vender mais.",
		image: "/pv.svg",
		alt: "Vendas",
	},
	{
		title: "+9 Ferramentas",
		description:
			"Explore um arsenal completo de ferramentas de marketing, criadas para impulsionar cada etapa da sua estratégia digital.",
		image: "/ferramentas.svg",
		alt: "Ferramentas",
	},
	{
		title: "Área de Membros",
		description:
			"Hospede seus cursos e conteúdos em um ambiente exclusivo e profissional, projetado para a melhor experiência do aluno.",
		image: "/area-de-membros.svg",
		alt: "Membros",
	},
	{
		title: "VSL com Inteligência",
		description:
			"Construa VSLs que prendem a atenção e convertem, utilizando componentes e roteiros validados pelo mercado.",
		image: "/vsl.svg",
		alt: "VSL",
	},
];

export default function BentoGrid() {
	return (
		<div className="flex flex-col items-center justify-center container max-w-7xl mx-auto">
			<h1 className="text-4xl font-medium text-center">
				Tudo o que você precisa, em um só lugar.
			</h1>
			<p className="text-muted-foreground text-center max-w-2xl mt-2">
				Ferramentas inteligentes, conectadas e prontas para escalar seus
				resultados com eficiência e performance.
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
