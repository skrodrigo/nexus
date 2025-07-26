"use client";

import Image from "next/image";
import {
	RiArrowLeftLine,
	RiCodeSSlashFill,
	RiDeleteBinFill,
	RiDownload2Fill,
	RiEdit2Fill,
	RiFolderAddFill,
	RiMoreFill,
	RiSearchLine,
	RiUploadCloud2Fill,
} from "react-icons/ri";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { CodeDialog } from "./code-dialog";
import { FolderItem } from "./folder-item";
import { NewFolderDialog } from "./new-folder-dialog";
import { UploadVslDialog } from "./upload-vsl-dialog";

type Folder = {
	id: string;
	name: string;
	createdAt: string;
};

type Vsl = {
	id: string;
	title: string;
	thumbnailUrl: string;
	createdAt: string;
	folderId?: string;
};

interface VslListProps {
	folders: Folder[];
	vsls: Vsl[];
	searchTerm: string;
	onSearchTermChange: (term: string) => void;
	onEdit: (vsl: Vsl) => void;
	onFolderClick: (folderId: string) => void;
	currentFolder?: Folder;
	onBackClick: () => void;
	onFolderCreate: (name: string) => void;
}

export function VslList({
	folders,
	vsls,
	searchTerm,
	onSearchTermChange,
	onEdit,
	onFolderClick,
	currentFolder,
	onBackClick,
	onFolderCreate,
}: VslListProps) {
	return (
		<Card>
			<CardHeader>
				<div className="flex items-center justify-between gap-4">
					{currentFolder ? (
						<div className="flex items-center gap-2">
							<Button
								variant="ghost"
								size="icon"
								onClick={onBackClick}
								className="w-52 gap-2 hover:bg-transparent dark:hover:bg-transparent hover:text-foreground/80"
							>
								<RiArrowLeftLine className="size-5" />
								<CardTitle>{currentFolder.name}</CardTitle>
							</Button>
						</div>
					) : (
						<CardTitle>Meus Vídeos</CardTitle>
					)}
					<div className="relative w-full max-w-md">
						<RiSearchLine className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
						<Input
							placeholder="Pesquisar por nome..."
							className="pl-10"
							value={searchTerm}
							onChange={(e) => onSearchTermChange(e.target.value)}
						/>
					</div>
					<div className="flex gap-x-2">
						<NewFolderDialog onCreate={onFolderCreate}>
							<Button variant="outline">
								<RiFolderAddFill className="mr-2 size-5" />
								Nova pasta
							</Button>
						</NewFolderDialog>
						<UploadVslDialog>
							<Button>
								<RiUploadCloud2Fill className="mr-2 size-5" />
								Fazer Upload
							</Button>
						</UploadVslDialog>
					</div>
				</div>
			</CardHeader>
			<CardContent>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead className="w-[80px]"></TableHead>
							<TableHead>Título</TableHead>
							<TableHead>Data de Criação</TableHead>
							<TableHead className="text-right">Ações</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{folders.map((folder) => (
							<FolderItem
								key={folder.id}
								name={folder.name}
								createdAt={folder.createdAt}
								onClick={() => onFolderClick(folder.id)}
							/>
						))}
						{vsls.map((vsl) => (
							<TableRow key={vsl.id}>
								<TableCell>
									<Image
										src={vsl.thumbnailUrl}
										alt={vsl.title}
										width={120}
										height={70}
										className="rounded-md object-cover"
									/>
								</TableCell>
								<TableCell className="font-medium">{vsl.title}</TableCell>
								<TableCell>{vsl.createdAt}</TableCell>
								<TableCell className="text-right">
									<CodeDialog vslId={vsl.id}>
										<Button variant="ghost" size="icon">
											<RiCodeSSlashFill className="size-5 text-primary" />
										</Button>
									</CodeDialog>
									<DropdownMenu>
										<DropdownMenuTrigger asChild>
											<Button variant="ghost" size="icon">
												<RiMoreFill className="size-5" />
											</Button>
										</DropdownMenuTrigger>
										<DropdownMenuContent align="end">
											<DropdownMenuItem onClick={() => onEdit(vsl)}>
												<RiEdit2Fill className="mr-2 size-4" />
												Editar
											</DropdownMenuItem>

											<DropdownMenuItem>
												<RiDownload2Fill className="mr-2 size-4" />
												Download
											</DropdownMenuItem>
											<DropdownMenuItem>
												<RiDeleteBinFill className="mr-2 size-4" />
												Remover
											</DropdownMenuItem>
										</DropdownMenuContent>
									</DropdownMenu>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</CardContent>
		</Card>
	);
}
