"use client";

import { usePathname } from "next/navigation";
import TeamSwitcher from "@/components/dashboard/team-switcher";

const titleMap: { [key: string]: string } = {
	"/dashboard/apps": "Apps",
	"/dashboard/files": "Arquivos",
	"/dashboard/chat": "Chat",
	"/dashboard/settings": "Configurações",
};

export function Header() {
	const pathname = usePathname();
	const title = titleMap[pathname] || "Dashboard";

	return (
		<div className="flex items-center gap-x-4">
			<h1 className="text-xl font-medium text-foreground">{title}</h1>
			<TeamSwitcher />
		</div>
	);
}
