import ImageUpload from "@/components/image-upload";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface Module {
	id: string;
	title: string;
	description: string;
}

interface ModuleDialogProps {
	children: React.ReactNode;
}

const ModuleDialog = ({ children }: ModuleDialogProps) => {
	const modules: Module[] = [];

	return (
		<Dialog>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent className="sm:max-w-[625px]">
				<DialogHeader>
					<DialogTitle>Gerenciar Módulos</DialogTitle>
					<DialogDescription>
						Adicione, edite ou remova os módulos do seu curso.
					</DialogDescription>
				</DialogHeader>

				<div className="grid gap-4 py-4 ">
					<div className="grid gap-2">
						<Label htmlFor="title">Título do Módulo</Label>
						<Input id="title" placeholder="Ex: Módulo 1 - Introdução" />
					</div>
					<div className="grid gap-2">
						<Label>Capa do Módulo</Label>
						<ImageUpload />
						<p className="text-xs text-muted-foreground mt-1">
							Recomendado: 640x960 pixels
						</p>
					</div>
					<div className="grid gap-2">
						<Label htmlFor="description">Descrição</Label>
						<Textarea
							id="description"
							placeholder="Descrição do módulo"
							className="max-h-[100px] w-full"
						/>
					</div>
				</div>
				<DialogFooter className="border-t pt-4">
					<Button type="submit" variant="default">
						Adicionar Módulo
					</Button>
				</DialogFooter>

				{modules.length === 0 && (
					<div className="text-center text-xs text-muted-foreground py-4">
						Nenhum módulo adicionado. Comece adicionando seu primeiro módulo.
					</div>
				)}
			</DialogContent>
		</Dialog>
	);
};

export { ModuleDialog };
