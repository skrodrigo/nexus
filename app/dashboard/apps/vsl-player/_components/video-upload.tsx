"use client";

import { AlertCircleIcon, FileUpIcon, VideoIcon, XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	type FileWithPreview,
	formatBytes,
	useFileUpload,
} from "@/hooks/use-file-upload";

type VideoUploadProps = {
	onFilesChange?: (files: FileWithPreview[]) => void;
	disabled?: boolean;
};

export function VideoUpload({ onFilesChange, disabled }: VideoUploadProps) {
	const maxSize = 500 * 1024 * 1024; // 500MB
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
		accept: "video/mp4, video/webm, video/quicktime",
		onFilesChange,
	});

	return (
		<div className="flex flex-col gap-2">
			<button
				type="button"
				onClick={openFileDialog}
				onDragEnter={handleDragEnter}
				onDragLeave={handleDragLeave}
				onDragOver={handleDragOver}
				onDrop={handleDrop}
				data-dragging={isDragging || undefined}
				className="border-border hover:bg-accent/50 data-[dragging=true]:bg-accent/50 has-[input:focus]:border-ring has-[input:focus]:ring-ring/50 flex min-h-40 w-full flex-col items-center justify-center rounded-xl border border-dashed p-4 transition-colors has-disabled:pointer-events-none has-disabled:opacity-50 has-[input:focus]:ring-[3px]"
			>
				<input
					{...getInputProps()}
					className="sr-only"
					aria-label="Enviar vídeo"
					disabled={disabled}
				/>

				<div className="flex flex-col items-center justify-center text-center">
					<div
						className="bg-background mb-2 flex size-11 shrink-0 items-center justify-center rounded-full border"
						aria-hidden="true"
					>
						<FileUpIcon className="size-4 opacity-60" />
					</div>
					<p className="mb-1.5 text-sm font-medium">Enviar vídeo</p>
					<p className="text-muted-foreground mb-2 text-xs">
						Arraste e solte ou clique para procurar
					</p>
					<div className="text-muted-foreground/70 flex flex-wrap justify-center gap-1 text-xs">
						<span>MP4, WEBM, MOV</span>
						<span>∙</span>
						<span>Até {formatBytes(maxSize)}</span>
					</div>
				</div>
			</button>

			{errors.length > 0 && (
				<div
					className="text-destructive flex items-center gap-1 text-xs"
					role="alert"
				>
					<AlertCircleIcon className="size-3 shrink-0" />
					<span>{errors[0]}</span>
				</div>
			)}

			{files.length > 0 && (
				<div className="space-y-2">
					{files.map((file) => (
						<div
							key={file.id}
							className="bg-muted flex items-center justify-between gap-2 rounded-lg border p-2 pe-3"
						>
							<div className="flex items-center gap-3 overflow-hidden">
								<div className="flex aspect-square size-10 shrink-0 items-center justify-center rounded border">
									<VideoIcon className="size-5 opacity-60" />
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
