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

    // রোল অনুযায়ী টাইটেল নির্ধারণ
    const displayTitle = role === "ADMIN" ? "Admin Management" : "User Management";

    if (!role) return null;

    return (
        <SidebarProvider>
            <AppSidebar user={user} />

            <SidebarInset className="bg-[#fdf8f9] dark:bg-slate-950 transition-colors duration-500">
                {/* Modern Brand Header */}
                <header className="flex h-20 shrink-0 items-center gap-2 border-b border-brand/10 bg-white/80 dark:bg-slate-950/80 backdrop-blur-3xl sticky top-0 z-10 px-6 md:px-10">
                    <div className="flex items-center gap-4 flex-1">
                        <div className="p-2.5 rounded-2xl bg-brand text-white shadow-lg shadow-brand/20 hover:scale-105 transition-all cursor-pointer">
                            <SidebarTrigger className="-ml-1" />
                        </div>

                        <Separator orientation="vertical" className="mx-2 h-6 bg-brand/10" />

                        <div className="flex flex-col gap-0.5">
                            <Breadcrumb>
                                <BreadcrumbList>
                                    <BreadcrumbItem className="hidden md:block">
                                        <BreadcrumbLink
                                            href="/"
                                            className="text-[10px] font-black uppercase tracking-[0.3em] text-brand/60 hover:text-brand transition-colors"
                                        >
                                            roohani
                                        </BreadcrumbLink>
                                    </BreadcrumbItem>
                                    <BreadcrumbSeparator className="hidden md:block text-brand/20" />
                                    <BreadcrumbItem>
                                        <BreadcrumbPage className="text-[11px] font-bold text-slate-500 flex items-center gap-2 italic">
                                            Dashboard
                                        </BreadcrumbPage>
                                    </BreadcrumbItem>
                                </BreadcrumbList>
                            </Breadcrumb>

                            {/* বড় এবং আকর্ষণীয় টাইটেল */}
                            <h2 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white tracking-tight leading-none">
                                {displayTitle} <span className="text-brand">.</span>
                            </h2>
                        </div>
                    </div>

                    {/* User Profile Info */}
                    <div className="flex items-center gap-4">
                        <div className="hidden sm:flex flex-col items-end gap-1">
                            <p className="text-sm font-black text-slate-900 dark:text-white leading-none uppercase tracking-tighter">
                                {user?.name}
                            </p>
                            <span className="px-3 py-1 rounded-full bg-brand/10 border border-brand/5 text-[9px] font-black text-brand uppercase tracking-[0.15em]">
                                {user?.role} Access
                            </span>
                        </div>
                    </div>
                </header>

                {/* Main Content Area */}
                <main className="flex-1 flex flex-col p-4 md:p-8 lg:p-10 max-w-[1600px] mx-auto w-full relative">
                    {/* Background Decorative Elements */}
                    <div className="fixed top-40 right-10 w-96 h-96 bg-brand/5 rounded-full blur-[120px] pointer-events-none -z-10" />
                    <div className="fixed bottom-10 left-10 w-72 h-72 bg-blue-400/5 rounded-full blur-[100px] pointer-events-none -z-10" />

                    <div className="relative z-10 animate-in fade-in slide-in-from-bottom-6 duration-700">
                        {/* Content Wrapper */}
                        <div className="rounded-[2.5rem] bg-transparent">
                            {roleView[role]}
                        </div>
                    </div>
                </main>
            </SidebarInset>
        </SidebarProvider>
    );
}