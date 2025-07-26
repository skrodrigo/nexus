"use client";

import { useCallback, useEffect, useState } from "react";
import {
	RiAddCircleFill,
	RiCheckFill,
	RiExpandUpDownLine,
} from "react-icons/ri";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
} from "@/components/ui/command";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Skeleton } from "@/components/ui/skeleton";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import { createOrganization } from "@/server/organizations";

type TeamSwitcherProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>;

export default function TeamSwitcher({ className }: TeamSwitcherProps) {
	const [open, setOpen] = useState(false);
	const [showNewTeamDialog, setShowNewTeamDialog] = useState(false);

	const {
		data: organizations,
		isPending: isLoadingOrganizations,
		refetch: refetchOrganizations,
	} = authClient.useListOrganizations();
	const {
		data: activeOrganization,
		isPending: isLoadingActiveOrg,
		refetch: refetchActiveOrg,
	} = authClient.useActiveOrganization();

	const isLoading = isLoadingOrganizations || isLoadingActiveOrg;

	const handleSetCurrentOrganization = useCallback(
		async (organizationId: string) => {
			await authClient.organization.setActive({
				organizationId,
			});
			refetchOrganizations();
			refetchActiveOrg();
			toast.success("Organização alterada com sucesso!");
		},
		[refetchOrganizations, refetchActiveOrg],
	);

	useEffect(() => {
		if (
			!isLoading &&
			!activeOrganization &&
			organizations &&
			organizations.length > 0
		) {
			handleSetCurrentOrganization(organizations[0].id);
		}
	}, [
		isLoading,
		activeOrganization,
		organizations,
		handleSetCurrentOrganization,
	]);

	if (isLoading) {
		return (
			<div className="flex items-center space-x-2 rounded-lg border border-border p-2">
				<Skeleton className="h-4 w-4 rounded-full" />
				<Skeleton className="h-4 w-[150px]" />
			</div>
		);
	}

	if (!activeOrganization) {
		return null;
	}

	return (
		<Dialog open={showNewTeamDialog} onOpenChange={setShowNewTeamDialog}>
			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<Button
						variant="outline"
						aria-expanded={open}
						aria-label="Select a team"
						className={cn("w-auto justify-between", className)}
					>
						<Avatar className="mr-2 h-5 w-5">
							<AvatarImage
								src={activeOrganization.logo ?? ""}
								alt={activeOrganization.name}
							/>
							<AvatarFallback className="bg-primary text-primary-foreground text-xs">
								{activeOrganization.name.charAt(0).toUpperCase()}
							</AvatarFallback>
						</Avatar>
						{activeOrganization.name}
						<RiExpandUpDownLine className="ml-2 h-4 w-4 shrink-0 opacity-50" />
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-auto p-0">
					<Command>
						<CommandList>
							<CommandInput placeholder="Procurar time..." />
							<CommandEmpty>Nenhum time encontrado.</CommandEmpty>
							<CommandGroup heading="Organizações">
								{organizations?.map((organization) => (
									<CommandItem
										key={organization.id}
										onSelect={() => {
											handleSetCurrentOrganization(organization.id);
											setOpen(false);
										}}
										className="text-sm"
									>
										<Avatar className="mr-2 h-5 w-5">
											<AvatarImage
												src={organization.logo ?? ""}
												alt={organization.name}
												className="grayscale"
											/>
											<AvatarFallback className="bg-primary text-primary-foreground text-xs">
												{organization.name.charAt(0).toUpperCase()}
											</AvatarFallback>
										</Avatar>
										{organization.name}
										<RiCheckFill
											className={cn(
												"ml-auto h-4 w-4",
												activeOrganization.id === organization.id
													? "opacity-100"
													: "opacity-0",
											)}
										/>
									</CommandItem>
								))}
							</CommandGroup>
						</CommandList>
						<CommandSeparator />
						<CommandList>
							<CommandGroup>
								<DialogTrigger asChild>
									<CommandItem
										onSelect={() => {
											setOpen(false);
											setShowNewTeamDialog(true);
										}}
									>
										<RiAddCircleFill className="mr-2 h-5 w-5" />
										Novo time
									</CommandItem>
								</DialogTrigger>
							</CommandGroup>
						</CommandList>
					</Command>
				</PopoverContent>
			</Popover>
			<DialogContent>
				<form
					action={async (formData) => {
						const result = await createOrganization(formData);
						if (result.success) {
							await refetchOrganizations();
							await refetchActiveOrg();
							toast.success(result.message);
						} else {
							toast.error(result.error);
						}
						setShowNewTeamDialog(false);
					}}
				>
					<DialogHeader>
						<DialogTitle>Novo time</DialogTitle>
						<DialogDescription>
							Adicione um novo time para gerenciar produtos e clientes.
						</DialogDescription>
					</DialogHeader>
					<div>
						<div className="space-y-4 py-2 pb-4">
							<div className="space-y-2">
								<Label htmlFor="name">Nome do time</Label>
								<Input id="name" name="name" placeholder="Acme Inc." />
							</div>
						</div>
					</div>
					<DialogFooter>
						<Button
							type="button"
							variant="outline"
							onClick={() => setShowNewTeamDialog(false)}
						>
							Cancelar
						</Button>
						<Button type="submit">Criar</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
