"use client";

import { RiMagicFill } from "react-icons/ri";
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
import { Textarea } from "@/components/ui/textarea";

type Creative = {
	id: string;
	prompt: string;
};

function CreativeGeneratorPage() {
	const creatives: Creative[] = [];

	if (creatives.length === 0) {
		return (
			<div className="flex flex-col items-center justify-center h-full gap-y-8 text-center">
				<div>
					<h2 className="text-2xl font-medium">Nenhum Criativo Encontrado</h2>
					<p className="text-muted-foreground">
						Comece gerando um novo criativo para sua campanha.
					</p>
				</div>
				<Dialog>
					<DialogTrigger asChild>
						<Button>
							<RiMagicFill className="mr-2 size-5" />
							Criar Novo Criativo
						</Button>
					</DialogTrigger>
					<DialogContent className="sm:max-w-[625px]">
						<DialogHeader>
							<DialogTitle>Gerar Novo Criativo</DialogTitle>
						</DialogHeader>
						<div className="grid gap-4 py-4">
							<Textarea
								placeholder="Descreva o criativo que você quer gerar..."
								className="bg-background border-border resize-none focus-visible:ring-0 focus-visible:ring-offset-0 h-32"
							/>
						</div>
						<DialogFooter>
							<Button type="submit" className="w-full">
								<RiMagicFill className="mr-2 size-5" />
								Gerar
							</Button>
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
					<CardTitle>Generate New Creatives</CardTitle>
				</CardHeader>
				<CardContent>
					<p>Here you can generate new creatives for your campaigns.</p>
				</CardContent>
			</Card>
		</div>
	);
}

export default CreativeGeneratorPage;
