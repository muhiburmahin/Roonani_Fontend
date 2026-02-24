"use client";
import Footer from "@/src/components/layout/Footer";
import { Navbar } from "@/src/components/layout/Navbar";
import { RootState, store } from "@/src/store";
import { hydrateCart } from "@/src/store/slice/cartSlice";
import { loadCartFromStorage, saveCartToStorage } from "@/src/utils/cartStorage";
import { useEffect, useState } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";

function CartSync() {
    const dispatch = useDispatch();
    const cartItems = useSelector((state: RootState) => state.cart.items);
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        const savedCart = loadCartFromStorage();
        if (savedCart.length > 0) {
            dispatch(hydrateCart(savedCart));
        }
        setIsInitialized(true);
    }, [dispatch]);

    useEffect(() => {
        if (isInitialized) {
            saveCartToStorage(cartItems);
        }
    }, [cartItems, isInitialized]);

    return null;
}

export default function CommonLayout({ children }: { children: React.ReactNode }) {
    return (
        <Provider store={store}>
            <CartSync />
            <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
                <Navbar />
                <main className="pb-20">
                    {children}
                </main>
                <Footer />
            </div>
        </Provider>
    );
}