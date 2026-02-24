import UserManagement from "@/src/components/modules/admin/UserManagement";

export default function AllUsersPage() {
    return (
        <div className="max-w-[1600px] mx-auto space-y-10 p-6 md:p-10">
            <div className="relative overflow-hidden bg-brand/5 dark:bg-brand/10 rounded-[3rem] p-10 border border-brand/10">
                <div className="absolute top-0 right-0 w-64 h-64 bg-brand/10 rounded-full blur-3xl -mr-32 -mt-32" />

                <div className="relative z-10 flex flex-col gap-2">
                    <div className="flex items-center gap-4">
                        <div className="h-12 w-3 bg-brand rounded-full shadow-lg shadow-brand/20" />
                        <h1 className="text-5xl font-black text-slate-900 dark:text-white tracking-tighter italic uppercase leading-none">
                            User <span className="text-brand">Registry</span>
                        </h1>
                    </div>
                    <p className="text-slate-500 font-bold text-sm tracking-[0.2em] uppercase ml-7">
                        Centralized Management for Identity & Permissions
                    </p>
                </div>
            </div>

            {/* Content Section */}
            <div className="px-2">
                <UserManagement />
            </div>
        </div>
    );
}