import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

export const SmartAutoplaySettings = () => {
	return (
		<div className="mt-4 flex flex-col gap-y-4">
			<div className="flex justify-between items-center">
				<span className="text-sm font-medium">Ativar Smart Autoplay</span>
				<Switch />
			</div>
			<div>
				<label
					htmlFor="buttonColor"
					className="block text-sm font-medium text-muted-foreground"
				>
					Cor do Texto
				</label>
				<input
					id="buttonColor"
					type="color"
					className="mt-1 w-10 h-10"
					defaultValue="#2CFBCD"
				/>
			</div>
			<div>
				<label
					htmlFor="buttonColor"
					className="block text-sm font-medium text-muted-foreground"
				>
					Cor do Background
				</label>
				<input
					id="buttonColor"
					type="color"
					className="mt-1 w-10 h-10"
					defaultValue="#2CFBCD"
				/>
			</div>
			<Button className="w-full">Alterar Smart Autoplay</Button>
			<div>
				<label
					htmlFor="buttonColor"
					className="block text-sm font-medium text-muted-foreground"
				>
					Texto Superior
				</label>
				<Textarea
					id="buttonColor"
					className="mt-1 w-full p-2 border rounded-md bg-transparent"
					defaultValue="Seu vídeo já começou!"
				/>
			</div>
			<div>
				<label
					htmlFor="buttonColor"
					className="block text-sm font-medium text-muted-foreground"
				>
					Texto Inferior
				</label>
				<Textarea
					id="buttonColor"
					className="mt-1 w-full p-2 border rounded-md bg-transparent"
					defaultValue="Clique para ouvir"
				/>
			</div>
		</div>
	);
};
