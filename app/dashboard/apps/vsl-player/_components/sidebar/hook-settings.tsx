import { RiDeleteBinLine } from "react-icons/ri";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

export const HookSettings = () => {
	return (
		<div className="mt-4 flex flex-col gap-y-4">
			<div className="flex justify-between items-center">
				<span className="text-sm font-medium">
					Ativar Teste A/B de Headlines
				</span>
				<Switch />
			</div>
			<div>
				<span className="block text-sm font-medium text-muted-foreground">
					Headlines
				</span>
				<div className="mt-2 space-y-2">
					<div className="flex items-center gap-x-2">
						<input
							type="text"
							className="flex-1 p-2 border rounded-md bg-transparent"
							placeholder="Digite sua headline aqui"
						/>
						<Button variant="ghost" size="icon">
							<RiDeleteBinLine className="size-4" />
						</Button>
					</div>
					<div className="flex items-center gap-x-2">
						<input
							type="text"
							className="flex-1 p-2 border rounded-md bg-transparent"
							placeholder="Digite outra headline aqui"
						/>
						<Button variant="ghost" size="icon">
							<RiDeleteBinLine className="size-4" />
						</Button>
					</div>
				</div>
				<Button variant="outline" className="mt-2 w-full">
					Adicionar nova headline
				</Button>
			</div>
		</div>
	);
};
