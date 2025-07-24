import {
	RiBook2Fill,
	RiClockwise2Fill,
	RiDeleteBin5Fill,
	RiEdit2Fill,
	RiEyeLine,
	RiLayoutGridLine,
	RiSettings3Fill,
	RiWebhookFill,
} from "react-icons/ri";

import { type Course, CourseDialog } from "./course-dialog";
import { ModuleDialog } from "./module-dialog";

interface CourseCardProps {
	course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
	const { title, lessonsCount, studentsCount, status } = course;
	return (
		<div className="bg-muted border border-border rounded-lg p-4 flex flex-col gap-4">
			<div className="flex items-start gap-4">
				<div className="bg-border w-14 h-14 rounded-md flex items-center justify-center">
					<RiBook2Fill className="w-10 h-10 text-muted-foreground" />
				</div>
				<div className="flex-1">
					<h3 className="text-foreground font-medium text-lg">{title}</h3>
					<div className="flex gap-4 text-xs text-muted-foreground mt-1">
						<span>{lessonsCount} aulas</span>
						<span>{studentsCount} alunos</span>
					</div>
				</div>
				<div className="flex items-center gap-2 bg-primary/20 text-primary text-xs px-2 py-1 rounded-full">
					<RiClockwise2Fill className="w-3 h-3" />
					<span>{status}</span>
				</div>
			</div>
			<div className="flex items-center justify-between border-t border-border pt-4 mt-auto">
				<div className="flex items-center gap-4">
					<CourseDialog course={course}>
						<button
							type="button"
							className="flex items-center gap-2 text-xs text-primary hover:text-primary/80"
						>
							<RiEdit2Fill className="size-4" />
							Editar
						</button>
					</CourseDialog>
					<ModuleDialog>
						<button
							type="button"
							className="flex items-center gap-2 text-xs text-primary hover:text-primary/80"
						>
							<RiLayoutGridLine className="size-4" />
							Módulos
						</button>
					</ModuleDialog>
				</div>
				<div className="flex items-center gap-4 text-muted-foreground">
					<button type="button" className="hover:text-foreground">
						<RiEyeLine className="size-4" />
					</button>
					<button type="button" className="hover:text-foreground">
						<RiWebhookFill className="size-4" />
					</button>
					<button type="button" className="hover:text-foreground">
						<RiSettings3Fill className="size-4" />
					</button>
				</div>
			</div>
		</div>
	);
}
