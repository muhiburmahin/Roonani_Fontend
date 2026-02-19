import { Product } from "./product.type";

export interface Category {
    id: string;
    name: string;
    products?: Product[];
    createdAt?: Date;
    updatedAt?: Date;
}

export interface CreateCategory {
    name: string;
}

export interface UpdateCategory {
    name?: string;
}