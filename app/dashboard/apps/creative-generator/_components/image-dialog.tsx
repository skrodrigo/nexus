"use client";

import Image from "next/image";
import { RiDownload2Line } from "react-icons/ri";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

interface ImageDialogProps {
	trigger: React.ReactNode;
	imageUrl: string;
	prompt: string;
}

export function ImageDialog({ trigger, imageUrl, prompt }: ImageDialogProps) {
	const handleDownload = () => {
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

	return (
		<Dialog>
			<DialogTrigger asChild>{trigger}</DialogTrigger>
			<DialogContent className="p-8 ">
				<div className="relative aspect-square">
					<Image
						src={imageUrl}
						alt="Generated creative expanded"
						fill
						className="rounded-lg"
					/>
				</div>
				<div className="absolute bottom-2 left-1/2 -translate-x-1/2">
					<Button onClick={handleDownload} className="rounded-full">
						<RiDownload2Line className="mr-2" />
						Download
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
}
