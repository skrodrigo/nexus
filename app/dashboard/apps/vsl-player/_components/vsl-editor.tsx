"use client";

import { useState } from "react";
import {
	RiAnchorLine,
	RiArrowLeftSLine,
	RiBarChart2Fill,
	RiFileTextLine,
	RiFocus3Line,
	RiPaintBrushLine,
	RiPhoneLine,
	RiPlayCircleLine,
	RiRecordCircleLine,
} from "react-icons/ri";
import { Button } from "@/components/ui/button";

type Vsl = {
	id: string;
	title: string;
	thumbnailUrl: string;
};

const editorNavItems = [
	{ id: "style", label: "Estilo", icon: RiPaintBrushLine },
	{ id: "thumb-sniper", label: "ThumbSniper", icon: RiFocus3Line },
	{ id: "smart-autoplay", label: "Smart Autoplay", icon: RiPlayCircleLine },
	{ id: "hook", label: "Gancho", icon: RiAnchorLine },
	{ id: "mini-hooks", label: "Mini-Ganchos", icon: RiPhoneLine },
	{
		id: "smart-progress",
		label: "Progresso Inteligente",
		icon: RiFileTextLine,
	},
	{ id: "action-buttons", label: "Botões de Ação", icon: RiRecordCircleLine },
	{ id: "analytics", label: "Analytics", icon: RiBarChart2Fill },
];

interface VslEditorProps {
	vsl: Vsl;
	onBack: () => void;
}

export function VslEditor({ vsl, onBack }: VslEditorProps) {
	const [activeSection, setActiveSection] = useState("style");

	return (
		<div className="flex h-full bg-background w-full max-h-screen ">
			<aside className="w-72 sticky max-h-screen overflow-y-auto border-r border-border flex flex-col gap-y-4 p-4">
				<Button
					variant="ghost"
					className="justify-start gap-2 hover:text-foreground/80 hover:bg-transparent dark:hover:bg-transparent"
					onClick={onBack}
				>
					<RiArrowLeftSLine className="size-5" />
					VOLTAR PARA OS VÍDEOS
				</Button>
				<nav className="flex flex-col gap-y-1">
					{editorNavItems.map((item) => {
						const Icon = item.icon;
						return (
							<Button
								key={item.id}
								variant={activeSection === item.id ? "secondary" : "ghost"}
								className="w-full justify-start h-12"
								onClick={() => setActiveSection(item.id)}
							>
								<Icon
									className={`mr-3 size-5 ${activeSection === item.id ? "text-primary" : ""}`}
								/>
								{item.label}
							</Button>
						);
					})}
				</nav>
			</aside>
			<main className="flex-1 p-8">
				<div className="w-full aspect-video bg-muted rounded-lg flex items-center justify-center max-h-screen overflow-y-auto">
					<p>Player do vídeo aqui</p>
				</div>
			</main>
		</div>
	);
}
