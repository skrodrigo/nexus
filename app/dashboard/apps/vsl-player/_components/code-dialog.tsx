"use client";

import { useState } from "react";
import {
	RiCheckFill,
	RiCodeBoxFill,
	RiFileCopyFill,
	RiJavascriptFill,
} from "react-icons/ri";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface CodeDialogProps {
	vslId: string;
	children: React.ReactNode;
}

type CopySource = "box" | "button";

function CodeBox({
	code,
	onCopy,
	isCopied,
	copySource,
	tab,
}: {
	code: string;
	onCopy: (source: CopySource, tab: string) => void;
	isCopied: boolean;
	copySource: CopySource | null;
	tab: string;
}) {
	return (
		<div className="mt-4 space-y-4">
			<button
				type="button"
				className="relative w-full cursor-pointer rounded-md border border-dashed border-border bg-muted/50 p-4 text-left"
				onClick={() => onCopy("box", tab)}
			>
				{isCopied && copySource === "box" && (
					<div className="absolute inset-0 flex items-center justify-center rounded-md bg-background/80 backdrop-blur-lg text-white">
						<span className="text-sm">Copiado com sucesso!</span>
					</div>
				)}
				<pre className={`overflow-x-auto whitespace-pre-wrap text-sm`}>
					<code>{code}</code>
				</pre>
			</button>
			<Button onClick={() => onCopy("button", tab)} className="w-full">
				{isCopied && copySource === "button" ? (
					<RiCheckFill className="mr-2 size-5" />
				) : (
					<RiFileCopyFill className="mr-2 size-5" />
				)}
				{isCopied && copySource === "button" ? "Copiado!" : "Copiar código"}
			</Button>
		</div>
	);
}

export function CodeDialog({ vslId, children }: CodeDialogProps) {
	const [isCopied, setIsCopied] = useState(false);
	const [copySource, setCopySource] = useState<CopySource | null>(null);
	const [activeTab, setActiveTab] = useState<string | null>(null);

	const iframeCode = `<iframe src="https://app.nexus.com/vsl/${vslId}" width="100%" height="100%" frameborder="0" allowfullscreen></iframe>`;
	const jsCode = `const vslPlayer = document.createElement('div');
vslPlayer.innerHTML = '<iframe src="https://app.nexus.com/vsl/${vslId}" width="100%" height="100%" frameborder="0" allowfullscreen></iframe>';
document.body.appendChild(vslPlayer);`;

	const handleCopy = (code: string, source: CopySource, tab: string) => {
		navigator.clipboard.writeText(code).then(() => {
			toast.success("Código copiado para a área de transferência!");
			setIsCopied(true);
			setCopySource(source);
			setActiveTab(tab);
			setTimeout(() => {
				setIsCopied(false);
				setCopySource(null);
				setActiveTab(null);
			}, 2000);
		});
	};

	return (
		<Dialog
			onOpenChange={() => {
				setIsCopied(false);
				setCopySource(null);
				setActiveTab(null);
			}}
		>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent className="sm:max-w-2xl">
				<DialogHeader>
					<DialogTitle>Incorporar Vídeo</DialogTitle>
				</DialogHeader>
				<Tabs defaultValue="iframe" className="w-full">
					<TabsList className="h-auto rounded-none border-b bg-transparent p-0 w-full">
						<TabsTrigger
							value="iframe"
							className="data-[state=active]:after:bg-primary relative flex-1 flex-col rounded-none px-4 py-2 text-xs after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
						>
							<RiCodeBoxFill className="mb-1.5 opacity-60" size={16} />
							Iframe
						</TabsTrigger>
						<TabsTrigger
							value="js"
							className="data-[state=active]:after:bg-primary relative flex-1 flex-col rounded-none px-4 py-2 text-xs after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
						>
							<RiJavascriptFill className="mb-1.5 opacity-60" size={16} />
							Código JS
						</TabsTrigger>
					</TabsList>
					<TabsContent value="iframe">
						<CodeBox
							code={iframeCode}
							onCopy={(source, tab) => handleCopy(iframeCode, source, tab)}
							isCopied={isCopied && activeTab === "iframe"}
							copySource={copySource}
							tab="iframe"
						/>
					</TabsContent>
					<TabsContent value="js">
						<CodeBox
							code={jsCode}
							onCopy={(source, tab) => handleCopy(jsCode, source, tab)}
							isCopied={isCopied && activeTab === "js"}
							copySource={copySource}
							tab="js"
						/>
					</TabsContent>
				</Tabs>
			</DialogContent>
		</Dialog>
	);
}
