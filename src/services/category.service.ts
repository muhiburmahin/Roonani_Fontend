import { cookies } from "next/headers";
import { env } from "../env";

const API_URL = env.API_URL;

export const categoryService = {
    /**
     * সকল ক্যাটাগরি ফেচ করা
     */

    // services/category.service.ts

    getAllCategories: async () => {
        try {
            const res = await fetch(`${API_URL}/category`, {
                cache: 'no-store' // ক্যাশ অফ রাখতে
            });
            const responseData = await res.json();

            // আপনার আগের লগ অনুযায়ী রেসপন্স ছিল responseData.data এর ভেতর অ্যারে
            return {
                success: responseData.success,
                data: responseData.data || [] // এখানে নিশ্চিত হোন ডাটা কোথায় আছে
            };
        } catch (error) {
            console.error(error);
            return { success: false, data: [] };
        }
    },

    // category.service.ts
    // getAllCategories: async () => {
    //     try {
    //         const res = await fetch(`${API_URL}/category`);
    //         const responseData = await res.json();



    //         return {
    //             success: true,
    //             // যদি responseData এর ভেতর data তার ভেতর আবার data থাকে, সেটা চেক করুন
    //             data: responseData?.data?.data || responseData?.data || [],
    //             message: "Fetched"
    //         };
    //     } catch (error) {

    //         return { success: false, data: [] };
    //     }
    // },

    /**
     * নতুন ক্যাটাগরি যোগ করা
     */
    addCategory: async (name: string) => {
        try {
            const cookieStore = await cookies();

            const res = await fetch(`${API_URL}/category`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Cookie: cookieStore.toString(),
                },
                body: JSON.stringify({ name }),
            });

            const responseData = await res.json();

            if (!res.ok) {
                return {
                    success: false,
                    data: null,
                    message: responseData?.message || "Failed to create category",
                };
            }

            return {
                success: true,
                data: responseData.data || responseData,
                message: "Category created successfully"
            };
        } catch (error) {
            console.error("🔥 Service Error (Add):", error);
            return { success: false, data: null, message: "Server connection failed" };
        }
    },

    /**
     * ক্যাটাগরি ডিলিট করা
     */
    deleteCategory: async (id: string) => {
        try {
            const cookieStore = await cookies();

            const res = await fetch(`${API_URL}/category/${id}`, {
                method: "DELETE",
                headers: {
                    Cookie: cookieStore.toString(),
                },
            });

            // Delete রেসপন্স অনেক সময় খালি থাকে বা স্ট্যাটাস ২৪০ থাকে
            let responseData = null;
            if (res.status !== 204) {
                responseData = await res.json().catch(() => null);
            }

            if (!res.ok) {
                return {
                    success: false,
                    message: responseData?.message || "Failed to delete category",
                };
            }

            return { success: true, message: "Category deleted successfully" };
        } catch (error) {
            console.error("🔥 Service Error (Delete):", error);
            return { success: false, message: "Something went wrong while deleting" };
        }
    },

    /**
     * ক্যাটাগরি আপডেট করা
     */
    updateCategory: async (id: string, name: string) => {
        try {
            const cookieStore = await cookies();

            const res = await fetch(`${API_URL}/category/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Cookie: cookieStore.toString(),
                },
                body: JSON.stringify({ name }),
            });

            const responseData = await res.json();

            if (!res.ok) {
                return {
                    success: false,
                    message: responseData?.message || "Failed to update category",
                };
            }

            return {
                success: true,
                data: responseData.data || responseData,
                message: "Category updated successfully"
            };
        } catch (error) {
            console.error("🔥 Service Error (Update):", error);
            return { success: false, message: "Server communication error" };
        }
    },
};