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
import { SidebarSearch } from "./sidebar-search";

import { Chat } from "@/app/generated/prisma";
import Link from "next/link";
import { getSubscription } from "@/server/stripe";

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  chats: Pick<Chat, 'id' | 'title'>[];
}

export default async function AppSidebar({ chats, ...props }: AppSidebarProps) {

  const session = await getUserSession();
  const userId = session.data?.user?.id;
  const subscription = await getSubscription();
  const planName = subscription?.plan ?? null;

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <div className="flex items-center gap-2">
          <Image src="/nexus_logo.svg" alt="Logo" width={24} height={24} priority quality={100} />
        </div>
        <Link href="/chat" className="mt-6">
          <Button size="icon" className="w-full font-medium bg-accent border hover:bg-accent/80 border-[#3f3f3f] text-foreground">Novo Chat</Button>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarSearch chats={chats} />
        <NavChatHistory chats={chats} userId={userId as string} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={{
          name: session?.data?.user?.name as string,
          email: session?.data?.user?.email as string,
          avatar: session?.data?.user?.image as string,
        }} planName={planName} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )

}
