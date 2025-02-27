import {
  Calendar,
  Inbox,
  MessageCircle,
  Search,
  Settings,
  UserRoundPlus,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { auth, clerkClient } from "@clerk/nextjs/server";
import UserNav from "./user-nav";
import Link from "next/link";

// Menu items.
const items = [
  {
    title: "Messages",
    icon: MessageCircle,
    url: "/messages",
  },
  {
    title: "Requests",
    icon: UserRoundPlus,
    url: "/requests",
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
                <SidebarMenuItem className="font-semibold" key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={`${item.url}`}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                  <SidebarMenuBadge>1</SidebarMenuBadge>
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
