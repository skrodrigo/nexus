"use client";

import {
	RiDeleteBinFill,
	RiEdit2Fill,
	RiFolder2Fill,
	RiMoreFill,
} from "react-icons/ri";

import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface FolderItemProps {
	name: string;
	createdAt: string;
	onClick: () => void;
}

export function FolderItem({ name, createdAt, onClick }: FolderItemProps) {
	const handleActionClick = (e: React.MouseEvent) => {
		e.stopPropagation();
	};

	return (
		<tr
			className="cursor-pointer hover:bg-muted/50"
			onClick={onClick}
			aria-label={`Abrir pasta ${name}`}
		>
			<td className="p-4 align-middle">
				<RiFolder2Fill className="size-6 text-muted-foreground" />
			</td>
			<td className="p-2 align-middle font-medium">{name}</td>
			<td className="p-2 align-middle text-muted-foreground hidden md:table-cell">
				{createdAt}
			</td>
			<td className="px-2 py-3 align-middle text-right ">
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" size="icon" onClick={handleActionClick}>
							<RiMoreFill className="size-5" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end" onClick={handleActionClick}>
						<DropdownMenuItem>
							<RiEdit2Fill className="mr-2 size-4" />
							Renomear
						</DropdownMenuItem>
						<DropdownMenuItem>
							<RiDeleteBinFill className="mr-2 size-4" />
							Remover
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</td>
		</tr>
	);
}
