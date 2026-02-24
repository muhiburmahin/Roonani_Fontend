import AdminOverview from "@/src/components/modules/admin/AdminOverview";
import { getAdminDashboardStatsAction } from "@/src/actions/user.action";

export default async function AdminDashboardPage() {
    // ডাটা ফেচ করা হচ্ছে
    const stats = await getAdminDashboardStatsAction();

    return (
        <div className="space-y-8 p-2">
            <div className="flex flex-col gap-1 px-4">
                <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter">
                    Admin Control Center
                </h2>
                <p className="text-slate-500 font-bold text-sm tracking-widest uppercase">
                    Manage your business at a glance
                </p>
            </div>

            {/* ফেচ করা ডাটা প্রপস হিসেবে পাঠানো হলো */}
            <AdminOverview stats={stats} />
        </div>
    );
}