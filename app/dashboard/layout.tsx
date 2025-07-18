import { Sidebar } from "@/components/dashboard/sidebar/sidebar";

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="flex h-screen overflow-hidden">
			<div className="hidden md:flex md:flex-shrink-0">
				<div className="flex w-20 flex-col">
					<Sidebar />
				</div>
			</div>
			<main className="flex-1 overflow-y-auto p-4 border mx-3 my-1 rounded-xl bg-muted">
				{children}
			</main>
		</div>
	);
}
