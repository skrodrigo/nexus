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

interface Course {
	id: string;
	title: string;
	lessonsCount: number;
	studentsCount: number;
	status: "Rascunho" | "Publicado";
}

interface CourseDialogProps {
	children: React.ReactNode;
	course?: Course;
}

const CourseDialog = ({ children, course }: CourseDialogProps) => {
	const isEditMode = course !== undefined;

	return (
		<Dialog>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent className="sm:max-w-[625px]">
				<DialogHeader>
					<DialogTitle>
						{isEditMode ? "Editar Curso" : "Novo Curso"}
					</DialogTitle>
					<DialogDescription>
						{isEditMode
							? "Altere as informações do curso."
							: "Preencha as informações para criar um novo curso."}
					</DialogDescription>
				</DialogHeader>
				<div className="grid gap-6 py-4">
					<div className="grid gap-2">
						<Label htmlFor="title">Título</Label>
						<Input
							id="title"
							placeholder="Nome do curso"
							defaultValue={course?.title}
						/>
					</div>
					<div className="grid gap-2">
						<Label htmlFor="description">Descrição</Label>
						<Textarea
							id="description"
							placeholder="Descrição detalhada do curso"
							className="max-h-[100px] w-full"
						/>
					</div>
					<div className="grid gap-2">
						<Label>Capa do Curso</Label>
						<ImageUpload />
					</div>
				</div>
				<DialogFooter>
					<Button type="submit" variant="default">
						{isEditMode ? "Salvar alterações" : "Publicar curso"}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export { CourseDialog };
export type { Course };
