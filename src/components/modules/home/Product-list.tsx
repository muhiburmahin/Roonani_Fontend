"use client";

import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Product } from "@/src/types";
import { MOCK_PRODUCTS } from "@/src/data/product";
import ProductCard from "../shared/ProductCard";

export default function ProductList() {
    const displayedProducts: Product[] = MOCK_PRODUCTS.slice(0, 12);

    return (
        <section className="py-24 bg-white dark:bg-slate-950 transition-colors duration-300 overflow-hidden">
            <div className="container mx-auto px-6 md:px-12 relative">

                <div className="absolute top-0 right-0 -translate-y-1/2 w-96 h-96 bg-brand/5 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 translate-y-1/2 w-96 h-96 bg-brand/10 rounded-full blur-3xl" />

                {/* Header Section */}
                <div className="flex flex-col items-center text-center mb-20 space-y-5 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="flex items-center gap-2 px-5 py-2 text-[11px] font-black tracking-[0.3em] text-brand uppercase bg-brand/10 rounded-full border border-brand/20"
                    >
                        <Sparkles className="w-3.5 h-3.5" />
                        Our Curated Collection
                    </motion.div>

                    <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white leading-tight tracking-tight">
                        <span className="text-brand">All-CATEGORY</span>
                    </h2>

                    <div className="flex items-center gap-3">
                        <div className="h-1.5 w-12 bg-brand rounded-full" />
                        <div className="h-1.5 w-24 bg-brand/20 rounded-full" />
                        <div className="h-1.5 w-12 bg-brand rounded-full" />
                    </div>

                    <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto pt-2 font-medium text-lg leading-relaxed">
                        Experience the perfect blend of tradition and elegance with our signature <span className="text-slate-800 dark:text-slate-200 font-bold">Panjabis</span> and <span className="text-slate-800 dark:text-slate-200 font-bold">Perfumes</span>.
                    </p>
                </div>

                {/* Grid Section - Responsive Columns */}
                <div className="relative z-10">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
                        {displayedProducts.length > 0 ? (
                            displayedProducts.map((product, index) => (
                                <motion.div
                                    key={product.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                >
                                    <ProductCard product={product} />
                                </motion.div>
                            ))
                        ) : (
                            <div className="col-span-full py-20 text-center border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-[3rem]">
                                <p className="text-slate-400 font-bold italic text-lg">Latest collections coming soon...</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Bottom CTA Section */}
                <div className="mt-24 flex flex-col items-center space-y-8 relative z-10">
                    <div className="h-px w-full max-w-md bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-800 to-transparent" />

                    <Link
                        href="/shop"
                        className="group relative flex items-center gap-5 bg-brand text-white px-12 py-6 rounded-[2rem] font-black shadow-[0_20px_40px_-10px_rgba(var(--brand-rgb),0.4)] hover:scale-105 hover:-translate-y-1.5 transition-all duration-500 overflow-hidden"
                    >
                        {/* Shine Effect */}
                        <div className="absolute inset-0 w-1/2 h-full bg-white/20 -skew-x-12 -translate-x-full group-hover:animate-[shine_0.75s_infinite]" />

                        <span className="text-xl tracking-tight">Explore Full Store</span>
                        <div className="bg-white/20 p-2 rounded-xl group-hover:bg-white/30 transition-all">
                            <ArrowRight className="w-6 h-6 transition-transform group-hover:translate-x-1" />
                        </div>
                    </Link>

                    <div className="flex flex-col items-center gap-3">
                        <p className="text-slate-400 dark:text-slate-500 text-sm font-bold uppercase tracking-[0.2em]">
                            New Styles Added Weekly
                        </p>
                        <div className="flex -space-x-4">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="w-12 h-12 rounded-full border-4 border-white dark:border-slate-950 bg-slate-100 flex items-center justify-center overflow-hidden">
                                    <img src={`https://i.pravatar.cc/150?u=${i}`} alt="user" className="w-full h-full object-cover opacity-80" />
                                </div>
                            ))}
                            <div className="w-12 h-12 rounded-full border-4 border-white dark:border-slate-950 bg-brand text-white text-xs flex items-center justify-center font-black z-10">
                                500+
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}