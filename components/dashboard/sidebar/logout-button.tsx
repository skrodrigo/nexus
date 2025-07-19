import { useRouter } from "next/navigation";
import { RiLogoutBoxRFill } from "react-icons/ri";
import { Button } from "@/components/ui/button";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { authClient } from "@/lib/auth-client";

export function LogoutButton() {
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
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger asChild>
					<Button
						variant="outline"
						onClick={handleLogout}
						className="w-full cursor-pointer rounded-full bg-background border-border h-12 flex items-center justify-center gap-x-4"
					>
						<RiLogoutBoxRFill className="size-5 text-primary" />
						<span className="flex md:hidden">Fazer Logout</span>
					</Button>
				</TooltipTrigger>
				<TooltipContent>
					<p>Fazer Logout</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
}
