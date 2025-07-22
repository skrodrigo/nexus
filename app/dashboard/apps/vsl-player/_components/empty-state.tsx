"use client";

import { useSearchParams } from "next/navigation";
import { RiFolderAddFill, RiUploadCloud2Fill } from "react-icons/ri";
import { Button } from "@/components/ui/button";
import { UploadVslDialog } from "./upload-vsl-dialog";

export function EmptyState() {
	const searchParams = useSearchParams();
	return (
		<div className="flex flex-col items-center justify-center h-full gap-y-8 text-center">
			<div>
				<h2 className="text-2xl font-medium">Nenhum VSL Encontrado</h2>
				<p className="text-muted-foreground">
					Comece fazendo o upload de um novo vídeo ou criando uma pasta.
				</p>
			</div>
			<div className="flex gap-x-4">
				<UploadVslDialog>
					<Button>
						<RiUploadCloud2Fill className="mr-2 size-5" />
						Fazer Upload
					</Button>
				</UploadVslDialog>
				<Button variant="outline">
					<RiFolderAddFill className="mr-2 size-5" />
					Nova pasta
				</Button>
			</div>
		</div>
	);
}
