import { useRouter } from "next/navigation";
import { SignOutButton } from "@/components/dashboard/sidebar/sign-out-button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger>
				<Avatar>
					<AvatarImage
						src={session.data?.user?.image ?? undefined}
						alt="@shadcn"
					/>
					<AvatarFallback>{session.data?.user?.name?.[0]}</AvatarFallback>
				</Avatar>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="start" alignOffset={10}>
				<DropdownMenuItem className="focus:bg-destructive">
					<SignOutButton />
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
