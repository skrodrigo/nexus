"use client";

import { useState } from "react";
import {
	RiBarChart2Fill,
	RiBookOpenFill,
	RiGroupFill,
	RiSideBarFill,
	RiSideBarLine,
} from "react-icons/ri";
import { AlunosView } from "@/app/dashboard/apps/course-area/alunos-view";
import { CursosView } from "@/app/dashboard/apps/course-area/cursos-view";
import { RelatoriosView } from "@/app/dashboard/apps/course-area/relatorios-view";
import { Button } from "@/components/ui/button";

const navItems = [
	{ id: "cursos", label: "Cursos", icon: RiBookOpenFill },
	{ id: "alunos", label: "Alunos", icon: RiGroupFill },
	{ id: "relatorios", label: "Relatórios", icon: RiBarChart2Fill },
];

export default function CourseAreaPage() {
	const [isAsideOpen, setIsAsideOpen] = useState(true);
	const [activeView, setActiveView] = useState("cursos");

	const renderMainContent = () => {
		switch (activeView) {
			case "cursos":
				return <CursosView />;
			case "alunos":
				return <AlunosView />;
			case "relatorios":
				return <RelatoriosView />;
			default:
				return null;
		}
	};

	return (
		<div className="flex h-full bg-background w-full">
			<aside
				className={`relative h-full border-r border-border flex flex-col gap-y-4 transition-all duration-200 ${
					isAsideOpen ? "w-72 p-2" : "w-14 p-2 items-center"
				}`}
			>
				<div
					className={`flex items-center justify-end absolute transition-all duration-200 ${
						isAsideOpen ? "top-[5px] left-[292px]" : " top-[5px] left-[62px]"
					} `}
				>
					<Button variant="ghost" onClick={() => setIsAsideOpen(!isAsideOpen)}>
						{isAsideOpen ? <RiSideBarLine /> : <RiSideBarFill />}
					</Button>
				</div>
				<nav className="flex flex-col gap-y-2 w-full items-center justify-center">
					{navItems.map((item) => {
						const Icon = item.icon;
						return (
							<Button
								key={item.id}
								variant={
									isAsideOpen && activeView === item.id ? "secondary" : "ghost"
								}
								className={`w-full ${isAsideOpen ? "justify-start" : "justify-center items-center"} ${!isAsideOpen ? "bg-transparent hover:bg-transparent dark:bg-transparent dark:hover:bg-transparent" : ""}`}
								onClick={() => setActiveView(item.id)}
								size={isAsideOpen ? "default" : "icon"}
							>
								<span
									className={`p-1 rounded-xl  ${activeView === item.id ? "text-primary" : "text-muted-foreground"}`}
								>
									<Icon className="size-6" />
								</span>
								<span className={isAsideOpen ? "ml-4" : ""}>
									{isAsideOpen && item.label}
								</span>
							</Button>
						);
					})}
				</nav>
			</aside>
			<main className="flex-1 flex flex-col max-h-full items-center justify-center p-2 mt-12 border border-border rounded-lg m-6">
				{renderMainContent()}
			</main>
		</div>
	);
}
