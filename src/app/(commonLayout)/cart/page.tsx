"use client";

import { useEffect, useState } from 'react';
import CartPage from "@/src/components/modules/order/cart/cartPage";

export default function Cart() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setMounted(true);
        }, 0);
        return () => clearTimeout(timer);
    }, []);

    if (!mounted) return null;

    return (
        <main className="w-full min-h-screen">
            <CartPage />
        </main>
    );
}