"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
	RiAppsFill,
	RiArchiveFill,
	RiChatAiFill,
	RiFileTextFill,
	RiMagicFill,
	RiMoonFill,
	RiSettings3Fill,
} from "react-icons/ri";
import { UserNav } from "@/components/dashboard/sidebar/user-nav";
import { Button } from "@/components/ui/button";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

export function Sidebar() {
	const pathname = usePathname();
	return (
		<div className="flex h-full flex-col items-center justify-between gap-y-4 border-r p-4 rounded-xl bg-sidebar">
			<Link href="/dashboard/apps">
				<Image
					src="/nexus.png"
					alt="Logo"
					width={32}
					height={32}
					quality={100}
					className="w-auto h-auto"
				/>
			</Link>
			<nav className="flex flex-col items-center gap-y-4 border border-border rounded-xl">
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger asChild>
							<Link
								href="/dashboard/apps"
								className={cn(
									"flex items-center justify-center rounded-lg p-2 transition-colors hover:text-primary",
									pathname === "/dashboard/apps"
										? "bg-primary/10 text-primary"
										: "text-muted-foreground",
								)}
							>
								<RiAppsFill className="size-5" />
							</Link>
						</TooltipTrigger>
						<TooltipContent side="right">
							<p>Apps</p>
						</TooltipContent>
					</Tooltip>
					<Tooltip>
						<TooltipTrigger asChild>
							<Link
								href="/dashboard/chat"
								className={cn(
									"flex items-center justify-center rounded-lg p-2 transition-colors hover:text-primary",
									pathname === "/dashboard/chat"
										? "bg-primary/10 text-primary"
										: "text-muted-foreground",
								)}
							>
								<RiChatAiFill className="size-5" />
							</Link>
						</TooltipTrigger>
						<TooltipContent side="right">
							<p>Chat com IA</p>
						</TooltipContent>
					</Tooltip>
					<Tooltip>
						<TooltipTrigger asChild>
							<Link
								href="/dashboard/archive"
								className={cn(
									"flex items-center justify-center rounded-lg p-2 transition-colors hover:text-primary",
									pathname === "/dashboard/archive"
										? "bg-primary/10 text-primary"
										: "text-muted-foreground",
								)}
							>
								<RiArchiveFill className="size-5" />
							</Link>
						</TooltipTrigger>
						<TooltipContent side="right">
							<p>Arquivos</p>
						</TooltipContent>
					</Tooltip>
					<Tooltip>
						<TooltipTrigger asChild>
							<Link
								href="/dashboard/settings"
								className={cn(
									"flex items-center justify-center rounded-lg p-2 transition-colors hover:text-primary",
									pathname === "/dashboard/settings"
										? "bg-primary/10 text-primary"
										: "text-muted-foreground",
								)}
							>
								<RiSettings3Fill className="size-5" />
							</Link>
						</TooltipTrigger>
						<TooltipContent side="right">
							<p>Configurações</p>
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>
			</nav>
			<div className="flex flex-col items-center gap-y-5">
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger asChild>
							<Button
								variant="ghost"
								className="rounded-full w-10 h-10 flex items-center justify-center border border-border bg-muted p-2 text-primary transition-colors hover:text-primary"
							>
								<RiMoonFill className="size-5" />
							</Button>
						</TooltipTrigger>
						<TooltipContent side="right">
							<p>Tema</p>
						</TooltipContent>
					</Tooltip>
					<Tooltip>
						<TooltipTrigger asChild>
							<Link
								href="/dashboard/upgrade"
								className="rounded-full w-10 h-10 flex items-center justify-center border border-border bg-muted p-2 text-primary transition-colors hover:text-primary"
							>
								<RiMagicFill className="size-5" />
							</Link>
						</TooltipTrigger>
						<TooltipContent side="right">
							<p>Upgrade</p>
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>
				<UserNav />
			</div>
		</div>
	);
}
