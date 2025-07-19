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
			<div className="flex flex-col w-full h-full">
				<div className="px-4 py-2 hidden md:block">
					<Header />
				</div>
				<main className="flex-1 overflow-y-auto p-2 border md:mx-3 md:my-1 rounded-xl bg-muted ">
					{children}
				</main>
			</div>
		</div>
	);
}
