"use client";

import { useState } from "react";
import {
	RiAddLine,
	RiAttachment2,
	RiDeleteBinLine,
	RiImageAiFill,
	RiMore2Fill,
	RiSendPlaneFill,
	RiSideBarFill,
	RiSideBarLine,
} from "react-icons/ri";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Textarea } from "@/components/ui/textarea";

export default function ChatPage() {
	const [isAsideOpen, setIsAsideOpen] = useState(true);
	const [history, setHistory] = useState<string[]>(["Chat de Vendas para PLR"]);

	const handleNewGeneration = () => {
		console.log("New generation");
	};

	const handleDeleteHistory = (index: number) => {
		setHistory(history.filter((_, i) => i !== index));
	};

	return (
		<div className="flex h-full ">
			<aside
				className={`relative h-full border-r border-border flex-col gap-4 hidden md:flex transition-all duration-200 ${
					isAsideOpen ? "w-72 p-2" : "w-14 p-2 items-center"
				}`}
			>
				<div
					className={`flex items-center justify-end absolute transition-all duration-200 ${
						isAsideOpen ? "top-[6px] left-[292px]" : " top-[6px] left-[60px]"
					} `}
				>
					<Button variant="ghost" onClick={() => setIsAsideOpen(!isAsideOpen)}>
						{isAsideOpen ? <RiSideBarLine /> : <RiSideBarFill />}
					</Button>
				</div>
				<Button
					onClick={
						isAsideOpen ? handleNewGeneration : () => setIsAsideOpen(true)
					}
					size={isAsideOpen ? "default" : "icon"}
				>
					{isAsideOpen ? (
						<>
							<RiAddLine className="mr-2" />
							Nova Geração
						</>
					) : (
						<RiAddLine />
					)}
				</Button>
				<div className="flex-1 space-y-2 overflow-y-auto w-full">
					<div className="flex justify-between items-center">
						{isAsideOpen && (
							<h3 className="text-sm font-medium text-muted-foreground">
								Histórico
							</h3>
						)}
					</div>

					{history.map((item, index) => (
						<div key={item}>
							<Button
								className={`w-full px-2 flex items-center bg-transparent hover:bg-accent/20 text-foreground justify-between ${
									isAsideOpen ? "whitespace-normal h-8 text-left" : "truncate"
								}`}
							>
								<span className="truncate">{isAsideOpen ? item : ""}</span>
								{isAsideOpen && (
									<DropdownMenu>
										<DropdownMenuTrigger asChild>
											<Button
												variant="ghost"
												size="icon"
												className="shrink-0 h-6 w-6 rounded-full"
											>
												<RiMore2Fill />
											</Button>
										</DropdownMenuTrigger>
										<DropdownMenuContent sideOffset={0} align="start">
											<DropdownMenuItem
												onClick={() => handleDeleteHistory(index)}
											>
												<RiDeleteBinLine className="mr-2" />
												Deletar
											</DropdownMenuItem>
										</DropdownMenuContent>
									</DropdownMenu>
								)}
							</Button>
						</div>
					))}
				</div>
			</aside>
			<div className="flex flex-1 flex-col h-full items-center justify-center text-foreground p-2">
				<div className="w-full max-w-2xl mx-auto flex flex-col items-center gap-6">
					<h1 className="text-3xl font-medium">O que vamos Construir Hoje ?</h1>
					<div className="relative w-full p-4 bg-background border border-border rounded-2xl shadow-lg">
						<Textarea
							placeholder="Estou criando uma oferta para um produto digital low ticket..."
							className="bg-background border-none resize-none focus-visible:ring-0 focus-visible:ring-offset-0 text-foreground placeholder:text-muted-foreground h-28"
						/>
						<div className="flex justify-between items-center mt-2">
							<div className="flex items-center gap-2">
								<Button
									variant="outline"
									size="icon"
									className="text-muted-foreground hover:text-primary"
								>
									<RiAttachment2 className="size-5" />
								</Button>
								<Button
									variant="outline"
									className="text-muted-foreground hover:text-primary dark:bg-muted gap-2"
								>
									<RiImageAiFill className="size-5" />
									Image
								</Button>
							</div>
							<Button
								size="icon"
								variant="outline"
								className="bg-primary/20 text-primary hover:text-primary hover:bg-primary/90 rounded-full"
							>
								<RiSendPlaneFill className="size-5" />
							</Button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
