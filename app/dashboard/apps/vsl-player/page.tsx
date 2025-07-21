"use client";

import { useState } from "react";
import {
	RiBarChart2Fill,
	RiFolderVideoFill,
	RiLock2Fill,
	RiSideBarFill,
	RiSideBarLine,
	RiTestTubeFill,
} from "react-icons/ri";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AllowedDomains } from "./_components/allowed-domains";
import { AnalyticsPage } from "./_components/analytics-page";
import { EmptyState } from "./_components/empty-state";
import { VslEditor } from "./_components/vsl-editor";
import { VslList } from "./_components/vsl-list";

type Folder = {
	id: string;
	name: string;
	createdAt: string;
};

type Vsl = {
	id: string;
	title: string;
	createdAt: string;
	thumbnailUrl: string;
	folderId?: string;
};

const navItems = [
	{ id: "video", label: "Vídeos", icon: RiFolderVideoFill },
	{ id: "ab", label: "Testes A/B", icon: RiTestTubeFill },
	{ id: "analytics", label: "Analytics", icon: RiBarChart2Fill },
	{ id: "domains", label: "Domínios permitidos", icon: RiLock2Fill },
];

const initialFolders: Folder[] = [
	{
		id: "folder-1",
		name: "Campanhas de Verão",
		createdAt: new Date().toLocaleDateString(),
	},
];

const vsls: Vsl[] = [
	{
		id: "1",
		title: "Meu Primeiro VSL",
		createdAt: new Date().toLocaleDateString(),
		thumbnailUrl: "https://picsum.photos/seed/1/120/70",
	},
	{
		id: "2",
		title: "VSL de Lançamento",
		createdAt: new Date().toLocaleDateString(),
		thumbnailUrl: "https://picsum.photos/seed/2/120/70",
	},
	{
		id: "3",
		title: "Promoção de Verão",
		createdAt: new Date().toLocaleDateString(),
		thumbnailUrl: "https://picsum.photos/seed/3/120/70",
		folderId: "folder-1",
	},
];

function VslPlayerPage() {
	const [isAsideOpen, setIsAsideOpen] = useState(true);
	const [activeView, setActiveView] = useState("video");
	const [searchTerm, setSearchTerm] = useState("");
	const [editingVsl, setEditingVsl] = useState<Vsl | null>(null);
	const [folders, setFolders] = useState<Folder[]>(initialFolders);
	const [currentFolderId, setCurrentFolderId] = useState<string | null>(null);

	const handleCreateFolder = (name: string) => {
		const newFolder: Folder = {
			id: `folder-${Date.now()}`,
			name,
			createdAt: new Date().toLocaleDateString(),
		};
		setFolders((prevFolders) => [...prevFolders, newFolder]);
	};

	const currentFolder = folders.find((f) => f.id === currentFolderId);

	const filteredFolders = folders.filter(
		(folder) =>
			!currentFolderId &&
			folder.name.toLowerCase().includes(searchTerm.toLowerCase()),
	);

	const filteredVsls = vsls.filter(
		(vsl) =>
			(currentFolderId ? vsl.folderId === currentFolderId : !vsl.folderId) &&
			vsl.title.toLowerCase().includes(searchTerm.toLowerCase()),
	);

	const renderMainContent = () => {
		if (activeView === "video" && vsls.length === 0) {
			return <EmptyState />;
		}

		switch (activeView) {
			case "video":
				return (
					<VslList
						folders={filteredFolders}
						vsls={filteredVsls}
						searchTerm={searchTerm}
						onSearchTermChange={setSearchTerm}
						onEdit={setEditingVsl}
						onFolderClick={setCurrentFolderId}
						currentFolder={currentFolder}
						onBackClick={() => setCurrentFolderId(null)}
						onFolderCreate={handleCreateFolder}
					/>
				);
			case "ab":
				return (
					<Card>
						<CardContent>
							<p>Volte aqui em breve ;)</p>
						</CardContent>
					</Card>
				);
			case "analytics":
				return <AnalyticsPage />;
			case "domains":
				return <AllowedDomains />;

			default:
				return null;
		}
	};

	if (editingVsl) {
		return <VslEditor vsl={editingVsl} onBack={() => setEditingVsl(null)} />;
	}

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
			<main className="flex-1 flex flex-col max-h-full pt-12 px-4">
				{renderMainContent()}
			</main>
		</div>
	);
}

export default VslPlayerPage;
