"use client";

import { usePathname } from "next/navigation";
import TeamSwitcher from "@/components/dashboard/team-switcher";

const titleMap: { [key: string]: string } = {
	"/dashboard/apps": "Apps",
	"/dashboard/files": "Arquivos",
	"/dashboard/chat": "Chat",
	"/dashboard/settings": "Configurações",
	"/dashboard/apps/creative-generator": "Gerador de Criativos",
	"/dashboard/apps/funnels": "Funis",
	"/dashboard/apps/members-area": "Área de Membros",
	"/dashboard/apps/vsl-player": "Player VSL",
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
