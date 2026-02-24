"use client";

import { useState, useEffect } from "react";
import {
    ShoppingBag, Wallet, User,
    Loader2, TrendingUp, ChevronRight
} from "lucide-react";
import Link from "next/link";
import { getCustomerStatsAction } from "@/src/actions/user.action";
import { toast } from "sonner";

/**
 * TYPES & INTERFACES
 */
interface IOrderStatusCount {
    [key: string]: number;
}

interface ICustomerStats {
    totalOrders: number;
    totalSpent: number;
    orderCountByStatus: IOrderStatusCount;
    user: {
        name: string;
        role: string;
        image?: string;
    };
}

interface IStatsResponse {
    success: boolean;
    data?: ICustomerStats;
    message?: string;
}

interface IStatusStyle {
    bg: string;
    text: string;
    border: string;
}

// স্ট্যাটাস ভিত্তিক কালার কনফিগারেশন
const statusColorMap: Record<string, IStatusStyle> = {
    PENDING: { bg: "bg-[#f8b12c]/5", text: "text-[#f8b12c]", border: "border-[#f8b12c]/10" },
    CONFIRMED: { bg: "bg-[#1317fc]/5", text: "text-[#1317fc]", border: "border-[#1317fc]/10" },
    SHIPPED: { bg: "bg-[#ff18ba]/5", text: "text-[#ff18ba]", border: "border-[#ff18ba]/10" },
    DELIVERED: { bg: "bg-[#13dd6e]/5", text: "text-[#13dd6e]", border: "border-[#13dd6e]/10" },
    CANCELLED: { bg: "bg-[#f70606]/5", text: "text-[#f70606]", border: "border-[#f70606]/10" },
};

export default function CustomerOverview() {
    const [statsData, setStatsData] = useState<ICustomerStats | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                // casting the action response to our IStatsResponse type
                const result = await getCustomerStatsAction() as IStatsResponse;

                if (result?.success && result.data) {
                    setStatsData(result.data);
                } else {
                    toast.error(result?.message || "Failed to load statistics");
                }
            } catch (err) {
                toast.error("Dashboard synchronization failed");
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    if (loading) return (
        <div className="flex flex-col items-center justify-center h-[50vh] gap-4">
            <Loader2 className="animate-spin text-brand" size={40} />
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 italic">Syncing Stats...</p>
        </div>
    );

    return (
        <div className="space-y-8 px-2 md:px-0 animate-in fade-in slide-in-from-bottom-4 duration-700">

            {/* ১. ব্র্যান্ড থিম সামারি কার্ডস */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

                {/* Total Orders - Brand Color Box */}
                <div className="bg-brand p-8 rounded-[2.5rem] shadow-xl shadow-brand/20 group transition-all duration-300 hover:shadow-brand/30">
                    <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mb-6 border border-white/30">
                        <ShoppingBag size={28} className="text-white" />
                    </div>
                    <p className="text-[11px] font-black uppercase tracking-[0.2em] text-white/70 mb-1 italic">Total Orders</p>
                    <h4 className="text-5xl font-black italic text-white tracking-tighter">
                        {(statsData?.totalOrders || 0).toString().padStart(2, '0')}
                    </h4>
                </div>

                {/* Total Spent - Brand Style Light */}
                <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border-2 border-brand/10 shadow-xl shadow-slate-200/30 dark:shadow-none group transition-all duration-300">
                    <div className="w-14 h-14 bg-brand/10 rounded-2xl flex items-center justify-center mb-6 border border-brand/20">
                        <Wallet size={28} className="text-brand" />
                    </div>
                    <p className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1 italic">Total Investments</p>
                    <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-black text-brand italic">৳</span>
                        <h4 className="text-4xl md:text-5xl font-black italic text-slate-900 dark:text-white tracking-tighter">
                            {(statsData?.totalSpent || 0).toLocaleString()}
                        </h4>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                {/* ২. প্রোফাইল কার্ড */}
                <div className="lg:col-span-4">
                    <div className="bg-white dark:bg-slate-900 p-8 rounded-[3rem] border-2 border-brand/5 shadow-2xl text-center">
                        <div className="relative w-28 h-28 mx-auto mb-5">
                            <div className="w-full h-full bg-slate-50 dark:bg-slate-800 rounded-[2.5rem] flex items-center justify-center overflow-hidden border-4 border-white dark:border-slate-950 shadow-xl">
                                {statsData?.user?.image ? (
                                    <img src={statsData.user.image} alt="Profile" className="w-full h-full object-cover" />
                                ) : (
                                    <User size={48} className="text-slate-200" />
                                )}
                            </div>
                            <div className="absolute -bottom-1 -right-1 bg-brand text-white p-2 rounded-xl border-4 border-white dark:border-slate-950 shadow-lg">
                                <TrendingUp size={16} />
                            </div>
                        </div>

                        <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter">
                            {statsData?.user?.name || "Member Name"}
                        </h3>
                        <p className="text-[9px] text-brand font-black uppercase tracking-[0.2em] mt-2">
                            {statsData?.user?.role || "Customer"} Access
                        </p>

                        <Link href="/dashboard/my-orders" className="block mt-10">
                            <button className="w-full py-4 bg-slate-950 dark:bg-brand text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:bg-brand transition-all shadow-xl active:scale-95">
                                My Order History <ChevronRight size={14} />
                            </button>
                        </Link>
                    </div>
                </div>

                {/* ৩. স্ট্যাটাস ট্র্যাকার */}
                <div className="lg:col-span-8">
                    <div className="bg-white dark:bg-slate-900 p-8 md:p-10 rounded-[3rem] border-2 border-brand/5 shadow-2xl h-full">
                        <div className="flex items-center gap-4 mb-10">
                            <div className="w-1.5 h-8 bg-brand rounded-full" />
                            <h3 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter uppercase italic">Status Tracker</h3>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {statsData?.orderCountByStatus && Object.entries(statsData.orderCountByStatus).map(([status, count]) => {
                                const style = statusColorMap[status.toUpperCase()] || statusColorMap.PENDING;
                                return (
                                    <div key={status} className={`${style.bg} ${style.border} border-2 p-6 rounded-[1.8rem] flex items-center justify-between group transition-all`}>
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-white dark:bg-slate-800 shadow-sm border border-slate-100 dark:border-slate-700">
                                                <span className={`font-black text-xs ${style.text}`}>{status.charAt(0)}</span>
                                            </div>
                                            <span className={`font-black uppercase text-[11px] tracking-widest ${style.text} italic`}>{status}</span>
                                        </div>
                                        <span className={`text-3xl font-black italic tracking-tighter ${style.text}`}>
                                            {count.toString().padStart(2, '0')}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}