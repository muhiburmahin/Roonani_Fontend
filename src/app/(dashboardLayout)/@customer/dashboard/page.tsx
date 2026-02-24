import CustomerOverview from "@/src/components/modules/dashboard/CustomerOverview";

export default function DashboardPage() {
    return (
        <div className="space-y-8">
            {/* Page Header Area */}
            <div className="flex flex-col gap-2 px-2">
                <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter">
                    My Dashboard
                </h2>
                <p className="text-slate-500 font-bold">
                    Welcome back your account.
                </p>
            </div>

            {/* The Two-Part Module Section */}
            <CustomerOverview />
        </div>
    );
}