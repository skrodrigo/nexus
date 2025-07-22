import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";

export const SmartProgressSettings = () => {
	return (
		<div className="mt-4 flex flex-col gap-y-4">
			<div className="flex justify-between items-center">
				<span className="text-sm font-medium">
					Ativar Progresso Inteligente
				</span>
				<Switch />
			</div>
			<div>
				<span className="block text-sm font-medium text-muted-foreground">
					Velocidade de Preenchimento
				</span>
				<RadioGroup defaultValue="normal" className="mt-2 space-y-2">
					<div className="flex items-center space-x-2">
						<RadioGroupItem value="normal" id="normal" />
						<Label htmlFor="normal">Normal</Label>
					</div>
					<div className="flex items-center space-x-2">
						<RadioGroupItem value="fast" id="fast" />
						<Label htmlFor="fast">Inteligente</Label>
					</div>
				</RadioGroup>
				<div className="my-4">
					<label
						className="block text-sm font-medium text-muted-foreground"
						htmlFor="progress-height"
					>
						Altura da barra
					</label>
					<Slider defaultValue={[10]} className="mt-2" min={1} max={100} />
				</div>
			</div>
		</div>
	);
};
