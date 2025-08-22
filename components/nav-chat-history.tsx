"use client"

import { useState, useTransition } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
  Folder,
  Forward,
  MoreHorizontal,
  Trash2,
} from "lucide-react"
import { shareChat, deleteChat } from '@/server/chat';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"


export function NavChatHistory({
  chats,
  userId,
}: {
  userId: string;
  chats: {
    id: string;
    title: string;
  }[]
}) {
  const { isMobile } = useSidebar();
  const [isPending, startTransition] = useTransition();
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [, setSelectedChatId] = useState<string | null>(null);
  const [shareLink, setShareLink] = useState<string>("");

  const handleShareClick = (chatId: string) => {
    setSelectedChatId(chatId);
    setShareDialogOpen(true);
    startTransition(async () => {
      const chat = await shareChat(chatId);
      if (chat?.sharePath) {
        const url = new URL(window.location.href);
        url.pathname = `/share/${chat.sharePath}`;
        setShareLink(url.toString());
      }
    });
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareLink);
  };

  const handleDelete = (chatId: string) => {
    startTransition(async () => {
      await deleteChat(chatId);
    });
  };

  return (
    <>
      <SidebarGroup className="group-data-[collapsible=icon]:hidden">
        <SidebarGroupLabel>Chats</SidebarGroupLabel>
        <SidebarMenu>
          {chats.map((chat) => (
            <SidebarMenuItem key={chat.id}>
              <SidebarMenuButton asChild>
                <a href={`/chat/${chat.id}`}>
                  <span>{chat.title}</span>
                </a>
              </SidebarMenuButton>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuAction showOnHover>
                    <MoreHorizontal />
                    <span className="sr-only">More</span>
                  </SidebarMenuAction>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-48 rounded-lg"
                  side={isMobile ? "bottom" : "right"}
                  align={isMobile ? "end" : "start"}
                >
                  <DropdownMenuItem onClick={() => handleShareClick(chat.id)} disabled={isPending}>
                    <Forward className="text-muted-foreground" />
                    <span>Compartilhar</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => handleDelete(chat.id)} disabled={isPending}>
                    <Trash2 className="text-muted-foreground" />
                    <span>Deletar</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroup>

      <Dialog open={shareDialogOpen} onOpenChange={setShareDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Compartilhar Chat</DialogTitle>
            <DialogDescription>
              Qualquer pessoa com este link poderá visualizar a conversa.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center space-x-2 w-full space-y-2">
            <Input
              id="link"
              defaultValue={shareLink}
              readOnly
              className='w-full h-10'
            />
            <div className="flex justify-end w-full">
              <Button onClick={copyToClipboard} size="sm" className='mr-1'>
                <span>Copiar</span>
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
