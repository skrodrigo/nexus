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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

type Funnel = {
	id: string;
	title: string;
};

function FunnelPage() {
	const funnels: Funnel[] = [];

	if (funnels.length === 0) {
		return (
			<div className="flex flex-col items-center justify-center h-full gap-y-8 text-center">
				<div>
					<h2 className="text-2xl font-medium">Nenhum Quiz Encontrado</h2>
					<p className="text-muted-foreground">
						Comece criando um novo Quiz ou clonando um existente.
					</p>
				</div>

				<div className="flex gap-x-4">
					<Dialog>
						<DialogTrigger asChild>
							<Button>Novo Funil</Button>
						</DialogTrigger>
						<DialogContent className="sm:max-w-[425px]">
							<DialogHeader>
								<DialogTitle>Criar Novo Funil</DialogTitle>
							</DialogHeader>
							<div className="grid gap-4 py-4">
								<div className="grid grid-cols-4 items-center gap-4">
									<Label htmlFor="title" className="text-right">
										Título
									</Label>
									<Input
										id="title"
										placeholder="Título do Funil"
										className="col-span-3"
									/>
								</div>
							</div>
							<DialogFooter>
								<Button type="submit">Criar Funil</Button>
							</DialogFooter>
						</DialogContent>
					</Dialog>

					<Dialog>
						<DialogTrigger asChild>
							<Button variant="outline">Clonar Funil</Button>
						</DialogTrigger>
						<DialogContent className="sm:max-w-[425px]">
							<DialogHeader>
								<DialogTitle>Clonar Funil Existente</DialogTitle>
							</DialogHeader>
							<div className="grid gap-4 py-4">
								<div className="grid grid-cols-4 items-center gap-4">
									<Label htmlFor="clone-title" className="text-right">
										Título
									</Label>
									<Input
										id="clone-title"
										placeholder="Título do Funil"
										className="col-span-3"
									/>
								</div>
								<div className="grid grid-cols-4 items-center gap-4">
									<Label htmlFor="url" className="text-right">
										URL
									</Label>
									<Input
										id="url"
										placeholder="URL do Funil"
										className="col-span-3 "
									/>
								</div>
								<div className="grid grid-cols-4 items-center gap-4">
									<Label htmlFor="provider" className="text-right">
										Provedor
									</Label>
									<Select>
										<SelectTrigger className="col-span-3 w-full">
											<SelectValue placeholder="Selecione" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="provider1">Provedor 1</SelectItem>
											<SelectItem value="provider2">Provedor 2</SelectItem>
											<SelectItem value="provider3">Provedor 3</SelectItem>
										</SelectContent>
									</Select>
								</div>
							</div>
							<DialogFooter>
								<Button type="submit">Clonar Funil</Button>
							</DialogFooter>
						</DialogContent>
					</Dialog>
				</div>
			</div>
		);
	}

	return (
		<div className="space-y-4">
			<Card>
				<CardHeader>
					<CardTitle>Your Funnels</CardTitle>
				</CardHeader>
				<CardContent>
					<p>Manage your sales funnels here.</p>
				</CardContent>
			</Card>
		</div>
	);
}

export default FunnelPage;
