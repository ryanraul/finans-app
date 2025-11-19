import {
  Home,
  Banknote,
  Receipt,
  ChartCandlestick,
  User2,
  ChevronUp,
  Lightbulb,
  LightbulbOff,
} from "lucide-react";

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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useTheme } from "next-themes";
import { User } from "@/app/auth/types/User";

interface IAppSideBarProps {
  logout: () => void;
  user?: User;
}

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

export function AppSidebar(appSideBarProps: IAppSideBarProps) {
  const { theme, setTheme } = useTheme();

  return (
    <Sidebar>
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
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <User2 /> {appSideBarProps.user?.Username}
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-(--radix-popper-anchor-width)"
              >
                <DropdownMenuItem
                  onClick={() => {
                    setTheme(theme === "light" ? "dark" : "light");
                  }}
                >
                  {theme === "light" ? <LightbulbOff /> : <Lightbulb />}
                  Theme
                </DropdownMenuItem>
                <DropdownMenuItem onClick={appSideBarProps.logout}>
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
