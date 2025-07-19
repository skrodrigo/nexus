"use client";

import {
	AlertCircleIcon,
	FileArchiveIcon,
	FileIcon,
	FileSpreadsheetIcon,
	FileTextIcon,
	FileUpIcon,
	HeadphonesIcon,
	ImageIcon,
	VideoIcon,
	XIcon,
} from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
	type FileWithPreview,
	formatBytes,
	useFileUpload,
} from "@/hooks/use-file-upload";

const getFileIcon = (file: { file: File | { type: string; name: string } }) => {
	const fileType = file.file instanceof File ? file.file.type : file.file.type;
	const fileName = file.file instanceof File ? file.file.name : file.file.name;

	if (
		fileType.includes("pdf") ||
		fileName.endsWith(".pdf") ||
		fileType.includes("word") ||
		fileName.endsWith(".doc") ||
		fileName.endsWith(".docx")
	) {
		return <FileTextIcon className="size-4 opacity-60" />;
	} else if (
		fileType.includes("zip") ||
		fileType.includes("archive") ||
		fileName.endsWith(".zip") ||
		fileName.endsWith(".rar")
	) {
		return <FileArchiveIcon className="size-4 opacity-60" />;
	} else if (
		fileType.includes("excel") ||
		fileName.endsWith(".xls") ||
		fileName.endsWith(".xlsx")
	) {
		return <FileSpreadsheetIcon className="size-4 opacity-60" />;
	} else if (fileType.includes("video/")) {
		return <VideoIcon className="size-4 opacity-60" />;
	} else if (fileType.includes("audio/")) {
		return <HeadphonesIcon className="size-4 opacity-60" />;
	} else if (fileType.startsWith("image/")) {
		return <ImageIcon className="size-4 opacity-60" />;
	}
	return <FileIcon className="size-4 opacity-60" />;
};

type ImageUploadProps = {
	onFilesChange?: (files: FileWithPreview[]) => void;
	disabled?: boolean;
};

export function ImageUpload({ onFilesChange, disabled }: ImageUploadProps) {
	const maxSize = 4 * 1024 * 1024; // 4MB
	const maxFiles = 1;

	const [
		{ files, isDragging, errors },
		{
			handleDragEnter,
			handleDragLeave,
			handleDragOver,
			handleDrop,
			openFileDialog,
			removeFile,
			getInputProps,
		},
	] = useFileUpload({
		multiple: false,
		maxFiles,
		maxSize,
		accept: "image/png, image/jpeg",
		onFilesChange,
	});

	return (
		<div className="flex flex-col gap-2">
			{/* Drop area */}
			<div
				role="button"
				tabIndex={0}
				onClick={openFileDialog}
				onKeyDown={(e) => {
					if (e.key === "Enter" || e.key === " ") {
						e.preventDefault();
						openFileDialog();
					}
				}}
				onDragEnter={handleDragEnter}
				onDragLeave={handleDragLeave}
				onDragOver={handleDragOver}
				onDrop={handleDrop}
				data-dragging={isDragging || undefined}
				className="border-border hover:bg-accent/50 data-[dragging=true]:bg-accent/50 has-[input:focus]:border-ring has-[input:focus]:ring-ring/50 flex min-h-40 flex-col items-center justify-center rounded-xl border border-dashed p-4 transition-colors has-disabled:pointer-events-none has-disabled:opacity-50 has-[input:focus]:ring-[3px]"
			>
				<input
					{...getInputProps()}
					className="sr-only"
					aria-label="Enviar arquivos"
					disabled={disabled}
				/>

				<div className="flex flex-col items-center justify-center text-center">
					<div
						className="bg-background mb-2 flex size-11 shrink-0 items-center justify-center rounded-full border"
						aria-hidden="true"
					>
						<FileUpIcon className="size-4 opacity-60" />
					</div>
					<p className="mb-1.5 text-sm font-medium">Enviar arquivo</p>
					<p className="text-muted-foreground mb-2 text-xs">
						Arraste e solte ou clique para procurar
					</p>
					<div className="text-muted-foreground/70 flex flex-wrap justify-center gap-1 text-xs">
						<span>PNG, JPG, JPEG</span>
						<span>∙</span>
						<span>Até {formatBytes(maxSize)}</span>
					</div>
				</div>
			</div>

			{errors.length > 0 && (
				<div
					className="text-destructive flex items-center gap-1 text-xs"
					role="alert"
				>
					<AlertCircleIcon className="size-3 shrink-0" />
					<span>{errors[0]}</span>
				</div>
			)}

			{/* File list */}
			{files.length > 0 && (
				<div className="space-y-2">
					{files.map((file) => (
						<div
							key={file.id}
							className="bg-muted flex items-center justify-between gap-2 rounded-lg border p-2 pe-3"
						>
							<div className="flex items-center gap-3 overflow-hidden">
								<div className="flex aspect-square size-10 shrink-0 items-center justify-center rounded border">
									{file.preview &&
									(file.file instanceof File
										? file.file.type.startsWith("image/")
										: file.file.type.startsWith("image/")) ? (
										<Image
											src={file.preview}
											alt={file.file.name}
											width={40}
											height={40}
											className="size-full rounded-sm object-cover"
										/>
									) : (
										getFileIcon(file)
									)}
								</div>
								<div className="flex min-w-0 flex-col gap-0.5">
									<p className="truncate text-[13px] font-medium">
										{file.file instanceof File
											? file.file.name
											: file.file.name}
									</p>
									<p className="text-muted-foreground text-xs">
										{formatBytes(
											file.file instanceof File
												? file.file.size
												: file.file.size,
										)}
									</p>
								</div>
							</div>

							<Button
								size="icon"
								variant="ghost"
								className="text-muted-foreground/80 hover:text-foreground -me-2 size-8 hover:bg-transparent"
								onClick={() => removeFile(file.id)}
								aria-label="Remover arquivo"
							>
								<XIcon className="size-4" aria-hidden="true" />
							</Button>
						</div>
					))}
				</div>
			)}
		</div>
	);
}
