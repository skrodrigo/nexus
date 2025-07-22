import { Switch } from "@/components/ui/switch";

export const ThumbSniperSettings = () => {
	return (
		<div className="mt-4 flex flex-col gap-y-4">
			<div className="flex justify-between items-center">
				<span className="text-sm font-medium">
					Ativar Thumbnail de Recuperação
				</span>
				<Switch />
			</div>
			<div>
				<label
					htmlFor="thumb-text"
					className="block text-sm font-medium text-muted-foreground"
				>
					Texto da Thumbnail
				</label>
				<input
					id="thumb-text"
					type="text"
					className="mt-1 w-full p-2 border rounded-md bg-transparent"
					placeholder="Ex: Desconto especial para você!"
				/>
			</div>
			<div>
				<label
					htmlFor="thumb-image"
					className="block text-sm font-medium text-muted-foreground"
				>
					URL da Imagem de Fundo
				</label>
				<input
					id="thumb-image"
					type="text"
					className="mt-1 w-full p-2 border rounded-md bg-transparent"
					placeholder="https://exemplo.com/imagem.png"
				/>
			</div>
			<div className="flex items-center gap-x-4">
				<div className="flex-1">
					<label
						htmlFor="thumb-start"
						className="block text-sm font-medium text-muted-foreground"
					>
						Início (segundos)
					</label>
					<input
						id="thumb-start"
						type="number"
						className="mt-1 w-full p-2 border rounded-md bg-transparent"
						placeholder="60"
					/>
				</div>
				<div className="flex-1">
					<label
						htmlFor="thumb-duration"
						className="block text-sm font-medium text-muted-foreground"
					>
						Duração (segundos)
					</label>
					<input
						id="thumb-duration"
						type="number"
						className="mt-1 w-full p-2 border rounded-md bg-transparent"
						placeholder="10"
					/>
				</div>
			</div>
			<div>
				<label
					htmlFor="thumb-color"
					className="block text-sm font-medium text-muted-foreground"
				>
					Cor do Texto
				</label>
				<input
					id="thumb-color"
					type="color"
					className="mt-1 w-10 h-10"
					defaultValue="#FFFFFF"
				/>
			</div>
		</div>
	);
};
