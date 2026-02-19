"use client";

import { useMemo, useState } from "react";
import { Search, SlidersHorizontal, PackageSearch, ChevronLeft, ChevronRight, LayoutGrid } from "lucide-react";
import { Input } from "@/src/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/src/components/ui/select";
import { MOCK_PRODUCTS } from "@/src/data/product";
import ProductCard from "../shared/ProductCard";

export default function ShopPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [sortBy, setSortBy] = useState("default");
    const [currentPage, setCurrentPage] = useState(1);

    // প্রতি পেজে ১২টি করে প্রোডাক্ট দেখাবে (আপনার রিকোয়ারমেন্ট অনুযায়ী)
    const itemsPerPage = 12;

    const filteredProducts = useMemo(() => {
        const query = searchQuery.toLowerCase().trim();

        const filtered = MOCK_PRODUCTS.filter((prod) =>
            prod.name.toLowerCase().includes(query) ||
            prod.description?.toLowerCase().includes(query)
        );

        // সর্টিং লজিক
        if (sortBy === "price-low") {
            filtered.sort((a, b) => a.basePrice - b.basePrice);
        } else if (sortBy === "price-high") {
            filtered.sort((a, b) => b.basePrice - a.basePrice);
        }

        return filtered;
    }, [searchQuery, sortBy]);

    // প্যাগিনেশন ক্যালকুলেশন
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

    return (
        <div className="max-w-[1600px] mx-auto px-4 md:px-10 py-10 bg-slate-50 dark:bg-[#0f172a] min-h-screen transition-colors duration-300">

            {/* Header Section */}
            <div className="mb-10 text-center md:text-left">
                <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-slate-900 dark:text-white">
                    Our <span className="text-brand">Collections</span>
                </h1>
                <p className="text-slate-500 dark:text-slate-400 mt-2 font-medium">
                    Premium Panjabis & Exquisite Fragrances curated for you.
                </p>
            </div>

            {/* Filters Section */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
                <div className="relative w-full max-w-xl group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-brand" />
                    </div>
                    <Input
                        placeholder="Search for panjabi, perfumes..."
                        className="block w-full pl-12 pr-4 h-14 rounded-2xl border-none bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-brand/50 transition-all shadow-xl shadow-slate-200/50 dark:shadow-none uppercase text-xs font-bold tracking-widest"
                        value={searchQuery}
                        onChange={(e) => {
                            setSearchQuery(e.target.value);
                            setCurrentPage(1);
                        }}
                    />
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto">
                    <Select onValueChange={setSortBy} defaultValue="default">
                        <SelectTrigger className="w-full md:w-[220px] h-14 rounded-2xl border-none bg-white dark:bg-slate-900 font-bold text-slate-700 dark:text-slate-200 shadow-xl shadow-slate-200/50 dark:shadow-none">
                            <div className="flex items-center gap-2">
                                <SlidersHorizontal className="w-4 h-4 text-brand" />
                                <SelectValue placeholder="Sort By" />
                            </div>
                        </SelectTrigger>
                        <SelectContent className="rounded-2xl border-none shadow-2xl bg-white dark:bg-slate-900">
                            <SelectItem value="default">Featured</SelectItem>
                            <SelectItem value="price-low">Price: Low to High</SelectItem>
                            <SelectItem value="price-high">Price: High to Low</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* Products Grid */}
            <div className="w-full">
                {currentProducts.length > 0 ? (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                            {currentProducts.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>

                        {/* Pagination UI */}
                        {totalPages > 1 && (
                            <div className="flex flex-col md:flex-row justify-between items-center gap-8 mt-20 pb-12 border-t border-slate-200 dark:border-slate-800 pt-10">
                                <p className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">
                                    Showing {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredProducts.length)} of {filteredProducts.length} items
                                </p>

                                <div className="flex items-center gap-3">
                                    <button
                                        disabled={currentPage === 1}
                                        onClick={() => { setCurrentPage(1); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                                        className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 disabled:opacity-30 hover:text-brand transition-all shadow-sm"
                                    >
                                        <ChevronLeft className="w-5 h-5" />
                                    </button>

                                    <div className="flex gap-2">
                                        {[...Array(totalPages)].map((_, i) => (
                                            <button
                                                key={i}
                                                onClick={() => { setCurrentPage(i + 1); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                                                className={`w-11 h-11 rounded-xl font-bold text-sm transition-all ${currentPage === i + 1
                                                        ? "bg-brand text-white shadow-lg shadow-brand/30"
                                                        : "bg-white dark:bg-slate-900 text-slate-400"
                                                    }`}
                                            >
                                                {i + 1}
                                            </button>
                                        ))}
                                    </div>

                                    <button
                                        disabled={currentPage === totalPages}
                                        onClick={() => { setCurrentPage(prev => prev + 1); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                                        className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 disabled:opacity-30 hover:text-brand transition-all shadow-sm"
                                    >
                                        <ChevronRight className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        )}
                    </>
                ) : (
                    <div className="flex flex-col items-center justify-center py-40 bg-white dark:bg-slate-900/30 rounded-[3rem] border-2 border-dashed border-slate-100 dark:border-slate-800">
                        <PackageSearch className="w-20 h-20 text-slate-200 dark:text-slate-800 mb-6" />
                        <h3 className="text-sm font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.3em]">
                            No Products Found
                        </h3>
                    </div>
                )}
            </div>
        </div>
    );
}