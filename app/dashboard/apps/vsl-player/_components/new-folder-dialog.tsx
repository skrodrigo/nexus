"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
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

interface NewFolderDialogProps {
	children: React.ReactNode;
	onCreate: (name: string) => void;
}

export function NewFolderDialog({ children, onCreate }: NewFolderDialogProps) {
	const [open, setOpen] = useState(false);
	const [name, setName] = useState("");

	const handleCreate = () => {
		if (name.trim()) {
			onCreate(name.trim());
			setName("");
			setOpen(false);
		}
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Criar Nova Pasta</DialogTitle>
				</DialogHeader>
				<div className="grid gap-4 py-4">
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="name" className="text-right">
							Nome
						</Label>
						<Input
							id="name"
							value={name}
							onChange={(e) => setName(e.target.value)}
							className="col-span-3"
							placeholder="Ex: Campanhas de Fim de Ano"
						/>
					</div>
				</div>
				<DialogFooter>
					<Button type="submit" onClick={handleCreate}>
						Criar Pasta
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
