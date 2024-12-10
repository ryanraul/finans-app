import { Home, Banknote, Receipt, ChartCandlestick } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Button } from "../ui/button";
import { redirect } from "next/navigation";

// Menu items.
const items = [
  {
    title: "Home",
    url: "/platform",
    icon: Home,
  },
  {
    title: "Incomes",
    url: "/platform/incomes",
    icon: Banknote,
  },
  {
    title: "Expenses",
    url: "/platform/expenses",
    icon: Receipt,
  },
  {
    title: "Balance",
    url: "#",
    icon: ChartCandlestick,
  },
];

export function AppSidebar() {
  function logout() {
    redirect("/auth");
  }

  return (
    <Sidebar className="bg-primary">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem className="tracking-tighter" key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <Button className="bg-red-500 hover:bg-red-800">Logout</Button>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
