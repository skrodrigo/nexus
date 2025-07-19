import { AppCard } from "@/components/dashboard/app-card";
import { apps } from "@/lib/constants";

export default function AppsPage() {
	return (
		<div>
			<div className="grid grid-cols-1 p-2 gap-6 md:grid-cols-2 lg:grid-cols-3">
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
