import { AppSidebar } from "@/components/Sidebar/side-bar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppContext } from "@/contexts/AppContext";
import { useContext } from "react";

interface ILayoutPlatformProps {
  children: React.ReactNode;
  logout: () => void;
}

export default function LayoutPlatform(
  layoutPlatformProps: ILayoutPlatformProps
) {
  return (
    <SidebarProvider defaultOpen={true}>
      <AppSidebar logout={layoutPlatformProps.logout} />
      <main className="flex flex-col w-full">
        <header className="flex flex-row  grow-[3] w-full">
          <SidebarTrigger className="sm:hidden" />
        </header>
        <section className="flex grow-[9]">
          {layoutPlatformProps.children}
        </section>
      </main>
    </SidebarProvider>
  );
}
