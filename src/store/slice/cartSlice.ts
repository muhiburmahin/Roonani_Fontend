import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../../types"; // Medicine এর বদলে Product ব্যবহার করুন
import { loadCartFromStorage } from "../../utils/cartStorage";

export interface CartItem {
    product: Product; // Medicine থেকে Product এ পরিবর্তন
    quantity: number;
    selectedSize: string; // সাইজ বা ভলিউম ট্র্যাক করার জন্য
}

export interface CartState {
    items: CartItem[];
}

const initialState: CartState = {
    items: loadCartFromStorage(),
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (
            state,
            action: PayloadAction<{ product: Product; quantity?: number; selectedSize: string }>,
        ) => {
            const { product, quantity = 1, selectedSize } = action.payload;

            // শুধুমাত্র ID না, বরং ID এবং Size উভয়ই মিলেছে কিনা তা চেক করা
            const existingItem = state.items.find(
                (item) => item.product.id === product.id && item.selectedSize === selectedSize,
            );

            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                state.items.push({
                    product,
                    quantity,
                    selectedSize,
                });
            }
        },

        removeOneFromCart: (state, action: PayloadAction<{ id: string; selectedSize: string }>) => {
            const { id, selectedSize } = action.payload;
            const itemIndex = state.items.findIndex(
                (item) => item.product.id === id && item.selectedSize === selectedSize,
            );

            if (itemIndex !== -1) {
                if (state.items[itemIndex].quantity > 1) {
                    state.items[itemIndex].quantity -= 1;
                } else {
                    state.items.splice(itemIndex, 1);
                }
            }
        },

        removeFromCart: (state, action: PayloadAction<{ id: string; selectedSize: string }>) => {
            const { id, selectedSize } = action.payload;
            state.items = state.items.filter(
                (item) => !(item.product.id === id && item.selectedSize === selectedSize),
            );
        },

        clearCart: (state) => {
            state.items = [];
            if (typeof window !== "undefined") {
                localStorage.removeItem("cart");
            }
        },

        hydrateCart: (state, action: PayloadAction<CartItem[]>) => {
            state.items = action.payload;
        },
    },
});

export const {
    addToCart,
    removeOneFromCart,
    removeFromCart,
    clearCart,
    hydrateCart,
} = cartSlice.actions;

export const cartReducer = cartSlice.reducer;