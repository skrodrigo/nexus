"use client";

import { useState } from "react";
import { RiMagicFill } from "react-icons/ri";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

interface EditDialogProps {
	children: React.ReactNode;
	onEditSubmit: (editPrompt: string) => void;
}

export function EditDialog({ children, onEditSubmit }: EditDialogProps) {
	const [editPrompt, setEditPrompt] = useState("");
	const [open, setOpen] = useState(false);

	const handleSubmit = () => {
		if (!editPrompt) return;
		onEditSubmit(editPrompt);
		setOpen(false);
		setEditPrompt("");
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Editar Imagem</DialogTitle>
					<DialogDescription>
						Descreva as alterações que você gostaria de fazer na imagem.
					</DialogDescription>
				</DialogHeader>
				<Textarea
					placeholder="Ex: adicione um chapéu de sol no astronauta"
					value={editPrompt}
					onChange={(e) => setEditPrompt(e.target.value)}
					className="bg-background border-border resize-none focus-visible:ring-0 focus-visible:ring-offset-0 h-32"
				/>
				<DialogFooter>
					<DialogClose asChild>
						<Button type="button" variant="secondary">
							Cancelar
						</Button>
					</DialogClose>
					<DialogClose asChild>
						<Button type="submit" onClick={handleSubmit}>
							Gerar
							<RiMagicFill className="ml-2" />
						</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
