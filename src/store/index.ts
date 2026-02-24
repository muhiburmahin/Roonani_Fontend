import { configureStore } from "@reduxjs/toolkit";
import { cartReducer } from './slice/cartSlice';


export const store = configureStore({
    reducer: {
        auth: cartReducer,
        cart: cartReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
