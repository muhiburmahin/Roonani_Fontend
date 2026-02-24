"use client";

import { Trash2, FolderSearch } from "lucide-react";
import { Category } from "@/src/types/category.type"; // পাথ চেক করে নিন
import { Button } from "@/src/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/src/components/ui/table";
import { toast } from "sonner";
import { deleteCategoryAction } from "@/src/actions/category.action";

interface Props {
    categories: Category[];
}

export default function CategoryTable({ categories }: Props) {

    // ডিলিট হ্যান্ডলার
    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this category?")) return;

        const toastId = toast.loading("Deleting category...");

        try {
            const res = await deleteCategoryAction(id);

            if (res?.success) {
                toast.success("Category deleted successfully", { id: toastId });
            } else {
                toast.error(res?.message || "Failed to delete", { id: toastId });
            }
        } catch (error) {
            toast.error("An unexpected error occurred", { id: toastId });
        }
    };

    return (
        <div className="mt-6 border border-slate-200 rounded-3xl bg-white overflow-hidden shadow-sm">
            <Table>
                <TableHeader className="bg-slate-50">
                    <TableRow className="hover:bg-transparent border-b border-slate-200">
                        <TableHead className="w-20 text-center font-bold text-slate-600">SL</TableHead>
                        <TableHead className="font-bold text-slate-600">Category Name</TableHead>
                        <TableHead className="text-right font-bold text-slate-600 px-8">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {categories && categories.length > 0 ? (
                        categories.map((cat, index) => (
                            <TableRow
                                key={cat.id || index}
                                className="hover:bg-pink-50/30 transition-colors border-b border-slate-100 last:border-0"
                            >
                                <TableCell className="text-center font-medium text-slate-400">
                                    {String(index + 1).padStart(2, '0')}
                                </TableCell>
                                <TableCell className="font-semibold text-slate-700">
                                    {cat.name}
                                </TableCell>
                                <TableCell className="text-right px-8">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => handleDelete(cat.id!)}
                                        className="h-9 w-9 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                                        title="Delete Category"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={3} className="text-center py-20">
                                <div className="flex flex-col items-center justify-center space-y-3">
                                    <div className="bg-slate-50 p-4 rounded-full">
                                        <FolderSearch className="w-8 h-8 text-slate-300" />
                                    </div>
                                    <p className="text-slate-400 font-medium">No categories found.</p>
                                </div>
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}