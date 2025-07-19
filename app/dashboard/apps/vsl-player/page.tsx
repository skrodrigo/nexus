"use client";

import { RiUploadCloud2Fill } from "react-icons/ri";
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

function VslPlayerPage() {
	const vsls: Vsl[] = [];

	if (vsls.length === 0) {
		return (
			<div className="flex flex-col items-center justify-center h-full gap-y-8 text-center">
				<div>
					<h2 className="text-2xl font-medium">Nenhum VSL Encontrado</h2>
					<p className="text-muted-foreground">
						Comece fazendo o upload de um novo vídeo.
					</p>
				</div>
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
			</div>
		);
	}

	return (
		<div className="space-y-4">
			<Card>
				<CardHeader>
					<CardTitle>Video Sales Letter Player</CardTitle>
				</CardHeader>
				<CardContent>
					<p>Configure your VSL player here.</p>
				</CardContent>
			</Card>
		</div>
	);
}

export default VslPlayerPage;
