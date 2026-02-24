"use client";

import * as React from "react";
import Link from "next/link";
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
  SidebarRail,
  useSidebar,
} from "@/src/components/ui/sidebar";
import { Roles } from "@/src/constants/role";
import { adminRoutes } from "@/src/routes/adminRoute";
import { userRoutes } from "@/src/routes/userRoutes";
import { Routes } from "@/src/types";
import { LayoutDashboard } from "lucide-react";
import { NavUser } from "./nav-user";

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  user: {
    role: string;
    name?: string;
    email?: string;
  };
}

export function AppSidebar({ user, ...props }: AppSidebarProps) {
  let routes: Routes[] = [];
  const { setOpenMobile, isMobile } = useSidebar();

  const userRole = user?.role?.toUpperCase();

  if (userRole === Roles.admin) {
    routes = adminRoutes;
  } else if (userRole === Roles.customer) {
    routes = userRoutes;
  }

  // মেনু আইটেমে ক্লিক করলে মোবাইল ভার্সনে অটো-মিনিমাইজ করার ফাংশন
  const handleNavigation = () => {
    if (isMobile) {
      setOpenMobile(false);
    }
  };

  return (
    <Sidebar {...props} className="border-r border-brand/10 bg-white dark:bg-slate-950">


      <SidebarContent className="scrollbar-hide">
        {routes.map((group) => (
          <SidebarGroup key={group.title} className="px-4">
            <SidebarGroupLabel className="h-auto px-2 mb-2">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-brand/60">
                {group.title}
              </span>
            </SidebarGroupLabel>

            <SidebarGroupContent>
              <SidebarMenu className="gap-1.5">
                {group.items?.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      className="h-11 rounded-xl transition-all group hover:bg-brand hover:text-white active:scale-95"
                    >
                      <Link
                        href={item.url}
                        className="flex items-center gap-3"
                        onClick={handleNavigation} // এখানে ক্লিক করলে অটো ক্লোজ হবে
                      >
                        <div className="flex items-center justify-center text-slate-500 group-hover:text-white transition-colors">
                          {item.icon || <LayoutDashboard size={18} />}
                        </div>
                        <span className="font-semibold text-sm tracking-tight transition-colors">
                          {item.title}
                        </span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarRail />

      <SidebarFooter className="p-4 border-t border-slate-50 dark:border-slate-900">
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}