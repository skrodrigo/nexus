"use client";

import { parseAsString, useQueryState } from "nuqs";
import type { ComponentType } from "react";
import { useCallback } from "react";
import {
	RiArrowLeftSLine,
	RiFocus3Line,
	RiPaintBrushLine,
	RiPlayCircleLine,
	RiRecordCircleLine,
	RiSpeedUpLine,
} from "react-icons/ri";

import { Button } from "@/components/ui/button";
import {
	ActionButtonsSettings,
	SmartAutoplaySettings,
	SmartProgressSettings,
	StyleSettings,
	ThumbSniperSettings,
} from "./sidebar";

const editorNavItems = [
	{ id: "style", label: "Player", icon: RiPaintBrushLine },
	{ id: "thumb-sniper", label: "Thumbnail de Recuperação", icon: RiFocus3Line },
	{ id: "smart-autoplay", label: "Smart Autoplay", icon: RiPlayCircleLine },
	{
		id: "smart-progress",
		label: "Progresso Inteligente",
		icon: RiSpeedUpLine,
	},
	{ id: "action-buttons", label: "Botões de Ação", icon: RiRecordCircleLine },
];

const settingsComponents: Record<string, ComponentType> = {
	style: StyleSettings,
	"thumb-sniper": ThumbSniperSettings,
	"smart-autoplay": SmartAutoplaySettings,
	"action-buttons": ActionButtonsSettings,
	"smart-progress": SmartProgressSettings,
};

function SettingsSection({
	onBack,
	children,
	title,
}: {
	title: string;
	onBack: () => void;
	children: React.ReactNode;
}) {
	return (
		<div className="flex flex-col h-full">
			<div className="p-2 flex flex-col gap-y-4">
				<Button
					variant="ghost"
					className="justify-start gap-2 hover:text-foreground/80 hover:bg-transparent dark:hover:bg-transparent"
					onClick={onBack}
				>
					<RiArrowLeftSLine className="size-5" />
					<span className="uppercase">{title}</span>
				</Button>
			</div>
			<div className="p-4 flex-1 overflow-y-auto -mt-8">{children}</div>
		</div>
	);
}

interface Vsl {
	id: string;
	title: string;
	createdAt: string;
	thumbnailUrl: string;
	folderId?: string;
}

interface VslEditorProps {
	vsl: Vsl;
}

export function VslEditor({ vsl }: VslEditorProps) {
	const [activeSection, setActiveSection] = useQueryState(
		"section",
		parseAsString,
	);
	const [, setVslId] = useQueryState("vsl", parseAsString);

	const handleSectionChange = useCallback(
		(sectionId: string | null) => {
			setActiveSection(sectionId ?? null);
		},
		[setActiveSection],
	);

	const renderSidebarContent = () => {
		const selectedItem = editorNavItems.find(
			(item) => item.id === activeSection,
		);

		if (selectedItem) {
			const SettingsComponent = settingsComponents[selectedItem.id];

			return (
				<SettingsSection
					title={selectedItem.label}
					onBack={() => handleSectionChange(null)}
				>
					{SettingsComponent ? <SettingsComponent /> : null}
				</SettingsSection>
			);
		}

		return (
			<div className="p-2 flex flex-col gap-y-4">
				<Button
					variant="ghost"
					className="justify-start gap-2 hover:text-foreground/80 hover:bg-transparent dark:hover:bg-transparent"
					onClick={() => {
						setActiveSection(null);
						setVslId(null);
					}}
				>
					<RiArrowLeftSLine className="size-5" />
					{vsl.title}
				</Button>
				<nav className="flex flex-col gap-y-1">
					{editorNavItems.map((item) => {
						const Icon = item.icon;
						return (
							<Button
								key={item.id}
								variant="ghost"
								className="w-full justify-start h-10 "
								onClick={() => handleSectionChange(item.id)}
							>
								<Icon className="mr-3 size-5 text-primary" />
								{item.label}
							</Button>
						);
					})}
				</nav>
			</div>
		);
	};

	return (
		<div className="flex h-full bg-background w-full max-h-screen ">
			<aside className="w-72 sticky max-h-screen border-r border-border flex flex-col">
				{renderSidebarContent()}
			</aside>
			<main className="flex-1 p-8">
				<div className="w-full aspect-video bg-muted rounded-lg flex items-center justify-center max-h-screen overflow-y-auto">
					<p>Player do vídeo aqui</p>
				</div>
			</main>
		</div>
	);
}
