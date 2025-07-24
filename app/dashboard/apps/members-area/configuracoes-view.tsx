import { useState } from "react";
import { RiImageAddLine } from "react-icons/ri";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const ColorPicker = ({
	label,
	color,
	setColor,
}: {
	label: string;
	color: string;
	setColor: (color: string) => void;
}) => (
	<div className="flex items-center gap-4">
		<Label>{label}</Label>
		<div className="relative">
			<Input
				type="color"
				value={color}
				onChange={(e) => setColor(e.target.value)}
				className="w-12 h-12 p-1 border-none bg-transparent cursor-pointer"
			/>
			<div
				className="w-10 h-10 rounded-md absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
				style={{ backgroundColor: color }}
			></div>
		</div>
		<Input
			value={color}
			onChange={(e) => setColor(e.target.value)}
			className="w-24 bg-secondary/50"
		/>
	</div>
);

export function ConfiguracoesView() {
	// Mock state - replace with actual state management
	const [primaryColor, setPrimaryColor] = useState("#4318FF");
	const [topBarColor, setTopBarColor] = useState("#111C44");
	const [bgColor, setBgColor] = useState("#0B1437");
	const [cardColor, setCardColor] = useState("#112240");

	return (
		<div className="p-6 space-y-8">
			<div>
				<h1 className="text-2xl font-medium">Configurações de Aparência</h1>
				<p className="text-muted-foreground">
					Personalize a aparência da sua área de membros.
				</p>
			</div>

			<div className="space-y-6">
				{/* Cores */}
				<div className="p-6 rounded-lg border bg-secondary/20">
					<h3 className="text-lg font-medium mb-4">Cores</h3>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<ColorPicker
							label="Cor Primária"
							color={primaryColor}
							setColor={setPrimaryColor}
						/>
						<ColorPicker
							label="Cor da Barra Superior"
							color={topBarColor}
							setColor={setTopBarColor}
						/>
						<ColorPicker
							label="Cor de Fundo Principal"
							color={bgColor}
							setColor={setBgColor}
						/>
						<ColorPicker
							label="Cor dos Cartões e Painéis"
							color={cardColor}
							setColor={setCardColor}
						/>
					</div>
				</div>

				{/* Logo */}
				<div className="p-6 rounded-lg border bg-secondary/20">
					<h3 className="text-lg font-medium mb-4">Logo da Barra Superior</h3>
					<div className="grid gap-2">
						<div className="flex items-center justify-center w-full">
							<label
								htmlFor="dropzone-file"
								className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-secondary/50 hover:bg-secondary/80"
							>
								<div className="flex flex-col items-center justify-center pt-5 pb-6">
									<RiImageAddLine className="w-8 h-8 mb-2 text-muted-foreground" />
									<p className="mb-2 text-sm text-muted-foreground">
										<span className="font-medium">Clique para selecionar</span>{" "}
										ou arraste uma imagem
									</p>
									<p className="text-xs text-muted-foreground">
										JPG, PNG ou WebP até 250KB
									</p>
								</div>
								<Input id="dropzone-file" type="file" className="hidden" />
							</label>
						</div>
						<div className="relative my-4">
							<div className="absolute inset-0 flex items-center">
								<span className="w-full border-t" />
							</div>
							<div className="relative flex justify-center text-xs uppercase">
								<span className="bg-background px-2 text-muted-foreground">
									Ou
								</span>
							</div>
						</div>
						<Input placeholder="insira a URL da imagem" />
						<p className="text-sm text-muted-foreground mt-1">
							Logo que será exibido na barra superior.
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
