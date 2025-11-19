"use client";

import { AppSidebar } from "@/components/Sidebar/side-bar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppContext } from "@/contexts/AppContext";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";

interface ILayoutPlatformProps {
  children: React.ReactNode;
}

export default function LayoutPlatform({ children }: ILayoutPlatformProps) {
  const { user, isSessionLoading, disconnectUser } = useContext(AppContext);
  const router = useRouter();

  useEffect(() => {
    // Só redireciona quando terminar de carregar E não tiver usuário
    if (!isSessionLoading && !user) {
      router.push("/auth");
    }
  }, [user, isSessionLoading, router]);

  return (
    <SidebarProvider defaultOpen={true}>
      <AppSidebar logout={disconnectUser} user={user} />
      <main className="flex flex-col w-full">
        <header className="flex flex-row grow-3 w-full">
          <SidebarTrigger className="sm:hidden" />
        </header>
        {isSessionLoading ? (
          <div className="flex h-screen w-full items-center justify-center">
            <div className="flex flex-col items-center gap-2">
              <div className="h-9 w-9 animate-spin rounded-full border-4 border-primary border-t-transparent" />
              <p className="text-sm text-muted-foreground">Loading...</p>
            </div>
          </div>
        ) : (
          <section className="flex grow-9">{children}</section>
        )}
      </main>
    </SidebarProvider>
  );
}
