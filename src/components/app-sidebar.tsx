import { Calendar, Inbox, MessageCircle, Search, Settings } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { auth, clerkClient } from "@clerk/nextjs/server";
import UserNav from "./user-nav";

// Menu items.
const items = [
  {
    title: "Messages",
    icon: MessageCircle,
  },
  {
    title: "Inbox",
    icon: Inbox,
  },
  {
    title: "Calendar",
    icon: Calendar,
  },
  {
    title: "Search",
    icon: Search,
  },
  {
    title: "Settings",
    icon: Settings,
  },
];

export async function AppSidebar() {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  const client = await clerkClient();
  const user = await client.users.getUser(userId);
  return (
    <Sidebar collapsible="icon">
      <SidebarContent className="flex items-center justify-between">
        <SidebarGroup>
          <SidebarGroupLabel>Main Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <div>
                      <item.icon />
                      <span>{item.title}</span>
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <UserNav
          emailAddress={user.emailAddresses[0]?.emailAddress!}
          firstName={user.firstName!}
          fullName={user.fullName!}
          imgUrl={user.imageUrl!}
        />
      </SidebarFooter>
    </Sidebar>
  );
}
