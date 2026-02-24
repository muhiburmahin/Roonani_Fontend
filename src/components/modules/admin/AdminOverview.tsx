"use client";

import {
    LayoutGrid, ShoppingBag, Users, Package,
    TrendingUp, Activity, DollarSign, Wallet,
    ArrowUpRight, Sparkles
} from "lucide-react";
import { IDashboardStats } from "@/src/types/stats.type";
import {
    PieChart, Pie, Cell, ResponsiveContainer,
    Tooltip
} from "recharts";

interface AdminOverviewProps {
    stats: IDashboardStats | null;
}

export default function AdminOverview({ stats }: AdminOverviewProps) {
    const displayStats = [
        { label: "Categories", value: stats?.category?.total || 0, icon: LayoutGrid, color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-500/10", glow: "group-hover:shadow-blue-500/20" },
        { label: "Total Products", value: stats?.product?.total || 0, icon: Package, color: "text-[#E8939B]", bg: "bg-[#FDF8F9] dark:bg-[#E8939B]/10", glow: "group-hover:shadow-rose-500/20" },
        { label: "Total Orders", value: stats?.order?.totalOrders || 0, icon: ShoppingBag, color: "text-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-500/10", glow: "group-hover:shadow-emerald-500/20" },
        { label: "Customers", value: stats?.user?.customer || 0, icon: Users, color: "text-amber-500", bg: "bg-amber-50 dark:bg-amber-500/10", glow: "group-hover:shadow-amber-500/20" },
    ];

    const stockData = [
        { name: "In Stock", value: stats?.product?.total || 0, color: "#E8939B" },
        { name: "Low Stock", value: 0, color: "#6366F1" },
        { name: "Out of Stock", value: 0, color: "#F43F5E" },
    ];

    const orderDistribution = [
        { name: "Pending", value: stats?.order?.pending || 0, color: "#f8b12c" },
        { name: "Confirmed", value: stats?.order?.confirmed || 0, color: "#1317fc" },
        { name: "Shipped", value: stats?.order?.shipped || 0, color: "#ff18ba" },
        { name: "Delivered", value: stats?.order?.delivered || 0, color: "#13dd6e" },
        { name: "Cancelled", value: stats?.order?.cancelled || 0, color: "#f70606" },
    ].filter(item => item.value >= 0);

    const CustomTooltip = ({ active, payload }: any) => {
        if (active && payload && payload.length) {
            const data = payload[0].payload;
            return (
                <div className="bg-white/80 dark:bg-slate-900/90 backdrop-blur-md p-4 rounded-2xl shadow-2xl border border-white/20 dark:border-slate-800 animate-in zoom-in-95 duration-300">
                    <p className="text-[10px] font-black uppercase text-slate-400 dark:text-slate-500 mb-1 tracking-widest">{data.name}</p>
                    <p className="text-xl font-black italic text-slate-900 dark:text-white leading-none">
                        {data.value} <span className="text-[#E8939B] text-xs ml-1">Units</span>
                    </p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-1000 p-2 md:p-4">

            {/* --- Title Section --- */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 relative">
                <div className="space-y-3">
                    <div className="inline-flex items-center gap-2 bg-[#FDF8F9] dark:bg-[#E8939B]/5 px-4 py-1.5 rounded-full border border-[#E8939B]/10">
                        <Sparkles size={14} className="text-[#E8939B] animate-pulse" />
                        <span className="text-[10px] font-black text-[#E8939B] uppercase tracking-[0.2em]">System Status: Optimal</span>
                    </div>
                    <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-slate-900 dark:text-white uppercase italic leading-[0.8] mb-2">
                        Command <span className="text-[#E8939B] relative">Center
                            <span className="absolute -bottom-2 left-0 w-full h-2 bg-[#E8939B]/10 -skew-x-12"></span>
                        </span>
                    </h2>
                </div>

                <div className="bg-slate-950 dark:bg-slate-900 text-white px-8 py-5 rounded-[2.5rem] shadow-2xl relative overflow-hidden group hover:scale-105 transition-transform duration-500 border border-white/5">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#E8939B]/10 rounded-full -mr-16 -mt-16 blur-3xl"></div>
                    <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.3em] mb-1">Global Sentiment</p>
                    <p className="text-2xl font-black italic flex items-center gap-2">
                        +24.8% <TrendingUp size={20} className="text-emerald-400 animate-bounce" />
                    </p>
                </div>
            </div>

            {/* --- Stats Grid --- */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {displayStats.map((stat, i) => (
                    <div key={i} className={`group bg-white dark:bg-slate-950 p-8 rounded-[3rem] border border-slate-100 dark:border-slate-900 shadow-xl shadow-slate-200/40 dark:shadow-none hover:shadow-2xl ${stat.glow} transition-all duration-500 cursor-pointer relative overflow-hidden`}>
                        <div className="absolute -right-4 -top-4 w-24 h-24 bg-slate-50 dark:bg-white/5 rounded-full scale-0 group-hover:scale-100 transition-transform duration-700 opacity-50"></div>

                        <div className="flex justify-between items-start mb-8 relative z-10">
                            <div className={`${stat.bg} ${stat.color} p-4 rounded-[1.5rem] group-hover:rotate-[15deg] transition-all duration-500 shadow-sm`}>
                                <stat.icon size={26} strokeWidth={2.5} />
                            </div>
                            <div className="bg-slate-50 dark:bg-slate-900 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all">
                                <ArrowUpRight size={18} className="text-slate-400" />
                            </div>
                        </div>

                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 mb-1 relative z-10">{stat.label}</p>
                        <h3 className="text-5xl font-black text-slate-900 dark:text-white italic tracking-tighter relative z-10 group-hover:scale-105 transition-transform origin-left">
                            {stat.value}
                        </h3>
                    </div>
                ))}
            </div>

            {/* --- Charts Section --- */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Stock Status */}
                <div className="bg-white dark:bg-slate-950 p-10 rounded-[4rem] border border-slate-100 dark:border-slate-900 shadow-xl shadow-slate-200/50 dark:shadow-none">
                    <div className="flex items-center justify-between mb-10">
                        <h4 className="text-[13px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 italic">Inventory Flow</h4>
                        <div className="p-3 bg-rose-50 dark:bg-[#E8939B]/10 rounded-2xl"><Package size={18} className="text-[#E8939B]" /></div>
                    </div>

                    <div className="h-[250px] w-full relative group">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={stockData}
                                    innerRadius={75}
                                    outerRadius={95}
                                    paddingAngle={8}
                                    dataKey="value"
                                    stroke="none"
                                >
                                    {stockData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} className="hover:opacity-80 transition-opacity cursor-pointer" />
                                    ))}
                                </Pie>
                                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'transparent' }} />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                            <span className="text-[10px] font-black text-slate-300 dark:text-slate-700 uppercase">Live</span>
                            <span className="text-3xl font-black italic text-slate-900 dark:text-white">Stock</span>
                        </div>
                    </div>
                </div>

                {/* Order Lifecycle */}
                <div className="bg-white dark:bg-slate-950 p-10 rounded-[4rem] border border-slate-100 dark:border-slate-900 shadow-xl shadow-slate-200/50 dark:shadow-none">
                    <div className="flex items-center justify-between mb-10">
                        <h4 className="text-[13px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 italic">Order Lifecycle</h4>
                        <div className="flex h-2 w-2 relative">
                            <span className="animate-ping absolute h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative rounded-full h-2 w-2 bg-emerald-500"></span>
                        </div>
                    </div>

                    <div className="relative h-[250px] flex items-center justify-center">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={orderDistribution}
                                    innerRadius={85}
                                    outerRadius={100}
                                    dataKey="value"
                                    stroke="none"
                                    paddingAngle={3}
                                >
                                    {orderDistribution.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip content={<CustomTooltip />} />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="absolute text-center">
                            <h5 className="text-5xl font-black italic text-slate-900 dark:text-white tracking-tighter leading-none">{stats?.order?.totalOrders || 0}</h5>
                            <p className="text-[8px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-widest mt-1">Total Volume</p>
                        </div>
                    </div>
                </div>

                {/* Revenue Card (Full Mood Dark) */}
                <div className="bg-slate-950 dark:bg-black p-10 rounded-[4rem] text-white flex flex-col justify-between shadow-3xl relative overflow-hidden border border-slate-800 dark:border-[#E8939B]/20">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#E8939B]/5 rounded-full blur-[80px]"></div>

                    <div className="flex items-center justify-between relative z-10">
                        <div className="bg-white/5 backdrop-blur-xl p-5 rounded-[2rem] border border-white/10">
                            <Wallet className="text-[#E8939B]" size={32} />
                        </div>
                        <div className="text-right">
                            <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.3em] mb-1">Vault Status</p>
                            <span className="bg-emerald-500/10 text-emerald-500 text-[10px] font-black px-3 py-1 rounded-full border border-emerald-500/20">
                                +12% GROWTH
                            </span>
                        </div>
                    </div>

                    <div className="my-12 relative z-10">
                        <p className="text-[11px] font-black text-[#E8939B] uppercase tracking-[0.5em] mb-4 flex items-center gap-2">
                            <span className="w-8 h-[1px] bg-[#E8939B]/30"></span> Net Revenue Flow
                        </p>
                        <h3 className="text-6xl font-black italic tracking-tighter leading-none text-white">
                            ৳{stats?.order?.totalRevenue?.toLocaleString() || 0}
                        </h3>
                    </div>

                    <div className="space-y-4 relative z-10">
                        <div className="group bg-white/5 hover:bg-white/10 transition-colors p-5 rounded-[2.5rem] border border-white/5 flex items-center justify-between cursor-pointer">
                            <div className="flex items-center gap-4">
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Delivered Net</span>
                            </div>
                            <span className="font-black italic text-white group-hover:text-emerald-400 transition-colors">৳{stats?.order?.deliveredAmount?.toLocaleString() || 0}</span>
                        </div>

                        <button className="w-full bg-[#E8939B] hover:bg-white hover:text-slate-950 transition-all duration-500 py-5 rounded-[2.5rem] flex items-center justify-center gap-3 shadow-xl shadow-rose-500/20 active:scale-95">
                            <span className="font-black uppercase text-[11px] tracking-[0.2em] text-white group-hover:text-black">Financial Report</span>
                            <DollarSign size={18} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}