"use client";

import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Category, Product } from "@/src/types";
import { useRouter, useSearchParams } from "next/navigation";
import ProductCard from "../shared/ProductCard";

interface ProductListProps {
    products: Product[];
    categories: Category[];
}

export default function ProductList({ products, categories }: ProductListProps) {
    const router = useRouter();
    const searchParams = useSearchParams();

    // URL থেকে বর্তমান ক্যাটাগরি আইডি নেওয়া
    const activeCategory = searchParams.get("category");

    // ক্যাটাগরি পরিবর্তনের ফাংশন
    const handleCategoryChange = (id: string | null): void => {
        const params = new URLSearchParams(searchParams.toString());
        if (id) {
            params.set("category", id);
        } else {
            params.delete("category");
        }
        router.push(`/?${params.toString()}`, { scroll: false });
    };

    return (
        <section className="py-24 bg-white dark:bg-slate-950 transition-colors duration-300 overflow-hidden">
            <div className="container mx-auto px-6 md:px-12 relative">

                {/* Decorative Background Blobs */}
                <div className="absolute top-0 right-0 -translate-y-1/2 w-96 h-96 bg-brand/5 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 translate-y-1/2 w-96 h-96 bg-brand/10 rounded-full blur-3xl" />

                {/* Header Section */}
                <div className="flex flex-col items-center text-center mb-16 space-y-5 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-2 px-5 py-2 text-[11px] font-black tracking-[0.3em] text-brand uppercase bg-brand/10 rounded-full border border-brand/20"
                    >
                        <Sparkles className="w-3.5 h-3.5" />
                        Our Curated Collection
                    </motion.div>

                    <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white leading-tight">
                        <span className="text-brand uppercase">
                            {activeCategory
                                ? categories.find((c: Category) => (c.id === activeCategory || c._id === activeCategory))?.name
                                : "Featured Products"}
                        </span>
                    </h2>

                    {/* ক্যাটাগরি ট্যাব */}
                    <div className="flex flex-wrap justify-center gap-3 mt-8">
                        <button
                            onClick={() => handleCategoryChange(null)}
                            className={`px-6 py-2 rounded-full text-xs font-bold transition-all duration-300 ${!activeCategory
                                ? "bg-brand text-white shadow-lg scale-105"
                                : "bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-brand/10"
                                }`}
                        >
                            ALL
                        </button>
                        {categories.map((cat: Category) => {
                            const catId = cat.id || cat._id;
                            if (!catId) return null;

                            return (
                                <button
                                    key={catId}
                                    onClick={() => handleCategoryChange(catId)}
                                    className={`px-6 py-2 rounded-full text-xs font-bold uppercase transition-all duration-300 ${activeCategory === catId
                                        ? "bg-brand text-white shadow-lg scale-105"
                                        : "bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-brand/10"
                                        }`}
                                >
                                    {cat.name}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Product Grid */}
                <div className="relative z-10">
                    <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        <AnimatePresence mode="popLayout">
                            {products.length > 0 ? (
                                products.slice(0, 10).map((product: Product, index: number) => (
                                    <motion.div
                                        key={product.id || product.id || index}
                                        layout
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        transition={{ duration: 0.3, delay: index * 0.05 }}
                                    >
                                        <ProductCard product={product} />
                                    </motion.div>
                                ))
                            ) : (
                                <div className="col-span-full py-20 text-center border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-[2rem]">
                                    <p className="text-slate-400 font-medium text-lg">No products found in this category.</p>
                                </div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </div>

                {/* View All Button */}
                <div className="mt-20 flex justify-center relative z-10">
                    <Link
                        href="/shop"
                        className="group flex items-center gap-4 bg-slate-900 dark:bg-brand text-white px-10 py-5 rounded-2xl font-bold shadow-xl hover:scale-105 transition-all"
                    >
                        <span>View Full Store</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>
        </section>
    );
}