"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { Lock, Phone, User, Eye, EyeOff, Loader2, UserPlus } from "lucide-react";
import { useRouter } from "next/navigation";
import { authClient } from "@/src/lib/auth-client";

export function RegisterForm() {
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const form = useForm({
        defaultValues: {
            name: "",
            phone: "",
            password: ""
        },
        onSubmit: async ({ value }) => {
            const cleanPhone = value.phone.replace(/\D/g, '');

            if (cleanPhone.length < 10) {
                toast.error("Please enter a valid phone number");
                return;
            }

            if (value.password.length < 8) {
                toast.error("Password must be at least 8 characters");
                return;
            }

            setLoading(true);
            try {
                const shadowEmail = `${cleanPhone}@roohani.local`;

                // signUp.email মেথড ব্যবহার করে ডাটা পাঠানো
                const { error } = await authClient.signUp.email({
                    email: shadowEmail,
                    password: value.password,
                    name: value.name,
                    username: cleanPhone, // অতিরিক্ত ফিল্ড
                    phone: cleanPhone,    // অতিরিক্ত ফিল্ড
                    callbackURL: "/",
                } as any);

                if (error) {
                    toast.error(error.message || "Registration failed");
                    console.error("Auth Error:", error);
                } else {
                    toast.success("Account created successfully!");
                    router.push("/");
                    router.refresh();
                }
            } catch (err) {
                toast.error("An unexpected error occurred");
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
    });

    return (
        <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-2xl border-t-8 border-brand w-full max-w-lg mx-auto transition-all">
            <div className="text-center mb-8">
                <div className="flex items-center justify-center gap-3">
                    <div className="relative w-20 h-20 rounded-full overflow-hidden mb-2">
                        <Image src="/logo.png" alt="Logo" fill className="object-contain" priority />
                    </div>
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
                        <span className="text-brand italic">roohani</span>
                    </h2>
                </div>
                <p className="text-[10px] font-bold text-slate-400 mt-4 uppercase tracking-[0.2em]">Create New Account</p>
            </div>

            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    form.handleSubmit();
                }}
                className="space-y-5"
            >
                {/* Name Field */}
                <form.Field name="name">
                    {(field) => (
                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-black text-slate-600 dark:text-slate-400 ml-1 flex items-center gap-1 uppercase tracking-wider">
                                <User size={14} className="text-brand" /> Full Name
                            </label>
                            <input
                                value={field.state.value}
                                onChange={(e) => field.handleChange(e.target.value)}
                                className="w-full p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 outline-none focus:ring-2 focus:ring-brand transition-all"
                                placeholder="Enter your full name"
                                required
                            />
                        </div>
                    )}
                </form.Field>

                {/* Phone Field */}
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
                                className="w-full p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 outline-none focus:ring-2 focus:ring-brand transition-all"
                                placeholder="017XXXXXXXX"
                                required
                            />
                        </div>
                    )}
                </form.Field>

                {/* Password Field */}
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
                                    className="w-full p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 outline-none focus:ring-2 focus:ring-brand transition-all"
                                    placeholder="Minimum 8 characters"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-brand transition-colors"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>
                    )}
                </form.Field>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-brand text-white p-4 rounded-2xl font-black text-lg shadow-lg active:scale-95 disabled:opacity-70 disabled:active:scale-100 transition-all flex justify-center items-center gap-2 mt-4"
                >
                    {loading ? (
                        <>
                            <Loader2 className="animate-spin" size={20} />
                            PROCESSING...
                        </>
                    ) : (
                        <>
                            <UserPlus size={20} />
                            REGISTER NOW
                        </>
                    )}
                </button>
            </form>

            <p className="text-center text-sm text-slate-600 dark:text-slate-400 mt-8 font-medium">
                Already have an account?{" "}
                <Link href="/login" className="text-brand font-bold hover:underline">
                    Login here
                </Link>
            </p>
        </div>
    );
}