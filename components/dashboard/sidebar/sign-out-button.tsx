"use client";

import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

import { Slot } from "@radix-ui/react-slot";

interface SignOutButtonProps {
	asChild?: boolean;
	children?: React.ReactNode;
}

export function SignOutButton({ asChild, children }: SignOutButtonProps) {
	const router = useRouter();
	const Comp = asChild ? Slot : "button";

	const handleLogout = async () => {
		await authClient.signOut({
			fetchOptions: {
				onSuccess: () => {
					router.push("/login");
				},
			},
		});
	};

	return (
		<Comp onClick={handleLogout} className="p-0 w-full h-full" type="button">
			{children || "Sair"}
		</Comp>
	);
}
