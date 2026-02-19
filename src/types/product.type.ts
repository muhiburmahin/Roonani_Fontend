import { Category } from "./category.type";

export type ProductVariantType = 'SIZE' | 'VOLUME';

/**
 * Interface for dynamic price mapping.
 * Example: { "50ml": 1200, "100ml": 2200 } or { "M": 1500, "XL": 1800 }
 */
export interface VariantPriceMap {
    [key: string]: number;
}

export interface Product {
    id: string;
    name: string;
    description: string | null;
    basePrice: number;
    variantPrices: VariantPriceMap;
    stock: number;
    images: string[];
    categoryId: string;
    category?: Category;
    sizes: string[];
    variantType: ProductVariantType;
    createdAt: Date;
    updatedAt: Date;
}

// 2. Create Product Interface
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

// 3. Update Product Interface
// Using Partial<CreateProduct> makes all fields optional automatically
export type UpdateProduct = Partial<CreateProduct>