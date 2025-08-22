import { getUserChats } from "@/server/chat";
import { getUserSession } from "@/server/user";
import AppSidebar from "./app-sidebar";

export async function AppSidebarLoader() {
  const session = await getUserSession();
  const userId = session?.data?.user.id as string;
  const chats = userId ? await getUserChats(userId) : [];

  return <AppSidebar chats={chats} />;
}
