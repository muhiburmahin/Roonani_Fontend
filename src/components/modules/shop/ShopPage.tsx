// "use client";

// import { useSearchParams, useRouter } from "next/navigation";
// import { Search, Loader2, PackageSearch } from "lucide-react";
// import { useEffect, useState, useTransition, useCallback } from "react";
// import { Input } from "@/src/components/ui/input";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select";
// import ProductCard from "../shared/ProductCard";
// import Pagination from "../shared/Pagination";
// import { Product } from "@/src/types/product.type";
// import { Category } from "@/src/types/category.type";

// interface IMeta {
//     page: number;
//     limit: number;
//     totalCount: number;
//     totalPages: number;
//     total: number;
// }

// interface ShopPageProps {
//     products: Product[];
//     categories: Category[];
//     meta: IMeta | null;
// }

// export default function ShopPage({ products, categories, meta }: ShopPageProps) {
//     const router = useRouter();
//     const searchParams = useSearchParams();
//     const [isPending, startTransition] = useTransition();
//     const [searchTerm, setSearchTerm] = useState(searchParams.get("searchTerm") || "");

//     const handleFilterChange = useCallback((key: string, value: string) => {
//         const params = new URLSearchParams(searchParams.toString());
//         if (value && value !== "all" && value !== "default") {
//             params.set(key, value);
//         } else {
//             params.delete(key);
//         }
//         params.set("page", "1");
//         startTransition(() => {
//             router.push(`/shop?${params.toString()}`, { scroll: false });
//         });
//     }, [searchParams, router]);

//     useEffect(() => {
//         const delayDebounceFn = setTimeout(() => {
//             const currentSearch = searchParams.get("searchTerm") || "";
//             if (searchTerm !== currentSearch) {
//                 handleFilterChange("searchTerm", searchTerm);
//             }
//         }, 500);
//         return () => clearTimeout(delayDebounceFn);
//     }, [searchTerm, handleFilterChange, searchParams]);

//     return (
//         <div className="min-h-screen bg-[#FDF8F9] dark:bg-slate-950 p-6 md:p-10">
//             <div className="max-w-[1600px] mx-auto">
//                 <div className="flex flex-col lg:flex-row gap-6 mb-12">
//                     <div className="relative flex-1">
//                         <Input
//                             value={searchTerm}
//                             onChange={(e) => setSearchTerm(e.target.value)}
//                             placeholder="Search products..."
//                             className="h-16 pl-12 rounded-2xl bg-white dark:bg-slate-900 border-none shadow-sm text-lg"
//                         />
//                         <Search className="absolute left-4 top-5 text-slate-400" />
//                         {isPending && <Loader2 className="absolute right-4 top-5 animate-spin text-brand" />}
//                     </div>

//                     <div className="flex gap-4">
//                         <Select
//                             value={searchParams.get("category") || "all"}
//                             onValueChange={(val) => handleFilterChange("category", val)}
//                         >
//                             <SelectTrigger className="w-[180px] h-16 rounded-2xl bg-white dark:bg-slate-900 shadow-sm">
//                                 <SelectValue placeholder="Category" />
//                             </SelectTrigger>
//                             <SelectContent>
//                                 <SelectItem value="all">All Categories</SelectItem>
//                                 {categories.map((cat: Category) => (
//                                     <SelectItem key={cat.id} value={cat.id}>
//                                         {cat.name}
//                                     </SelectItem>
//                                 ))}
//                             </SelectContent>
//                         </Select>

//                         <Select
//                             value={searchParams.get("sort") || "default"}
//                             onValueChange={(val) => handleFilterChange("sort", val)}
//                         >
//                             <SelectTrigger className="w-[180px] h-16 rounded-2xl bg-white dark:bg-slate-900 shadow-sm">
//                                 <SelectValue placeholder="Sort By" />
//                             </SelectTrigger>
//                             <SelectContent>
//                                 <SelectItem value="default">Newest Arrival</SelectItem>
//                                 <SelectItem value="price-low">Price: Low to High</SelectItem>
//                                 <SelectItem value="price-high">Price: High to Low</SelectItem>
//                             </SelectContent>
//                         </Select>
//                     </div>
//                 </div>

//                 <div className={isPending ? "opacity-60" : ""}>
//                     {products && products.length > 0 ? (
//                         <div className="space-y-12">
//                             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
//                                 {products.map((p: Product) => (
//                                     <ProductCard key={p.id} product={p} />
//                                 ))}
//                             </div>
//                             {meta && meta.totalPages > 1 && (
//                                 <div className="flex justify-center pt-10 border-t">
//                                     <Pagination meta={meta} />
//                                 </div>
//                             )}
//                         </div>
//                     ) : (
//                         <div className="flex flex-col items-center justify-center py-40 bg-white dark:bg-slate-900 rounded-[40px] border-2 border-dashed">
//                             <PackageSearch className="w-16 h-16 text-slate-200 mb-4" />
//                             <h3 className="text-xl font-bold">No match found</h3>
//                             <p className="text-slate-500 mt-2">Try adjusting your filters or search term.</p>
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// }


"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Search, Loader2, PackageSearch, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState, useTransition, useCallback } from "react";
import { Input } from "@/src/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select";
import ProductCard from "../shared/ProductCard";
import { Product } from "@/src/types/product.type";
import { Category } from "@/src/types/category.type";

interface IMeta {
    page: number;
    limit: number;
    totalCount: number;
    totalPages: number;
    total: number;
}

interface ShopPageProps {
    products: Product[];
    categories: Category[];
    meta: IMeta | null;
}

export default function ShopPageContent({ products, categories, meta }: ShopPageProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isPending, startTransition] = useTransition();
    const [searchTerm, setSearchTerm] = useState(searchParams.get("searchTerm") || "");

    const handleFilterChange = useCallback((key: string, value: string) => {
        const params = new URLSearchParams(searchParams.toString());

        if (value && value !== "all" && value !== "default") {
            params.set(key, value);
        } else {
            params.delete(key);
        }

        if (key !== "page") {
            params.set("page", "1");
        }

        startTransition(() => {
            router.push(`/shop?${params.toString()}`, { scroll: true });
        });
    }, [searchParams, router]);

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            const currentSearch = searchParams.get("searchTerm") || "";
            if (searchTerm !== currentSearch) {
                handleFilterChange("searchTerm", searchTerm);
            }
        }, 500);
        return () => clearTimeout(delayDebounceFn);
    }, [searchTerm, handleFilterChange, searchParams]);

    return (
        <div className="min-h-screen bg-[#FDF8F9] dark:bg-slate-950 p-6 md:p-10">
            <div className="max-w-[1600px] mx-auto">

                {/* ফিল্টার এবং সার্চ বার */}
                <div className="flex flex-col lg:flex-row gap-6 mb-12">
                    <div className="relative flex-1">
                        <Input
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search products..."
                            className="h-16 pl-12 rounded-2xl bg-white dark:bg-slate-900 border-none shadow-sm text-lg"
                        />
                        <Search className="absolute left-4 top-5 text-slate-400" />
                        {isPending && <Loader2 className="absolute right-4 top-5 animate-spin text-brand" />}
                    </div>

                    <div className="flex gap-4">
                        <Select
                            value={searchParams.get("category") || "all"}
                            onValueChange={(val) => handleFilterChange("category", val)}
                        >
                            <SelectTrigger className="w-[180px] h-16 rounded-2xl bg-white dark:bg-slate-900 shadow-sm border-none font-medium">
                                <SelectValue placeholder="Category" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Categories</SelectItem>
                                {categories.map((cat: Category) => (
                                    <SelectItem
                                        key={cat._id || cat.id || `category-${cat.name}`}
                                        value={cat._id || (cat.id as string)}
                                    >
                                        {cat.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        <Select
                            value={searchParams.get("sort") || "default"}
                            onValueChange={(val) => handleFilterChange("sort", val)}
                        >
                            <SelectTrigger className="w-[180px] h-16 rounded-2xl bg-white dark:bg-slate-900 shadow-sm border-none font-medium">
                                <SelectValue placeholder="Sort By" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="default">Newest Arrival</SelectItem>
                                <SelectItem value="price-low">Price: Low to High</SelectItem>
                                <SelectItem value="price-high">Price: High to Low</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {/* প্রোডাক্ট লিস্ট এবং পেজিনেশন */}
                <div className={`transition-opacity duration-300 ${isPending ? "opacity-50" : "opacity-100"}`}>
                    {products && products.length > 0 ? (
                        <div className="space-y-16">
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                                {products.map((p: Product) => (
                                    <ProductCard
                                        key={p.id || p.id}
                                        product={p}
                                    />
                                ))}
                            </div>

                            {/* পেজিনেশন ডিজাইন */}
                            {meta && meta.totalPages > 1 && (
                                <div className="flex flex-col items-center justify-center gap-4 py-10 border-t border-slate-200/60 dark:border-slate-800">
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => handleFilterChange("page", (meta.page - 1).toString())}
                                            disabled={meta.page <= 1}
                                            className="p-3 rounded-xl bg-white dark:bg-slate-900 shadow-sm disabled:opacity-30 border hover:border-brand transition-all"
                                        >
                                            <ChevronLeft className="w-5 h-5" />
                                        </button>

                                        <div className="flex gap-2">
                                            {Array.from({ length: meta.totalPages }, (_, i) => i + 1).map((num) => (
                                                <button
                                                    key={num}
                                                    onClick={() => handleFilterChange("page", num.toString())}
                                                    className={`w-11 h-11 rounded-xl font-bold transition-all ${meta.page === num
                                                        ? "bg-brand text-white shadow-lg"
                                                        : "bg-white dark:bg-slate-900 text-slate-500 hover:bg-brand/5"
                                                        }`}
                                                >
                                                    {num}
                                                </button>
                                            ))}
                                        </div>

                                        <button
                                            onClick={() => handleFilterChange("page", (meta.page + 1).toString())}
                                            disabled={meta.page >= meta.totalPages}
                                            className="p-3 rounded-xl bg-white dark:bg-slate-900 shadow-sm disabled:opacity-30 border hover:border-brand transition-all"
                                        >
                                            <ChevronRight className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-40 bg-white dark:bg-slate-900 rounded-[40px] border-2 border-dashed border-slate-100">
                            <PackageSearch className="w-20 h-20 text-slate-200 mb-6" />
                            <h3 className="text-xl font-bold">No products found</h3>
                            <p className="text-slate-500 mt-2">Adjust your search or filter to find what you are looking for.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}