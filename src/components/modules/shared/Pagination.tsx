"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/src/components/ui/button";
import {
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
} from "lucide-react";
import { cn } from "@/src/lib/utils";

interface PaginationProps {
    meta: {
        limit: number;
        page: number;
        total: number;
        totalPages: number;
    };
    className?: string;
}

export default function Pagination({ meta, className }: PaginationProps) {
    const searchParams = useSearchParams();
    const router = useRouter();

    const { limit, page, total, totalPages } = meta;

    const navigateToPage = (targetPage: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("page", targetPage.toString());
        router.push(`?${params.toString()}`, { scroll: false });
    };

    const start = (page - 1) * limit + 1;
    const end = Math.min(page * limit, total);

    if (totalPages <= 1) return null;

    return (
        <div className={cn("flex flex-col md:flex-row items-center justify-between gap-6 py-10 border-t border-slate-100 dark:border-slate-800/50 mt-12", className)}>
            <div className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.3em]">
                Showing <span className="text-brand">{start}-{end}</span> of {total} results
            </div>

            <div className="flex items-center gap-3">
                <Button
                    variant="outline"
                    size="icon"
                    className="w-10 h-10 rounded-xl border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm hover:text-brand disabled:opacity-30 transition-all"
                    onClick={() => navigateToPage(1)}
                    disabled={page === 1}
                >
                    <ChevronsLeft className="h-4 w-4" />
                </Button>

                <Button
                    variant="outline"
                    size="icon"
                    className="w-10 h-10 rounded-xl border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm hover:text-brand disabled:opacity-30 transition-all"
                    onClick={() => navigateToPage(page - 1)}
                    disabled={page === 1}
                >
                    <ChevronLeft className="h-4 w-4" />
                </Button>

                <div className="px-4 h-10 flex items-center bg-brand/5 dark:bg-brand/10 border border-brand/20 rounded-xl">
                    <span className="text-[11px] font-black text-brand uppercase tracking-widest">
                        Page {page} of {totalPages}
                    </span>
                </div>

                <Button
                    variant="outline"
                    size="icon"
                    className="w-10 h-10 rounded-xl border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm hover:text-brand disabled:opacity-30 transition-all"
                    onClick={() => navigateToPage(page + 1)}
                    disabled={page === totalPages}
                >
                    <ChevronRight className="h-4 w-4" />
                </Button>

                <Button
                    variant="outline"
                    size="icon"
                    className="w-10 h-10 rounded-xl border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm hover:text-brand disabled:opacity-30 transition-all"
                    onClick={() => navigateToPage(totalPages)}
                    disabled={page === totalPages}
                >
                    <ChevronsRight className="h-4 w-4" />
                </Button>
            </div>
        </div>
    );
}