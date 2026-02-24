"use client";

import { User, Phone, MapPin, ShieldCheck, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { getMyProfileAction } from "@/src/actions/user.action";
import { toast } from "sonner";

// প্রোফাইল ডাটার টাইপ
interface IUserProfile {
    name: string;
    email: string;
    phone?: string;
    city?: string;
    address?: string;
    image?: string;
    role: string;
    createdAt?: string;
}

export default function MyProfile() {
    const [profile, setProfile] = useState<IUserProfile | null>(null);
    const [fetching, setFetching] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const result = await getMyProfileAction();
                if (result) {
                    setProfile(result.data);
                } else {
                    toast.error("Failed to load profile");
                }
            } catch (err) {
                toast.error("An error occurred while fetching profile");
            } finally {
                setFetching(false);
            }
        };
        fetchProfile();
    }, []);

    // লোডিং স্টেট
    if (fetching) return (
        <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
            <Loader2 className="animate-spin text-brand" size={40} />
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 italic">
                Fetching Your Data...
            </p>
        </div>
    );

    return (
        <div className="max-w-4xl animate-in fade-in slide-in-from-bottom-5 duration-700">
            {/* পেজ টাইটেল */}
            <div className="mb-8 ml-4">
                <h2 className="text-4xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter">
                    My <span className="text-brand">Profile</span>
                </h2>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Identity & Information</p>
            </div>

            <div className="bg-white dark:bg-slate-900 p-8 md:p-12 rounded-[3.5rem] border-2 border-brand/5 shadow-2xl shadow-brand/10 relative overflow-hidden">

                {/* প্রোফাইল হেডার */}
                <div className="flex flex-col md:flex-row items-center gap-8 mb-12 pb-12 border-b-2 border-brand/5">
                    <div className="relative group">
                        <div className="w-36 h-36 bg-gradient-to-tr from-brand to-brand/40 rounded-[2.8rem] flex items-center justify-center overflow-hidden border-4 border-white dark:border-slate-800 shadow-2xl group-hover:scale-105 transition-all duration-500">
                            {profile?.image ? (
                                <img src={profile.image} alt="Profile" className="w-full h-full object-cover" />
                            ) : (
                                <User size={64} className="text-white" />
                            )}
                        </div>
                    </div>

                    <div className="text-center md:text-left">
                        <div className="flex items-center gap-2 justify-center md:justify-start">
                            <h3 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">
                                {profile?.name || "Customer"}
                            </h3>
                            <div className="bg-brand/10 p-1.5 rounded-full">
                                <ShieldCheck size={20} className="text-brand" />
                            </div>
                        </div>
                        <p className="text-slate-400 font-bold text-sm mt-1 uppercase tracking-widest">
                            {profile?.role || "Verified"} Member since {profile?.createdAt ? new Date(profile.createdAt).getFullYear() : '2025'}
                        </p>
                    </div>
                </div>

                {/* ইনফরমেশন গ্রিড */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                    {/* Full Name */}
                    <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-brand ml-2">Full Name</label>
                        <div className="relative group">
                            <User className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
                            <input
                                type="text"
                                readOnly
                                value={profile?.name || "N/A"}
                                className="w-full bg-slate-50 dark:bg-slate-950 border-2 border-transparent rounded-2xl py-5 pl-14 pr-6 font-bold text-slate-700 dark:text-slate-200 outline-none cursor-default shadow-sm"
                            />
                        </div>
                    </div>

                    {/* Phone Number */}
                    <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-brand ml-2">Phone Number</label>
                        <div className="relative group">
                            <Phone className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
                            <input
                                type="text"
                                readOnly
                                value={profile?.phone || "Not Provided"}
                                className="w-full bg-slate-50 dark:bg-slate-950 border-2 border-transparent rounded-2xl py-5 pl-14 pr-6 font-bold text-slate-700 dark:text-slate-200 outline-none cursor-default shadow-sm"
                            />
                        </div>
                    </div>

                    {/* City */}
                    <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-brand ml-2">City</label>
                        <div className="relative group">
                            <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
                            <input
                                type="text"
                                readOnly
                                value={profile?.city || "Not Provided"}
                                className="w-full bg-slate-50 dark:bg-slate-950 border-2 border-transparent rounded-2xl py-5 pl-14 pr-6 font-bold text-slate-700 dark:text-slate-200 outline-none cursor-default shadow-sm"
                            />
                        </div>
                    </div>

                    {/* Full Address */}
                    <div className="space-y-3 md:col-span-2">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-brand ml-2">Full Address</label>
                        <div className="relative group">
                            <MapPin className="absolute left-5 top-6 text-slate-300" size={20} />
                            <textarea
                                rows={4}
                                readOnly
                                value={profile?.address || "No address found in records."}
                                className="w-full bg-slate-50 dark:bg-slate-950 border-2 border-transparent rounded-[2.5rem] py-5 pl-14 pr-6 font-bold text-slate-700 dark:text-slate-200 outline-none cursor-default shadow-sm resize-none"
                            />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}