"use client";

import { useState } from "react";
import {
	RiBarChart2Fill,
	RiFolderAddFill,
	RiFolderVideoFill,
	RiLock2Fill,
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Vsl = {
	id: string;
	title: string;
};

const navItems = [
	{ id: "video", label: "Vídeos", icon: RiFolderVideoFill },
	{ id: "ab", label: "Testes A/B", icon: RiTestTubeFill },
	{ id: "analytics", label: "Analytics", icon: RiBarChart2Fill },
	{ id: "domains", label: "Domínios permitidos", icon: RiLock2Fill },
];

function VslPlayerPage() {
	const vsls: Vsl[] = [];
	const [isAsideOpen, setIsAsideOpen] = useState(true);
	const [activeView, setActiveView] = useState("video");

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
							<div className="grid grid-cols-4 items-center gap-4">
								<Label htmlFor="vsl-file" className="text-right">
									Arquivo
								</Label>
								<Input id="vsl-file" type="file" className="col-span-3" />
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

	const renderMainContent = () => {
		if (activeView === "video" && vsls.length === 0) {
			return renderEmptyState();
		}

		switch (activeView) {
			case "video":
				return (
					<Card>
						<CardHeader>
							<CardTitle>Configurações de Vídeo</CardTitle>
						</CardHeader>
						<CardContent>
							<p>Ajustes de vídeo aqui.</p>
						</CardContent>
					</Card>
				);
			
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
			<main className="flex-1 flex flex-col max-h-full items-center justify-center p-4">
				{renderMainContent()}
			</main>
		</div>
	);
}

export default VslPlayerPage;
