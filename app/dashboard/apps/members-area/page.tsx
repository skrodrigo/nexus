"use client";

import { useState } from "react";
import {
	RiBarChart2Fill,
	RiBookOpenFill,
	RiGroupFill,
	RiSettings3Fill,
	RiSideBarFill,
	RiSideBarLine,
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

type MemberArea = {
	id: string;
	title: string;
};

const navItems = [
	{ id: "cursos", label: "Cursos", icon: RiBookOpenFill },
	{ id: "alunos", label: "Alunos", icon: RiGroupFill },
	{ id: "relatorios", label: "Relatórios", icon: RiBarChart2Fill },
	{ id: "configuracoes", label: "Configurações", icon: RiSettings3Fill },
];

function MembersAreaPage() {
	const memberAreas: MemberArea[] = [];
	const [isAsideOpen, setIsAsideOpen] = useState(true);
	const [activeView, setActiveView] = useState("cursos");

	const renderEmptyState = () => (
		<div className="flex flex-col items-center justify-center h-full gap-y-8 text-center">
			<div>
				<h2 className="text-2xl font-medium">Nenhum Curso Encontrado</h2>
				<p className="text-muted-foreground">Comece criando um novo Curso.</p>
			</div>
			<Dialog>
				<DialogTrigger asChild>
					<Button>Criar Novo Curso</Button>
				</DialogTrigger>
				<DialogContent className="sm:max-w-[425px]">
					<DialogHeader>
						<DialogTitle>Criar Novo Curso</DialogTitle>
					</DialogHeader>
					<div className="grid gap-4 py-4">
						<div className="grid grid-cols-4 items-center gap-4">
							<Label htmlFor="title" className="text-right">
								Título
							</Label>
							<Input
								id="title"
								placeholder="Ex: Curso de Marketing"
								className="col-span-3"
							/>
						</div>
					</div>
					<DialogFooter>
						<Button type="submit">Criar Curso</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	);

	const renderMainContent = () => {
		if (activeView === "cursos" && memberAreas.length === 0) {
			return renderEmptyState();
		}

		switch (activeView) {
			case "cursos":
				return (
					<Card>
						<CardHeader>
							<CardTitle>Gerenciar Cursos</CardTitle>
						</CardHeader>
						<CardContent>
							<p>Aqui você pode gerenciar seus cursos.</p>
						</CardContent>
					</Card>
				);

			case "alunos":
				return (
					<Card>
						<CardHeader>
							<CardTitle>Gerenciar Alunos</CardTitle>
						</CardHeader>
						<CardContent>
							<p>Aqui você pode gerenciar seus alunos.</p>
						</CardContent>
					</Card>
				);
			case "relatorios":
				return (
					<Card>
						<CardHeader>
							<CardTitle>Relatórios</CardTitle>
						</CardHeader>
						<CardContent>
							<p>Veja os relatórios de seus cursos e alunos.</p>
						</CardContent>
					</Card>
				);
			case "configuracoes":
				return (
					<Card>
						<CardHeader>
							<CardTitle>Configurações da Área de Membros</CardTitle>
						</CardHeader>
						<CardContent>
							<p>Gerencie as configurações da sua área de membros.</p>
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

export default MembersAreaPage;

