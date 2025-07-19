"use client";

import Link from "next/link";
import { useState } from "react";
import {
	RiArrowLeftLine,
	RiFileCopyFill,
	RiLoader2Fill,
	RiMagicFill,
} from "react-icons/ri";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import type { FileWithPreview } from "@/hooks/use-file-upload";
import { ImageUpload } from "./_components/image-upload";

function CreativeGeneratorPage() {
	const [prompt, setPrompt] = useState("");
	const [creativeFile] = useState<FileWithPreview[]>([]);
	const [recreateFile, setRecreateFile] = useState<FileWithPreview[]>([]);
	const [activeTab, setActiveTab] = useState("creative");
	const [isGenerating, setIsGenerating] = useState(false);

	const handleSubmitCreative = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!creativeFile.length || !prompt) return;

		setIsGenerating(true);
		console.log("Gerando Gerar com:");
		console.log("Prompt:", prompt);
		console.log("Arquivo:", creativeFile[0]);

		await new Promise((resolve) => setTimeout(resolve, 3000));

		setIsGenerating(false);
	};

	const handleSubmitRecreate = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!recreateFile.length) return;

		setIsGenerating(true);
		console.log("Recriando com:");
		console.log("Arquivo:", recreateFile[0]);

		await new Promise((resolve) => setTimeout(resolve, 3000));

		setIsGenerating(false);
	};

	return (
		<div className="flex flex-col gap-4 justify-center items-center w-full h-full p-4">
			<div className="w-full max-w-xl">
				<Link
					href="/dashboard/apps"
					className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4"
				>
					<RiArrowLeftLine className="size-4" />
					Voltar
				</Link>
			</div>
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
								<RiFileCopyFill className="mb-1.5 opacity-60" size={16} />
								Recriar
							</TabsTrigger>
						</TabsList>
						<TabsContent value="creative" className="mt-4">
							<form onSubmit={handleSubmitCreative} className="space-y-4">
								<Textarea
									placeholder="Um esqueleto segurando um smartphone, um cérebro derretendo com gosma verde, e o texto 'BRAIN ROT.' em negrito, em um estilo neon e com falhas"
									value={prompt}
									onChange={(e) => setPrompt(e.target.value)}
									className="bg-background border-border resize-none focus-visible:ring-0 focus-visible:ring-offset-0 h-32"
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
							</form>
						</TabsContent>
						<TabsContent value="recreate" className="mt-4">
							<form onSubmit={handleSubmitRecreate} className="space-y-4">
								<ImageUpload
									onFilesChange={setRecreateFile}
									disabled={isGenerating}
								/>
								<Textarea
									placeholder="Um esqueleto segurando um smartphone, um cérebro derretendo com gosma verde, e o texto 'BRAIN ROT.' em negrito, em um estilo neon e com falhas"
									value={prompt}
									onChange={(e) => setPrompt(e.target.value)}
									className="bg-background border-border resize-none focus-visible:ring-0 focus-visible:ring-offset-0 h-32"
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
	);
}

export default CreativeGeneratorPage;
