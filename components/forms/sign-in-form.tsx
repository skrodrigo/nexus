"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

export function SignInForm() {

	const signInWithGoogle = async () => {
		await authClient.signIn.social({
			provider: "google",
			callbackURL: "/chat",
		});
	};

	return (
		<div className="flex flex-col min-h-screen items-center justify-center bg-background p-4">
			<Image src="/nexus.png" alt="Logo" width={60} height={60} className="mb-4" priority quality={100} />
			<Button
				className="w-[380px]"
				onClick={signInWithGoogle}
				variant="outline"
			>
				<Image
					alt="Google"
					className="mr-2"
					height={16}
					src="https://www.svgrepo.com/show/353817/google-icon.svg"
					width={16}
				/>
				Entrar com Google
			</Button>


		</div>
	);
}