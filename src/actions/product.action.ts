"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { productService } from "@/src/services/product.service";
import { CreateProduct, UpdateProduct } from "@/src/types";
import { env } from "@/src/env";

export const getAllProductsAction = async (query: {
    searchTerm?: string;
    category?: string;
    page?: string;
    sort?: string;
    limit?: string;
}) => {
    try {
        const params = new URLSearchParams();
        if (query.searchTerm) params.append("searchTerm", query.searchTerm);
        if (query.category) params.append("category", query.category);
        if (query.page) params.append("page", query.page);
        if (query.sort) params.append("sort", query.sort);
        params.append("limit", query.limit || "12");

        const baseUrl = env.API_URL || "https://roohanibackend.onrender.com/api";
        const fullUrl = `${baseUrl}/product?${params.toString()}`;

        const res = await fetch(fullUrl, {
            method: "GET",
            next: { revalidate: 0, tags: ["products"] },
        });

        const result = await res.json();


        return result;
    } catch (error) {
        console.error("🔥 ফেচ এরর:", error);
        return { success: false, message: "Fetch failed", data: { data: [] } };
    }
};

export const createProductAction = async (data: CreateProduct) => {
    try {
        console.log("1. Server Action called...");

        // The service returns an object: { data: result, error: null } OR { data: null, error: { message, error } }
        const res = await productService.createProduct(data);

        console.log("2. Response received from backend:", res);

        // Check if data exists and there is no error object
        if (res.data && !res.error) {
            revalidatePath("/admin-dashboard/product");
            return {
                success: true,
                message: "Product created successfully!"
            };
        }

        // Handle case where the backend returns an error message
        return {
            success: false,
            message: res.error?.message || "Backend service failed"
        };

    } catch (error) {
        console.error("❌ 3. Action Error:", error);
        return {
            success: false,
            message: "Server communication failed"
        };
    }
};

// export const updateProductAction = async (id: string, data: UpdateProduct) => {
//     try {
//         const result = await productService.updateProduct(id, data);
//         if (result?.data) {
//             revalidateTag("products", "default");
//         }
//         return result;
//     } catch (error) {
//         return { success: false, message: "Error updating product" };
//     }
// };

export const deleteProductAction = async (id: string) => {
    try {
        const result = await productService.deleteProduct(id);
        if (result?.data) {
            revalidateTag("products", "default");
        }
        return result;
    } catch (error) {
        return { success: false, message: "Error deleting product" };
    }
};

export const getSingleProductAction = async (id: string) => {
    try {
        const baseUrl = env.API_URL || "https://roohanibackend.onrender.com/api";
        const res = await fetch(`${baseUrl}/product/${id}`, {
            next: { revalidate: 60, tags: ["products"] },
        });

        if (!res.ok) throw new Error("Product not found");

        return await res.json();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.error("🔥 Single Product Fetch Error:", error.message);
        return { success: false, message: error.message };
    }
};