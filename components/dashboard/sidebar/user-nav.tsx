import { useRouter } from "next/navigation";
import { RiLogoutBoxRFill } from "react-icons/ri";
import { SignOutButton } from "@/components/dashboard/sidebar/sign-out-button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { authClient } from "@/lib/auth-client";

export function UserNav() {
	const session = authClient.useSession();
	const router = useRouter();

	if (!session) {
		router.push("/login");
		return null;
	}

	return (
		<div className="w-full">
			{/* Desktop View */}
			<div className="hidden md:block">
				<DropdownMenu>
					<DropdownMenuTrigger>
						<Avatar className="h-12 w-12 rounded-full border bg-background">
							<AvatarImage
								src={session.data?.user?.image ?? undefined}
								alt={session.data?.user?.name ?? "User"}
							/>
							<AvatarFallback>{session.data?.user?.name?.[0]}</AvatarFallback>
						</Avatar>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuItem className="focus:bg-destructive">
							<SignOutButton />
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>

			{/* Mobile View */}
			<div className="block w-full md:hidden">
				<SignOutButton asChild>
					<Button
						variant="outline"
						className="w-full rounded-full bg-background border-border h-12 flex items-center justify-center gap-x-4"
					>
						<RiLogoutBoxRFill className="size-5 text-primary" />
						<span>Fazer Logout</span>
					</Button>
				</SignOutButton>
			</div>
		</div>
	);
}
