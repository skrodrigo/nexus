import { Switch } from "@/components/ui/switch";

export const StyleSettings = () => {
	return (
		<div className="mt-4 flex flex-col">
			<div>
				<label
					htmlFor="buttonColor"
					className="block text-sm font-medium text-muted-foreground"
				>
					Cor principal
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
					Background
				</label>
				<input
					id="buttonColor"
					type="color"
					className="mt-1 w-10 h-10"
					defaultValue="#2CFBCD"
				/>
			</div>
			<label
				htmlFor="buttonColor"
				className="block text-sm font-medium text-muted-foreground"
			>
				Controles
			</label>
			<div className="flex justify-between items-center my-2">
				<span className="text-sm">Botão Play Grande</span>
				<Switch />
			</div>
			<div className="flex justify-between items-center my-2">
				<span className="text-sm">Barra de Progresso</span>
				<Switch />
			</div>
			<div className="flex justify-between items-center my-2">
				<span className="text-sm">Tempo de Vídeo</span>
				<Switch />
			</div>
			<div className="flex justify-between items-center my-2">
				<span className="text-sm">Voltar 10 segundos</span>
				<Switch />
			</div>
			<div className="flex justify-between items-center my-2">
				<span className="text-sm">Avançar 10 segundos</span>
				<Switch />
			</div>
			<div className="flex justify-between items-center my-2">
				<span className="text-sm">Controle de Velocidade</span>
				<Switch />
			</div>
		</div>
	);
};
