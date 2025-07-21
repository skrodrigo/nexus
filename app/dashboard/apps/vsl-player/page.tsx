"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
	RiBarChart2Fill,
	RiCodeSSlashFill,
	RiDeleteBinFill,
	RiDownload2Fill,
	RiEdit2Fill,
	RiFolderAddFill,
	RiFolderVideoFill,
	RiLock2Fill,
	RiMoreFill,
	RiSearchFill,
	RiSideBarFill,
	RiSideBarLine,
	RiTestTubeFill,
	RiUploadCloud2Fill,
} from "react-icons/ri";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { VideoUpload } from "./_components/video-upload";

type Vsl = {
	id: string;
	title: string;
	createdAt: string;
	thumbnailUrl: string;
};

const navItems = [
	{ id: "video", label: "Vídeos", icon: RiFolderVideoFill },
	{ id: "ab", label: "Testes A/B", icon: RiTestTubeFill },
	{ id: "analytics", label: "Analytics", icon: RiBarChart2Fill },
	{ id: "domains", label: "Domínios permitidos", icon: RiLock2Fill },
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
];

function VslPlayerPage() {
	const [isAsideOpen, setIsAsideOpen] = useState(true);
	const [activeView, setActiveView] = useState("video");
	const [searchTerm, setSearchTerm] = useState("");
	const [filteredVsls, setFilteredVsls] = useState<Vsl[]>(vsls);

	useEffect(() => {
		const results = vsls.filter((vsl) =>
			vsl.title.toLowerCase().includes(searchTerm.toLowerCase()),
		);
		setFilteredVsls(results);
	}, [searchTerm]);

	const renderEmptyState = () => (
		<div className="flex flex-col items-center justify-center h-full gap-y-8 text-center">
			<div>
				<h2 className="text-2xl font-medium">Nenhum VSL Encontrado</h2>
				<p className="text-muted-foreground">
					Comece fazendo o upload de um novo vídeo ou criando uma pasta.
				</p>
			</div>
			<div className="flex gap-x-4">
				<Dialog>
					<DialogTrigger asChild>
						<Button>
							<RiUploadCloud2Fill className="mr-2 size-5" />
							Fazer Upload
						</Button>
					</DialogTrigger>
					<DialogContent className="sm:max-w-[425px]">
						<DialogHeader>
							<DialogTitle>Fazer Upload de VSL</DialogTitle>
						</DialogHeader>
						<div className="grid gap-4 py-4">
							<div className="grid w-full items-center gap-1.5">
								<Label htmlFor="title-empty">Título</Label>
								<Input
									id="title-empty"
									placeholder="Digite o título do seu vídeo"
								/>
							</div>
							<div className="grid w-full items-center gap-1.5">
								<Label>Vídeo</Label>
								<VideoUpload />
							</div>
						</div>
						<DialogFooter>
							<Button type="submit">Enviar</Button>
						</DialogFooter>
					</DialogContent>
				</Dialog>
				<Button variant="outline">
					<RiFolderAddFill className="mr-2 size-5" />
					Nova pasta
				</Button>
			</div>
		</div>
	);

	const renderVideos = () => (
		<Card>
			<CardHeader>
				<div className="flex items-center justify-between gap-4">
					<CardTitle>Meus Vídeos</CardTitle>
					<div className="relative w-full max-w-md">
						<RiSearchFill className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
						<Input
							placeholder="Pesquisar por nome..."
							className="pl-10"
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
						/>
					</div>
					<div className="flex gap-x-2">
						<Button variant="outline">
							<RiFolderAddFill className="mr-2 size-5" />
							Nova pasta
						</Button>
						<Dialog>
							<DialogTrigger asChild>
								<Button>
									<RiUploadCloud2Fill className="mr-2 size-5" />
									Fazer Upload
								</Button>
							</DialogTrigger>
							<DialogContent className="sm:max-w-[425px]">
								<DialogHeader>
									<DialogTitle>Fazer Upload de VSL</DialogTitle>
								</DialogHeader>
								<div className="grid gap-4 py-4">
									<div className="grid w-full items-center gap-1.5">
										<Label htmlFor="title">Título</Label>
										<Input
											id="title"
											placeholder="Digite o título do seu vídeo"
										/>
									</div>
									<div className="grid w-full items-center gap-1.5">
										<Label>Vídeo</Label>
										<VideoUpload />
									</div>
								</div>
								<DialogFooter>
									<Button type="submit">Enviar</Button>
								</DialogFooter>
							</DialogContent>
						</Dialog>
					</div>
				</div>
			</CardHeader>
			<CardContent>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead className="w-[80px]"></TableHead>
							<TableHead>Título</TableHead>
							<TableHead>Data de Criação</TableHead>
							<TableHead className="text-right">Ações</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{filteredVsls.map((vsl) => (
							<TableRow key={vsl.id}>
								<TableCell>
									<Image
										src={vsl.thumbnailUrl}
										alt={vsl.title}
										width={120}
										height={70}
										className="rounded-md object-cover"
									/>
								</TableCell>
								<TableCell className="font-medium">{vsl.title}</TableCell>
								<TableCell>{vsl.createdAt}</TableCell>
								<TableCell className="text-right">
									<Button variant="ghost" size="icon">
										<RiCodeSSlashFill className="size-5 text-primary" />
									</Button>
									<DropdownMenu>
										<DropdownMenuTrigger asChild>
											<Button variant="ghost" size="icon">
												<RiMoreFill className="size-5" />
											</Button>
										</DropdownMenuTrigger>
										<DropdownMenuContent align="end">
											<DropdownMenuItem>
												<RiEdit2Fill className="mr-2 size-4" />
												Editar
											</DropdownMenuItem>
											<DropdownMenuItem>
												<RiBarChart2Fill className="mr-2 size-4" />
												Analytics
											</DropdownMenuItem>
											<DropdownMenuItem>
												<RiDownload2Fill className="mr-2 size-4" />
												Download
											</DropdownMenuItem>
											<DropdownMenuItem>
												<RiDeleteBinFill className="mr-2 size-4" />
												Remover
											</DropdownMenuItem>
										</DropdownMenuContent>
									</DropdownMenu>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</CardContent>
		</Card>
	);

	const renderMainContent = () => {
		if (activeView === "video" && vsls.length === 0) {
			return renderEmptyState();
		}

		switch (activeView) {
			case "video":
				return renderVideos();
			case "ab":
				return (
					<Card>
						<CardHeader>
							<CardTitle>Testes A/B</CardTitle>
						</CardHeader>
						<CardContent>
							<p>Configurações de testes A/B aqui.</p>
						</CardContent>
					</Card>
				);
			case "analytics":
				return (
					<Card>
						<CardHeader>
							<CardTitle>Analytics</CardTitle>
						</CardHeader>
						<CardContent>
							<p>Veja os resultados dos testes A/B aqui.</p>
						</CardContent>
					</Card>
				);
			case "domains":
				return (
					<Card>
						<CardHeader>
							<CardTitle>Domínios Permitidos</CardTitle>
						</CardHeader>
						<CardContent>
							<p>Gerencie os domínios permitidos aqui.</p>
						</CardContent>
					</Card>
				);

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
			<main className="flex-1 flex flex-col max-h-full pt-12 px-4">
				{renderMainContent()}
			</main>
		</div>
	);
}

export default VslPlayerPage;
