import { Sidebar } from "@/components/dashboard/sidebar/sidebar";

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="h-screen flex flex-col md:flex-row md:overflow-hidden">
			<Sidebar />
			<main className="flex-1 overflow-y-auto p-4 border md:mx-3 md:my-1 rounded-xl bg-muted">
				{children}
			</main>
		</div>
	);
}
