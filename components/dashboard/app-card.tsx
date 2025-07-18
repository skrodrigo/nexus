import type { VariantProps } from "class-variance-authority";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button, type buttonVariants } from "@/components/ui/button";

interface AppCardProps {
	icon: React.ReactNode;
	title: string;
	description: string;
	status: "new" | "soon" | null;
	actions: {
		label: string;
		href: string;
		variant?: VariantProps<typeof buttonVariants>["variant"];
	}[];
}

export function AppCard({
	icon,
	title,
	description,
	status,
	actions,
}: AppCardProps) {
	return (
		<div className="flex flex-col rounded-lg border bg-card p-6 shadow-sm">
			<div className="flex items-start justify-between">
				<div className="flex items-center gap-x-4">
					<div className="rounded-lg p-2 text-primary">{icon}</div>
					<h3 className="text-lg font-medium text-card-foreground">{title}</h3>
				</div>
				{status === "new" && (
					<Badge variant="outline" className="text-primary">
						Novo
					</Badge>
				)}
				{status === "soon" && (
					<Badge variant="outline" className="text-yellow-600">
						Em breve
					</Badge>
				)}
			</div>
			<p className="mt-4 text-sm text-muted-foreground">{description}</p>
			<div className="mt-6 flex flex-1 items-end justify-end gap-x-2">
				{actions.map((action) => (
					<Button
						key={action.label}
						asChild
						className="rounded-full"
						variant={action.variant || "default"}
					>
						<Link href={action.href}>{action.label}</Link>
					</Button>
				))}
			</div>
		</div>
	);
}
