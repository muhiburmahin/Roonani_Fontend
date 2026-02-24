import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../../types";
import { loadCartFromStorage } from "../../utils/cartStorage";

export interface CartItem {
    product: Product & { price: number };
    quantity: number;
    selectedSize: string;
}

export interface CartState {
    items: CartItem[];
}

const initialState: CartState = {
    items: typeof window !== "undefined" ? loadCartFromStorage().filter((i: any) => i?.product?.id) : [],
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<CartItem>) => {
            const { product, selectedSize, quantity } = action.payload;

            if (!product?.id) return;

            const existingItem = state.items.find(
                (item) => item?.product?.id === product.id && item?.selectedSize === selectedSize
            );

            if (existingItem) {
                existingItem.quantity += (quantity || 1);
            } else {
                state.items.push({
                    ...action.payload,
                    quantity: quantity || 1
                });
            }
        },

        removeOneFromCart: (state, action: PayloadAction<CartItem>) => {
            const productId = action.payload?.product?.id;
            const size = action.payload?.selectedSize;

            if (!productId) return;

            const existingItem = state.items.find(
                (i) => i?.product?.id === productId && i?.selectedSize === size
            );

            if (existingItem) {
                if (existingItem.quantity > 1) {
                    existingItem.quantity -= 1;
                } else {
                    state.items = state.items.filter(
                        (i) => !(i?.product?.id === productId && i?.selectedSize === size)
                    );
                }
            }
        },

        removeFromCart: (state, action: PayloadAction<CartItem>) => {
            const productId = action.payload?.product?.id;
            const size = action.payload?.selectedSize;

            if (!productId) return;

            state.items = state.items.filter(
                (i) => !(i?.product?.id === productId && i?.selectedSize === size)
            );
        },

        clearCart: (state) => {
            state.items = [];
        },

        hydrateCart: (state, action: PayloadAction<CartItem[]>) => {
            // হাইড্রেট করার সময়ও ফিল্টার করে নেওয়া নিরাপদ
            state.items = action.payload.filter(i => i?.product?.id);
        },
    },
});

export const { addToCart, removeOneFromCart, removeFromCart, clearCart, hydrateCart } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;