"use server";

import { revalidateTag } from "next/cache";
import { orderService } from "../services/order.service";
import { CreateOrder, OrderStatus } from "../types/order.type";

/**
 * সকল অর্ডার পাওয়ার জন্য (Admin Dashboard)
 */
export const getAllOrdersAction = async () => {
    try {
        const result = await orderService.getAllOrders();
        console.log("Action (getAllOrders): Fetching success");
        return result;
    } catch (error) {
        console.error("Action Error (getAllOrders):", error);
        return {
            data: null,
            error: "Failed to fetch all orders from server"
        };
    }
};

/**
 * নতুন অর্ডার তৈরি করার জন্য (Checkout Page)
 */
export const createOrderAction = async (data: CreateOrder) => {
    try {
        const result = await orderService.createOrder(data);

        // যদি অর্ডার সফল হয়, তবে ক্যাশ ইনভ্যালিডেট করা
        if (result.data) {
            revalidateTag("orders", "default");
        }

        return result;
    } catch (error) {
        return { data: null, error: "Failed to create order" };
    }
};

/**
 * অর্ডারের স্ট্যাটাস আপডেট করার জন্য
 */
export const updateOrderByIdAction = async (id: string, data: { status: OrderStatus }) => {
    try {
        const result = await orderService.updateOrderById(id, data);

        if (result.data) {
            revalidateTag("orders", "default");
        }

        return result;
    } catch (error) {
        return { data: null, error: "Failed to update order" };
    }
};

/**
 * অর্ডার ডিলিট করার জন্য
 */
export const deleteOrderByIdAction = async (id: string) => {
    try {
        const result = await orderService.deleteOrderById(id);

        if (result.data) {
            revalidateTag("orders", "default"); // "page" বাদ দিন
        }

        return result;
    } catch (error) {
        return { data: null, error: "Failed to delete order" };
    }
};

/**
 * ইউজারের নিজের অর্ডারগুলো পাওয়ার জন্য
 */
export const getMyOrdersAction = async (userId: string) => {
    try {
        return await orderService.getMyOrders(userId);
    } catch (error) {
        return { data: null, error: "Failed to fetch your orders" };
    }
};