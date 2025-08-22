import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import Image from "next/image";
import { NavChatHistory } from "./nav-chat-history";
import { Button } from "./ui/button";
import { getUserSession } from "@/server/user";

import { Chat } from "@/app/generated/prisma";
import Link from "next/link";

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  chats: Pick<Chat, 'id' | 'title'>[];
}

export default async function AppSidebar({ chats, ...props }: AppSidebarProps) {

  const session = await getUserSession()

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <div className="flex items-center gap-2">
          <Image src="/nexus.png" alt="Logo" width={48} height={48} priority quality={100} />
          <span className="">Nexus</span>
        </div>
        <Link href="/chat">
          <Button variant="default" size="icon" className="w-full font-medium">Novo Chat</Button>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <NavChatHistory chats={chats} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={{
          name: session?.data?.user?.name as string,
          email: session?.data?.user?.email as string,
          avatar: session?.data?.user?.image as string,
        }} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )

}
