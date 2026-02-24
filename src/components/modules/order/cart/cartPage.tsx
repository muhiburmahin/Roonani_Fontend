"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Minus, Plus, Trash2, ShoppingBag, ReceiptText, ArrowRight, ShieldCheck, ChevronLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { AppDispatch, RootState } from "@/src/store";
import { addToCart, removeFromCart, removeOneFromCart } from "@/src/store/slice/cartSlice";
import { Button } from "@/src/components/ui/button";

export default function CartPage() {
    const [mounted, setMounted] = useState(false);
    const dispatch = useDispatch<AppDispatch>();

    const rawCart = useSelector((state: RootState) => state.cart.items || []);
    const cart = rawCart.filter(item => item?.product?.id);

    useEffect(() => {
        setMounted(true);
    }, []);

    const totalItemsCount = cart.reduce((acc, item) => acc + (item?.quantity || 0), 0);
    const subTotal = cart.reduce((acc, item) => acc + ((item?.product?.price || 0) * (item?.quantity || 0)), 0);

    if (!mounted) return null;

    if (cart.length === 0) {
        return (
            <div className="min-h-[70vh] flex flex-col items-center justify-center bg-[#FDF7F8] dark:bg-slate-950 px-4 text-center">
                <div className="w-24 h-24 bg-white dark:bg-slate-900 rounded-full flex items-center justify-center mb-6 shadow-xl shadow-brand/5">
                    <ShoppingBag className="w-12 h-12 text-brand" />
                </div>
                <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Your cart is empty</h2>
                <Link href="/shop">
                    <Button className="bg-brand text-white rounded-full px-10 h-12 font-bold mt-4 shadow-lg shadow-brand/20">
                        Explore Shop
                    </Button>
                </Link>
            </div>
        );
    }

    return (
        /* ডার্ক মোড ব্যাকগ্রাউন্ড অ্যাড করা হয়েছে */
        <div className="bg-[#FDF7F8] dark:bg-slate-950 min-h-screen pb-20 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
                    <div>
                        <h1 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white tracking-tighter leading-none">
                            <span className="text-brand">My Cart</span>
                        </h1>
                        <p className="text-brand/60 font-black mt-3 flex items-center gap-2 text-sm uppercase tracking-[0.2em]">
                            <span className="w-2 h-2 bg-brand rounded-full animate-pulse" />
                            {totalItemsCount} items ready for checkout
                        </p>
                    </div>
                    <Link href="/shop" className="group flex items-center gap-2 text-slate-400 dark:text-slate-500 font-bold text-xs uppercase tracking-widest hover:text-brand transition-colors">
                        <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                        Continue Shopping
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

                    {/* Left: Items List */}
                    <div className="lg:col-span-8 space-y-4">
                        {cart.map((item, idx) => {
                            const isSizeVariant = item.product.variantType === 'SIZE';

                            return (
                                <div
                                    key={`${item.product.id}-${item.selectedSize}-${idx}`}
                                    className="flex items-center gap-3 md:gap-6 p-3 md:p-5 bg-white/80 dark:bg-slate-900/50 backdrop-blur-sm rounded-[2rem] border border-white dark:border-slate-800 shadow-sm hover:shadow-xl hover:shadow-brand/5 transition-all"
                                >

                                    <div className="flex items-center gap-4 flex-[2.5] min-w-0">
                                        <div className="relative w-20 h-20 md:w-28 md:h-28 bg-[#FDF7F8] dark:bg-slate-800 rounded-[1.5rem] overflow-hidden shrink-0 border border-brand/5">
                                            <Image
                                                src={item.product.images?.[0] || "/placeholder.png"}
                                                alt={item.product.name}
                                                fill
                                                className="object-contain p-2 md:p-4"
                                            />
                                        </div>
                                        <div className="min-w-0">
                                            <h3 className="font-black text-slate-900 dark:text-white text-sm md:text-xl truncate tracking-tight">
                                                {item.product.name}
                                            </h3>
                                            <div className="mt-1 inline-flex items-center px-3 py-0.5 rounded-full bg-brand/5 dark:bg-brand/10 border border-brand/10">
                                                <span className="text-[10px] md:text-xs font-black text-brand uppercase">
                                                    {isSizeVariant ? 'Size' : 'Vol'}: {item.selectedSize}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* ২. মাঝখানে: প্লাস মাইনাস বাটন */}
                                    <div className="flex items-center gap-1.5 md:gap-3 bg-white dark:bg-slate-800 p-1 md:p-1.5 rounded-full border border-slate-100 dark:border-slate-700 shadow-sm shrink-0">
                                        <button
                                            onClick={() => dispatch(removeOneFromCart(item))}
                                            className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full bg-slate-50 dark:bg-slate-900 text-slate-400 hover:text-brand transition-all active:scale-90"
                                        >
                                            <Minus size={14} />
                                        </button>
                                        <span className="font-black text-sm md:text-lg text-slate-900 dark:text-white min-w-[20px] text-center">
                                            {item.quantity}
                                        </span>
                                        <button
                                            onClick={() => dispatch(addToCart({ ...item, quantity: 1 }))}
                                            className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full bg-brand text-white shadow-lg shadow-brand/20 transition-all active:scale-90"
                                        >
                                            <Plus size={14} />
                                        </button>
                                    </div>

                                    {/* ৩. ডান সাইড: টোটাল এমাউন্ট এবং ডিলিট */}
                                    <div className="flex flex-col items-end justify-between self-stretch flex-1 shrink-0 py-1">
                                        <button
                                            onClick={() => dispatch(removeFromCart(item))}
                                            className="text-slate-300 dark:text-slate-600 hover:text-red-500 transition-colors p-1 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                        <div className="text-base md:text-2xl font-black text-brand tracking-tighter">
                                            ৳{(item.product.price * item.quantity).toLocaleString()}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Right: Summary */}
                    <div className="lg:col-span-4">
                        <div className="bg-white dark:bg-slate-900 p-8 md:p-10 rounded-[3rem] border border-white dark:border-slate-800 shadow-2xl shadow-brand/10 lg:sticky lg:top-24">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-12 h-12 bg-brand/10 rounded-2xl flex items-center justify-center">
                                    <ReceiptText className="text-brand" size={24} />
                                </div>
                                <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Order Info</h2>
                            </div>

                            <div className="space-y-5">
                                <div className="flex justify-between font-bold text-slate-400 dark:text-slate-500">
                                    <span className="text-sm uppercase tracking-widest">Subtotal</span>
                                    <span className="text-slate-900 dark:text-slate-100">৳{subTotal.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between font-bold text-slate-400 dark:text-slate-500">
                                    <span className="text-sm uppercase tracking-widest">Delivery</span>
                                    <span className="text-brand text-[10px] font-black underline decoration-brand/20 underline-offset-4">TBD AT CHECKOUT</span>
                                </div>

                                <div className="h-px bg-slate-100 dark:bg-slate-800 my-6" />

                                <div className="flex flex-col gap-2 mb-8">
                                    <span className="text-slate-400 dark:text-slate-500 font-black uppercase text-[10px] tracking-[0.3em]">Total Payable</span>
                                    <div className="text-5xl md:text-6xl font-black text-brand tracking-tighter">
                                        ৳{subTotal.toLocaleString()}
                                    </div>
                                </div>

                                <Link href="/checkout" className="block group">
                                    <Button className="w-full h-20 bg-brand hover:bg-brand/90 text-white rounded-[1.8rem] text-2xl font-black flex items-center justify-center gap-4 shadow-xl shadow-brand/30 transition-all active:scale-95">
                                        Checkout <ArrowRight className="group-hover:translate-x-2 transition-transform" size={28} />
                                    </Button>
                                </Link>

                                <div className="mt-8 flex items-center justify-center gap-2 py-4 bg-[#FDF7F8] dark:bg-slate-950 rounded-2xl border border-brand/5 dark:border-brand/10">
                                    <ShieldCheck size={16} className="text-brand" />
                                    <span className="text-[10px] font-black uppercase tracking-widest text-brand/60">100% Secure Checkout</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}