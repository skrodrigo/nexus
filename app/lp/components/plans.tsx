import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const plansData = [
	{
		name: "Plano Launch",
		description:
			"Ideal para quem está começando no digital e precisa das ferramentas essenciais para validar e vender.",
		price: 49,
		popular: false,
		features: [
			{ text: "Criador de Criativos" },
			{ text: "Gerador de Página de Vendas" },
			{ text: "1 componente de VSL" },
			{ text: "1 Funil de Quiz" },
			{ text: "Gerador de Ofertas" },
			{ text: "Suporte responde em até 24 horas" },
			{ text: "Extensão + Minerador da Biblioteca", soon: true },
			{ text: "Até 100 emails por mês", soon: true },
		],
	},
	{
		name: "Plano Scale",
		description:
			"Para quem já vende e quer escalar com automações, testes e páginas otimizadas com IA.",
		price: 149,
		popular: true,
		features: [
			{ text: "Tudo do plano Launch" },
			{ text: "Clonador de Página de Vendas", soon: true },
			{ text: "Até 5 Funis de Quiz" },
			{ text: "Gerador de Ebooks" },
			{ text: "Testes A/B na VSL + analytics" },
			{ text: "Checkout Próprio", soon: true },
			{ text: "Área de membros Própria", soon: true },
			{ text: "Suporte responde em até 1 hora" },
			{ text: "3 componentes de VSL" },
		],
	},
];

export default function Plans() {
	return (
		<div
			id="plans"
			className="flex flex-col items-center justify-center container max-w-7xl mx-auto py-20"
		>
			<h1 className="text-4xl font-medium text-center">
				Escolha o plano ideal para o seu momento.
			</h1>
			<p className="text-muted-foreground text-center max-w-2xl mt-2">
				Do início à escala, o Nexus acompanha cada etapa do seu crescimento com
				tecnologia, performance e tudo em um só lugar.
			</p>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10 w-full max-w-5xl">
				{plansData.map((plan) => (
					<div key={plan.name}>
						<div className="border border-border rounded-xl p-8 flex flex-col relative bg-background h-full">
							{plan.popular && (
								<span className="absolute top-8 text-sm font-medium -translate-y-1/2 bg-primary text-primary-foreground px-3 py-1 rounded-full right-8">
									Popular
								</span>
							)}
							<h2 className="text-2xl font-medium">{plan.name}</h2>
							<p className="text-muted-foreground mt-2 h-12">
								{plan.description}
							</p>
							<div className="mt-6">
								<span className="text-4xl font-bold text-primary">
									R${plan.price}
								</span>
								<span className="text-muted-foreground">/mês</span>
							</div>
							<Button className="">Começar Agora</Button>
							<ul className="mt-8 space-y-4 text-sm">
								{plan.features.map((feature) => (
									<li key={feature.text} className="flex items-center gap-3">
										<Check className="w-5 h-5 text-primary" />
										<span>{feature.text}</span>
										{feature.soon && (
											<span className="text-xs bg-background border border-border text-yellow-600 rounded-full px-2 py-0.5">
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
