import { RiAddFill } from "react-icons/ri";
import { Button } from "@/components/ui/button";
import { CourseCard } from "./components/course-card";
import { CourseDialog } from "./components/course-dialog";

export function CursosView() {
	const courses = [
		{
			id: "1",
			title: "Curso de React Avançado",
			lessonsCount: 25,
			studentsCount: 150,
			status: "Publicado" as const,
		},
		{
			id: "2",
			title: "Introdução ao Next.js",
			lessonsCount: 0,
			studentsCount: 0,
			status: "Rascunho" as const,
		},
	];

	if (courses.length === 0) {
		return (
			<div className="flex flex-col items-center justify-center h-full gap-y-8 text-center">
				<div>
					<h2 className="text-2xl font-medium">Nenhum Curso Encontrado</h2>
					<p className="text-muted-foreground">Comece criando um novo Curso.</p>
				</div>
				<CourseDialog>
					<Button>
						<RiAddFill className="size-4 mr-2" />
						Criar Novo Curso
					</Button>
				</CourseDialog>
			</div>
		);
	}

	return (
		<div className="w-full h-full p-4">
			<div className="flex items-center justify-between mb-6">
				<h1 className="text-2xl font-medium">Gerenciar Cursos</h1>
				<CourseDialog>
					<Button>
						<RiAddFill className="size-4 mr-2" />
						Criar Novo Curso
					</Button>
				</CourseDialog>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{courses.map((course) => (
					<CourseCard key={course.id} course={course} />
				))}
			</div>
		</div>
	);
}
