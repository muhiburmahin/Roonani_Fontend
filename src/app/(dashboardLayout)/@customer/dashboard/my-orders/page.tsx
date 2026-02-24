import OrderHistory from "@/src/components/modules/dashboard/OrderHistory";

export default function MyOrdersPage() {
    return (
        <div className="space-y-8">
            <div className="flex flex-col gap-1 px-4">
                <div className="flex items-center gap-3">
                    <div className="w-2 h-10 bg-brand rounded-full" />
                    <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter">
                        Order History
                    </h2>
                </div>
                <p className="text-slate-500 font-bold text-sm tracking-widest uppercase mt-1">
                    Track and manage your fashion purchases
                </p>
            </div>

            {/* The Order Module */}
            <OrderHistory />
        </div>
    );
}