import { Product } from "./product.type";
import { User } from "./user.type";

export enum OrderStatus {
    PENDING = "PENDING",
    CONFIRMED = "CONFIRMED",
    SHIPPED = "SHIPPED",
    DELIVERED = "DELIVERED",
    CANCELLED = "CANCELLED",
}

export interface OrderItem {
    id?: string;
    orderId?: string;
    productId: string;
    quantity: number;
    price: number;
    selectedSize?: string | null;
    createdAt?: string | Date;
    product?: Partial<Product> & {
        name: string;
        images: string[];
        basePrice: number;
    };
}

export interface Order {
    id: string;
    customerId: string;
    customer?: Partial<User> & {
        name: string;
        email: string;
    };
    status: OrderStatus;
    shippingAddress: string;
    phone: string;
    totalAmount: number;
    transactionId?: string | null;
    items?: OrderItem[];
    createdAt: string | Date;
    updatedAt: string | Date;
}

export interface CreateOrder {
    customerId: string;
    shippingAddress: string;
    phone: string;
    totalAmount: number;
    items: {
        productId: string;
        quantity: number;
        price: number;
        selectedSize: string;
    }[];
}

export interface OrderResponse {
    success: boolean;
    message: string;
    count?: number;
    data: Order[];
}