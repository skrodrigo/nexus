import Link from "next/link";
import { RiCheckFill, RiCloseFill } from "react-icons/ri";
import { Button } from "@/components/ui/button";

const plansData = [
	{
		name: "Plano Launch",
		description:
			"Ideal para quem está começando no digital e precisa das ferramentas essenciais para validar e vender.",
		price: 297,
		popular: false,
		features: [
			{
				text: "15.000 plays/mês no VSL + R$ 0,02 por play extra",
				included: true,
			},
			{ text: "2 componente de VSL", included: true },
			{ text: "3 Funil de Quiz + 6 mil leads", included: true },
			{ text: "Chat com IA + Gerador de Imagens", included: false },
			{ text: "Organização de equipes", included: false },
			{ text: "Testes A/B + Analytics", included: false },
			{ text: "Áreas de Membros", included: false },
			{ text: "Checkout Próprio + 2% de taxa", soon: true, included: true },
			{ text: "1.000 emails por mês", soon: true, included: true },
			{ text: "Suporte responde em até 24h (Email + Chat)", included: true },
		],
	},
	{
		name: "Plano Scale",
		description:
			"Para quem já vende e quer escalar com automações, testes e páginas otimizadas com IA.",
		price: 397,
		popular: true,
		features: [
			{
				text: "30.000 plays/mês no VSL + R$ 0,02 por play extra",
				included: true,
			},
			{ text: "4 componentes de VSL", included: true },
			{ text: "6 Funis de Quiz + 12 mil leads", included: true },
			{ text: "Chat com IA + Gerador de Imagens", included: true },
			{ text: "Organização de equipes", included: true },
			{ text: "Testes A/B + Analytics", included: false },
			{ text: "5 Áreas de Membros", soon: true, included: true },
			{ text: "Checkout Próprio + 1% de taxa", soon: true, included: true },
			{ text: "5.000 emails por mês", soon: true, included: true },
			{ text: "Suporte responde em até 12h (Email + Chat)", included: true },
		],
	},
	{
		name: "Plano Infinity",
		description:
			"Para quem já vende e quer escalar com automações, testes e páginas otimizadas com IA.",
		price: 497,
		popular: false,
		features: [
			{
				text: "60.000 plays/mês no VSL + R$ 0,02 por play extra",
				included: true,
			},
			{ text: "6 componentes de VSL", included: true },
			{ text: "9 Funis de Quiz + 18 mil leads", included: true },
			{ text: "Chat com IA + Gerador de Imagens", included: true },
			{ text: "Organização de equipes", included: true },
			{ text: "Testes A/B + Analytics Avançado", included: true },
			{ text: "10 Áreas de Membros", soon: true, included: true },
			{ text: "Checkout Próprio + 0,5% de taxa", soon: true, included: true },
			{ text: "10.000 emails por mês", soon: true, included: true },
			{
				text: "Suporte Prioritário em no máximo 1h (WhatsApp + Email)",
				included: true,
			},
		],
	},
];

export default function Plans() {
	return (
		<div
			id="plans"
			className="flex flex-col items-center justify-center container max-w-7xl mx-auto pt-20"
		>
			<h1 className="text-4xl font-medium text-center">
				Escolha o plano ideal para o seu momento.
			</h1>
			<p className="text-muted-foreground text-center max-w-2xl mt-2">
				Do início à escala, o Nexus acompanha cada etapa do seu crescimento com
				tecnologia, performance e tudo em um só lugar.
			</p>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10 w-full max-w-7xl">
				{plansData.map((plan) => (
					<div key={plan.name}>
						<div className="border border-border rounded-xl p-8 flex flex-col relative bg-background h-full">
							{plan.popular && (
								<span className="absolute top-8 text-sm font-medium -translate-y-1/2 bg-primary text-primary-foreground px-3 py-1 rounded-full right-8">
									Popular
								</span>
							)}
							<h2 className="text-2xl font-medium">{plan.name}</h2>
							<p className="text-muted-foreground mt-2 h-12 text-sm">
								{plan.description}
							</p>
							<div className="mt-6">
								<span className="text-4xl font-medium text-primary">
									R${plan.price}
								</span>
								<span className="text-muted-foreground">/mês</span>
							</div>
							<Link href="/register">
								<Button className="w-full">Começar Agora</Button>
							</Link>
							<ul className="mt-8 space-y-4 text-sm">
								{plan.features.map((feature) => (
									<li
										key={feature.text}
										className={`flex items-center gap-3 ${
											!feature.included && "text-muted-foreground"
										}`}
									>
										{feature.included ? (
											<RiCheckFill className="w-5 h-5 text-primary flex-shrink-0" />
										) : (
											<RiCloseFill className="w-5 h-5 text-muted-foreground flex-shrink-0" />
										)}
										<span>{feature.text}</span>
										{feature.soon && (
											<span className="text-xs bg-background border border-border text-yellow-600 rounded-full px-2 py-0.5 whitespace-nowrap">
												em breve
											</span>
										)}
									</li>
								))}
							</ul>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
