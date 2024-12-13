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
      <main className="flex flex-col w-full">
        <header className="flex flex-row  grow-[3] w-full">
          <SidebarTrigger className="sm:hidden" />
        </header>
        <section className="flex grow-[9]">{children}</section>
      </main>
    </SidebarProvider>
  );
}
