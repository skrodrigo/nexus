import { Header } from "@/components/dashboard/header";
import { Sidebar } from "@/components/dashboard/sidebar/sidebar";

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="h-screen flex flex-col md:flex-row md:overflow-hidden">
			<Sidebar />
			<div className="flex flex-col w-full">
				<div className="px-4 py-2 hidden md:block">
					<Header />
				</div>
				<main className="flex-1 overflow-y-auto border border-b-0 md:mx-3 md:mt-1 rounded-t-xl bg-muted">
					{children}
				</main>
			</div>
		</div>
	);
}
