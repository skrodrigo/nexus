"use client";

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

type MemberArea = {
	id: string;
	title: string;
};

function MembersAreaPage() {
	const memberAreas: MemberArea[] = [];

	if (memberAreas.length === 0) {
		return (
			<div className="flex flex-col items-center justify-center h-full gap-y-8 text-center">
				<div>
					<h2 className="text-2xl font-medium">
						Nenhuma Área de Membros Encontrada
					</h2>
					<p className="text-muted-foreground">
						Comece criando uma nova área de membros.
					</p>
				</div>
				<Dialog>
					<DialogTrigger asChild>
						<Button>Criar Nova Área de Membros</Button>
					</DialogTrigger>
					<DialogContent className="sm:max-w-[425px]">
						<DialogHeader>
							<DialogTitle>Criar Nova Área de Membros</DialogTitle>
						</DialogHeader>
						<div className="grid gap-4 py-4">
							<div className="grid grid-cols-4 items-center gap-4">
								<Label htmlFor="title" className="text-right">
									Título
								</Label>
								<Input
									id="title"
									placeholder="Ex: Curso de Marketing"
									className="col-span-3"
								/>
							</div>
						</div>
						<DialogFooter>
							<Button type="submit">Criar Área</Button>
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
					<CardTitle>Manage Members</CardTitle>
				</CardHeader>
				<CardContent>
					<p>Here you can manage your members.</p>
				</CardContent>
			</Card>
		</div>
	);
}

export default MembersAreaPage;
