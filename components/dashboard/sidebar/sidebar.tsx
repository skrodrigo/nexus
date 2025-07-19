"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
	RiAppsFill,
	RiArchiveFill,
	RiChatAiFill,
	RiMagicFill,
	RiMenuLine,
	RiMoonFill,
	RiSettings3Fill,
} from "react-icons/ri";
import { LogoutButton } from "@/components/dashboard/sidebar/logout-button";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Header } from "../header";

const NavContent = () => {
	const pathname = usePathname();
	const routes = [
		{ href: "/dashboard/apps", label: "Apps", icon: RiAppsFill },
		{ href: "/dashboard/chat", label: "Chat com IA", icon: RiChatAiFill },
		{ href: "/dashboard/archive", label: "Arquivos", icon: RiArchiveFill },
		{
			href: "/dashboard/settings",
			label: "Configurações",
			icon: RiSettings3Fill,
		},
	];

	return (
		<nav className="flex flex-col items-center gap-y-2 px-2 border border-border rounded-xl">
			<TooltipProvider>
				{routes.map((route) => (
					<Tooltip key={route.href}>
						<TooltipTrigger asChild>
							<Link
								href={route.href}
								className={cn(
									"flex items-center justify-center rounded-lg p-2 transition-colors hover:text-primary",
									pathname === route.href
										? "text-primary"
										: "text-muted-foreground",
								)}
							>
								<route.icon className="size-7" />
							</Link>
						</TooltipTrigger>
						<TooltipContent side="right">
							<p>{route.label}</p>
						</TooltipContent>
					</Tooltip>
				))}
			</TooltipProvider>
		</nav>
	);
};

const MobileNavContent = () => {
	const pathname = usePathname();
	const routes = [
		{ href: "/dashboard/apps", label: "Apps", icon: RiAppsFill },
		{ href: "/dashboard/chat", label: "Chat com IA", icon: RiChatAiFill },
		{ href: "/dashboard/archive", label: "Arquivos", icon: RiArchiveFill },
		{
			href: "/dashboard/settings",
			label: "Configurações",
			icon: RiSettings3Fill,
		},
	];

	return (
		<nav className="flex flex-col gap-y-2 p-4">
			{routes.map((route) => (
				<Link
					key={route.href}
					href={route.href}
					className={cn(
						"flex items-center gap-x-4 rounded-lg p-2 transition-colors hover:text-primary",
						pathname === route.href
							? "text-primary bg-background"
							: "text-muted-foreground",
					)}
				>
					<route.icon className="size-7" />
					<span>{route.label}</span>
				</Link>
			))}
		</nav>
	);
};

export function Sidebar() {
	return (
		<>
			{/* Desktop Sidebar */}
			<div className="hidden md:flex h-full flex-col items-center justify-between gap-y-4 border-r p-4 rounded-r-4xl bg-sidebar">
				<Link href="/dashboard/apps">
					<Image
						src="/nexus.png"
						alt="Logo"
						width={64}
						height={64}
						quality={100}
					/>
				</Link>
				<NavContent />
				<div className="flex flex-col items-center gap-y-5">
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger asChild>
								<Button
									variant="ghost"
									className="rounded-full w-12 h-12 flex items-center justify-center border border-border bg-background p-2 text-primary transition-colors hover:text-primary"
								>
									<RiMoonFill className="size-7" />
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
									className="rounded-full w-12 h-12 flex items-center justify-center border border-border bg-background p-2 text-primary transition-colors hover:text-primary"
								>
									<RiMagicFill className="size-7" />
								</Link>
							</TooltipTrigger>
							<TooltipContent side="right">
								<p>Upgrade</p>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
					<LogoutButton />
				</div>
			</div>

			{/* Mobile Sidebar */}
			<div className="md:hidden flex items-center justify-between p-2  w-full">
				<div className="flex items-center gap-x-2">
					<Link href="/dashboard/apps">
						<Image
							src="/nexus.png"
							alt="Logo"
							width={48}
							height={48}
							quality={100}
						/>
					</Link>
					<Header />
				</div>
				<Sheet>
					<SheetTrigger asChild>
						<Button variant="ghost" size="icon">
							<RiMenuLine className="size-5" />
						</Button>
					</SheetTrigger>
					<SheetContent side="left" className="p-0 w-72 bg-sidebar">
						<div className="flex h-full flex-col justify-between py-4">
							<MobileNavContent />
							<div className="flex flex-col items-start gap-y-4 px-2">
								<Link
									href="/dashboard/upgrade"
									className="rounded-full gap-2 w-full h-12 flex items-center justify-center bg-primary text-primary-foreground p-2  transition-colors hover:text-primary"
								>
									<RiMagicFill className="size-7" />
									<span>Fazer Upgrade</span>
								</Link>
								<Button
									variant="ghost"
									className="rounded-full w-full h-12 flex items-center justify-center border border-border bg-background p-2 transition-colors hover:text-primary"
								>
									<RiMoonFill className="size-7 text-primary" />
									<span>Mudar Tema</span>
								</Button>

								<LogoutButton />
							</div>
						</div>
					</SheetContent>
				</Sheet>
			</div>
		</>
	);
}
