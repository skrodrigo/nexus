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
import { VideoUpload } from "./video-upload";

export function UploadVslDialog({ children }: { children: React.ReactNode }) {
	return (
		<Dialog>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Fazer Upload de VSL</DialogTitle>
				</DialogHeader>
				<div className="grid gap-4 py-4">
					<div className="grid w-full items-center gap-1.5">
						<Label htmlFor="title">Título</Label>
						<Input id="title" placeholder="Digite o título do seu vídeo" />
					</div>
					<div className="grid w-full items-center gap-1.5">
						<Label>Vídeo</Label>
						<VideoUpload />
					</div>
				</div>
				<DialogFooter>
					<Button type="submit">Enviar</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
