"use client";

import { User, Phone, ShieldCheck, Fingerprint, Globe, LogOut, LayoutDashboard } from "lucide-react";
import { useRouter } from "next/navigation"; // নেভিগেশনের জন্য
import { toast } from "sonner"; // নোটিফিকেশনের জন্য (যদি প্রজেক্টে থাকে)

interface AdminProfileProps {
    user: {
        name?: string;
        phone?: string;
        image?: string;
        role?: string;
    } | null;
}

export default function AdminProfile({ user }: AdminProfileProps) {
    const router = useRouter();

    const handleLogout = async () => {
        try {

            toast.success("Logged out successfully");
            router.push("/login");
        } catch (error) {
            toast.error("Logout failed");
        }
    };

    const handleDashboardRedirect = () => {
        router.push("/admin-dashboard");
    };

    return (
        <div className="max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-1000">

            <div className="relative h-60 rounded-[4rem] bg-gradient-to-tr from-brand via-brand/90 to-rose-500 shadow-2xl overflow-hidden mb-[-8rem] z-0">
                <div className="absolute inset-0 opacity-15 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-full text-center">
                    <h1 className="text-white/20 text-7xl font-black uppercase tracking-[1em] select-none">ADMIN</h1>
                </div>
            </div>

            <div className="relative z-10 px-4 md:px-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                    {/* প্রোফাইল কার্ড */}
                    <div className="lg:col-span-5">
                        <div className="bg-white dark:bg-slate-900 p-10 rounded-[4.5rem] shadow-[0_40px_80px_-15px_rgba(0,0,0,0.1)] border-b-8 border-brand/20 dark:border-brand/5 text-center transition-all hover:shadow-brand/10">
                            <div className="relative inline-block">
                                <div className="w-48 h-48 bg-slate-50 dark:bg-slate-800 rounded-[4rem] border-8 border-white dark:border-slate-900 flex items-center justify-center overflow-hidden shadow-2xl ring-2 ring-brand/10">
                                    {user?.image ? (
                                        <img src={user.image} alt="Profile" className="w-full h-full object-cover shadow-inner" />
                                    ) : (
                                        <User size={90} className="text-brand/30" />
                                    )}
                                </div>
                                <div className="absolute -bottom-2 -right-2 bg-emerald-500 p-3 rounded-2xl border-4 border-white dark:border-slate-900 shadow-lg animate-bounce">
                                    <ShieldCheck size={24} className="text-white" />
                                </div>
                            </div>

                            <div className="mt-8 space-y-2">
                                <p className="text-[10px] font-black text-brand bg-brand/5 px-6 py-2 rounded-full inline-block uppercase tracking-[0.4em] border border-brand/10 mb-2">
                                    {user?.role || "System Admin"}
                                </p>
                                <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter italic uppercase truncate">
                                    {user?.name || "Login User"}
                                </h2>
                            </div>

                            <div className="mt-10 pt-10 border-t border-slate-50 dark:border-slate-800 flex justify-around">
                                <div className="text-center">
                                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Status</p>
                                    <p className="text-xs font-bold text-emerald-500 uppercase mt-1">Live Online</p>
                                </div>
                                <div className="w-px h-10 bg-slate-100 dark:bg-slate-800" />
                                <div className="text-center">
                                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Access</p>
                                    <p className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mt-1">Unlimited</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* তথ্য সেকশন */}
                    <div className="lg:col-span-7 space-y-6 lg:pt-24">
                        <div className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-2xl p-8 md:p-12 rounded-[4rem] shadow-2xl border-2 border-brand/5">

                            <div className="flex items-center gap-4 mb-12">
                                <div className="p-4 bg-brand rounded-3xl shadow-xl shadow-brand/30">
                                    <Fingerprint size={28} className="text-white" />
                                </div>
                                <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter italic uppercase">Admin Identification</h3>
                            </div>

                            <div className="space-y-8">
                                <div className="relative group">
                                    <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-1.5 h-0 group-hover:h-12 bg-brand rounded-full transition-all duration-500" />
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-2 ml-2">Official Name</p>
                                    <div className="bg-slate-50 dark:bg-slate-950 p-6 rounded-3xl border border-transparent hover:border-brand/20 transition-all flex items-center gap-5">
                                        <div className="p-3 bg-white dark:bg-slate-800 rounded-2xl shadow-sm text-brand">
                                            <User size={20} />
                                        </div>
                                        <span className="text-lg font-bold text-slate-700 dark:text-slate-200">{user?.name}</span>
                                    </div>
                                </div>

                                <div className="relative group">
                                    <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-1.5 h-0 group-hover:h-12 bg-brand rounded-full transition-all duration-500" />
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-2 ml-2">Secure Line</p>
                                    <div className="bg-slate-50 dark:bg-slate-950 p-6 rounded-3xl border border-transparent hover:border-brand/20 transition-all flex items-center gap-5">
                                        <div className="p-3 bg-white dark:bg-slate-800 rounded-2xl shadow-sm text-brand">
                                            <Phone size={20} />
                                        </div>
                                        <span className="text-lg font-bold text-slate-700 dark:text-slate-200">{user?.phone || "N/A"}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-12 p-8 bg-brand/5 dark:bg-brand/10 rounded-[3rem] border border-brand/10 flex items-center gap-6">
                                <Globe size={40} className="text-brand opacity-40 shrink-0" />
                                <p className="text-[11px] font-bold text-slate-500 dark:text-slate-400 leading-relaxed italic">
                                    This profile is currently secured and verified. Contact system administrator for any changes to this account.
                                </p>
                            </div>

                            {/* বাটন অ্যাকশন অ্যাড করা হয়েছে */}
                            <div className="mt-12 flex flex-wrap gap-4 justify-end">
                                <button
                                    onClick={handleLogout}
                                    className="px-8 py-4 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-rose-500 hover:text-white transition-all flex items-center gap-3 group active:scale-95"
                                >
                                    <LogOut size={16} className="group-hover:-translate-x-1 transition-transform" />
                                    Logout
                                </button>
                                <button
                                    onClick={handleDashboardRedirect}
                                    className="px-8 py-4 bg-brand text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-brand/20 hover:scale-105 transition-all flex items-center gap-3 active:scale-95"
                                >
                                    <LayoutDashboard size={16} />
                                    Dashboard
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}