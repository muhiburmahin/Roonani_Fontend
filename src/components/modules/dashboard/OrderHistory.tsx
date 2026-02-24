"use client";

import { useState, useEffect } from "react";
import { getCustomerStatsAction } from "@/src/actions/user.action";
import { Package, Loader2, ShoppingBag, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

interface Order {
    id: string;
    createdAt: string | Date;
    totalAmount: number;
    status: string;
    _count?: {
        items: number;
    };
}

const statusStyles: Record<string, string> = {
    PENDING: "border-[#f8b12c] text-[#f8b12c] bg-[#f8b12c]/10",
    CONFIRMED: "border-[#1317fc] text-[#1317fc] bg-[#1317fc]/10",
    SHIPPED: "border-[#ff18ba] text-[#ff18ba] bg-[#ff18ba]/10",
    DELIVERED: "border-[#13dd6e] text-[#13dd6e] bg-[#13dd6e]/10",
    CANCELLED: "border-[#f70606] text-[#f70606] bg-[#f70606]/10",
};

export default function OrderHistory() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    // Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    const ordersPerPage = 5;

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const res = await getCustomerStatsAction();
                if (res?.success) {
                    setOrders(res.data?.recentOrders || []);
                }
            } catch (error) {
                console.error("Order fetch error:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchHistory();
    }, []);

    // Pagination Logic
    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);
    const totalPages = Math.ceil(orders.length / ordersPerPage);

    if (loading) return (
        <div className="flex flex-col items-center justify-center p-20 gap-4">
            <Loader2 className="animate-spin text-brand" size={40} />
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Loading History...</p>
        </div>
    );

    return (
        <div className="space-y-6 px-2 md:px-0">
            <div className="space-y-4">
                {currentOrders.length > 0 ? (
                    currentOrders.map((order) => {
                        const itemCount = order._count?.items ?? 0;

                        return (
                            <Link key={order.id} href={`/dashboard/my-orders/${order.id}`} className="block group">
                                <div className="flex flex-col md:flex-row md:items-center gap-4 p-5 md:p-6 bg-white dark:bg-slate-950 rounded-[2rem] md:rounded-[2.5rem] border-2 border-brand/5 hover:border-brand/20 transition-all shadow-sm">

                                    {/* ১. আইডি ও ডেট (Row বরাবর) */}
                                    <div className="flex items-center gap-4 flex-[1.5]">
                                        <div className="w-12 h-12 bg-brand/5 rounded-2xl flex items-center justify-center text-brand group-hover:bg-brand group-hover:text-white transition-colors">
                                            <Package size={22} />
                                        </div>
                                        <div className="flex flex-row items-center gap-3 md:gap-4 flex-wrap">
                                            <h4 className="font-black text-slate-900 dark:text-white text-sm md:text-base uppercase italic tracking-tighter leading-none">
                                                #{order.id.slice(-6).toUpperCase()}
                                            </h4>
                                            <div className="h-4 w-[1px] bg-slate-200 dark:bg-slate-800 hidden sm:block" />
                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">
                                                {new Date(order.createdAt).toLocaleDateString('en-GB', {
                                                    day: '2-digit', month: 'short', year: 'numeric'
                                                })}
                                            </p>
                                        </div>
                                    </div>

                                    {/* কন্টেন্ট লেআউট */}
                                    <div className="flex flex-row items-center justify-between md:contents pt-3 md:pt-0 border-t md:border-t-0 border-slate-50 dark:border-slate-900">

                                        {/* ২. আইটেম কাউন্ট */}
                                        <div className="md:flex-1 md:text-center">
                                            <span className="font-black text-[9px] md:text-xs uppercase px-4 py-1.5 rounded-xl bg-brand/10 text-brand border border-brand/20 italic">
                                                {itemCount} {itemCount === 1 ? "Item" : "Items"}
                                            </span>
                                        </div>

                                        {/* ৩. প্রাইস */}
                                        <div className="md:flex-1 md:text-center">
                                            <p className="font-black text-slate-900 dark:text-white text-lg md:text-xl tracking-tighter italic">
                                                ৳{order.totalAmount?.toLocaleString()}
                                            </p>
                                        </div>

                                        {/* ৪. স্ট্যাটাস ব্যাজ */}
                                        <div className="md:flex-1 text-right md:text-center">
                                            <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase border-2 tracking-widest inline-flex items-center gap-1.5 ${statusStyles[order.status] || "bg-slate-100"}`}>
                                                <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                                                {order.status}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        );
                    })
                ) : (
                    <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-[3rem] border-2 border-dashed border-brand/10">
                        <ShoppingBag className="mx-auto text-slate-200 mb-4" size={50} />
                        <h3 className="text-xl font-black text-slate-300 uppercase italic">No History Found</h3>
                    </div>
                )}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="flex items-center justify-center gap-4 mt-8 pb-4">
                    <button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="p-2 rounded-xl border-2 border-brand/10 text-slate-400 disabled:opacity-30 hover:bg-brand/5 hover:text-brand transition-all"
                    >
                        <ChevronLeft size={20} />
                    </button>

                    <div className="flex gap-2">
                        {[...Array(totalPages)].map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrentPage(i + 1)}
                                className={`w-10 h-10 rounded-xl font-black text-xs transition-all border-2 ${currentPage === i + 1
                                        ? "bg-brand border-brand text-white shadow-lg shadow-brand/20"
                                        : "bg-white dark:bg-slate-900 border-brand/5 text-slate-400 hover:border-brand/20"
                                    }`}
                            >
                                {i + 1}
                            </button>
                        ))}
                    </div>

                    <button
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="p-2 rounded-xl border-2 border-brand/10 text-slate-400 disabled:opacity-30 hover:bg-brand/5 hover:text-brand transition-all"
                    >
                        <ChevronRight size={20} />
                    </button>
                </div>
            )}
        </div>
    );
}