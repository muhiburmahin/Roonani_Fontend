"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

interface IMeta {
    page: number;
    limit: number;
    totalCount: number;
    totalPages: number;
}

export default function Pagination({ meta }: { meta: IMeta }) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const { page, totalPages } = meta;

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages) {
            const params = new URLSearchParams(searchParams.toString());
            params.set("page", newPage.toString());
            router.push(`/shop?${params.toString()}`, { scroll: true });
        }
    };

    // পেজ নাম্বার জেনারেট করার লজিক (উদা: 1, 2, 3...)
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <div className="flex items-center justify-center gap-2 mt-10">
            {/* Previous Button */}
            <button
                onClick={() => handlePageChange(page - 1)}
                disabled={page <= 1}
                className="flex items-center justify-center w-10 h-10 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-brand hover:text-white transition-all shadow-sm"
            >
                <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Page Numbers */}
            <div className="flex items-center gap-2">
                {pageNumbers.map((num) => {
                    // যদি পেজ সংখ্যা অনেক বেশি হয় তবে মাঝখানের গুলো ডট ডট দিয়ে হাইড করা যায়। 
                    // এখানে সিম্পল রাখা হয়েছে।
                    return (
                        <button
                            key={num}
                            onClick={() => handlePageChange(num)}
                            className={`w-10 h-10 rounded-xl text-sm font-bold transition-all shadow-sm ${page === num
                                    ? "bg-brand text-white scale-110"
                                    : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-brand/10 border border-slate-200 dark:border-slate-800"
                                }`}
                        >
                            {num}
                        </button>
                    );
                })}
            </div>

            {/* Next Button */}
            <button
                onClick={() => handlePageChange(page + 1)}
                disabled={page >= totalPages}
                className="flex items-center justify-center w-10 h-10 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-brand hover:text-white transition-all shadow-sm"
            >
                <ChevronRight className="w-5 h-5" />
            </button>
        </div>
    );
}