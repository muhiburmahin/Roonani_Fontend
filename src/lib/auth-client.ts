// src/lib/auth-client.ts
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
    baseURL: "http://localhost:5000",
    user: {
        additionalFields: {
            username: { type: "string", required: true },
            phone: { type: "string", required: true }
        }
    }
});