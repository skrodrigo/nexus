"use client";

import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export function SignOutButton() {
	const router = useRouter();

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
		<button onClick={handleLogout} className="p-0" type="button">
			Sair
		</button>
	);
}
