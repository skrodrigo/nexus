import { Switch } from "@/components/ui/switch";

export const ActionButtonsSettings = () => {
	return (
		<div className="mt-4 flex flex-col gap-y-4">
			<div className="flex justify-between items-center">
				<span className="text-sm font-medium">Ativar Botões de Ação</span>
				<Switch />
			</div>
			<div>
				<label
					htmlFor="cta-text"
					className="block text-sm font-medium text-muted-foreground"
				>
					Texto do Botão (CTA)
				</label>
				<input
					id="cta-text"
					type="text"
					className="mt-1 w-full p-2 border rounded-md bg-transparent"
					placeholder="Ex: Comprar agora!"
				/>
			</div>
			<div>
				<label
					htmlFor="cta-time"
					className="block text-sm font-medium text-muted-foreground"
				>
					Tempo de Exibição (segundos)
				</label>
				<input
					id="cta-time"
					type="number"
					className="mt-1 w-full p-2 border rounded-md bg-transparent"
					placeholder="120"
				/>
			</div>
			<div className="flex items-center gap-x-4">
				<div>
					<label
						htmlFor="cta-color"
						className="block text-sm font-medium text-muted-foreground"
					>
						Cor do Botão
					</label>
					<input
						id="cta-color"
						type="color"
						className="mt-1 w-10 h-10"
						defaultValue="#2CFBCD"
					/>
				</div>
			</div>
		</div>
	);
};
