import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

export const ActionButtonsSettings = () => {
	return (
		<div className="mt-4 flex flex-col gap-y-4">
			<div className="flex justify-between items-center">
				<span className="text-sm font-medium">Ativar Botões de Ação</span>
				<Switch />
			</div>
			<Button className="w-full">Adicionar Botão de Ação</Button>
		</div>
	);
};
