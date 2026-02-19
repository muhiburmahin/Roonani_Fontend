"use client";
import { Provider } from "react-redux";
import { store } from "../store";
import { ThemeProvider } from "./themeProvider";
import { Toaster } from 'sonner';

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <Provider store={store}>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
                {children}
                <Toaster position="top-center" richColors />
            </ThemeProvider>
        </Provider>
    );
}