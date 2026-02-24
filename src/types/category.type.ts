import { Product } from "./product.type";

export interface Category {
    _id: string;      // মঙ্গোডিবি থেকে এটি অবশ্যই আসবে
    id?: string;      // অপশনাল রাখুন
    name: string;
    products?: Product[];
    createdAt?: string; // ব্যাকএন্ড থেকে সাধারণত স্ট্রিং হিসেবে আসে
    updatedAt?: string;
}

export interface CreateCategory {
    name: string;
}

export interface UpdateCategory {
    name?: string;
}