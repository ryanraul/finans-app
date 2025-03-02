"use client";

import { AppSidebar } from "@/components/Sidebar/side-bar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppContext } from "@/contexts/AppContext";
import { redirect } from "next/navigation";
import { useContext, useEffect } from "react";

interface ILayoutPlatformProps {
  children: React.ReactNode;
}

export default function LayoutPlatform(
  layoutPlatformProps: ILayoutPlatformProps
) {
  const { user, isSessionLoading, disconnectUser } = useContext(AppContext);

  useEffect(() => {
    if (!user && !isSessionLoading) {
      redirect("/auth");
    }
  }, [user, isSessionLoading]);

  return (
    user && (
      <SidebarProvider defaultOpen={true}>
        <AppSidebar logout={disconnectUser} />
        <main className="flex flex-col w-full">
          <header className="flex flex-row  grow-[3] w-full">
            <SidebarTrigger className="sm:hidden" />
          </header>
          <section className="flex grow-[9]">
            {layoutPlatformProps.children}
          </section>
        </main>
      </SidebarProvider>
    )
  );
}
