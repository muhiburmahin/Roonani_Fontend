import { Category } from "./category.type";


export type ProductVariantType = "SIZE" | "VOLUME";
export interface VariantPriceMap {
    [variant: string]: number;
}

export interface Product {
    id: string;
    //_id: string;
    name: string;
    description: string | null;

    basePrice: number;

    variantPrices: VariantPriceMap;
    price?: number;

    stock: number;
    images: string[];

    categoryId: string;
    category?: Category;

    sizes: string[];

    variantType: ProductVariantType;

    createdAt: Date | string;
    updatedAt: Date | string;
}


export interface CreateProduct {
    name: string;
    description: string;
    basePrice: number;
    variantPrices: VariantPriceMap;
    stock: number;
    images: string[];
    categoryId: string;
    sizes: string[];
    variantType: ProductVariantType;
}

export type UpdateProduct = Partial<CreateProduct>;

