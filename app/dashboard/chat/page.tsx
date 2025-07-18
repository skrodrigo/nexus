"use client";

import {
	RiAttachment2,
	RiSendPlane2Fill,
	RiSendPlaneFill,
} from "react-icons/ri";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function ChatPage() {
	return (
		<div className="flex flex-col h-full items-center justify-center  text-foreground">
			<div className="w-full max-w-2xl mx-auto flex flex-col items-center gap-6">
				<h1 className="text-3xl font-medium">O que vamos Construir Hoje ?</h1>
				<div className="relative w-full p-4 bg-background border border-border rounded-2xl shadow-lg">
					<Textarea
						placeholder="Estou criando uma oferta para um produto digital low ticket..."
						className="bg-background border-none resize-none focus-visible:ring-0 focus-visible:ring-offset-0 text-foreground placeholder:text-muted-foreground h-28"
					/>
					<div className="flex justify-between items-center mt-2">
						<Button
							variant="outline"
							size="icon"
							className="text-muted-foreground hover:text-primary"
						>
							<RiAttachment2 className="size-5" />
						</Button>
						<Button
							size="icon"
							variant="outline"
							className="bg-primary/20 text-primary hover:bg-primary/30 rounded-full"
						>
							<RiSendPlaneFill className="size-5" />
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}
