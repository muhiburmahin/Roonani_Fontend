import { cookies } from "next/headers";
import { env } from "@/src/env";
import { CreateProduct, UpdateProduct } from "@/src/types"; // আপনার টাইপ ফাইল থেকে ইমপোর্ট করুন

const API_URL = env.API_URL;

interface GetProductParams {
    search?: string;
    categoryId?: string;
    minPrice?: string;
    maxPrice?: string;
    page?: string;
    limit?: string;
    sortOrder?: string;
    sortBy?: string;
}

export const productService = {
    /**
     * 1. Create Product (Admin Only)
     */
    createProduct: async (data: CreateProduct) => {
        try {
            const cookieStore = await cookies();
            const res = await fetch(`${API_URL}/product`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Cookie: cookieStore.toString(),
                },
                body: JSON.stringify(data),
                cache: "no-store",
            });

            const result = await res.json();

            if (!res.ok) {
                return {
                    data: null,
                    error: {
                        message: result?.message ?? "Failed to create product",
                        error: result ?? null,
                    },
                };
            }

            return { data: result, error: null };
        } catch (error) {
            return {
                data: null,
                error: { message: "Something went wrong", error },
            };
        }
    },

    /**
     * 2. Get All Products
     */
    getAllProducts: async (params?: GetProductParams) => {
        try {
            const url = new URL(`${API_URL}/product`);

            if (params) {
                Object.entries(params).forEach(([key, value]) => {
                    if (value !== undefined && value !== null && value !== "") {
                        url.searchParams.set(key, value.toString());
                    }
                });
            }

            const res = await fetch(url.toString(), {
                next: { tags: ["products"] },
                cache: "no-store",
            });

            const result = await res.json();

            if (!res.ok) {
                return {
                    data: null,
                    error: { message: result?.message ?? "No products found", error: result },
                };
            }

            return { data: result || [], error: null };
        } catch (error) {
            return {
                data: null,
                error: { message: "Something went wrong", error },
            };
        }
    },

    /**
     * 3. Get Product By ID
     */
    getProductById: async (id: string) => {
        try {
            const res = await fetch(`${API_URL}/product/${id}`, {
                next: { tags: ["product-details"] },
                cache: "no-store",
            });

            const result = await res.json();

            if (!res.ok) {
                return {
                    data: null,
                    error: { message: result?.message ?? "Product not found", error: result },
                };
            }

            return { data: result.data || result, error: null };
        } catch (error) {
            return { data: null, error: { message: "Something went wrong", error } };
        }
    },


    // updateProduct: async (id: string, data: UpdateProduct) => {
    //     try {
    //         const cookieStore = await cookies();
    //         const res = await fetch(`${API_URL}/product/${id}`, {
    //             method: "PATCH",
    //             headers: {
    //                 "Content-Type": "application/json",
    //                 Cookie: cookieStore.toString(),
    //             },
    //             body: JSON.stringify(data),
    //             cache: "no-store",
    //         });

    //         const result = await res.json();

    //         if (!res.ok) {
    //             return {
    //                 data: null,
    //                 error: {
    //                     message: result?.message ?? "Failed to update product",
    //                     error: result ?? null,
    //                 },
    //             };
    //         }

    //         return { data: result, error: null };
    //     } catch (error) {
    //         return {
    //             data: null,
    //             error: { message: "Something went wrong", error },
    //         };
    //     }
    // },

    /**
     * 5. Delete Product (Admin Only)
     */
    deleteProduct: async (id: string) => {
        try {
            const cookieStore = await cookies();
            const res = await fetch(`${API_URL}/product/${id}`, {
                method: "DELETE", // আপনার এন্ডপয়েন্ট এটাই থাকবে
                headers: {
                    Cookie: cookieStore.toString(),
                },
                cache: "no-store",
            });

            const result = await res.json();

            if (!res.ok || !result.success) {
                return {
                    success: false,
                    data: null,
                    message: result?.message ?? "Failed to archive product",
                };
            }

            return { success: true, data: result.data, message: result.message };
        } catch (error) {
            return {
                success: false,
                data: null,
                message: "Network error occurred",
            };
        }
    },
};