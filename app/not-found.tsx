import Link from "next/link";
import { RiEmotionSadFill } from "react-icons/ri";
import { Button } from "@/components/ui/button";

export default function NotFound() {
	return (
		<div className="flex flex-col h-screen w-full justify-center items-center">
			<RiEmotionSadFill className="size-12 text-secondary" />
			<h1 className="flex justify-center items-center">
				Essa página ainda não existe.
			</h1>
			<Link href="/lp" className="mt-6">
				<Button>Voltar</Button>
			</Link>
		</div>
	);
}
