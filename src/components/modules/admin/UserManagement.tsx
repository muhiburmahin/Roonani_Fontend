"use client";

import { useState, useEffect, useMemo } from "react";
import { Users, ShieldCheck, Search, UserCog, Loader2, Phone, Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { getAllUsersAction } from "@/src/actions/user.action";
import { toast } from "sonner";

interface IUser {
    id: string;
    name: string;
    phone: string;
    role: string;
    createdAt: string;
    image?: string;
}

export default function UserManagement() {
    const router = useRouter();
    const [allUsers, setAllUsers] = useState<IUser[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    // Pagination States
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const result = await getAllUsersAction();
                if (result.success) {
                    setAllUsers(result.data);
                }
            } catch (err) {
                toast.error("Failed to fetch users");
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

    // Search Logic (Active Search)
    const filteredUsers = useMemo(() => {
        return allUsers.filter(user =>
            user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.phone?.includes(searchTerm)
        );
    }, [searchTerm, allUsers]);

    // Pagination Logic
    const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentData = filteredUsers.slice(startIndex, startIndex + itemsPerPage);

    useEffect(() => {
        setCurrentPage(1); // সার্চ করলে পেজিনেশন ১ নম্বর পেজে ফিরে যাবে
    }, [searchTerm]);

    if (loading) return (
        <div className="flex flex-col items-center justify-center h-80 gap-4">
            <div className="relative">
                <Loader2 className="animate-spin text-brand" size={40} />
                <div className="absolute inset-0 blur-xl bg-brand/20 animate-pulse" />
            </div>
            <p className="text-xs font-black uppercase tracking-[0.3em] text-slate-400">Loading Registry...</p>
        </div>
    );

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">

            <div className="relative max-w-md group">
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                    <Search className="text-brand group-focus-within:scale-110 transition-transform" size={20} />
                </div>
                <input
                    type="text"
                    placeholder="Search name or phone number..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-[2rem] py-4 pl-14 pr-6 focus:ring-4 focus:ring-brand/10 focus:border-brand outline-none font-bold text-slate-700 dark:text-slate-200 transition-all shadow-lg shadow-brand/5"
                />
            </div>

            {/* ইউজার টেবিল */}
            <div className="bg-white dark:bg-slate-950 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-2xl shadow-brand/5 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-brand/5 dark:bg-brand/10 border-b border-brand/10">
                                <th className="p-7 text-[11px] font-black uppercase tracking-[0.2em] text-brand">Member Profile</th>
                                <th className="p-7 text-[11px] font-black uppercase tracking-[0.2em] text-brand">Secure Line</th>
                                <th className="p-7 text-[11px] font-black uppercase tracking-[0.2em] text-brand text-center">Identity</th>
                                <th className="p-7 text-[11px] font-black uppercase tracking-[0.2em] text-brand text-right">Registration</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50 dark:divide-slate-900">
                            {currentData.length > 0 ? (
                                currentData.map((user) => (
                                    <tr
                                        key={user.id}
                                        onClick={() => router.push(`/admin-dashboard/users/${user.id}`)}
                                        className="group hover:bg-brand/[0.02] dark:hover:bg-brand/[0.05] transition-all cursor-pointer"
                                    >
                                        <td className="p-6">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand to-rose-400 p-0.5 shadow-lg group-hover:rotate-6 transition-transform">
                                                    <div className="w-full h-full bg-white dark:bg-slate-800 rounded-[14px] flex items-center justify-center overflow-hidden">
                                                        {user.image ? <img src={user.image} className="w-full h-full object-cover" /> : <Users className="text-brand/40" size={20} />}
                                                    </div>
                                                </div>
                                                <span className="font-black text-slate-900 dark:text-white text-base uppercase tracking-tighter italic group-hover:text-brand transition-colors">
                                                    {user.name}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="p-6">
                                            <div className="inline-flex items-center gap-2.5 px-4 py-2 bg-slate-50 dark:bg-slate-900 rounded-full border border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-300 font-black text-xs">
                                                <Phone size={14} className="text-brand" fill="currentColor" fillOpacity={0.2} />
                                                {user.phone || "No Contact"}
                                            </div>
                                        </td>
                                        <td className="p-6 text-center">
                                            <span className={`inline-flex items-center gap-2 px-5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm ${user.role === 'ADMIN'
                                                ? 'bg-brand text-white'
                                                : 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'
                                                }`}>
                                                {user.role === 'ADMIN' ? <ShieldCheck size={12} /> : <UserCog size={12} />}
                                                {user.role}
                                            </span>
                                        </td>
                                        <td className="p-6 text-right">
                                            <div className="inline-flex items-center gap-2 text-slate-400 font-bold text-[11px] uppercase tracking-tighter">
                                                <Calendar size={14} className="text-brand/40" />
                                                {new Date(user.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={4} className="p-20 text-center">
                                        <p className="font-black text-slate-300 uppercase tracking-[0.5em] text-xs">No matching users found</p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* পেজিনেশন কন্ট্রোল */}
                {totalPages > 1 && (
                    <div className="p-6 bg-slate-50/50 dark:bg-slate-900/50 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                            Showing <span className="text-brand">{startIndex + 1}</span> to <span className="text-brand">{Math.min(startIndex + itemsPerPage, filteredUsers.length)}</span> of {filteredUsers.length}
                        </p>
                        <div className="flex gap-2">
                            <button
                                onClick={(e) => { e.stopPropagation(); setCurrentPage(prev => Math.max(prev - 1, 1)); }}
                                disabled={currentPage === 1}
                                className="p-3 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 disabled:opacity-30 hover:border-brand transition-all shadow-sm"
                            >
                                <ChevronLeft size={18} className="text-slate-600 dark:text-slate-300" />
                            </button>
                            <button
                                onClick={(e) => { e.stopPropagation(); setCurrentPage(prev => Math.min(prev + 1, totalPages)); }}
                                disabled={currentPage === totalPages}
                                className="p-3 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 disabled:opacity-30 hover:border-brand transition-all shadow-sm"
                            >
                                <ChevronRight size={18} className="text-slate-600 dark:text-slate-300" />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}