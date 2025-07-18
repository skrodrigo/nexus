import { AppCard } from "@/components/dashboard/sidebar/app-card";
import { apps } from "@/lib/constants";

export default function AppsPage() {
	return (
		<div className="">
			<h1 className="text-xl font-medium text-foreground">Olá, Rodrigo</h1>
			<div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
				{apps.map((app) => (
					<AppCard
						key={app.title}
						icon={app.icon}
						title={app.title}
						description={app.description}
						status={app.status}
						actions={app.actions}
					/>
				))}
			</div>
		</div>
	);
}
