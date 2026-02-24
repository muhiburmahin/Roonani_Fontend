"use client";

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
    ChevronLeft, Truck, ShieldCheck,
    MapPin, Phone, User, ShoppingBag
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { RootState } from "@/src/store";
import { Button } from "@/src/components/ui/button";
import OrderSuccess from "./OrderSuccess";
import { createOrderAction } from "@/src/actions/order.action";
import { toast } from "sonner";
import { clearCart } from "@/src/store/slice/cartSlice";
import { CreateOrder } from "@/src/types/order.type"

const checkoutSchema = z.object({
    fullName: z.string().min(3, "Full name is required"),
    phone: z.string().min(11, "Valid phone number is required").max(14),
    address: z.string().min(10, "Detail address is required"),
    city: z.string().min(2, "City is required"),
    deliveryArea: z.enum(["inside", "outside"], {
        message: "Please select a delivery area"
    }),
});
type CheckoutFormValues = z.infer<typeof checkoutSchema>;

export default function CheckoutPage() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [orderId, setOrderId] = useState("");

    const dispatch = useDispatch();
    const cart = useSelector((state: RootState) => state.cart.items);

    const { register, handleSubmit, formState: { errors }, watch } = useForm<CheckoutFormValues>({
        resolver: zodResolver(checkoutSchema),
        defaultValues: {
            deliveryArea: "inside"
        }
    });

    const selectedArea = watch("deliveryArea");

    const subTotal = cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
    const shippingFee = selectedArea === "inside" ? 70 : 130;
    const total = subTotal + shippingFee;

    const onSubmit = async (data: CheckoutFormValues) => {
        if (cart.length === 0) {
            toast.error("Your cart is empty!");
            return;
        }

        setIsSubmitting(true);

        const orderPayload = {
            items: cart.map(item => ({
                productId: item.product.id, // নিশ্চিত করুন id বা _id সঠিক কিনা
                quantity: item.quantity,
                size: item.selectedSize,
            })),
            shippingAddress: `${data.address}, ${data.city}`,
            phone: data.phone,
            fullName: data.fullName,
            shippingFee: shippingFee,
            totalAmount: total
        };

        try {
            const result = await createOrderAction(orderPayload as unknown as CreateOrder);
            if (result?.data) {
                setOrderId(result.data.id || result.data.id);
                setIsSuccess(true);
                dispatch(clearCart());
                toast.success("Order placed successfully!");
            } else {
                toast.error("Failed to place order");
            }
        } catch (error) {
            console.error("Checkout Error:", error);
            toast.error("Something went wrong. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSuccess) {
        return <OrderSuccess orderId={orderId} />;
    }

    return (
        <div className="bg-[#FDF7F8] dark:bg-slate-950 min-h-screen pb-10 transition-colors">
            <div className="max-w-7xl mx-auto px-4 py-6 md:py-10">

                {/* Header */}
                <div className="mb-8">
                    <Link href="/cart" className="flex items-center gap-2 text-slate-400 hover:text-brand font-bold text-[10px] md:text-xs uppercase tracking-widest mb-3 transition-all">
                        <ChevronLeft size={14} /> Back to Cart
                    </Link>
                    <h1 className="text-3xl md:text-6xl font-black text-brand tracking-tighter">
                        Checkout
                    </h1>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-10">

                    {/* Left Side: Shipping & Delivery */}
                    <div className="lg:col-span-7 space-y-6 md:space-y-8">

                        {/* Shipping Section */}
                        <section className="bg-white dark:bg-slate-900 p-5 md:p-8 rounded-[1.5rem] md:rounded-[2.5rem] border border-white dark:border-slate-800 shadow-xl shadow-brand/5">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-8 h-8 md:w-10 md:h-10 bg-brand/10 rounded-lg md:rounded-xl flex items-center justify-center">
                                    <MapPin className="text-brand" size={18} />
                                </div>
                                <h2 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white">Shipping Details</h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Full Name</label>
                                    <div className="relative">
                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                                        <input {...register("fullName")} className="w-full bg-slate-50 dark:bg-slate-950 border-none rounded-xl md:rounded-2xl py-3 md:py-4 pl-12 pr-4 focus:ring-2 focus:ring-brand outline-none text-sm" placeholder="Your full name" />
                                    </div>
                                    {errors.fullName && <p className="text-red-500 text-[9px] font-bold ml-2 uppercase">{errors.fullName.message}</p>}
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Phone Number</label>
                                    <div className="relative">
                                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                                        <input {...register("phone")} className="w-full bg-slate-50 dark:bg-slate-950 border-none rounded-xl md:rounded-2xl py-3 md:py-4 pl-12 pr-4 focus:ring-2 focus:ring-brand outline-none text-sm" placeholder="01XXXXXXXXX" />
                                    </div>
                                    {errors.phone && <p className="text-red-500 text-[9px] font-bold ml-2 uppercase">{errors.phone.message}</p>}
                                </div>

                                <div className="md:col-span-2 space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Full Address</label>
                                    <textarea {...register("address")} rows={2} className="w-full bg-slate-50 dark:bg-slate-950 border-none rounded-xl md:rounded-2xl p-4 focus:ring-2 focus:ring-brand outline-none text-sm" placeholder="House no, Road no, Area..." />
                                    {errors.address && <p className="text-red-500 text-[9px] font-bold ml-2 uppercase">{errors.address.message}</p>}
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">City</label>
                                    <input {...register("city")} className="w-full bg-slate-50 dark:bg-slate-950 border-none rounded-xl md:rounded-2xl py-3 md:py-4 px-6 focus:ring-2 focus:ring-brand outline-none text-sm" placeholder="Your City" />
                                    {errors.city && <p className="text-red-500 text-[9px] font-bold ml-2 uppercase">{errors.city.message}</p>}
                                </div>
                            </div>
                        </section>

                        {/* Shipping Method Section */}
                        <section className="bg-white dark:bg-slate-900 p-5 md:p-8 rounded-[1.5rem] md:rounded-[2.5rem] border border-white dark:border-slate-800 shadow-xl shadow-brand/5">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-8 h-8 md:w-10 md:h-10 bg-brand/10 rounded-lg md:rounded-xl flex items-center justify-center">
                                    <Truck className="text-brand" size={18} />
                                </div>
                                <h2 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white">Shipping Charge</h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                                <label className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${selectedArea === 'inside' ? 'border-brand bg-brand/5' : 'border-slate-50 dark:border-slate-800'}`}>
                                    <div className="flex flex-col">
                                        <span className={`font-black text-xs md:text-sm ${selectedArea === 'inside' ? 'text-brand' : 'text-slate-600'}`}>Inside Dhaka</span>
                                        <span className="text-[10px] text-slate-400">Delivery in 2-3 days</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="font-black text-sm md:text-base text-slate-900 dark:text-white">৳70</span>
                                        <input type="radio" value="inside" {...register("deliveryArea")} className="w-4 h-4 accent-brand" />
                                    </div>
                                </label>

                                <label className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${selectedArea === 'outside' ? 'border-brand bg-brand/5' : 'border-slate-50 dark:border-slate-800'}`}>
                                    <div className="flex flex-col">
                                        <span className={`font-black text-xs md:text-sm ${selectedArea === 'outside' ? 'text-brand' : 'text-slate-600'}`}>Outside Dhaka</span>
                                        <span className="text-[10px] text-slate-400">Delivery in 3-5 days</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="font-black text-sm md:text-base text-slate-900 dark:text-white">৳130</span>
                                        <input type="radio" value="outside" {...register("deliveryArea")} className="w-4 h-4 accent-brand" />
                                    </div>
                                </label>
                            </div>
                        </section>
                    </div>

                    {/* Right Side: Order Summary */}
                    <div className="lg:col-span-5">
                        <div className="bg-white dark:bg-slate-900 p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] border border-white dark:border-slate-800 shadow-2xl shadow-brand/10 lg:sticky lg:top-10">
                            <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white mb-6 md:mb-8 flex items-center gap-3">
                                <ShoppingBag className="text-brand" size={24} /> Your Order
                            </h2>

                            <div className="max-h-48 md:max-h-60 overflow-y-auto mb-6 pr-1 space-y-3 custom-scrollbar">
                                {cart.map((item, idx) => (
                                    <div key={idx} className="flex items-center gap-3 bg-slate-50 dark:bg-slate-950 p-2 md:p-3 rounded-xl">
                                        <div className="relative w-12 h-12 bg-white rounded-lg overflow-hidden shrink-0">
                                            <Image src={item.product.images[0]} alt="" fill className="object-contain p-1" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="font-bold text-slate-900 dark:text-white text-[10px] md:text-xs truncate">{item.product.name}</h4>
                                            <p className="text-[9px] font-black text-brand uppercase">{item.selectedSize} × {item.quantity}</p>
                                        </div>
                                        <div className="font-black text-slate-900 dark:text-white text-xs md:text-sm">
                                            ৳{(item.product.price * item.quantity).toLocaleString()}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-3 md:space-y-4 pt-5 border-t border-slate-100 dark:border-slate-800">
                                <div className="flex justify-between font-bold text-slate-400">
                                    <span className="text-[10px] uppercase tracking-widest">Subtotal</span>
                                    <span className="text-slate-900 dark:text-slate-100 font-black text-xs md:text-sm">৳{subTotal.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between font-bold text-slate-400">
                                    <span className="text-[10px] uppercase tracking-widest">Shipping</span>
                                    <span className="text-slate-900 dark:text-slate-100 font-black text-xs md:text-sm">৳{shippingFee}</span>
                                </div>

                                <div className="flex justify-between pt-4">
                                    <div className="flex flex-col">
                                        <span className="text-slate-400 font-black uppercase text-[9px] tracking-widest">Total Payable</span>
                                        <div className="text-3xl md:text-5xl font-black text-brand tracking-tighter">
                                            ৳{total.toLocaleString()}
                                        </div>
                                    </div>
                                </div>

                                {/* Order Placement Button */}
                                <Button
                                    disabled={isSubmitting || cart.length === 0}
                                    type="submit"
                                    className="w-full h-16 md:h-20 bg-brand hover:bg-brand/90 text-white rounded-2xl md:rounded-[1.8rem] text-xl md:text-2xl font-black flex items-center justify-center gap-3 shadow-xl shadow-brand/30 mt-6 active:scale-95 transition-all"
                                >
                                    {isSubmitting ? "Processing..." : "Confirm Order"}
                                    {!isSubmitting && <ShieldCheck size={24} />}
                                </Button>

                                <div className="flex items-center justify-center gap-2 mt-4 text-slate-400">
                                    <Truck size={14} />
                                    <p className="text-[9px] font-bold uppercase tracking-widest">
                                        Payment Method: Cash on Delivery
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
