import { cookies } from "next/headers";
import { CreateOrder, Order, OrderStatus } from "@/src/types/order.type";
import { env } from '@/src/env';

const API_URL = env.API_URL;

// প্রতিটি মেথড এই ফরম্যাটে ডাটা রিটার্ন করবে
interface ServiceResponse<T> {
    data: T | null;
    error: string | null;
}

export const orderService = {
    /**
     * সকল অর্ডার দেখার জন্য (Admin Panel)
     * URL: /order
     */
    getAllOrders: async (): Promise<ServiceResponse<Order[]>> => {
        try {
            const cookieStore = await cookies();
            const res = await fetch(`${API_URL}/order`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${cookieStore.get("accessToken")?.value}`,
                    Cookie: cookieStore.toString(),
                },
                cache: "no-store",
                next: { tags: ["orders"] },
            });

            const result = await res.json();

            if (!res.ok) {
                console.error("Service Error (getAllOrders):", result);
                return { data: null, error: result?.message || "Failed to fetch orders" };
            }

            // ব্যাকএন্ড থেকে আসা { success, data: [] } থেকে শুধু data অ্যারেটি পাঠানো হচ্ছে
            return { data: result.data as Order[], error: null };
        } catch (error) {
            console.error("Network Error (getAllOrders):", error);
            return { data: null, error: "Network communication failed" };
        }
    },

    /**
     * অর্ডারের স্ট্যাটাস আপডেট (Admin)
     * URL: /order/:id
     */
    updateOrderById: async (id: string, orderData: { status: OrderStatus }): Promise<ServiceResponse<Order>> => {
        try {
            const cookieStore = await cookies();
            const res = await fetch(`${API_URL}/order/update-status/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${cookieStore.get("accessToken")?.value}`,
                    Cookie: cookieStore.toString(),
                },
                body: JSON.stringify(orderData),
                cache: "no-store",
            });

            const result = await res.json();

            if (!res.ok) {
                return { data: null, error: result?.message || "Update failed" };
            }

            return { data: result.data as Order, error: null };
        } catch (error) {
            return { data: null, error: "Update operation failed" };
        }
    },

    /**
     * নতুন অর্ডার তৈরি (Checkout)
     */
    createOrder: async (data: CreateOrder): Promise<ServiceResponse<Order>> => {
        try {
            const cookieStore = await cookies();
            const res = await fetch(`${API_URL}/order`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${cookieStore.get("accessToken")?.value}`,
                    Cookie: cookieStore.toString(),
                },
                body: JSON.stringify(data),
                cache: "no-store",
            });

            const result = await res.json();
            if (!res.ok) return { data: null, error: result?.message || "Order creation failed" };

            return { data: result.data as Order, error: null };
        } catch (error) {
            return { data: null, error: "Order failed due to network error" };
        }
    },

    /**
     * ইউজারের নিজের অর্ডার দেখা
     */
    getMyOrders: async (userId: string): Promise<ServiceResponse<Order[]>> => {
        try {
            const cookieStore = await cookies();
            const res = await fetch(`${API_URL}/order${userId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${cookieStore.get("accessToken")?.value}`,
                    Cookie: cookieStore.toString(),
                },
                cache: "no-store",
            });

            const result = await res.json();
            if (!res.ok) return { data: null, error: result?.message || "Failed to fetch your orders" };

            return { data: result.data as Order[], error: null };
        } catch (error) {
            return { data: null, error: "Network error" };
        }
    },

    /**
     * অর্ডার ডিলিট
     */
    deleteOrderById: async (id: string): Promise<ServiceResponse<{ success: boolean }>> => {
        try {
            const cookieStore = await cookies();
            const res = await fetch(`${API_URL}/order/${id}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${cookieStore.get("accessToken")?.value}`,
                    Cookie: cookieStore.toString(),
                },
            });

            const result = await res.json();
            if (!res.ok) return { data: null, error: "Delete failed" };

            return { data: result, error: null };
        } catch (error) {
            return { data: null, error: "Delete operation failed" };
        }
    }
};