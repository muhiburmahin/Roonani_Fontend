"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { Lock, Phone, Eye, EyeOff, Loader2, LogIn } from "lucide-react";
import { authClient } from "@/src/lib/auth-client";

export default function LoginForm() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const form = useForm({
        defaultValues: { phone: "", password: "" },
        onSubmit: async ({ value }) => {
            const cleanPhone = value.phone.replace(/\D/g, ''); 
            const shadowEmail = `${cleanPhone}@roohani.local`; 

            setLoading(true);
            try {
                console.log("🔐 Attempting login with email:", shadowEmail);
                
                const { error, data } = await authClient.signIn.email({
                    email: shadowEmail,
                    password: value.password,
                });

                if (error) {
                    console.error("❌ Login error:", error);
                    toast.error(error.message || "Invalid login credentials");
                    setLoading(false);
                    return;
                }

                const user = data?.user;
                console.log("✅ Sign-in response received, user:", user);

                if (!user) {
                    console.error("❌ No user in sign-in response");
                    toast.error("Failed to establish session");
                    setLoading(false);
                    return;
                }

                // Wait a moment for session/cookies to be set
                console.log("⏳ Waiting for session to establish...");
                await new Promise(resolve => setTimeout(resolve, 500));

                // Try to verify session is established
                let session = null;
                try {
                    session = await authClient.getSession();
                    console.log("✅ Session verified:", session);
                } catch (sessionError) {
                    console.warn("⚠️ getSession failed, but proceeding with user data:", sessionError);
                }

                // Determine redirect path based on role
                const userRole = (user as any).role?.toUpperCase() || "CUSTOMER";
                const redirectPath = userRole === "ADMIN" ? "/admin-dashboard" : "/dashboard";
                
                console.log(`🚀 Redirecting ${user.email} (${userRole}) to ${redirectPath}`);
                toast.success("Welcome back!");
                
                // Use router.push for proper Next.js navigation
                router.push(redirectPath);
                
            } catch (error) {
                console.error("❌ Unexpected login error:", error);
                toast.error("An unexpected error occurred");
                setLoading(false);
            }
        }
    });

    return (
        <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-2xl w-full max-w-md mx-auto transition-all border-t-8 border-brand">
            <div className="text-center mb-8">
                <div className="flex items-center justify-center gap-3">
                    <div className="relative w-20 h-20 rounded-full overflow-hidden mb-2">
                        <Image
                            src="/logo.png"
                            alt="Roohani Logo"
                            fill
                            className="object-contain"
                            priority
                        />
                    </div>
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
                        <span className="text-brand italic">roohani</span>
                    </h2>
                </div>
                <p className="text-[10px] font-bold text-slate-400 mt-2 uppercase tracking-[0.2em]">
                    Secure Customer Login
                </p>
            </div>

            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    form.handleSubmit();
                }}
                className="space-y-5"
            >
                <form.Field name="phone">
                    {(field) => (
                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-black text-slate-600 dark:text-slate-400 ml-1 flex items-center gap-1 uppercase tracking-wider">
                                <Phone size={14} className="text-brand" /> Phone Number
                            </label>
                            <input
                                type="tel"
                                value={field.state.value}
                                onChange={(e) => field.handleChange(e.target.value)}
                                className="w-full p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 focus:ring-2 focus:ring-brand outline-none transition-all"
                                placeholder="01XXXXXXXXX"
                                required
                            />
                        </div>
                    )}
                </form.Field>

                <form.Field name="password">
                    {(field) => (
                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-black text-slate-600 dark:text-slate-400 ml-1 flex items-center gap-1 uppercase tracking-wider">
                                <Lock size={14} className="text-brand" /> Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={field.state.value}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                    className="w-full p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 focus:ring-2 focus:ring-brand outline-none transition-all"
                                    placeholder="Enter your password"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-brand"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>
                    )}
                </form.Field>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-brand text-white p-4 rounded-2xl font-black text-lg shadow-lg hover:opacity-90 active:scale-95 disabled:opacity-70 transition-all flex justify-center items-center gap-2 mt-4"
                >
                    {loading ? (
                        <Loader2 className="animate-spin" size={20} />
                    ) : (
                        <> <LogIn size={20} /> LOGIN NOW </>
                    )}
                </button>
            </form>

            <p className="text-center text-sm text-slate-500 mt-8 font-medium">
                Not a member? <Link href="/register" className="text-brand font-bold hover:underline">Register here</Link>
            </p>
        </div>
    );
}