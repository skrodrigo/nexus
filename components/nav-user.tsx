"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  ChevronsUpDown,
  LogOut,
  Settings
} from "lucide-react"
import { useEffect, useState } from "react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { authClient } from "@/lib/auth-client"

export function NavUser({
  user,
  planName,
}: {
  user: {
    name: string
    email: string
    avatar: string
  }
  planName?: string | null
}) {



  async function createPortalBilling() {
    const session = await authClient.getSession()

    const { data, error } = await authClient.subscription.billingPortal({
      referenceId: session.data?.user.id,
      returnUrl: process.env.BETTER_AUTH_URL,
    });

    if (error) {
      console.error(error)
    }
  }


  const { isMobile } = useSidebar()
  const [settingsOpen, setSettingsOpen] = useState(false)


  return (
    <>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium text-foreground/80">{user.name}</span>
                  <span className="truncate text-xs text-foreground/40">{user.email}</span>
                </div>
                <ChevronsUpDown className="ml-auto size-4" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
              side={isMobile ? "bottom" : "right"}
              align="end"
              sideOffset={4}
            >
              <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium text-foreground/80">{user.name}</span>
                    <span className="truncate text-xs text-foreground/40">{user.email}</span>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setSettingsOpen(true)}>
                <Settings />
                Configurações
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="focus:bg-destructive/20">
                <LogOut />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
      <Dialog open={settingsOpen} onOpenChange={setSettingsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Configurações da Conta</DialogTitle>
            <DialogDescription>Veja suas informações e opções de suporte.</DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-foreground/70">Usuário</h3>
              <div className="mt-2 flex items-center gap-3">
                <Avatar className="h-9 w-9 rounded-lg">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                </Avatar>
                <div className="text-sm">
                  <div className="font-medium">{user.name}</div>
                  <div className="text-foreground/60">{user.email}</div>
                </div>
              </div>
            </div>

            <div className="border-t pt-4">
              <h3 className="text-sm font-medium text-foreground/70">Plano</h3>
              <div className="mt-2 flex items-center justify-between text-sm">
                <div>
                  <div className="font-medium">Plano atual</div>
                  <div className="text-foreground/60">
                    {planName ? planName.charAt(0).toUpperCase() + planName.slice(1) : "Sem plano"}
                  </div>
                </div>
                <Button size="sm" variant="outline" onClick={createPortalBilling}>
                  Gerenciar
                </Button>
              </div>
            </div>

            <div className="border-t pt-4">
              <h3 className="text-sm font-medium text-foreground/70">Suporte</h3>
              <div className="mt-2 text-sm text-foreground/70">
                Precisa de ajuda? Entre em contato com o suporte.
              </div>
              <div className="mt-3 flex gap-2">
                <Button asChild size="sm" variant="secondary">
                  <a href="#">Email</a>
                </Button>
                <Button asChild size="sm" variant="outline">
                  <a href="#">Centro de ajuda</a>
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
