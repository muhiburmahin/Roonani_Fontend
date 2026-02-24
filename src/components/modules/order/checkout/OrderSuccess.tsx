"use client";

import { ArrowRight, PackageCheck } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import Link from "next/link";
import Confetti from 'react-confetti';
import { useEffect, useState } from "react";

export default function OrderSuccess({ orderId = "RH-7860" }: { orderId?: string }) {
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

    useEffect(() => {
        // Set dimensions only on client-side to avoid hydration mismatch
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setDimensions({
            width: window.innerWidth,
            height: window.innerHeight
        });

        const handleResize = () => {
            setDimensions({
                width: window.innerWidth,
                height: window.innerHeight
            });
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 relative overflow-hidden bg-[#FDF7F8] dark:bg-slate-950">
            {/* Confetti with dynamic size */}
            <Confetti
                width={dimensions.width}
                height={dimensions.height}
                numberOfPieces={150}
                recycle={false}
                colors={['#E599A7', '#FDF7F8', '#1A1A1A']}
            />

            <div className="bg-white dark:bg-slate-900 p-10 md:p-16 rounded-[3.5rem] shadow-2xl shadow-brand/10 border border-brand/5 text-center max-w-2xl w-full relative z-10">
                <div className="w-24 h-24 bg-brand/10 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
                    <PackageCheck className="text-brand" size={48} />
                </div>

                <h2 className="text-4xl md:text-5xl font-black text-brand tracking-tighter mb-4">
                    Order Successful!
                </h2>

                <p className="text-slate-500 dark:text-slate-400 font-bold text-lg mb-8">
                    Thank you! Your order has been placed successfully.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Link href="/dashboard/orders">
                        <Button className="w-full h-16 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-white rounded-2xl font-black flex items-center justify-center gap-2 transition-all">
                            Track Order
                        </Button>
                    </Link>

                    <Link href="/shop">
                        <Button className="w-full h-16 bg-brand hover:bg-brand/90 text-white rounded-2xl font-black flex items-center justify-center gap-2 shadow-lg shadow-brand/20 transition-all">
                            Continue Shopping <ArrowRight size={20} />
                        </Button>
                    </Link>
                </div>

                <p className="mt-10 text-[10px] font-black uppercase tracking-[0.3em] text-slate-300 dark:text-slate-600">
                    A confirmation email has been sent to you.
                </p>
            </div>
        </div>
    );
}