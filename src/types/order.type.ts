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

    createdAt?: Date;
    order?: Order;
    product?: Partial<Product>;
}

export interface Order {
    id: string;
    customerId: string;
    customer?: User;

    status: OrderStatus;
    shippingAddress: string;
    phone: string;
    totalAmount: number;

    items?: OrderItem[];

    createdAt: Date;
    updatedAt: Date;
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