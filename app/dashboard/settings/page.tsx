"use client";

import { RiDeleteBin7Fill, RiUploadCloud2Fill } from "react-icons/ri";
import { PlanCard } from "@/components/plans/plan-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { authClient } from "@/lib/auth-client";

const plansData = [
	{
		name: "Plano Launch",
		description:
			"Ideal para quem está começando no digital e precisa das ferramentas essenciais para validar e vender.",
		price: 297,
		popular: false,
		features: [
			{ text: "10.000 plays/mês no VSL" },
			{ text: "+10 Gerações de Criativos (por semana)" },
			{ text: "+10 Gerações de Página de Vendas (por semana)" },
			{ text: "1 componente de VSL" },
			{ text: "1 Funil de Quiz" },
			{ text: "1 Checkout Próprio + 2% de taxa", soon: true },
			{ text: "1.000 emails por mês", soon: true },
			{ text: "Suporte 24h via WhatsApp" },
			{ text: "Domínio padrão" },
		],
	},
	{
		name: "Plano Scale",
		description:
			"Para quem já vende e quer escalar com automações, testes e páginas otimizadas com IA.",
		price: 497,
		popular: true,
		features: [
			{ text: "25.000 plays/mês no VSL" },
			{ text: "+20 Gerações de Criativos (por semana)" },
			{ text: "+20 Gerações de Página de Vendas (por semana)" },
			{ text: "3 componentes de VSL" },
			{ text: "5 Funis de Quiz" },
			{ text: "2 Checkout Próprio + 1% de taxa", soon: true },
			{ text: "5.000 emails por mês", soon: true },
			{ text: "Testes A/B + Analytics" },
			{ text: "5 Áreas de Membros", soon: true },
			{ text: "Suporte 1h via WhatsApp + Email", soon: true },
			{ text: "Domínio próprio", soon: true },
		],
	},
	{
		name: "Plano Infinity",
		description:
			"Para quem já vende e quer escalar com automações, testes e páginas otimizadas com IA.",
		price: 597,
		popular: false,
		features: [
			{ text: "50.000 plays/mês no VSL" },
			{ text: "+40 Gerações de Criativos (por semana)" },
			{ text: "+40 Gerações de Página de Vendas (por semana)" },
			{ text: "5 componentes de VSL" },
			{ text: "10 Funis de Quiz" },
			{ text: "20 Checkout Próprio + 0,5% de taxa", soon: true },
			{ text: "10.000 emails por mês", soon: true },
			{ text: "Testes A/B + Analytics Avançado" },
			{ text: "10 Áreas de Membros", soon: true },
			{ text: "Suporte Prioritário 1h (WhatsApp + Discord)" },
			{ text: "Domínio próprio + Integrações (ex.: Zapier)", soon: true },
		],
	},
];

export default function SettingsPage() {
	const session = authClient.useSession();
	return (
		<div className="space-y-8">
			<Tabs defaultValue="account" className="w-full">
				<TabsList className="grid w-full grid-cols-2 max-w-sm bg-muted p-1 rounded-full h-auto">
					<TabsTrigger
						value="account"
						className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
					>
						Conta
					</TabsTrigger>
					<TabsTrigger
						value="plan"
						className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
					>
						Plano
					</TabsTrigger>
				</TabsList>
				<TabsContent value="account">
					<div className="space-y-8 mt-8">
						<div className="space-y-2 max-w-sm">
							<Label htmlFor="name">Nome</Label>
							<Input id="name" defaultValue={session.data?.user?.name ?? ""} />
						</div>
						<div className="space-y-2 max-w-sm">
							<Label htmlFor="email">Email</Label>
							<Input
								id="email"
								type="email"
								defaultValue={session.data?.user?.email ?? ""}
							/>
						</div>
						<div className="space-y-4">
							<Label>Foto</Label>
							<div className="flex items-center gap-4">
								<Avatar className="h-16 w-16">
									<AvatarImage
										src={session.data?.user?.image ?? undefined}
										alt="@shadcn"
									/>
									<AvatarFallback className="border border-border">
										{session.data?.user?.name?.[0]}
									</AvatarFallback>
								</Avatar>
								<div className="flex gap-3">
									<Button
										variant="default"
										size="icon"
										className="bg-primary text-primary-foreground rounded-full"
									>
										<RiUploadCloud2Fill className="h-5 w-5" />
									</Button>
									<Button
										variant="secondary"
										size="icon"
										className="bg-muted text-muted-foreground hover:bg-muted/90 rounded-full"
									>
										<RiDeleteBin7Fill className="h-5 w-5" />
									</Button>
								</div>
							</div>
						</div>
					</div>
				</TabsContent>
				<TabsContent value="plan" className="mt-8 space-y-8">
					<div className="border border-border rounded-lg p-6 space-y-2">
						<h3 className="font-medium">
							Você está sem plano ativo no momento.
						</h3>
						<p className="text-sm text-muted-foreground">
							Ative um plano para desbloquear as ferramentas de criação, funis,
							inteligência artificial, páginas de vendas e muito mais. Escolha
							abaixo o plano ideal para o seu momento e comece a vender com
							estrutura profissional agora mesmo.
						</p>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl mx-auto">
						{plansData.map((plan) => (
							<PlanCard key={plan.name} plan={plan} />
						))}
					</div>
				</TabsContent>
			</Tabs>
			<div className="flex justify-end pt-4">
				<Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-6">
					Salvar
				</Button>
			</div>
		</div>
	);
}
