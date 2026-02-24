import { OrderStatus } from "./order.type";

export interface IDashboardStats {
    user: {
        total: number;
        admin: number;
        customer: number;
    };
    category: {
        total: number;
    };
    product: {
        total: number;
    };
    order: {
        totalOrders: number;
        totalRevenue: number;
        successOrdersCount: number;
        pending: number;
        confirmed: number;
        shipped: number;
        delivered: number;
        cancelled: number;
        pendingAmount: number;
        confirmedAmount: number;
        shippedAmount: number;
        deliveredAmount: number;
        cancelledAmount: number;
    };
}