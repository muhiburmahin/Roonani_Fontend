// import { AppSidebar } from "@/components/layout/app-sidebar";
// import { userService } from "@/services/user.service"
// import {
//     Breadcrumb,
//     BreadcrumbItem,
//     BreadcrumbLink,
//     BreadcrumbList,
//     BreadcrumbPage,
//     BreadcrumbSeparator,
// } from "@/components/ui/breadcrumb";
// import { Separator } from "@/components/ui/separator";
// import { Roles } from '../../constants/role';
// import {
//     SidebarInset,
//     SidebarProvider,
//     SidebarTrigger,
// } from "@/components/ui/sidebar";
// import { adminRoutes } from "@/routes/adminRoute";
// import { sellerRoutes } from "@/routes/sellerRoute";
// import { userRoutes } from "@/routes/userRoutes";
// import { Routes } from "@/types/route.type";

// type Role = "ADMIN" | "SELLER" | "CUSTOMER";

// export default async function DashboardLayout({
//     admin,
//     seller,
//     customer,
// }: Readonly<{
//     admin: React.ReactNode;
//     seller: React.ReactNode;
//     customer: React.ReactNode;
// }>) {
//     const { data } = await userService.getSession();
//     const user = data.user;
//     const role = data?.user?.role as Role | undefined;

//     const roleView = {
//         ADMIN: admin,
//         SELLER: seller,
//         CUSTOMER: customer,
//     } as const;


//     if (!role) return null;

//     let routes: Routes[] = [];

//     switch (user.role) {
//         case Roles.admin:
//             routes = adminRoutes;
//             break;
//         case Roles.seller:
//             routes = sellerRoutes;
//             break;
//         case Roles.customer:
//             routes = userRoutes;
//             break;
//         default:
//             routes = [];
//             break;
//     }
//     return (
//         <SidebarProvider>
//             <AppSidebar user={user} className="border-r border-blue-50" />

//             <SidebarInset className="bg-[#f8fafc]">

//                 <header className="flex h-16 shrink-0 items-center gap-2 border-b bg-white/80 backdrop-blur-md sticky top-0 z-10 px-6 transition-all">
//                     <div className="flex items-center gap-2 flex-1">
//                         <div className="p-1.5 rounded-xl bg-blue-50 text-blue-600 border border-blue-100 shadow-sm shadow-blue-200/50">
//                             <SidebarTrigger className="-ml-1" />
//                         </div>

//                         <Separator orientation="vertical" className="mx-2 h-5 bg-blue-200/50" />

//                         <Breadcrumb>
//                             <BreadcrumbList>
//                                 <BreadcrumbItem className="hidden md:block">
//                                     <BreadcrumbLink
//                                         href="#"
//                                         className="text-[11px] font-black uppercase tracking-widest text-slate-400 hover:text-blue-600 transition-colors"
//                                     >
//                                         MediStore Dashboard
//                                     </BreadcrumbLink>
//                                 </BreadcrumbItem>
//                                 <BreadcrumbSeparator className="hidden md:block text-slate-300" />
//                                 <BreadcrumbItem>
//                                     <BreadcrumbPage className="text-[13px] font-black text-blue-600 flex items-center gap-2 bg-blue-50 px-3 py-1 rounded-lg border border-blue-100/50">
//                                         <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
//                                         Overview
//                                     </BreadcrumbPage>
//                                 </BreadcrumbItem>
//                             </BreadcrumbList>
//                         </Breadcrumb>
//                     </div>

//                     <div className="flex items-center gap-3">
//                         <div className="hidden md:flex flex-col items-end">
//                             <p className="text-[12px] font-black text-slate-900">{user?.name}</p>
//                             <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-tighter">{user?.role}</p>
//                         </div>
//                     </div>
//                 </header>

//                 {/* Main Content Area */}
//                 <div className="flex flex-1 flex-col gap-6 p-6 md:p-8 max-w-[1600px] mx-auto w-full">

//                     <div className="relative animate-in fade-in slide-in-from-bottom-4 duration-700">
//                         {roleView[role]}
//                     </div>
//                 </div>
//             </SidebarInset>
//         </SidebarProvider>
//     );
// }


import { AppSidebar } from "@/src/components/layout/app-sidebar";
import { userService } from "@/src/services/user.service";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/src/components/ui/breadcrumb";
import { Separator } from "@/src/components/ui/separator";
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/src/components/ui/sidebar";

type Role = "ADMIN" | "CUSTOMER";

export default async function DashboardLayout({
    admin,
    customer,
}: Readonly<{
    admin: React.ReactNode;
    customer: React.ReactNode;
}>) {
    const { data } = await userService.getSession();
    const user = data?.user;
    const role = user?.role as Role | undefined;

    const roleView = {
        ADMIN: admin,
        CUSTOMER: customer,
    } as const;

    if (!role) return null;

    return (
        <SidebarProvider>
            {/* Sidebar with brand touch */}
            <AppSidebar user={user} />

            <SidebarInset className="bg-[#fcfcfd] dark:bg-slate-950">
                {/* Modern Colorful Header */}
                <header className="flex h-16 shrink-0 items-center gap-2 border-b border-brand/5 bg-white/70 dark:bg-slate-950/70 backdrop-blur-2xl sticky top-0 z-10 px-6 transition-all">
                    <div className="flex items-center gap-4 flex-1">
                        <div className="p-2 rounded-xl bg-brand/10 text-brand border border-brand/10 shadow-sm shadow-brand/5 hover:bg-brand/20 transition-colors">
                            <SidebarTrigger className="-ml-1" />
                        </div>

                        <Separator orientation="vertical" className="mx-1 h-5 bg-slate-200 dark:bg-slate-800" />

                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem className="hidden md:block">
                                    <BreadcrumbLink
                                        href="/"
                                        className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-brand transition-colors"
                                    >
                                        roohani fashion
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator className="hidden md:block text-slate-300" />
                                <BreadcrumbItem>
                                    <BreadcrumbPage className="text-[12px] font-bold text-slate-900 dark:text-white flex items-center gap-2 bg-slate-50 dark:bg-slate-900 px-3 py-1.5 rounded-full border border-slate-100 dark:border-slate-800">
                                        <span className="w-2 h-2 rounded-full bg-brand animate-pulse shadow-[0_0_8px_rgba(var(--brand-rgb),0.6)]"></span>
                                        Dashboard
                                    </BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>

                    {/* Top Right Actions / User Info */}
                    <div className="flex items-center gap-4">
                        <div className="hidden sm:flex flex-col items-end gap-0.5">
                            <p className="text-sm font-black text-slate-900 dark:text-white leading-none uppercase tracking-tight">
                                {user?.name}
                            </p>
                            <div className="flex items-center gap-1.5">
                                <span className="w-1 h-1 rounded-full bg-emerald-500"></span>
                                <p className="text-[9px] font-black text-brand uppercase tracking-widest leading-none">
                                    {user?.role} Account
                                </p>
                            </div>
                        </div>
                        {/* Profile Image/Avatar will be handled by AppSidebar/NavUser, but adding a spacer here */}
                        <div className="w-px h-8 bg-slate-100 dark:bg-slate-800 mx-1 hidden sm:block" />
                    </div>
                </header>

                {/* Main Content with soft animations */}
                <main className="flex-1 flex flex-col p-4 md:p-8 lg:p-10 max-w-[1800px] mx-auto w-full overflow-hidden">
                    <div className="relative h-full w-full animate-in fade-in slide-in-from-bottom-4 duration-1000 ease-out">
                        {/* Brand background glow effect */}
                        <div className="absolute -top-20 -right-20 w-64 h-64 bg-brand/5 rounded-full blur-[100px] pointer-events-none" />
                        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />

                        <div className="relative z-10">
                            {roleView[role]}
                        </div>
                    </div>
                </main>
            </SidebarInset>
        </SidebarProvider>
    );
}