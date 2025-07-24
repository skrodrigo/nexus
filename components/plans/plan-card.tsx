import Link from "next/link";
import { RiCheckFill } from "react-icons/ri";
import { Button } from "@/components/ui/button";

interface Plan {
	name: string;
	description: string;
	price: number;
	popular: boolean;
	features: { text: string; soon?: boolean }[];
}

interface PlanCardProps {
	plan: Plan;
	current?: boolean;
}

export function PlanCard({ plan, current = false }: PlanCardProps) {
	return (
		<div className="border border-border rounded-xl p-8 flex flex-col relative bg-background h-full">
			{plan.popular && !current && (
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
				<Button className="w-full mt-6 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full">
					Começar Agora
				</Button>
			</Link>
			<ul className="mt-8 space-y-4 text-sm">
				{plan.features.map((feature) => (
					<li key={feature.text} className="flex items-center gap-3">
						<RiCheckFill className="w-5 h-5 text-primary" />
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
	);
}
