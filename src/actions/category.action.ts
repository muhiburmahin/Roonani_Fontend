/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { revalidateTag } from "next/cache";
import { categoryService } from "@/src/services/category.service";


export interface ActionResponse<T = any> {
    success: boolean;
    data?: T;
    message?: string; // এখানে message দিন, error নয়
}


export const getAllCategoriesAction = async (): Promise<ActionResponse> => {
    try {
        const res = await categoryService.getAllCategories();
        // আপনার API সার্ভিস যদি সরাসরি ডাটা রিটার্ন করে
        return {
            success: true,
            data: res?.data || res // ডাটা প্রপার্টি চেক করে পাঠানো
        };
    } catch (err: any) {
        return {
            success: false,
            message: err.message || "Failed to fetch categories" // 'error' এর বদলে 'message'
        };
    }
};

/* CREATE */
// export const createCategoryAction = async (
//     name: string
// ): Promise<ActionResponse> => {
//     try {
//         const data = await categoryService.addCategory(name);
//         revalidateTag("categories");
//         return { success: true, data };
//     } catch (err: any) {
//         return {
//             success: false,
//             error: { message: err.message || "Failed to create category" }
//         };
//     }
// };

// /* DELETE */
// export const deleteCategoryAction = async (
//     id: string
// ): Promise<ActionResponse> => {
//     try {
//         await categoryService.deleteCategory(id);
//         revalidateTag("categories");
//         return { success: true };
//     } catch (err: any) {
//         return {
//             success: false,
//             error: { message: err.message || "Failed to delete category" }
//         };
//     }
// };



// export const getAllCategoriesAction = async () => {
//     try {
//         const res = await categoryService.getAllCategories();
//         return res;
//     } catch (error) {
//         return { success: false, message: "Failed to fetch categories" };
//     }
// };

export const createCategoryAction = async (name: string): Promise<ActionResponse> => {
    try {
        const result = await categoryService.addCategory(name);
        // revalidateTag শুধু ট্যাগ নাম নিলেই হয়, যদি না আপনার Next.js ভার্সন পুরনো হয়
        if (result.success) revalidateTag("categories", "default");
        return result;
    } catch (err: any) {
        return {
            success: false,
            message: err.message || "Failed to create category"
        };
    }
};

export const deleteCategoryAction = async (id: string): Promise<ActionResponse> => {
    try {
        const result = await categoryService.deleteCategory(id);
        if (result.success) {
            revalidateTag("categories", "default");
        }
        return result;
    } catch (err: any) {
        return { success: false, message: err.message || "Failed to delete category" };
    }
};

