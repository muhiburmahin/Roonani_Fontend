import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CheckoutState {
    shippingInfo: {
        fullName: string;
        phone: string;
        address: string;
        city: string;
        area: "Inside Dhaka" | "Outside Dhaka"; // ডেলিভারি চার্জ ক্যালকুলেশন সহজ করতে
    };
    paymentMethod: "COD" | "Online";
}

const initialState: CheckoutState = {
    shippingInfo: {
        fullName: "",
        phone: "",
        address: "",
        city: "",
        area: "Inside Dhaka",
    },
    paymentMethod: "COD",
};

const checkoutSlice = createSlice({
    name: "checkout",
    initialState,
    reducers: {
        updateShippingInfo: (state, action: PayloadAction<Partial<CheckoutState["shippingInfo"]>>) => {
            state.shippingInfo = { ...state.shippingInfo, ...action.payload };
        },
        setPaymentMethod: (state, action: PayloadAction<CheckoutState["paymentMethod"]>) => {
            state.paymentMethod = action.payload;
        },
        resetCheckout: () => initialState,
    },
});

export const { updateShippingInfo, setPaymentMethod, resetCheckout } = checkoutSlice.actions;
export default checkoutSlice.reducer;