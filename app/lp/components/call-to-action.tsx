import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function CallToAction() {
	return (
		<div className="flex flex-col items-center justify-center container max-w-7xl mx-auto">
			<h1 className="text-4xl font-medium text-center">
				Pronto para dominar o marketing digital com o Nexus?
			</h1>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
				<Link href="#plans">
					<Button variant="outline">Veja os Planos</Button>
				</Link>
				<Link href="/register">
					<Button>Começar Agora</Button>
				</Link>
			</div>
		</div>
	);
}
