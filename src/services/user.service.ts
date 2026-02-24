import { cookies } from "next/headers";
import { env } from "../env";

const API_URL = env.API_URL;

export const userService = {
    // ১. সেশন ডাটা ফেচ করা
    getSession: async function () {
        const AUTH_URL = env.AUTH_URL;
        const cookieStore = await cookies();
        const cookieString = cookieStore
            .getAll()
            .map((cookie) => `${cookie.name}=${cookie.value}`)
            .join("; ");

        try {
            const res = await fetch(`${AUTH_URL}/get-session`, {
                method: "GET",
                headers: {
                    Cookie: cookieString,
                    Accept: "application/json",
                },
                cache: "no-store",
            });

            const session = await res.json();

            if (!res.ok || !session) {
                return { data: null, error: "No session found" };
            }

            return { data: session, error: null };
        } catch (error) {
            console.log("Session Fetch Error:", error); // ভেরিয়েবলটি এখানে ব্যবহৃত হলো
            return { data: null, error: "Something Went wrong" };
        }
    },

    // ২. অ্যাডমিন ড্যাশবোর্ড স্ট্যাটাস (রুট: /users/admin-stats)
    getAdminStats: async () => {
        try {
            const cookieStore = await cookies();
            const res = await fetch(`${API_URL}/user/admin-stats`, {
                headers: {
                    Cookie: cookieStore.toString(),
                },
                cache: "no-store",
            });
            return await res.json();
        } catch (error) {
            console.log("Admin Stats Error:", error);
            return { success: false, message: "Failed to fetch admin stats" };
        }
    },

    // ৩. নিজের প্রোফাইল ডাটা (রুট: /users/me)
    getMyProfile: async () => {
        try {
            const cookieStore = await cookies();
            const res = await fetch(`${API_URL}/user/me`, {
                headers: {
                    Cookie: cookieStore.toString(),
                },
                cache: "no-store",
                next: { tags: ["me"] },
            });
            return await res.json();
        } catch (error) {
            console.log("Profile Fetch Error:", error);
            return { success: false, message: "Profile fetch error" };
        }
    },

    // ৪. সব ইউজার লিস্ট (রুট: /users/all-users)
    getAllUsers: async () => {
        try {
            const cookieStore = await cookies();
            const res = await fetch(`${API_URL}/user/all-users`, {
                headers: {
                    Cookie: cookieStore.toString(),
                },
                cache: "no-store",
                next: { tags: ["users"] },
            });
            return await res.json();
        } catch (error) {
            console.log("All Users Fetch Error:", error);
            return { success: false, message: "Users fetch error" };
        }
    },

    // ৫. কাস্টমার স্পেসিফিক স্ট্যাটাস (রুট: /users/customer-stats)
    getCustomerStats: async () => {
        try {
            const cookieStore = await cookies();
            const res = await fetch(`${API_URL}/user/customer-stats`, {
                headers: {
                    Cookie: cookieStore.toString(),
                },
                cache: "no-store",
            });

            const data = await res.json();
            return data;
        } catch (error) {
            console.log("Customer Stats Error:", error);
            return { success: false, message: "Customer stats error" };
        }
    },

    // // ৬. প্রোফাইল আপডেট (রুট: /users/update-profile অথবা /users/update-profile/:id)
    // updateUser: async (id: string | null, data: Partial<UpdateUser>) => {
    //     try {
    //         const cookieStore = await cookies();
    //         const url = id
    //             ? `${API_URL}/user/update-profile/${id}`
    //             : `${API_URL}/user/update-profile`;

    //         const res = await fetch(url, {
    //             method: "PATCH",
    //             headers: {
    //                 "Content-Type": "application/json",
    //                 Cookie: cookieStore.toString(),
    //             },
    //             body: JSON.stringify(data),
    //             cache: "no-store",
    //         });

    //         if (!res.ok) {
    //             const errBody = await res.json().catch(() => null);
    //             return {
    //                 success: false,
    //                 message: errBody?.message ?? "Failed to update user",
    //                 error: errBody
    //             };
    //         }

    //         return await res.json();
    //     } catch (error) {
    //         console.log("Update User Error:", error);
    //         return { success: false, message: "Update failed" };
    //     }
    // },
};