// src/lib/auth-client.ts
import { createAuthClient } from "better-auth/react";

const getAuthBaseURL = () => {
    // On client side, use NEXT_PUBLIC_AUTH_URL
    if (typeof window !== 'undefined') {
        return process.env.NEXT_PUBLIC_AUTH_URL || 'https://roohanibackend.onrender.com/api/auth';
    }
    // Fallback for SSR
    return process.env.NEXT_PUBLIC_AUTH_URL || 'https://roohanibackend.onrender.com/api/auth';
};

export const authClient = createAuthClient({
    baseURL: getAuthBaseURL(),
    // ensure fetch includes credentials so auth cookies are set and sent across origins
    fetchOptions: {
        credentials: "include",
    },
    user: {
        additionalFields: {
            username: { type: "string", required: true },
            phone: { type: "string", required: true }
        }
    }
});