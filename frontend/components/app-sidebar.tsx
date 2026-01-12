"use client";

import * as React from "react";
import {
  IconDashboard,
  IconListDetails,
  IconChartBar,
  IconFolder,
  IconDatabase,
  IconReport,
  IconFileWord,
  IconSettings,
  IconInnerShadowTop,
} from "@tabler/icons-react";

import { NavDocuments } from "@/components/nav-documents";
import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { useSession } from "next-auth/react";

const data = {
  navMain: [
    { title: "Dashboard", url: "/dashboard", icon: IconDashboard },
    { title: "Categories", url: "/dashboard/categories", icon: IconListDetails },
    { title: "Products", url: "/dashboard/products", icon: IconChartBar },
    { title: "Sales", url: "/dashboard/sales", icon: IconFolder },
  ],
  navSecondary: [
    { title: "Settings", url: "/dashboard/settings", icon: IconSettings },
  ],
  documents: [
    { name: "Today sales", url: "/dashboard/reports/today", icon: IconDatabase },
    { name: "Weekly Sales", url: "/dashboard/reports/weekly", icon: IconReport },
    { name: "Monthly Sales", url: "/dashboard/reports/monthly", icon: IconFileWord },
  ],
};

export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  const { data: session } = useSession();

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="!p-1.5">
              <a href="#">
                <IconInnerShadowTop className="!size-5" />
                <span className="text-base font-semibold">
                  Baiondata Solution
                </span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavDocuments items={data.documents} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>

      <SidebarFooter>
        {session?.user && <NavUser user={session.user} />}
      </SidebarFooter>
    </Sidebar>
  );
}
