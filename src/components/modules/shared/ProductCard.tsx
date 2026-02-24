"use client";

import { useState } from "react";
import Image from "next/image";
import { Product } from "@/src/types";
import { Button } from "@/src/components/ui/button";
import { ShoppingCart, Check, Info, Tag } from "lucide-react";
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch } from "react-redux";
import { addToCart } from "@/src/store/slice/cartSlice";
import Link from "next/link";
import { toast } from "sonner";
import { AppDispatch } from "@/src/store";

export default function ProductCard({ product }: { product: Product }) {
    const dispatch = useDispatch<AppDispatch>();

    const [selectedAttr, setSelectedAttr] = useState<string>(product.sizes?.[0] || "");

    const isSizeVariant = product.variantType === 'SIZE';
    const categoryName = product.category?.name || "Premium";

    const currentPrice = product.variantPrices?.[selectedAttr] || product.basePrice || 0;

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        const cartItem = {
            product: {
                ...product,
                price: currentPrice,
                createdAt: product.createdAt instanceof Date
                    ? product.createdAt.toISOString()
                    : product.createdAt,
                updatedAt: product.updatedAt instanceof Date
                    ? product.updatedAt.toISOString()
                    : product.updatedAt,
            },
            quantity: 1,
            selectedSize: selectedAttr,
        };

        dispatch(addToCart(cartItem));
        toast.success(`Added to Cart`, {
            description: `${product.name} (${selectedAttr})`,
            icon: <Check className="h-4 w-4 text-brand" />,
            className: "bg-white dark:bg-slate-900 dark:text-white border-brand/20 shadow-2xl",
        });
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group relative bg-white dark:bg-slate-900 rounded-[2rem] p-3 border border-slate-100 dark:border-slate-800 hover:border-brand/40 dark:hover:border-brand/40 transition-all duration-500 shadow-sm hover:shadow-2xl hover:shadow-brand/10"
        >
            {/* Image Section */}
            <Link href={`/product/${product.id}`}>
                <div className="relative h-60 w-full rounded-[1.5rem] bg-slate-50 dark:bg-slate-800/50 overflow-hidden">
                    <Image
                        src={product.images?.[0] || "/placeholder.png"}
                        alt={product.name}
                        fill
                        className="object-contain p-6 group-hover:scale-110 transition-transform duration-700 ease-in-out"
                    />

                    {/* ডায়নামিক ক্যাটাগরি লেবেল */}
                    <div className="absolute top-3 left-3 flex gap-1">
                        <span className="flex items-center gap-1 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md text-brand text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-lg border border-brand/10 shadow-sm">
                            <Tag className="w-2.5 h-2.5" />
                            {categoryName}
                        </span>
                    </div>
                </div>
            </Link>

            {/* Content Section */}
            <div className="mt-4 px-1">
                <Link href={`/product/${product.id}`}>
                    <h3 className="font-bold text-slate-800 dark:text-slate-100 line-clamp-1 text-lg tracking-tight group-hover:text-brand transition-colors">
                        {product.name}
                    </h3>
                </Link>

                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 mt-1 mb-3 leading-relaxed">
                    {product.description || "Experience the essence of quality craftsmanship."}
                </p>

                <div className="mt-3">
                    {/* ডায়নামিক সিলেকশন টেক্সট */}
                    <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2 flex items-center gap-1">
                        <Info className="w-3 h-3" />
                        {isSizeVariant ? "Select Size" : "Select Volume"}
                    </p>

                    <div className="flex flex-wrap gap-1.5">
                        {product.sizes && product.sizes.length > 0 ? (
                            product.sizes.map((attr: string) => (
                                <button
                                    key={attr}
                                    onClick={() => setSelectedAttr(attr)}
                                    className={`h-7 min-w-[38px] px-2 text-[10px] font-bold rounded-md border transition-all duration-300 ${selectedAttr === attr
                                            ? "bg-brand border-brand text-white shadow-md shadow-brand/20"
                                            : "bg-transparent border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:border-brand/50"
                                        }`}
                                >
                                    {attr}
                                </button>
                            ))
                        ) : (
                            <span className="text-[10px] text-slate-400 italic">Standard Size</span>
                        )}
                    </div>
                </div>

                {/* Bottom Row */}
                <div className="flex items-center justify-between mt-5 pt-3 border-t border-slate-50 dark:border-slate-800">
                    <div className="flex flex-col">
                        <AnimatePresence mode="wait">
                            <motion.span
                                key={currentPrice}
                                initial={{ opacity: 0, x: -5 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="text-xl font-black text-slate-900 dark:text-white"
                            >
                                ৳{currentPrice.toLocaleString()}
                            </motion.span>
                        </AnimatePresence>
                    </div>

                    <Button
                        onClick={handleAddToCart}
                        size="sm"
                        disabled={!selectedAttr && product.sizes?.length > 0}
                        className="rounded-xl bg-brand hover:bg-brand-dark dark:hover:bg-brand/80 text-white h-9 px-4 shadow-lg shadow-brand/20 border-none transition-all hover:scale-105 active:scale-95 group/btn"
                    >
                        <ShoppingCart className="w-4 h-4 mr-1.5 group-hover/btn:rotate-12 transition-transform" />
                        <span className="text-xs font-bold uppercase tracking-wider">Add</span>
                    </Button>
                </div>
            </div>
        </motion.div>
    );
}