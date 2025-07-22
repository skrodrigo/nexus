"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import {
	RiBarChart2Fill,
	RiFolderVideoFill,
	RiLockUnlockFill,
	RiSideBarFill,
	RiSideBarLine,
	RiTestTubeFill,
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
		folderId: "1",
	},
];

type Vsl = (typeof allVsls)[0];

const navigationItems = [
	{ id: "video", label: "Vídeos", icon: RiFolderVideoFill },
	{ id: "ab-tests", label: "Testes A/B", icon: RiTestTubeFill },
	{ id: "analytics", label: "Analytics", icon: RiBarChart2Fill },
	{ id: "domains", label: "Domínios permitidos", icon: RiLockUnlockFill },
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
							onClick={() => setActiveView(item.id)}
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
			<main className="flex-1 p-6">
				<div className="h-full w-full mt-6">{renderContent()}</div>
			</main>
		</div>
	);
}
