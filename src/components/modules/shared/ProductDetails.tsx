"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
    ShoppingCart, ArrowLeft, Star,
    Check, Heart, Layers, Zap, Award
} from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { useDispatch } from "react-redux";
import { addToCart } from "@/src/store/slice/cartSlice";
import Link from "next/link";
import { toast } from "sonner";
import { motion, AnimatePresence } from 'framer-motion';
import { AppDispatch } from "@/src/store";
import { Product } from "@/src/types";

export default function ProductDetails({ product }: { product: Product }) {
    const dispatch = useDispatch<AppDispatch>();

    const productSizes = product?.sizes || [];

    // State initialization with optional chaining
    const [selectedAttr, setSelectedAttr] = useState<string>("");
    const [activeImg, setActiveImg] = useState<string>("/placeholder.png");
    const [isWishlisted, setIsWishlisted] = useState(false);

    useEffect(() => {
        if (productSizes.length > 0) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setSelectedAttr(productSizes[0]);
        }
        if (product?.images && product.images.length > 0) {
            setActiveImg(product.images[0]);
        }
    }, [product]);

    const isPanjabi = product?.variantType === 'SIZE';

    // সেফলি প্রাইস বের করা
    const currentPrice = (product?.variantPrices && selectedAttr)
        ? (product.variantPrices[selectedAttr] || product?.basePrice)
        : (product?.basePrice || 0);

    const handleAddToCart = () => {
        if (!product) return;

        const cartItem = {
            product: { ...product, price: currentPrice },
            quantity: 1,
            selectedSize: selectedAttr,
        };
        dispatch(addToCart(cartItem));

        toast.success(`Added to Shopping Bag`, {
            description: `${product.name} ${selectedAttr ? `(${selectedAttr})` : ''} is ready.`,
            icon: <Check className="h-4 w-4 text-brand" />,
            className: "bg-white dark:bg-slate-900 border-brand/20 shadow-2xl",
        });
    };

    if (!product) return <div className="text-center py-20">Product not found</div>;

    return (
        <div className="min-h-screen bg-[#fafafa] dark:bg-[#050505] py-12 transition-colors duration-500">
            <div className="container mx-auto px-4 md:px-12">

                {/* Back Link */}
                <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
                    <Link href="/shop" className="inline-flex items-center text-slate-400 hover:text-brand mb-10 font-bold tracking-tight transition-all group">
                        <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
                        Explore Collection
                    </Link>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">

                    {/* Left: Interactive Gallery */}
                    <div className="flex flex-col gap-6">
                        <motion.div
                            layoutId="main-img"
                            className="relative group bg-white dark:bg-slate-900 rounded-[3rem] p-4 border border-slate-100 dark:border-slate-800 shadow-[0_20px_50px_rgba(0,0,0,0.05)] dark:shadow-none overflow-hidden aspect-[4/5]"
                        >
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeImg}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 1.05 }}
                                    transition={{ duration: 0.4, ease: "circOut" }}
                                    className="relative w-full h-full"
                                >
                                    <Image
                                        src={activeImg}
                                        alt={product?.name || "Product Image"}
                                        fill
                                        priority
                                        className="object-contain p-4 md:p-8"
                                    />
                                </motion.div>
                            </AnimatePresence>

                            <div className="absolute top-8 left-8">
                                <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl text-brand text-[10px] font-black uppercase tracking-[0.25em] px-5 py-2.5 rounded-2xl border border-brand/10 shadow-sm">
                                    {isPanjabi ? "Heritage Wear" : "Signature Scent"}
                                </div>
                            </div>
                        </motion.div>

                        <div className="flex gap-4 overflow-x-auto py-2 no-scrollbar justify-center">
                            {product?.images?.map((img, i) => (
                                <motion.button
                                    whileHover={{ y: -5 }}
                                    key={i}
                                    onClick={() => setActiveImg(img)}
                                    className={`relative w-20 h-24 rounded-[1.25rem] flex-shrink-0 overflow-hidden border-2 transition-all duration-500 ${activeImg === img ? 'border-brand shadow-lg shadow-brand/10 scale-105' : 'border-transparent opacity-40 hover:opacity-100'}`}
                                >
                                    <Image src={img} alt="thumbnail" fill className="object-cover" />
                                </motion.button>
                            ))}
                        </div>
                    </div>

                    {/* Right: Product Narrative */}
                    <div className="flex flex-col space-y-10 pt-2">
                        <div className="space-y-6">
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-4">
                                <div className="flex items-center text-amber-500 gap-1.5 bg-amber-50 dark:bg-amber-900/10 px-4 py-1.5 rounded-full text-[11px] font-black uppercase tracking-wider">
                                    <Star className="w-3.5 h-3.5 fill-amber-500" /> 4.9 Global Rating
                                </div>
                                <div className="h-1 w-1 rounded-full bg-slate-300" />
                                <span className="text-slate-400 text-[11px] font-black uppercase tracking-wider">
                                    SKU: ROO-{product?.id?.slice(0, 8).toUpperCase()}
                                </span>
                            </motion.div>

                            <h1 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white leading-[0.95] tracking-tighter">
                                {product?.name}
                            </h1>

                            <p className="text-xl text-slate-500 dark:text-slate-400 leading-relaxed max-w-lg font-medium">
                                {product?.description || "A masterpiece of craftsmanship, designed for elegance and spiritual comfort."}
                            </p>
                        </div>

                        {/* Attribute Selection */}
                        {productSizes.length > 0 && (
                            <div className="p-8 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 space-y-6 shadow-sm">
                                <div className="flex justify-between items-center">
                                    <p className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">
                                        {isPanjabi ? "Select Size" : "Bottle Size"}
                                    </p>
                                    <button className="text-[10px] font-bold text-brand underline underline-offset-4">Size Guide</button>
                                </div>
                                <div className="flex flex-wrap gap-3">
                                    {productSizes.map((attr) => (
                                        <button
                                            key={attr}
                                            onClick={() => setSelectedAttr(attr)}
                                            className={`h-14 min-w-[70px] px-5 text-sm font-black rounded-2xl border-2 transition-all duration-500 ${selectedAttr === attr
                                                ? "bg-brand border-brand text-white shadow-xl shadow-brand/30 -translate-y-1"
                                                : "bg-transparent border-slate-100 dark:border-slate-800 text-slate-500 hover:border-brand/30"
                                                }`}
                                        >
                                            {attr}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Pricing and Actions */}
                        <div className="space-y-8">
                            <div className="flex items-center gap-6">
                                <div className="flex flex-col">
                                    <motion.span key={currentPrice} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-6xl font-black text-slate-900 dark:text-white tracking-tighter">
                                        ৳{currentPrice?.toLocaleString()}
                                    </motion.span>
                                    <span className="text-slate-400 font-bold uppercase text-[9px] tracking-[0.3em] mt-1 ml-1">Including VAT & Tax</span>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <Button
                                    onClick={handleAddToCart}
                                    className="flex-[3] h-20 rounded-[2rem] bg-brand hover:bg-brand-dark text-white text-xl font-black shadow-2xl shadow-brand/20 transition-all hover:scale-[1.02] active:scale-95 group"
                                >
                                    <ShoppingCart className="w-7 h-7 mr-4 group-hover:rotate-12 transition-transform" />
                                    Add to Shopping Bag
                                </Button>

                                <Button
                                    variant="outline"
                                    onClick={() => setIsWishlisted(!isWishlisted)}
                                    className={`flex-1 h-20 rounded-[2rem] border-2 transition-all ${isWishlisted ? 'border-brand text-brand bg-brand/5' : 'border-slate-200 dark:border-slate-800 text-slate-400 hover:text-brand'}`}
                                >
                                    <Heart className={`w-7 h-7 ${isWishlisted ? 'fill-brand' : ''}`} />
                                </Button>
                            </div>
                        </div>

                        {/* Trust Badges */}
                        <div className="grid grid-cols-3 gap-4 pt-4">
                            <div className="flex flex-col items-center p-4 rounded-3xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800">
                                <Zap className="w-5 h-5 text-brand mb-2" />
                                <span className="text-[9px] font-black uppercase text-slate-500 tracking-tighter text-center">Fast Delivery</span>
                            </div>
                            <div className="flex flex-col items-center p-4 rounded-3xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800">
                                <Layers className="w-5 h-5 text-brand mb-2" />
                                <span className="text-[9px] font-black uppercase text-slate-500 tracking-tighter text-center">Pure Fabric</span>
                            </div>
                            <div className="flex flex-col items-center p-4 rounded-3xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800">
                                <Award className="w-5 h-5 text-brand mb-2" />
                                <span className="text-[9px] font-black uppercase text-slate-500 tracking-tighter text-center">Authentic</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}