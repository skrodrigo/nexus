"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import {
	RiAddLine,
	RiDeleteBinLine,
	RiDownload2Line,
	RiExpandDiagonalLine,
	RiFileCopyFill,
	RiLoader2Fill,
	RiMagicFill,
	RiMore2Fill,
	RiSideBarFill,
	RiSideBarLine,
} from "react-icons/ri";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import type { FileWithPreview } from "@/hooks/use-file-upload";
import { EditDialog } from "./_components/edit-dialog";
import { ImageDialog } from "./_components/image-dialog";
import { ImageUpload } from "./_components/image-upload";

function CreativeGeneratorPage() {
	const [prompt, setPrompt] = useState("");
	const [recreateFile, setRecreateFile] = useState<FileWithPreview[]>([]);
	const [activeTab, setActiveTab] = useState("creative");
	const [isGenerating, setIsGenerating] = useState(false);
	const [isGenerated, setIsGenerated] = useState(false);
	const [progress, setProgress] = useState(0);
	const [conversation, setConversation] = useState<{
		user: {
			prompt: string;
			image?: FileWithPreview;
		};
		nexus: string;
	} | null>(null);
	const [history, setHistory] = useState([
		"Um astronauta em um cavalo",
		"Cachorro surfando em uma onda gigante",
		"Gato tocando piano de cauda",
	]);

	const [isAsideOpen, setIsAsideOpen] = useState(true);

	const handleDownload = () => {
		const imageUrl = `https://picsum.photos/seed/${prompt}/1920/1080`;
		const link = document.createElement("a");
		link.href = imageUrl;
		const fileName = prompt
			? `${prompt.replace(/\s+/g, "_").toLowerCase()}.jpg`
			: "generated-image.jpg";
		link.download = fileName;
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	};

	const handleEdit = useCallback(
		(editPrompt: string) => {
			if (!conversation) return;
			const fullPrompt = `${conversation.user.prompt}. ${editPrompt}`;
			setConversation({
				user: { ...conversation.user, prompt: fullPrompt },
				nexus: "",
			});
			setIsGenerating(true);
			setProgress(0);
		},
		[conversation],
	);

	const handleDeleteHistory = (indexToDelete: number) => {
		setHistory(history.filter((_, index) => index !== indexToDelete));
	};

	const handleNewGeneration = () => {
		setIsGenerated(false);
		setIsGenerating(false);
		setConversation(null);
		setPrompt("");
		setProgress(0);
	};

	const handleSubmitCreative = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!prompt) return;

		setIsGenerating(true);
		setConversation({ user: { prompt }, nexus: "" });
	};

	useEffect(() => {
		if (isGenerating) {
			const interval = setInterval(() => {
				setProgress((prev) => {
					if (prev >= 100) {
						clearInterval(interval);
						setIsGenerating(false);
						setIsGenerated(true);
						setConversation((conv) => {
							if (!conv) return null;
							const nexusResponse =
								activeTab === "creative"
									? "Aqui está sua imagem gerada!"
									: "Aqui está sua imagem recriada!";
							return { ...conv, nexus: nexusResponse };
						});
						return 100;
					}
					return prev + 1;
				});
			}, 30);

			return () => clearInterval(interval);
		}
	}, [isGenerating, activeTab]);

	const handleSubmitRecreate = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!recreateFile.length || !prompt) return;

		setIsGenerating(true);
		setProgress(0);
		setConversation({
			user: { prompt, image: recreateFile[0] },
			nexus: "",
		});
	};

	return (
		<div className="flex h-full bg-background w-full">
			<aside
				className={`relativeh-full border-r border-border flex-col gap-4 hidden md:flex transition-all duration-200 ${
					isAsideOpen ? "w-72 p-2" : "w-14 p-2 items-center"
				}`}
			>
				<div
					className={`flex items-center justify-end absolute transition-all duration-200 ${
						isAsideOpen ? "top-[62px] left-[400px]" : " top-[62px] left-[170px]"
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
								className={`w-full flex items-center bg-background hover:bg-accent/20 text-foreground justify-between ${
									isAsideOpen
										? "whitespace-normal h-auto text-left"
										: "truncate"
								}`}
							>
								<span className="truncate">{isAsideOpen ? item : ""}</span>
								{isAsideOpen && (
									<DropdownMenu>
										<DropdownMenuTrigger asChild>
											<Button variant="ghost" size="icon" className="shrink-0">
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
			<main className="flex-1 flex flex-col max-h-full items-center justify-center p-2">
				<div className="w-full max-w-xl flex flex-col">
					{isGenerating || isGenerated ? (
						<div className="flex-1 flex flex-col justify-end space-y-4">
							{conversation && (
								<div className="space-y-4 p-4 rounded-lg">
									<div className="flex items-start gap-4 justify-end">
										<div className="bg-muted border border-border text-foreground p-4 rounded-xl rounded-br-none max-w-[90%]">
											<div className="space-y-2">
												<p className="break-words">
													{conversation.user.prompt}
												</p>
												{conversation.user.image?.preview && (
													<Image
														src={conversation.user.image.preview}
														alt="Uploaded image for recreation"
														width={200}
														height={200}
														className="rounded-lg max-w-full h-auto"
													/>
												)}
											</div>
										</div>
										<Avatar>
											<AvatarFallback>U</AvatarFallback>
										</Avatar>
									</div>
									<div className="flex items-start gap-4 ">
										<Avatar>
											<AvatarImage src="/nexus.png" />
											<AvatarFallback>N</AvatarFallback>
										</Avatar>
										<div className="bg-muted text-foreground border border-border p-4 rounded-xl rounded-tl-none w-full space-y-4">
											{isGenerating && (
												<div className="w-full h-full flex flex-col items-center justify-center gap-2 aspect-video ">
													<Progress value={progress} className="w-3/4" />
													<span className="text-sm text-muted-foreground">
														{progress}%
													</span>
												</div>
											)}
											{isGenerated && (
												<>
													<p>{conversation.nexus}</p>
													<div className="rounded-lg overflow-hidden relative bg-muted aspect-square flex items-center justify-center">
														<Image
															src={`https://picsum.photos/seed/${prompt}/1280/720`}
															alt="Generated creative"
															fill
															className="object-cover"
														/>
														<div className="absolute bottom-2 border bg-background p-2 rounded-full flex items-center gap-2">
															<Button
																size="icon"
																variant="secondary"
																className="rounded-full text-primary hover:bg-primary/10"
																onClick={handleDownload}
															>
																<RiDownload2Line />
															</Button>
															<EditDialog onEditSubmit={handleEdit}>
																<Button
																	size="icon"
																	variant="secondary"
																	className="rounded-full text-primary hover:bg-primary/10"
																>
																	<RiMagicFill />
																</Button>
															</EditDialog>
														</div>
														<div className="absolute top-2 right-2 border bg-background p-2 rounded-full flex items-center gap-2">
															<ImageDialog
																imageUrl={`https://picsum.photos/seed/${prompt}/1920/1080`}
																prompt={prompt}
																trigger={
																	<Button
																		size="icon"
																		variant="secondary"
																		className="rounded-full text-primary hover:bg-primary/10"
																	>
																		<RiExpandDiagonalLine />
																	</Button>
																}
															/>
														</div>
													</div>
												</>
											)}
										</div>
									</div>
								</div>
							)}
						</div>
					) : (
						<div className="flex flex-col gap-4 justify-center items-center w-full">
							<Card className="w-full max-w-xl">
								<CardHeader>
									<CardTitle>Gerador de Gerars</CardTitle>
								</CardHeader>
								<CardContent>
									<Tabs
										defaultValue="creative"
										value={activeTab}
										onValueChange={setActiveTab}
										className="w-full"
									>
										<TabsList className="h-auto rounded-none border-b bg-transparent p-0 w-full">
											<TabsTrigger
												value="creative"
												className="data-[state=active]:after:bg-primary relative flex-1 flex-col rounded-none px-4 py-2 text-xs after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
											>
												<RiMagicFill className="mb-1.5 opacity-60" size={16} />
												Gerar
											</TabsTrigger>
											<TabsTrigger
												value="recreate"
												className="data-[state=active]:after:bg-primary relative flex-1 flex-col rounded-none px-4 py-2 text-xs after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
											>
												<RiFileCopyFill
													className="mb-1.5 opacity-60"
													size={16}
												/>
												Recriar
											</TabsTrigger>
										</TabsList>
										<TabsContent value="creative" className="mt-4">
											<form
												onSubmit={handleSubmitCreative}
												className="space-y-4 flex flex-col justify-center items-center"
											>
												<Textarea
													placeholder="Um esqueleto segurando um smartphone, um cérebro derretendo com gosma verde, e o texto 'BRAIN ROT.' em negrito, em um estilo neon e com falhas"
													value={prompt}
													onChange={(e) => setPrompt(e.target.value)}
													className="bg-background border-border resize-none focus-visible:ring-0 placeholder:text-muted-foreground/20 focus-visible:ring-offset-0 h-20"
													disabled={isGenerating}
												/>
												<Button
													type="submit"
													className="w-full"
													disabled={isGenerating}
												>
													{isGenerating ? (
														<RiLoader2Fill className="mr-2 size-5 animate-spin" />
													) : (
														<RiMagicFill className="mr-2 size-5" />
													)}
													Gerar
												</Button>
												<span className="text-xs text-muted-foreground">
													5 restantes
												</span>
											</form>
										</TabsContent>
										<TabsContent value="recreate" className="mt-4">
											<form
												onSubmit={handleSubmitRecreate}
												className="space-y-4"
											>
												<ImageUpload
													onFilesChange={setRecreateFile}
													disabled={isGenerating}
												/>
												<Textarea
													placeholder="Um esqueleto segurando um smartphone, um cérebro derretendo com gosma verde, e o texto 'BRAIN ROT.' em negrito, em um estilo neon e com falhas"
													value={prompt}
													onChange={(e) => setPrompt(e.target.value)}
													className="bg-background border-border resize-none focus-visible:ring-0 placeholder:text-muted-foreground/20 focus-visible:ring-offset-0 h-20"
													disabled={isGenerating}
												/>
												<Button
													type="submit"
													className="w-full"
													disabled={isGenerating}
												>
													{isGenerating ? (
														<RiLoader2Fill className="mr-2 size-5 animate-spin" />
													) : (
														<RiMagicFill className="mr-2 size-5" />
													)}
													Recriar
												</Button>
											</form>
										</TabsContent>
									</Tabs>
								</CardContent>
							</Card>
						</div>
					)}
				</div>
			</main>
		</div>
	);
}

export default CreativeGeneratorPage;
