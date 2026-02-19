// "use client";

// import * as React from "react";
// import Link from "next/link";
// import {
//   Sidebar,
//   SidebarContent,
//   SidebarFooter,
//   SidebarGroup,
//   SidebarGroupContent,
//   SidebarGroupLabel,
//   SidebarMenu,
//   SidebarMenuButton,
//   SidebarMenuItem,
//   SidebarRail,
// } from "@/components/ui/sidebar";
// import { Roles } from "@/constants/role";
// import { adminRoutes } from "@/routes/adminRoute";
// import { sellerRoutes } from "@/routes/sellerRoute";
// import { userRoutes } from "@/routes/userRoutes";
// import { Routes } from "@/types";
// import { LayoutDashboard } from "lucide-react";
// import { NavUser } from "./nav-user";

// interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
//   user: {
//     role: string;
//   };
// }

// export function AppSidebar({ user, ...props }: AppSidebarProps) {
//   let routes: Routes[] = [];

//   switch (user?.role?.toLowerCase()) {
//     case Roles.admin.toLowerCase():
//       routes = adminRoutes;
//       break;
//     case Roles.seller.toLowerCase():
//       routes = sellerRoutes;
//       break;
//     case Roles.customer.toLowerCase():
//       routes = userRoutes;
//       break;
//     default:
//       routes = [];
//   }

//   return (
//     <Sidebar {...props}>
//       <SidebarContent>

//         {routes.length === 0 && (
//           <SidebarGroup>
//             <SidebarGroupLabel className="text-red-500">
//               No routes found for {user.role}
//             </SidebarGroupLabel>
//           </SidebarGroup>
//         )}

//         {/* route maping */}
//         {routes.map((group) => (
//           <SidebarGroup key={group.title} className="px-4">
//             <SidebarGroupLabel className="h-auto px-2 mt-8 mb-6">
//               <span className="text-[28px] font-black uppercase tracking-wider bg-gradient-to-r from-blue-500 to-green-600 bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(96,165,250,0.3)]">
//                 {group.title}
//               </span>
//             </SidebarGroupLabel>

//             <SidebarGroupContent>
//               <SidebarMenu className="gap-5">
//                 {group.items?.map((item) => (
//                   <SidebarMenuItem key={item.title}>
//                     <SidebarMenuButton asChild className="h-auto w-full p-0 hover:bg-transparent">
//                       <Link href={item.url} className="w-full block">
//                         <div className="flex items-center p-[2px] rounded-full bg-gradient-to-r from-blue-500 to-green-500 shadow-[0_0_15px_rgba(59,130,246,0.1)] transition-shadow duration-300 hover:shadow-blue-500/20">

//                           <div className="flex items-center gap-4 w-full h-[52px] px-6 rounded-full bg-white dark:bg-[#0f172a] border border-transparent dark:border-white/5">

//                             <div className="flex shrink-0 items-center justify-center text-blue-500 dark:text-blue-400">
//                               {item.icon || <LayoutDashboard size={22} strokeWidth={2.5} />}
//                             </div>

//                             <span className="font-black text-[15px] tracking-tight bg-gradient-to-r from-blue-500 to-green-400 bg-clip-text text-transparent uppercase truncate">
//                               {item.title}
//                             </span>

//                           </div>
//                         </div>
//                       </Link>
//                     </SidebarMenuButton>
//                   </SidebarMenuItem>
//                 ))}
//               </SidebarMenu>
//             </SidebarGroupContent>
//           </SidebarGroup>
//         ))}
//       </SidebarContent>
//       <SidebarRail />
//       <SidebarFooter>
//         <NavUser user={user} />
//       </SidebarFooter>
//     </Sidebar>
//   );
// }
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
} from "@/src/components/ui/sidebar";
import { Roles } from "@/src/constants/role";
import { adminRoutes } from "@/src/routes/adminRoute";
import { userRoutes } from "@/src/routes/userRoutes";
import { Routes } from "@/src/types";
import { LayoutDashboard, Sparkles } from "lucide-react";
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

  const userRole = user?.role?.toUpperCase();

  if (userRole === Roles.admin) {
    routes = adminRoutes;
  } else if (userRole === Roles.customer) {
    routes = userRoutes;
  }

  return (
    <Sidebar {...props} className="border-r border-slate-100 dark:border-slate-800">
      <SidebarContent>
        {routes.map((group) => (
          <SidebarGroup key={group.title} className="px-4">
            <SidebarGroupLabel className="h-auto px-2 mt-8 mb-4">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-brand">
                {group.title}
              </span>
            </SidebarGroupLabel>

            <SidebarGroupContent>
              <SidebarMenu className="gap-2">
                {group.items?.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild className="h-12 rounded-2xl transition-all group hover:bg-brand/5">
                      <Link href={item.url} className="flex items-center gap-3">
                        <div className="flex items-center justify-center text-slate-400 group-hover:text-brand transition-colors">
                          {item.icon || <LayoutDashboard size={20} />}
                        </div>
                        <span className="font-bold text-sm tracking-tight text-slate-600 dark:text-slate-300 group-hover:text-brand">
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
      <SidebarFooter className="p-4">
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}