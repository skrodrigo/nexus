"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
	RiAddLine,
	RiAttachment2,
	RiComputerLine,
	RiDeleteBinLine,
	RiImageAiFill,
	RiMore2Fill,
	RiSendPlaneFill,
	RiSideBarFill,
	RiSideBarLine,
	RiUser3Line,
} from "react-icons/ri";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Textarea } from "@/components/ui/textarea";

interface Message {
	id: string;
	role: "user" | "assistant";
	content: string;
	imageUrl?: string;
}

export default function ChatPage() {
	const [isAsideOpen, setIsAsideOpen] = useState(true);
	const [history, setHistory] = useState<{ id: string; title: string }[]>([
		{ id: `hist-${Date.now()}`, title: "Chat de Vendas para PLR" },
	]);
	const [messages, setMessages] = useState<Message[]>([]);
	const [input, setInput] = useState("");
	const [isImageGenerationActive, setIsImageGenerationActive] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const chatEndRef = useRef<HTMLDivElement>(null);

	// biome-ignore lint/correctness/useExhaustiveDependencies: We want to scroll every time the messages array is updated.
	useEffect(() => {
		chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages]);

	const handleNewGeneration = () => {
		setMessages([]);
	};

	const handleDeleteHistory = (id: string) => {
		setHistory(history.filter((item) => item.id !== id));
	};

	const handleSendMessage = async () => {
		if (!input.trim() || isLoading) return;

		const userMessage: Message = {
			id: `user-${Date.now()}`,
			role: "user",
			content: input,
		};
		setMessages((prev) => [...prev, userMessage]);
		setInput("");
		setIsLoading(true);

		// Simulate API call
		setTimeout(() => {
			const assistantMessage: Message = {
				id: `asst-${Date.now()}`,
				role: "assistant",
				content: isImageGenerationActive
					? `Aqui está a imagem que você pediu baseada em: "${input}"`
					: `Esta é uma resposta simulada para: "${input}"`,
				imageUrl: isImageGenerationActive
					? `https://picsum.photos/seed/${Math.random()}/512/512`
					: undefined,
			};
			setMessages((prev) => [...prev, assistantMessage]);
			setIsLoading(false);
			setIsImageGenerationActive(false); // Reset after generation
		}, 1500);
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
					{isAsideOpen && (
						<h3 className="text-sm font-medium text-muted-foreground px-2">
							Histórico
						</h3>
					)}
					{history.map((item) => (
						<div key={item.id}>
							<Button
								className={`w-full px-2 flex items-center bg-transparent hover:bg-accent/20 text-foreground justify-between ${
									isAsideOpen ? "whitespace-normal h-8 text-left" : "truncate"
								}`}
							>
								<span className="truncate">
									{isAsideOpen ? item.title : ""}
								</span>
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
												onClick={() => handleDeleteHistory(item.id)}
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
			<div className="flex flex-1 flex-col h-full text-foreground p-2">
				<div className="flex-1 w-full max-w-2xl mx-auto overflow-y-auto">
					{messages.length === 0 && !isLoading ? (
						<div className="h-full flex flex-col items-center justify-center text-center">
							<h1 className="text-3xl font-medium text-foreground">
								O que vamos Construir Hoje ?
							</h1>
						</div>
					) : (
						<div className="space-y-6">
							{messages.map((msg) => (
								<div
									key={msg.id}
									className={`flex items-start gap-4 ${
										msg.role === "user" ? "" : ""
									}`}
								>
									<div
										className={`p-2 rounded-full ${
											msg.role === "user" ? "bg-primary/20" : "bg-muted"
										}`}
									>
										{msg.role === "user" ? <RiUser3Line /> : <RiComputerLine />}
									</div>
									<div className="flex-1">
										<p className="text-sm leading-relaxed">{msg.content}</p>
										{msg.imageUrl && (
											<div className="mt-2 relative w-full max-w-sm h-auto aspect-square rounded-lg overflow-hidden">
												<Image
													src={msg.imageUrl}
													alt="Generated Image"
													fill
													className="object-cover"
												/>
											</div>
										)}
									</div>
								</div>
							))}
							{isLoading && (
								<div className="flex items-start gap-4">
									<div className="p-2 rounded-full bg-muted animate-pulse">
										<RiComputerLine />
									</div>
									<div className="flex-1 space-y-2">
										<div className="h-4 bg-muted rounded w-3/4 animate-pulse"></div>
										<div className="h-4 bg-muted rounded w-1/2 animate-pulse"></div>
									</div>
								</div>
							)}
							<div ref={chatEndRef} />
						</div>
					)}
				</div>
				<div className="w-full max-w-2xl mx-auto flex flex-col items-center gap-6 mt-auto">
					<div className="relative w-full p-4 bg-background border border-border rounded-2xl shadow-lg">
						<Textarea
							value={input}
							onChange={(e) => setInput(e.target.value)}
							onKeyDown={(e) => {
								if (e.key === "Enter" && !e.shiftKey) {
									e.preventDefault();
									handleSendMessage();
								}
							}}
							placeholder={
								isImageGenerationActive
									? "Descreva a imagem que você quer criar..."
									: "Estou criando uma oferta para um produto digital..."
							}
							className="bg-background border-none resize-none focus-visible:ring-0 focus-visible:ring-offset-0 text-foreground placeholder:text-muted-foreground h-28"
							disabled={isLoading}
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
									variant={isImageGenerationActive ? "default" : "outline"}
									className="text-muted-foreground hover:text-primary dark:bg-muted gap-2"
									onClick={() =>
										setIsImageGenerationActive(!isImageGenerationActive)
									}
								>
									<RiImageAiFill className="size-5" />
									Image
								</Button>
							</div>
							<Button
								size="icon"
								variant="outline"
								className="bg-primary/20 text-primary hover:text-primary hover:bg-primary/90 rounded-full"
								onClick={handleSendMessage}
								disabled={isLoading || !input.trim()}
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
