import { AppSidebarLoader } from "@/components/app-sidebar-loader";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function ChatLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider suppressHydrationWarning={true}>
      <AppSidebarLoader />
      {children}
    </SidebarProvider>
  );
}
