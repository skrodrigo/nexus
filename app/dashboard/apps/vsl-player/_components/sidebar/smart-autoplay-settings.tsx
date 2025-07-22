import { Switch } from "@/components/ui/switch";

export const SmartAutoplaySettings = () => {
	return (
		<div className="mt-4 flex flex-col gap-y-4">
			<div className="flex justify-between items-center">
				<span className="text-sm font-medium">Ativar Smart Autoplay</span>
				<Switch />
			</div>
			<div>
				<label
					htmlFor="autoplay-message"
					className="block text-sm font-medium text-muted-foreground"
				>
					Mensagem na tela
				</label>
				<input
					id="autoplay-message"
					type="text"
					className="mt-1 w-full p-2 border rounded-md bg-transparent"
					placeholder="Ex: O vídeo iniciará em instantes..."
				/>
			</div>
		</div>
	);
};
