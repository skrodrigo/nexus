import { Button } from "@/components/ui/button";
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
				<Button className="w-full">Adicionar Thumbnail</Button>
			</div>
		</div>
	);
};
