"use client";

import { parseAsString, useQueryState } from "nuqs";
import { useCallback, useState } from "react";
import {
	RiBarChart2Fill,
	RiFolderVideoFill,
	RiLockUnlockFill,
	RiSideBarFill,
	RiSideBarLine,
} from "react-icons/ri";

import { Button } from "@/components/ui/button";
import { AllowedDomains } from "./allowed-domains";
import { AnalyticsPage } from "./analytics-page";
import { VslEditor } from "./vsl-editor";
import { VslList } from "./vsl-list";

const allFolders = [
	{ id: "1", name: "Campanhas Antigas", createdAt: "2023-01-15" },
	{ id: "2", name: "Novos Lançamentos", createdAt: "2023-03-20" },
];

const allVsls = [
	{
		id: "1",
		title: "VSL Lançamento Produto X",
		createdAt: "2023-02-10",
		thumbnailUrl: "https://placeholder.pics/svg/1920x1080",
		folderId: "2",
	},
	{
		id: "2",
		title: "VSL Evergreen",
		createdAt: "2023-01-20",
		thumbnailUrl: "https://placeholder.pics/svg/1920x1080",
	},
	{
		id: "3",
		title: "VSL Campanha Páscoa",
		createdAt: "2023-03-05",
		thumbnailUrl: "https://placeholder.pics/svg/1920x1080",
	},
	{
		id: "4",
		title: "VSL Campanha Páscoa",
		createdAt: "2023-03-05",
		thumbnailUrl: "https://placeholder.pics/svg/1920x1080",
	},
	{
		id: "5",
		title: "VSL Campanha Páscoa",
		createdAt: "2023-03-05",
		thumbnailUrl: "https://placeholder.pics/svg/1920x1080",
	},
	{
		id: "6",
		title: "VSL Campanha Páscoa",
		createdAt: "2023-03-05",
		thumbnailUrl: "https://placeholder.pics/svg/1920x1080",
	},
	{
		id: "7",
		title: "VSL Campanha Páscoa",
		createdAt: "2023-03-05",
		thumbnailUrl: "https://placeholder.pics/svg/1920x1080",
	},
	{
		id: "8",
		title: "VSL Campanha Páscoa",
		createdAt: "2023-03-05",
		thumbnailUrl: "https://placeholder.pics/svg/1920x1080",
	},
	{
		id: "9",
		title: "VSL Campanha Páscoa",
		createdAt: "2023-03-05",
		thumbnailUrl: "https://placeholder.pics/svg/1920x1080",
	},
	{
		id: "10",
		title: "VSL Campanha Páscoa",
		createdAt: "2023-03-05",
		thumbnailUrl: "https://placeholder.pics/svg/1920x1080",
	},
];

type Vsl = (typeof allVsls)[0];

const navigationItems = [
	{ id: "video", label: "Vídeos", icon: RiFolderVideoFill },
	{ id: "analytics", label: "Analytics", icon: RiBarChart2Fill },
	{ id: "domains", label: "Domínios permitidos", icon: RiLockUnlockFill },
];

export default function VslPlayerPageContent() {
	const [isAsideOpen, setIsAsideOpen] = useState(true);

	const [activeView, setActiveView] = useQueryState(
		"view",
		parseAsString.withDefault("video"),
	);
	const [vslId, setVslId] = useQueryState("vsl", parseAsString);
	const [sectionParam, setSectionParam] = useQueryState(
		"section",
		parseAsString,
	);
	const editingVsl = allVsls.find((v) => v.id === vslId) ?? null;
	const [searchTerm, setSearchTerm] = useState("");
	const [currentFolderId, setCurrentFolderId] = useState<string | null>(null);

	const updateView = useCallback(
		(view: string) => {
			setActiveView(view);
		},
		[setActiveView],
	);

	const handleFolderClick = (folderId: string | null) => {
		setCurrentFolderId(folderId);
	};

	const handleEdit = useCallback(
		(vsl: Vsl) => {
			setVslId(vsl.id);
			if (!sectionParam) setSectionParam("style");
		},
		[setVslId, sectionParam, setSectionParam],
	);

	const handleFolderCreate = (name: string) => {
		const newFolder = {
			id: Date.now().toString(),
			name,
			createdAt: new Date().toLocaleDateString(),
		};
		allFolders.push(newFolder);
	};

	const currentFolder = allFolders.find((f) => f.id === currentFolderId);

	const filteredFolders = currentFolderId
		? []
		: allFolders.filter((f) =>
				f.name.toLowerCase().includes(searchTerm.toLowerCase()),
			);
	const filteredVsls = allVsls.filter((v) => {
		const inFolder = currentFolderId
			? v.folderId === currentFolderId
			: !v.folderId;
		const matchesSearch = v.title
			.toLowerCase()
			.includes(searchTerm.toLowerCase());
		return inFolder && matchesSearch;
	});

	const renderContent = () => {
		switch (activeView) {
			case "video":
				return (
					<VslList
						folders={filteredFolders}
						vsls={filteredVsls}
						searchTerm={searchTerm}
						onSearchTermChange={setSearchTerm}
						onEdit={handleEdit}
						onFolderClick={handleFolderClick}
						currentFolder={currentFolder}
						onBackClick={() => setCurrentFolderId(null)}
						onFolderCreate={handleFolderCreate}
					/>
				);
			case "ab-tests":
				return <p>A/B Tests Page</p>;
			case "analytics":
				return <AnalyticsPage />;
			case "domains":
				return <AllowedDomains />;
			default:
				return null;
		}
	};

	if (editingVsl) {
		return <VslEditor vsl={editingVsl} />;
	}

	return (
		<div className="flex h-full bg-background w-full overflow-hidden">
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

				<nav className="flex flex-col gap-y-1">
					{navigationItems.map((item) => (
						<Button
							key={item.id}
							variant={
								isAsideOpen && activeView === item.id ? "secondary" : "ghost"
							}
							className={`w-full ${isAsideOpen ? "justify-start" : "justify-center items-center"} ${!isAsideOpen ? "bg-transparent hover:bg-transparent dark:bg-transparent dark:hover:bg-transparent" : ""}`}
							onClick={() => updateView(item.id)}
							size={isAsideOpen ? "default" : "icon"}
						>
							<span
								className={`p-1 rounded-xl  ${activeView === item.id ? "text-primary" : "text-muted-foreground"}`}
							>
								<item.icon className="size-6" />
							</span>
							<span className={isAsideOpen ? "ml-4" : ""}>
								{isAsideOpen && item.label}
							</span>
						</Button>
					))}
				</nav>
			</aside>
			<main className="flex-1 px-14 py-6 overflow-y-auto">
				<div className="h-full w-full">{renderContent()}</div>
			</main>
		</div>
	);
}
