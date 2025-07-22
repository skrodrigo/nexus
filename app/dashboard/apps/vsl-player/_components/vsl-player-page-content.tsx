"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import {
	RiBarChart2Fill,
	RiFolderVideoFill,
	RiSideBarFill,
	RiSideBarLine,
	RiTestTubeFill,
} from "react-icons/ri";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AllowedDomains } from "./allowed-domains";
import { AnalyticsPage } from "./analytics-page";
import { VslEditor } from "./vsl-editor";
import { VslList } from "./vsl-list";

// Mock data - replace with actual data fetching
const allFolders = [
	{ id: "1", name: "Campanhas Antigas", createdAt: "2023-01-15" },
	{ id: "2", name: "Novos Lançamentos", createdAt: "2023-03-20" },
];

const allVsls = [
	{
		id: "1",
		title: "VSL Lançamento Produto X",
		createdAt: "2023-02-10",
		thumbnailUrl: "/placeholder.svg",
		folderId: "2",
	},
	{
		id: "2",
		title: "VSL Evergreen",
		createdAt: "2023-01-20",
		thumbnailUrl: "/placeholder.svg",
	},
	{
		id: "3",
		title: "VSL Campanha Páscoa",
		createdAt: "2023-03-05",
		thumbnailUrl: "/placeholder.svg",
		folderId: "1",
	},
];

type Vsl = (typeof allVsls)[0];

const navigationItems = [
	{ id: "video", label: "Vídeos", icon: RiFolderVideoFill },
	{ id: "ab-tests", label: "Testes A/B", icon: RiTestTubeFill },
	{ id: "analytics", label: "Analytics", icon: RiBarChart2Fill },
	{ id: "domains", label: "Domínios permitidos", icon: RiTestTubeFill },
];

export default function VslPlayerPageContent() {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const [isAsideOpen, setIsAsideOpen] = useState(true);
	const [activeView, setActiveView] = useState(
		searchParams.get("view") || "video",
	);
	const [editingVsl, setEditingVsl] = useState<Vsl | null>(null);
	const [searchTerm, setSearchTerm] = useState("");
	const [currentFolderId, setCurrentFolderId] = useState<string | null>(null);

	useEffect(() => {
		const view = searchParams.get("view");
		if (view && view !== activeView) {
			setActiveView(view);
		}
	}, [searchParams, activeView]);

	const handleViewChange = useCallback(
		(view: string) => {
			const params = new URLSearchParams(searchParams.toString());
			params.set("view", view);
			router.push(`${pathname}?${params.toString()}`);
			setActiveView(view);
		},
		[pathname, router, searchParams],
	);

	const handleFolderClick = (folderId: string | null) => {
		setCurrentFolderId(folderId);
	};

	const handleFolderCreate = (name: string) => {
		// Mock folder creation
		const newFolder = {
			id: Date.now().toString(),
			name,
			createdAt: new Date().toLocaleDateString(),
		};
		allFolders.push(newFolder);
		// In a real app, you would likely refetch or update state from a server response
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
						onEdit={setEditingVsl}
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
		<div className="flex h-full bg-background w-full">
			<aside
				className={`relative h-full border-r border-border flex flex-col gap-y-4 transition-all duration-200 ${isAsideOpen ? "w-72 p-4" : "w-20 p-2"}`}
			>
				<Button
					variant="ghost"
					size="icon"
					className="absolute -right-3 top-8 z-10 rounded-full border border-border bg-background text-muted-foreground"
					onClick={() => setIsAsideOpen(!isAsideOpen)}
				>
					{isAsideOpen ? <RiSideBarLine /> : <RiSideBarFill />}
				</Button>
				<div className={`font-bold text-lg ${!isAsideOpen && "hidden"}`}>
					VSL Player
				</div>
				<nav className="flex flex-col gap-y-1">
					{navigationItems.map((item) => (
						<Button
							key={item.id}
							variant={activeView === item.id ? "secondary" : "ghost"}
							className={`flex items-center gap-x-4 ${isAsideOpen ? "justify-start" : "justify-center"}`}
							onClick={() => handleViewChange(item.id)}
						>
							<item.icon className="size-5" />
							<span className={`${!isAsideOpen && "hidden"}`}>
								{item.label}
							</span>
						</Button>
					))}
				</nav>
			</aside>
			<main className="flex-1 p-6">
				<Card className="h-full w-full">{renderContent()}</Card>
			</main>
		</div>
	);
}
