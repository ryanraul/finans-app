import { AppSidebar } from "@/components/Sidebar/side-bar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function LayoutPlatformElement({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider defaultOpen={true}>
      <AppSidebar />
      <main className="flex w-full h-full p-8">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
}
